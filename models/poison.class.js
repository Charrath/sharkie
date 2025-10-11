class PoisonFlask extends MoveableObject {
  IMAGES_ROTATE = [
    'img/4. Marcadores/Posión/Animada/1.png',
    'img/4. Marcadores/Posión/Animada/2.png',
    'img/4. Marcadores/Posión/Animada/3.png',
    'img/4. Marcadores/Posión/Animada/4.png',
    'img/4. Marcadores/Posión/Animada/5.png',
    'img/4. Marcadores/Posión/Animada/6.png',
    'img/4. Marcadores/Posión/Animada/7.png',
    'img/4. Marcadores/Posión/Animada/8.png'
  ];

  constructor(x, y) {
    super().loadImage(this.IMAGES_ROTATE[0]);
    this.loadImages(this.IMAGES_ROTATE);
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.collected = false;
    this.animate();
  }

  animate() {
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATE);
    }, 150);
  }

  collect() {
    if (this.collected) return;
    this.collected = true;
    clearInterval(this.animationInterval);
    if (this.world.poisonBar) {
      this.world.poisonBar.number += 1;
    }
    new Audio('audio/poison.mp3').play();
  }
}
