class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 400;
  height = 100;
  width = 100;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

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

  getFrameBox() {
    return {
      x: this.x + this.offset.left,
      y: this.y + this.offset.top,
      width: this.width - this.offset.left - this.offset.right,
      height: this.height - this.offset.top - this.offset.bottom,
    };
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
