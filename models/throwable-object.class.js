class ThrowableObject extends MoveableObject {
  constructor(x, y) {
    super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.x = x;
    this.y = y;
    this.waterSurfaceY = 0;
    this.friction = 0.2;
    this.initialSpeedX   = 30;
    this.buoyancy = 3.0;
    this.height = 20;
    this.width = 20;
    this.trow();
  }

  trow() {
    this.speedX = 12;
    this.applyGravity();
  }
}
