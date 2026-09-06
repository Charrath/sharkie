class Coin extends MoveableObject {
  IMAGES_ROTATE = [
    "img/4. Marcadores/1. Coins/1.png",
    "img/4. Marcadores/1. Coins/2.png",
    "img/4. Marcadores/1. Coins/3.png",
    "img/4. Marcadores/1. Coins/4.png",
  ];

  static sound = new Audio("assets/audio/coin.mp3");

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
    }, 175);
  }

  collect() {
    if (this.collected) return;
    this.collected = true;
    clearInterval(this.animationInterval);
    if (this.world.coinBar) {
      this.world.coinBar.number += 1;
    }
    if (!soundMuted) {
      PoisonFlask.sound.currentTime = 0;
      PoisonFlask.sound.play();
    }
  }
}
