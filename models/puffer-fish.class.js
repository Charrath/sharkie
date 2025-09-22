class PufferFish extends MoveableObject {
  IMAGE_SETS = {
    swimming: [
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png"
    ]
  };

  height = 75;
  width = 75;
  offset = {
    top: 5,
    left: 1,
    right: 3,
    bottom: 19,
  };
  maxY = 405;
  minY = 50;

  constructor() {
    super().loadImage(this.IMAGE_SETS.swimming[0]);
    this.loadImages(this.IMAGE_SETS.swimming);
    this.speed = 0.7 + Math.random() * 0.6;
    this.animate();
  }

  setPatrol(centerX, zoneWidth) {
    const half = zoneWidth / 2;
    this.patrolMinX = centerX - half;
    this.patrolMaxX = centerX + half;
    this.otherDirection = Math.random() < 0.5;
  }

  animate() {
    setInterval(() => this.playAnimation(this.IMAGE_SETS.swimming), 120);

    setInterval(() => {
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

  moveRight() {
    this.x += this.speed;
    this.otherDirection = true;   
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = false;  
  }
}
