class MoveableObject {
  x = 120;
  y = 400;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.2;
  otherDirection = false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof PufferFish || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    });
  }

  moveRight() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.x += this.speed;
      }
    });
  }

  playAnimation(images) {
    let i = this.currentImage % this.IMAGES_SWIMMING.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
