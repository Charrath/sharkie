class ThrowableObject extends MoveableObject {
  constructor(x, y, world) {
    super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.x = x;
    this.y = y;
    this.world = world;
    this.waterSurfaceY = 0;
    this.friction = 0.5;
    this.initialSpeedX   = 30;
    this.buoyancy = 2.5;
    this.height = 20;
    this.width = 20;
    this.trow();
  }

  trow() {
    this.speedX = 20;
    this.applyGravity();
  }
}
