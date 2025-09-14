class PufferFish extends MoveableObject {
  IMAGES_SWIMMING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];
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
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.x = 200 + Math.random() * 400;
    this.y = Math.random() * (this.maxY - this.minY) + this.minY;
    this.loadImages(this.IMAGES_SWIMMING);
    this.speed = 0.8 + Math.random() * 0.6; 
    this.setPatrol(this.x, 200); 
    this.animate();
  }

  setPatrol(centerX, zoneWidth = 200) {
    const half = zoneWidth / 2;
    this.patrolMinX = centerX - half;
    this.patrolMaxX = centerX + half;
    this.otherDirection = Math.random() < 0.5;
    this.baseY = this.y;
    this.bobAmp = 8;
    this.bobT = Math.random() * Math.PI * 2;
  }

  animate() {
    setInterval(() => this.playAnimation(this.IMAGES_SWIMMING), 120);

    setInterval(() => {
      this.otherDirection ? this.moveLeft() : this.moveRight();

      if (this.x <= this.patrolMinX) {
        this.x = this.patrolMinX;
        this.otherDirection = false;
      }
      if (this.x >= this.patrolMaxX) {
        this.x = this.patrolMaxX;
        this.otherDirection = true;
      }

    }, 1000 / 60);
  }
}
