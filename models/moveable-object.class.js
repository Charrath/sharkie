class MoveableObject extends DrawableObject {
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
  maxX;
  minX;

  applyGravity() {
    setInterval(() => {
      this.x += this.speedX;
      this.speedX = Math.max(0, this.speedX - this.friction);

      if (this.isUnderWater()) {
        const horizontalFactor = this.speedX / this.initialSpeedX;
        const riseSpeed = this.buoyancy * (1 - horizontalFactor);
        this.y -= riseSpeed;
      }
    }, 1000 / 25);
  }
  
  isUnderWater() {
    return this.y > this.waterSurfaceY - this.height;
  }

  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.maxX;
  }

  moveRight() {
    this.x += this.speed;
  }

  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > this.minX;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  canMoveUp() {
    return this.world.keyboard.UP && this.y > this.minY;
  }

  moveUp() {
    this.y -= this.speed;
  }

  canMoveDown() {
    return this.world.keyboard.DOWN && this.y < this.maxY;
  }

  moveDown() {
    this.y += this.speed;
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
    const otherCorners = this.getOtherCorners(mO);
    const otherEdges = this.getEdges(otherCorners);
    return this.checkEdgeIntersections(myEdges, otherEdges);
  }

  getOtherCorners(mO) {
    if (mO.getCorners && typeof mO.getCorners === "function") {
      return mO.getCorners();
    } else {
      const off = mO.offset || { left: 0, top: 0, right: 0, bottom: 0 };
      return [
        { x: mO.x + off.left, y: mO.y + off.top },
        { x: mO.x + mO.width - off.right, y: mO.y + off.top },
        { x: mO.x + off.left, y: mO.y + mO.height - off.bottom },
        { x: mO.x + mO.width - off.right, y: mO.y + mO.height - off.bottom },
      ];
    }
  }

  checkEdgeIntersections(myEdges, otherEdges) {
    for (const [s1, e1] of myEdges) {
      for (const [s2, e2] of otherEdges) {
        if (this.doLinesIntersect(s1, e1, s2, e2)) return true;
      }
    }
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
