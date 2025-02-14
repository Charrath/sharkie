class MoveableObject {
  x = 120;
  y = 400;
  height;
  width;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.2;
  otherDirection = false;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  energy = 100;
  lastHit = 0;
  deadAnimationIndex = 0;
  deadAnimationComplete = false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof PufferFish ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
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
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  doLinesIntersect(l1Start, l1End, l2Start, l2End) {
    const cross = (o, a, b) =>
      (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    return (
      cross(l1Start, l2Start, l2End) * cross(l1End, l2Start, l2End) < 0 &&
      cross(l2Start, l1Start, l1End) * cross(l2End, l1Start, l1End) < 0
    );
  }

  getCorners() {
    const off = this.offset || { left: 0, top: 0, right: 0, bottom: 0 };
    return [
      { x: this.x + off.left, y: this.y + off.top },
      { x: this.x + this.width - off.right, y: this.y + off.top },
      { x: this.x + off.left, y: this.y + this.height - off.bottom },
      {
        x: this.x + this.width - off.right,
        y: this.y + this.height - off.bottom,
      },
    ];
  }

  getEdges(corners) {
    return [
      [corners[0], corners[1]],
      [corners[1], corners[3]],
      [corners[3], corners[2]],
      [corners[2], corners[0]],
    ];
  }

  isPointInsideRect(point, obj) {
    const off = obj.offset || { left: 0, top: 0, right: 0, bottom: 0 };
    return (
      point.x >= obj.x + off.left &&
      point.x <= obj.x + obj.width - off.right &&
      point.y >= obj.y + off.top &&
      point.y <= obj.y + obj.height - off.bottom
    );
  }

  isColliding(mO) {
    const myCorners = this.getCorners();
    if (myCorners.some((p) => this.isPointInsideRect(p, mO))) return true;
    const myEdges = this.getEdges(myCorners);
    const otherCorners =
      mO.getCorners && typeof mO.getCorners === "function"
        ? mO.getCorners()
        : (() => {
            const off = mO.offset || { left: 0, top: 0, right: 0, bottom: 0 };
            return [
              { x: mO.x + off.left, y: mO.y + off.top },
              { x: mO.x + mO.width - off.right, y: mO.y + off.top },
              { x: mO.x + off.left, y: mO.y + mO.height - off.bottom },
              {
                x: mO.x + mO.width - off.right,
                y: mO.y + mO.height - off.bottom,
              },
            ];
          })();
    const otherEdges = this.getEdges(otherCorners);
    for (const [s1, e1] of myEdges)
      for (const [s2, e2] of otherEdges)
        if (this.doLinesIntersect(s1, e1, s2, e2)) return true;
    return false;
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }
}
