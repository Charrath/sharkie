class StatusBar extends DrawableObject {
  height = 50;
  width = 50;
  x = 0;
  y = 0;
  numberX = 42;
  numberY = 40;

  constructor() {
    super();
  }

  draw(ctx) {
    super.draw(ctx);
    ctx.font = "bold 30px Luckiest Guy "; 
    ctx.fillStyle = "white"; 
    ctx.fillText(this.number.toString(), this.x + this.numberX, this.y + this.numberY );
    }
}
