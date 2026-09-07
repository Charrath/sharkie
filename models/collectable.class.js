/**
 * Represents a collectible object in the game world.
 *
 * @extends MoveableObject
 */
class Collectable extends MoveableObject {
  collected = false;

  /**
   * Creates a new collectable object at the specified position.
   *
   * @param {number} x - The horizontal position of the collectable.
   * @param {number} y - The vertical position of the collectable.
   * @param {number} [width=40] - The width of the collectable.
   * @param {number} [height=40] - The height of the collectable.
   */
  constructor(x, y, width = 40, height = 40) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
