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
    this.loadAllImages();
    this.speed = 0.7 + Math.random() * 0.6;
    this.animate();
  }

  loadAllImages() {
    Object.values(this.IMAGE_SETS).forEach((images) => this.loadImages(images));
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
