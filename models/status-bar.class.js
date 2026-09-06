class StatusBar extends DrawableObject {
  height = 50;
  width = 50;
  x = 0;
  y = 0;
  numberX = 42;
  numberY = 40;
  showNumber = true;

  constructor() {
    super();
  }

  draw(ctx) {
    super.draw(ctx);
    if (this.showNumber) {
      ctx.font = "30px Luckiest Guy ";
      ctx.lineWidth = 4;
      ctx.strokeStyle = "black";
      ctx.strokeText(
        this.number.toString(),
        this.x + this.numberX,
        this.y + this.numberY,
      );
      ctx.fillStyle = "white";
      ctx.fillText(
        this.number.toString(),
        this.x + this.numberX,
        this.y + this.numberY,
      );
    }
  }
}
