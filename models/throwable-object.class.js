/**
 * Represents a throwable object in the game.
 * Handles the initial movement, friction and buoyancy of a bubble.
 *
 * @extends MoveableObject
 */
class ThrowableObject extends MoveableObject {
  /**
   * Creates a new throwable object at the specified position.
   *
   * @param {number} x - The horizontal start position of the object.
   * @param {number} y - The vertical start position of the object.
   * @param {World} world - The game world the throwable object belongs to.
   */
  constructor(x, y, world) {
    super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.x = x;
    this.y = y;
    this.world = world;
    this.waterSurfaceY = 0;
    this.friction = 0.5;
    this.initialSpeedX = 30;
    this.buoyancy = 2.5;
    this.height = 20;
    this.width = 20;
    this.trow();
  }

  /**
   * Starts the movement of the throwable object
   * and applies gravity, friction and buoyancy.
   */
  trow() {
    this.speedX = 20;
    this.applyGravity();
  }
}
