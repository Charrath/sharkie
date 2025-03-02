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
    this.speed = 0.05 + Math.random() * 0.15;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_SWIMMING);
      this.moveLeft();
    }, 200);
  }
}
