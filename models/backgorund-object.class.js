/**
 * Represents a background object in the game world.
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {
  width = 721;
  height = 480;

  /**
   * Creates a new background object.
   *
   * @param {string} imagePath - The path to the background image.
   * @param {number} x - The horizontal position of the background object.
   * @param {number} y - The vertical position of the background object.
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
  }
}
