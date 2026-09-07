/**
 * Represents the playable character Sharkie.
 * Handles movement, attacks, animations, sounds and player input.
 *
 * @extends MoveableObject
 */
class Character extends MoveableObject {
  IMAGE_SETS = CHARACTER_IMAGE_SETS;

  SOUNDS = CHARACTER_SOUNDS;

  height = 150;
  width = 200;
  y = 50;
  speed = 2.5;
  world;
  idleTimer = 0;
  longIdlePlayed = false;
  isAttacking = false;
  isUntouchable = false;
  attackType = 0;
  offset = { top: 120, bottom: 85, left: 35, right: 35 };
  maxX = 4410;
  minX = -300;
  maxY = 350;
  minY = -20;

  /**
   * Creates a new character and initializes images, sounds and animations.
   *
   * @param {World} world - The game world the character belongs to.
   */
  constructor(world) {
    super().loadImage(this.IMAGE_SETS.swimming[0]);
    this.world = world;
    this.attackHandler = new CharacterAttack(this);
    this.loadAllImages();
    this.loadSounds(this.SOUNDS);
    this.imagesLongIdleLast4 = this.IMAGE_SETS.longIdle.slice(-4);
    this.animate();
  }

  /**
   * Loads all image sets used by the character.
   */
  loadAllImages() {
    Object.values(this.IMAGE_SETS).forEach((arr) => this.loadImages(arr));
  }

  /**
   * Starts the input and animation loops of the character.
   */
  animate() {
    this.startInputLoop();
    this.startAnimationLoop();
  }

  /**
   * Starts the input loop and continuously handles attacks,
   * movement and camera updates.
   */
  startInputLoop() {
    setInterval(() => {
      if (!gameRunning) return;
      this.attackHandler.handleAttacks();
      this.handleMovement();
      this.updateCamera();
    }, 16);
  }

  /**
   * Handles attack input from the keyboard.
   */
  handleAttacks() {
    if (this.world.keyboard.F && !this.isAttacking) {
      this.startAttack("bubble");
    }

    if (this.world.keyboard.E && !this.isAttacking) {
      this.startAttack("finalSlap");
    }
  }

  /**
   * Handles character movement based on the pressed movement keys.
   */
  handleMovement() {
    if (this.isDead()) return;
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.canMoveUp()) this.moveUp();
    if (this.canMoveDown()) this.moveDown();
  }

  /**
   * Starts the animation loop and selects the appropriate delay
   * for each animation state.
   */
  startAnimationLoop() {
    const loop = () => {
      if (!gameRunning) return;
      this.handleAnimationState();
      const delay = this.getAnimationDelay();
      setTimeout(loop, delay);
    };

    loop();
  }

  /**
   * Handles the current animation state of the character.
   */
  handleAnimationState() {
    if (this.isDead()) return this.handleDeadAnimation();
    if (this.attackType) {
      return this.attackHandler.handleAttackAnimation(this.attackType);
    }
    if (this.isHurt()) return this.handleHurtAnimation();
    if (this.isMoving()) return this.handleMovementAnimation();
    this.handleIdleAnimation();
  }

  /**
   * Returns the animation delay depending on the current character state.
   *
   * @returns {number} The animation delay in milliseconds.
   */
  getAnimationDelay() {
    if (this.isDead()) return 150;
    if (this.attackType) return 40;
    if (this.isHurt()) return 200;
    if (this.isMoving()) return 100;
    return 175;
  }

  /**
   * Updates the camera position based on the character position.
   */
  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Checks whether a movement key is currently pressed.
   *
   * @returns {boolean} True if the character is moving.
   */
  isMoving() {
    return (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.UP ||
      this.world.keyboard.DOWN
    );
  }

  /**
   * Handles the character's death animation.
   */
  handleDeadAnimation() {
    if (!this.deadAnimationComplete) {
      this.playDeadAnimation();
    }

    this.resetIdle();
  }

  /**
   * Plays the hurt animation and resets the idle state.
   */
  handleHurtAnimation() {
    this.playAnimation(this.IMAGE_SETS.hurt);
    this.resetIdle();
    this.longIdlePlayed = false;

    if (this.currentImage === 1) {
      this.playSound("hurt");
    }
  }

  /**
   * Plays the swimming animation while the character is moving.
   */
  handleMovementAnimation() {
    this.playAnimation(this.IMAGE_SETS.swimming);
    this.resetIdle();
    this.longIdlePlayed = false;

    const swim = this.sounds["swim"];

    if (swim && swim.paused) {
      this.playSound("swim");
    }
  }

  /**
   * Handles the idle and long idle animations of the character.
   */
  handleIdleAnimation() {
    this.idleTimer += 100;

    if (this.idleTimer >= 4000) {
      if (!this.longIdlePlayed) {
        this.playFullLongIdle();
      } else {
        this.playAnimation(this.imagesLongIdleLast4);
      }
    } else {
      this.animationState = "idle";
      this.playAnimation(this.IMAGE_SETS.idle);
    }
  }

  /**
   * Plays the complete long idle animation before switching
   * to the looping sleep animation.
   */
  playFullLongIdle() {
    if (this.animationState !== "longIdleFull") {
      this.startIdleSleep();
    }

    this.playAnimationNonLoop(this.IMAGE_SETS.longIdle);
    this.completeIdleSleepIfFinished();
  }

  /**
   * Initializes the long idle sleep state and plays the sleep sound.
   */
  startIdleSleep() {
    this.animationState = "longIdleFull";
    this.currentImage = 0;
    this.playSound("sleepStart");
    this.setupIdleSleepLoop();
  }

  /**
   * Starts the looping sleep sound after the initial sleep sound ends.
   */
  setupIdleSleepLoop() {
    const startSound = this.sounds["sleepStart"];

    if (!startSound) return;

    startSound.onended = () => {
      const loopSound = this.sounds["sleepLoop"];

      if (loopSound) {
        loopSound.loop = true;
        loopSound.play();
      }
    };
  }

  /**
   * Checks whether the long idle animation is finished
   * and switches to the looping idle state.
   */
  completeIdleSleepIfFinished() {
    const sequenceDone = this.currentImage >= this.IMAGE_SETS.longIdle.length;

    if (!sequenceDone) return;

    this.longIdlePlayed = true;
    this.animationState = "longIdleLoop";
    this.currentImage = 0;

    Object.assign(this.offset, {
      top: 132,
      bottom: 62,
    });
  }

  /**
   * Resets the character's idle state and stops the sleep loop sound.
   */
  resetIdle() {
    this.idleTimer = 0;
    this.animationState = "idle";

    Object.assign(this.offset, {
      top: 120,
      bottom: 85,
    });

    this.stopSound("sleepLoop");
  }

  /**
   * Moves the character to the right.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the character to the left.
   */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  /**
   * Plays the complete death animation and shows
   * the game over screen when it is finished.
   */
  playDeadAnimation() {
    if (this.deadAnimationIndex < this.IMAGE_SETS.dead.length) {
      const currentFramePath = this.IMAGE_SETS.dead[this.deadAnimationIndex];

      this.img = this.imageCache[currentFramePath];
      this.deadAnimationIndex++;

      if (this.deadAnimationIndex === 1) {
        this.playSound("dead");
      }
    } else {
      this.deadAnimationComplete = true;
      showGameOver();
    }
  }

  /**
   * Plays an animation once without restarting it.
   *
   * @param {string[]} images - The image paths of the animation.
   */
  playAnimationNonLoop(images) {
    if (this.currentImage < images.length) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }
}
