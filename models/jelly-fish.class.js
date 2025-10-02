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
  offset = { top: 5, left: 1, right: 3, bottom: 10 };
  maxY = 405;
  minY = 50;

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

  loadAllImages() {
    Object.values(this.IMAGE_SETS).forEach((images) => this.loadImages(images));
  }

  setVerticalPatrol(centerY, zoneHeight = 160) {
    const half = Math.min(
      zoneHeight / 2,
      centerY - this.minY,
      this.maxY - centerY
    );
    this.patrolMinY = centerY - half;
    this.patrolMaxY = centerY + half;
    this.dirY = Math.random() < 0.5 ? -1 : 1;
  }

  animate() {
    this.startAnimationLoop();
    this.startMovementLoop();
  }

  startAnimationLoop() {
    setInterval(() => {
      if (this.isDead) {
        this.playAnimation(this.IMAGE_SETS.dead);
      } else {
        this.playAnimation(this.IMAGE_SETS.swimming);
      }
    }, 250);
  }

  startMovementLoop() {
    setInterval(() => {
      if (this.isDead) {
        this.flyAwayStep();
      } else {
        this.updatePatrolMovement();
      }
    }, 1000 / 60);
  }

  updatePatrolMovement() {
    if (this.patrolMinY == null) return;

    this.y += this.dirY * this.speed;
    this.correctPositionIfOutOfBounds();
  }

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

  die() {
    this.isDead = true;
    this.verticalSpeed = -2; 
  }

  flyAwayStep() {
    this.y += this.verticalSpeed;
    if (this.y + this.height < 0) {
      this.removeFromWorld();
    }
  }

  removeFromWorld() {
    const index = this.level.enemies.indexOf(this);
    if (index > -1) {
      this.level.enemies.splice(index, 1);
    }
  }
}
