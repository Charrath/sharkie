class StatusBar extends DrawableObject {
  IMAGES = [
    "img/4. Marcadores/Posión/Animada/1.png",
    "img/4. Marcadores/Posión/Animada/2.png",
    "img/4. Marcadores/Posión/Animada/3.png",
    "img/4. Marcadores/Posión/Animada/4.png",
    "img/4. Marcadores/Posión/Animada/5.png",
    "img/4. Marcadores/Posión/Animada/6.png",
    "img/4. Marcadores/Posión/Animada/7.png",
    "img/4. Marcadores/Posión/Animada/8.png",
  ];

  height = 50;
  width = 50;
  number = 42;  

  constructor() {
    super().loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 0;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 200);
  }

  draw(ctx) {
    super.draw(ctx);
    ctx.font = "bold 25px Arial"; 
    ctx.fillStyle = "white"; 
    ctx.fillText(this.number.toString(), 65, 45 );
  }

}
