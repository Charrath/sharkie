class JellyFish extends MoveableObject {
  IMAGE_SETS = {
    swimming: [
      "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
      "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
      "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
      "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
    ]
  };

  height = 75;
  width = 75;
  offset = {
    top: 5,
    left: 1,
    right: 3,
    bottom: 10,
  };
  maxY = 405;
  minY = 50;

  constructor() {
    super().loadImage(this.IMAGE_SETS.swimming[0]);
    this.x = 200 + Math.random() * 400;
    this.y = Math.random() * (this.maxY - this.minY) + this.minY;
    this.loadImages(this.IMAGE_SETS.swimming);
    this.speed = 0.7 + Math.random() * 0.6;
    this.animate();
  }

  setVerticalPatrol(centerY, zoneHeight = 160) {
    const half = Math.min(zoneHeight / 2, centerY - this.minY, this.maxY - centerY);
    this.patrolMinY = centerY - half;
    this.patrolMaxY = centerY + half;
    this.dirY = Math.random() < 0.5 ? -1 : 1; 
  }

  animate() {
    setInterval(() => this.playAnimation(this.IMAGE_SETS.swimming), 250);
    setInterval(() => {
      if (this.patrolMinY == null) return;           
      this.y += this.dirY * this.speed;              
      if (this.y <= this.patrolMinY) { this.y = this.patrolMinY; this.dirY = 1; }
      if (this.y >= this.patrolMaxY) { this.y = this.patrolMaxY; this.dirY = -1; }
    }, 1000 / 60);
  }
}