class Collectable extends MoveableObject {
  collected = false;

  constructor(x, y, width = 40, height = 40) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
