/**
 * Represents a drawable object in the game.
 * Provides basic functionality for loading and drawing images and animations.
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 400;
  height = 100;
  width = 100;

  /**
   * Loads a single image and sets it as the current image.
   *
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(
      this.img,
      Math.round(this.x),
      Math.round(this.y),
      this.width,
      this.height,
    );
  }

  /**
   * Draws the collision frame around supported game objects.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    const objects = [Character, PufferFish, JellyFish, Endboss];
    if (!objects.some((type) => this instanceof type)) return;

    const box = this.getFrameBox();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "blue";
    ctx.rect(box.x, box.y, box.width, box.height);
    ctx.stroke();
  }

  /**
   * Calculates the collision frame of the object based on its offsets.
   *
   * @returns {{x: number, y: number, width: number, height: number}}
   * The position and dimensions of the collision frame.
   */
  getFrameBox() {
    return {
      x: this.x + this.offset.left,
      y: this.y + this.offset.top,
      width: this.width - this.offset.left - this.offset.right,
      height: this.height - this.offset.top - this.offset.bottom,
    };
  }

  /**
   * Plays an animation by cycling through the provided images.
   *
   * @param {string[]} images - The image paths used for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Loads multiple images and stores them in the image cache.
   *
   * @param {string[]} arr - The image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Checks whether the object should be visible.
   *
   * @returns {boolean} Always returns true by default.
   */
  isVisible() {
    return true;
  }
}
