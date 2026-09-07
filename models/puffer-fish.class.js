/**
 * Represents a puffer fish enemy in the game.
 * Handles patrol movement, bubble mode transitions,
 * animations, sounds and final slap behavior.
 *
 * @extends MoveableObject
 */
class PufferFish extends MoveableObject {
  IMAGE_SETS = {
    swimming: [
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
    ],
    transition: [
      "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png",
    ],
    bubbleSwim: [
      "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png",
    ],
    dead: [
      "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png",
    ],
  };

  height = 75;
  width = 75;
  offset = { top: 3, left: 1, right: 3, bottom: 19 };
  maxY = 405;
  minY = 50;
  verticalSpeed = -6;
  currentAnim = "swim";

  /**
   * Creates a new puffer fish and initializes its images,
   * sounds, movement and animations.
   *
   * @param {World} world - The game world the puffer fish belongs to.
   */
  constructor(world) {
    super().loadImage(this.IMAGE_SETS.swimming[0]);
    this.loadAllImages();
    this.loadPufferSounds();
    this.world = world;
    this.speed = 0.7 + Math.random() * 0.6;
    this.inBubbleMode = false;
    this.transitioning = false;
    this.startFrameTicker();
    this.animate();
  }

  /**
   * Loads all image sets used by the puffer fish.
   */
  loadAllImages() {
    Object.values(this.IMAGE_SETS).forEach((images) => this.loadImages(images));
  }

  /**
   * Loads the sounds used for bubble mode transitions.
   */
  loadPufferSounds() {
    this.loadSound("inhale", "assets/audio/pufferInhale.mp3");
    this.loadSound("exhale", "assets/audio/pufferExhale.mp3");
  }

  /**
   * Defines the horizontal patrol area of the puffer fish.
   *
   * @param {number} centerX - The horizontal center of the patrol area.
   * @param {number} zoneWidth - The total width of the patrol area.
   */
  setPatrol(centerX, zoneWidth) {
    const half = zoneWidth / 2;
    this.patrolMinX = centerX - half;
    this.patrolMaxX = centerX + half;
    this.otherDirection = Math.random() < 0.5;
  }

  /**
   * Starts the animation and patrol loops of the puffer fish.
   */
  animate() {
    this.startAnimationLoop();
    this.startPatrolLoop();
  }

  /**
   * Starts the animation loop and checks for bubble mode transitions.
   */
  startAnimationLoop() {
    const loop = () => {
      if (!gameRunning || this.slapped) return;

      const delay = 120;
      const char = this.world?.character;

      if (!char) return setTimeout(loop, delay);

      this.handleBubbleTransition(char);
      setTimeout(loop, delay);
    };

    loop();
  }

  /**
   * Handles transitions between normal swimming and bubble mode.
   *
   * @param {Character} char - The player character.
   */
  handleBubbleTransition(char) {
    if (this.transitioning) return;

    const close = this.isCharacterClose(char);

    if (close && !this.inBubbleMode) {
      this.startForwardTransition();
    } else if (!close && this.inBubbleMode) {
      this.startReverseTransition();
    }
  }

  /**
   * Checks whether the character is close enough to the puffer fish.
   *
   * @param {Character} char - The player character.
   * @returns {boolean} True if the character is within 300 pixels.
   */
  isCharacterClose(char) {
    const cx = (char.x ?? 0) + (char.width ?? 0) / 2;
    const cy = (char.y ?? 0) + (char.height ?? 0) / 2;
    const fx = this.x + this.width / 2;
    const fy = this.y + this.height / 2;

    return Math.hypot(cx - fx, cy - fy) <= 300;
  }

  /**
   * Starts the transition from normal swimming to bubble mode.
   */
  startForwardTransition() {
    this.transitioning = true;
    this.playSound("inhale");

    this.playOnce(this.IMAGE_SETS.transition, 150, () => {
      this.transitioning = false;
      this.inBubbleMode = true;
      this.offset.bottom = 3;
    });
  }

  /**
   * Starts the reverse transition from bubble mode
   * back to normal swimming.
   */
  startReverseTransition() {
    this.transitioning = true;
    this.playSound("exhale");

    this.playOnceReverse(this.IMAGE_SETS.transition, 150, () => {
      this.transitioning = false;
      this.inBubbleMode = false;
    });
  }

  /**
   * Starts the animation ticker for the normal and bubble swim animations.
   */
  startFrameTicker() {
    setInterval(() => {
      if (this.slapped || this.transitioning) return;

      const set = this.inBubbleMode
        ? this.IMAGE_SETS.bubbleSwim
        : this.IMAGE_SETS.swimming;

      this.playAnimation(set);
    }, 120);
  }

  /**
   * Plays an animation once from the first to the last image.
   *
   * @param {string[]} images - The image paths of the animation.
   * @param {number} speed - The delay between animation frames in milliseconds.
   * @param {Function} done - The callback executed after the animation finishes.
   */
  playOnce(images, speed, done) {
    let i = 0;

    const id = setInterval(() => {
      if (i >= images.length) {
        clearInterval(id);
        done && done();
        return;
      }

      const img = this.imageCache[images[i]];

      if (img) {
        this.img = img;
      }

      i++;
    }, speed);
  }

  /**
   * Plays an animation once in reverse order.
   *
   * @param {string[]} images - The image paths of the animation.
   * @param {number} speed - The delay between animation frames in milliseconds.
   * @param {Function} done - The callback executed after the animation finishes.
   */
  playOnceReverse(images, speed, done) {
    let i = images.length - 1;

    const id = setInterval(() => {
      if (i < 0) {
        clearInterval(id);
        done && done();
        return;
      }

      const img = this.imageCache[images[i]];

      if (img) {
        this.img = img;
      }

      i--;
    }, speed);

    this.offset.bottom = 19;
  }

  /**
   * Starts the horizontal patrol movement of the puffer fish.
   */
  startPatrolLoop() {
    setInterval(() => {
      if (!gameRunning) return;
      if (this.slapped) return;
      if (this.patrolMinX == null) return;

      this.otherDirection ? this.moveRight() : this.moveLeft();

      if (this.x <= this.patrolMinX) {
        this.x = this.patrolMinX;
        this.otherDirection = true;
      }

      if (this.x >= this.patrolMaxX) {
        this.x = this.patrolMaxX;
        this.otherDirection = false;
      }
    }, 1000 / 60);
  }

  /**
   * Moves the puffer fish to the right.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = true;
  }

  /**
   * Moves the puffer fish to the left.
   */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = false;
  }

  /**
   * Handles the final slap attack and starts the fly-away movement.
   *
   * @param {boolean} characterLooksLeft - Indicates whether the character is facing left.
   */
  onFinalSlap(characterLooksLeft) {
    this.slapped = true;
    this.transitioning = false;
    this.setDeadImage();

    this.horizontalSpeed = characterLooksLeft ? 4 : -4;
    this.verticalSpeed = -6;

    this.otherDirection = this.horizontalSpeed < 0;

    if (this.flyAwayId) {
      clearInterval(this.flyAwayId);
    }

    this.flyAwayId = setInterval(() => this.flyAwayStep(), 16);
  }

  /**
   * Sets the dead image of the puffer fish.
   */
  setDeadImage() {
    const deadImagePath = this.IMAGE_SETS.dead[0];
    this.img = this.imageCache[deadImagePath];
  }

  /**
   * Moves the slapped puffer fish away from the game area.
   */
  flyAwayStep() {
    this.setDeadImage();

    this.x += this.horizontalSpeed;
    this.y += this.verticalSpeed;

    if (this.verticalSpeed > -12) {
      this.verticalSpeed -= 0.25;
    }

    if (this.y + this.height < 0) {
      clearInterval(this.flyAwayId);
      this.removed = true;
    }
  }
}
