class World {
  character = new Character();
  level = level1
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.ctx.translate(-this.camera_x, 0);
  
    requestAnimationFrame(this.draw.bind(this));
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mO) {
    if(mO.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mO.width, 0);
      this.ctx.scale(-1, 1);
      mO.x = mO.x * -1;
    }
    this.ctx.drawImage(mO.img, mO.x, mO.y, mO.width, mO.height);
    if(mO.otherDirection) {
      mO.x = mO.x * -1;
      this.ctx.restore();
    }
  }

}
