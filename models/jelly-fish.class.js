/**
 * Represents a jellyfish enemy in the game.
 * Handles swimming animations, vertical patrol movement and death behavior.
 *
 * @extends MoveableObject
 */
class JellyFish extends MoveableObject {
  IMAGE_SETS = {
    swimming: [
      "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
      "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
      "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
      "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
    ],
    dead: [
      "img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
      "img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
      "img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
      "img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
    ],
  };

  height = 75;
  width = 75;
  offset = { top: 13, left: 15, right: 15, bottom: 20 };
  maxY = 405;
  minY = 50;

  /**
   * Creates a new jellyfish with a random position and movement speed.
   */
  constructor() {
    super().loadImage(this.IMAGE_SETS.swimming[0]);
    this.x = 200 + Math.random() * 400;
    this.y = Math.random() * (this.maxY - this.minY) + this.minY;
    this.loadAllImages();
    this.speed = 0.7 + Math.random() * 0.6;
    this.isDead = false;
    this.verticalSpeed = 0;
    this.animate();
  }

  /**
   * Loads all image sets used by the jellyfish.
   */
  loadAllImages() {
    Object.values(this.IMAGE_SETS).forEach((images) => this.loadImages(images));
  }

  /**
   * Defines the vertical patrol area of the jellyfish.
   *
   * @param {number} centerY - The vertical center position of the patrol area.
   * @param {number} [zoneHeight=160] - The total height of the patrol area.
   */
  setVerticalPatrol(centerY, zoneHeight = 160) {
    const half = Math.min(
      zoneHeight / 2,
      centerY - this.minY,
      this.maxY - centerY,
    );

    this.patrolMinY = centerY - half;
    this.patrolMaxY = centerY + half;
    this.dirY = Math.random() < 0.5 ? -1 : 1;
  }

  /**
   * Starts the animation and movement loops of the jellyfish.
   */
  animate() {
    this.startAnimationLoop();
    this.startMovementLoop();
  }

  /**
   * Starts the animation loop and switches between swimming
   * and death animations.
   */
  startAnimationLoop() {
    setInterval(() => {
      if (!gameRunning) return;

      if (this.isDead) {
        this.playAnimation(this.IMAGE_SETS.dead);
      } else {
        this.playAnimation(this.IMAGE_SETS.swimming);
      }
    }, 250);
  }

  /**
   * Starts the movement loop of the jellyfish.
   */
  startMovementLoop() {
    setInterval(() => {
      if (!gameRunning) return;

      if (this.isDead) {
        this.flyAwayStep();
      } else {
        this.updatePatrolMovement();
      }
    }, 1000 / 60);
  }

  /**
   * Updates the vertical patrol movement of the jellyfish.
   */
  updatePatrolMovement() {
    if (this.patrolMinY == null) return;

    this.y += this.dirY * this.speed;
    this.correctPositionIfOutOfBounds();
  }

  /**
   * Keeps the jellyfish inside its patrol area
   * and changes its movement direction at the boundaries.
   */
  correctPositionIfOutOfBounds() {
    if (this.y <= this.patrolMinY) {
      this.y = this.patrolMinY;
      this.dirY = 1;
    }

    if (this.y >= this.patrolMaxY) {
      this.y = this.patrolMaxY;
      this.dirY = -1;
    }
  }

  /**
   * Marks the jellyfish as dead and starts its upward movement.
   */
  die() {
    this.isDead = true;
    this.verticalSpeed = -2;
  }

  /**
   * Moves the dead jellyfish upward until it leaves the screen.
   */
  flyAwayStep() {
    this.y += this.verticalSpeed;

    if (this.y + this.height < 0) {
      this.removeFromWorld();
    }
  }

  /**
   * Removes the jellyfish from the enemy list of the game world.
   */
  removeFromWorld() {
    if (!this.world || !this.world.level || !this.world.level.enemies) return;

    const index = this.world.level.enemies.indexOf(this);

    if (index > -1) {
      this.world.level.enemies.splice(index, 1);
    }
  }
}
