/**
 * Represents a status bar in the game.
 * Displays an image and optionally a numerical value.
 *
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  height = 50;
  width = 50;
  x = 0;
  y = 0;
  numberX = 42;
  numberY = 40;
  showNumber = true;

  /**
   * Creates a new status bar.
   */
  constructor() {
    super();
  }

  /**
   * Draws the status bar and its numerical value on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    super.draw(ctx);

    if (this.showNumber) {
      this.drawNumber(ctx);
    }
  }

  /**
   * Draws the numerical value of the status bar on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawNumber(ctx) {
    const text = this.number.toString();
    const x = this.x + this.numberX;
    const y = this.y + this.numberY;

    ctx.font = "30px Luckiest Guy";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.strokeText(text, x, y);
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
  }
}
