/**
 * Represents the final boss enemy in the game.
 * Handles the introduction, movement, attacks, sounds and animations
 * of the endboss.
 *
 * @extends MoveableObject
 */
class Endboss extends MoveableObject {
  IMAGE_SETS = ENDBOSS_CONFIG.images;
  SOUNDS = ENDBOSS_CONFIG.sounds;

  height = 200;
  width = 200;
  y = 50;
  offset = { top: 105, left: 15, right: 40, bottom: 35 };
  introduced = false;
  introPlayed = false;
  hurtSoundPlayed = false;
  spawnPoint = { x: 4000, y: 50 };
  speed = 40;
  maxEnergy = 100;
  pauseAfterAttack = false;
  attackPauseUntil = 0;

  /**
   * Creates a new endboss and initializes images, sounds and animations.
   *
   * @param {World} world - The game world the endboss belongs to.
   */
  constructor(world) {
    super();
    this.world = world;
    this.loadAllImages();
    this.x = 4000;
    this.animate();
    this.loadSounds(this.SOUNDS);
  }

  /**
   * Loads all image sets used by the endboss.
   */
  loadAllImages() {
    Object.values(this.IMAGE_SETS).forEach((images) => this.loadImages(images));
  }

  /**
   * Checks whether the endboss should be visible.
   *
   * @returns {boolean} True if the endboss has been introduced.
   */
  isVisible() {
    return this.introduced;
  }

  /**
   * Starts the input and animation loops of the endboss.
   */
  animate() {
    this.startInputLoop();
    this.startAnimationLoop();
  }

  /**
   * Starts the input loop and checks whether the character
   * has reached the endboss area.
   */
  startInputLoop() {
    const id = setInterval(() => {
      if (!gameRunning) return;
      if (!this.world?.character) return;

      if (!this.introduced && this.world.character.x >= 3550) {
        playBossMusic();
        this.startIntro();
        clearInterval(id);
      }
    }, 16);
  }

  /**
   * Starts the introduction sequence of the endboss.
   */
  startIntro() {
    this.introduced = true;
    this.currentImage = 0;
    this.img = this.imageCache[this.IMAGE_SETS.introduce[0]];
  }

  /**
   * Starts the animation loop of the endboss.
   */
  startAnimationLoop() {
    const loop = () => {
      if (!gameRunning) return;
      if (!this.ensureIntroduced()) return;

      const delay = this.handleAnimationState();
      setTimeout(loop, delay);
    };

    loop();
  }

  /**
   * Handles the current animation state of the endboss.
   *
   * @returns {number|undefined} The delay until the next animation step.
   */
  handleAnimationState() {
    if (!this.introPlayed) return this.playIntro();
    if (this.isDead()) return this.handleDeadAnimation();
    if (this.isHurt()) return this.handleHurtAnimation();

    this.hurtSoundPlayed = false;
    return this.moveEndboss();
  }

  /**
   * Checks whether the endboss has already been introduced.
   *
   * @param {number} t - The delay before checking again.
   * @returns {boolean} True if the endboss has been introduced.
   */
  ensureIntroduced(t) {
    if (!this.introduced) {
      setTimeout(() => this.startAnimationLoop(), t);
      return false;
    }

    return true;
  }

  /**
   * Handles the movement behavior of the endboss.
   *
   * @returns {number} The delay until the next movement step.
   */
  moveEndboss() {
    const spawnDist = Math.abs(this.x - this.spawnPoint.x);
    const playerDist = Math.abs(this.world.character.x - this.x);

    if (this.returningToSpawn) return this.returnToSpawn();
    if (this.shouldReturnToSpawn(spawnDist, playerDist))
      return this.startReturn();

    if (this.isAttackPaused()) return 150;

    if (this.canAttackPlayer(playerDist)) return this.attackCharacter(19);

    this.playAnimation(this.IMAGE_SETS.swimming);
    return 200;
  }

  /**
   * Starts the return movement to the spawn point.
   *
   * @returns {number} The delay until the next movement step.
   */
  startReturn() {
    this.returningToSpawn = true;
    return this.moveTo(this.spawnPoint.x);
  }

  /**
   * Checks whether the endboss should return to its spawn point.
   *
   * @param {number} spawnDist - The distance from the spawn point.
   * @param {number} playerDist - The distance from the player.
   * @returns {boolean} True if the endboss should return.
   */
  shouldReturnToSpawn(spawnDist, playerDist) {
    return spawnDist >= 2000 || playerDist > 550;
  }

  /**
   * Checks whether the endboss can attack the player.
   *
   * @param {number} playerDist - The distance between the player and endboss.
   * @returns {boolean} True if the player is close enough and alive.
   */
  canAttackPlayer(playerDist) {
    return playerDist <= 550 && !this.world.character.isDead();
  }

  /**
   * Starts the attack pause after a successful hit.
   */
  startAttackPause() {
    this.attackPauseUntil = Date.now() + 1500;
    this.pauseAfterAttack = false;
  }

  /**
   * Checks whether the attack pause is active.
   *
   * @returns {boolean} True while the endboss is pausing.
   */
  isAttackPaused() {
    return Date.now() < this.attackPauseUntil;
  }

  /**
   * Checks whether the attack should pause after the current animation.
   *
   * @returns {boolean} True if the attack should pause.
   */
  shouldPauseAttack() {
    const frames = this.IMAGE_SETS.attack.length;
    return this.pauseAfterAttack && this.currentImage % frames === 0;
  }

  /**
   * Moves the endboss back to its spawn point.
   *
   * @returns {number} The delay until the next movement step.
   */
  returnToSpawn() {
    if (this.x !== this.spawnPoint.x) {
      return this.moveTo(this.spawnPoint.x);
    }

    this.returningToSpawn = false;
    return 200;
  }

  /**
   * Changes the facing direction of the endboss toward a target.
   *
   * @param {number} targetX - The horizontal position of the target.
   */
  faceTowards(targetX) {
    this.otherDirection = targetX > this.x;
  }

  /**
   * Moves the endboss horizontally toward a target position.
   *
   * @param {number} targetX - The horizontal target position.
   * @returns {number} The delay until the next movement step.
   */
  moveTo(targetX) {
    this.faceTowards(targetX);

    if (Math.abs(this.x - targetX) <= this.speed) {
      this.x = targetX;
    } else if (this.x < targetX) {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }

    this.playAnimation(this.IMAGE_SETS.swimming);
    return 150;
  }

  /**
   * Attacks and moves toward the character.
   *
   * @param {number} [speed=10] - The movement speed during the attack.
   * @returns {number} The delay until the next attack step.
   */
  attackCharacter(speed = 10) {
    const char = this.world.character;

    this.faceTowards(char.x);
    this.moveTowardsCharacter(char, speed);
    this.handleAttackSound();
    this.playAnimation(this.IMAGE_SETS.attack);

    if (this.shouldPauseAttack()) this.startAttackPause();

    return 120;
  }

  /**
   * Moves the endboss horizontally and vertically toward the character.
   *
   * @param {Character} char - The character to move toward.
   * @param {number} speed - The movement speed of the endboss.
   */
  moveTowardsCharacter(char, speed) {
    if (char.x > this.x) {
      this.x += speed;
    } else if (char.x < this.x) {
      this.x -= speed;
    }

    if (char.y - 40 > this.y) {
      this.y += speed;
    } else if (char.y - 40 < this.y) {
      this.y -= speed;
    }
  }

  /**
   * Plays the attack sound at the appropriate animation frame.
   */
  handleAttackSound() {
    const frame = this.currentImage % this.IMAGE_SETS.attack.length;

    if (frame === 4 && !this.attackSoundPlayed) {
      this.playSound("attack");
      this.attackSoundPlayed = true;
    }

    if (frame === 0) {
      this.attackSoundPlayed = false;
    }
  }

  /**
   * Plays the introduction animation of the endboss.
   *
   * @returns {number} The delay until the next introduction frame.
   */
  playIntro() {
    this.playAnimationNonLoop(this.IMAGE_SETS.introduce);

    if (this.currentImage >= this.IMAGE_SETS.introduce.length) {
      this.introPlayed = true;
      this.currentImage = 0;

      if (!this.spawnPoint) {
        this.spawnPoint = {
          x: this.x,
          y: this.y,
        };
      }
    }

    return 150;
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

  /**
   * Plays the hurt animation and hurt sound of the endboss.
   *
   * @returns {number} The delay until the next hurt animation frame.
   */
  handleHurtAnimation() {
    if (!this.hurtSoundPlayed) {
      this.playSound("hurt", 0, 0.5);
      this.hurtSoundPlayed = true;
    }

    this.playAnimation(this.IMAGE_SETS.hurt);

    return 200;
  }

  /**
   * Handles the death animation of the endboss.
   *
   * @returns {number|undefined} The delay while the death animation is active.
   */
  handleDeadAnimation() {
    if (!this.deadAnimationComplete) {
      this.playDeadAnimation();
      return 200;
    }
  }

  /**
   * Plays the complete death animation of the endboss
   * and shows the winning game over screen when finished.
   */
  playDeadAnimation() {
    if (this.deadAnimationIndex < this.IMAGE_SETS.dead.length) {
      if (this.deadAnimationIndex === 0) {
        this.playSound("dead");
      }

      const path = this.IMAGE_SETS.dead[this.deadAnimationIndex];
      this.img = this.imageCache[path];
      this.deadAnimationIndex++;
    } else {
      this.deadAnimationComplete = true;
      showGameOver(true);
    }
  }
}
