class PoisonFlask extends MoveableObject {
  IMAGES_ROTATE = [
    "img/4. Marcadores/Posión/Animada/1.png",
    "img/4. Marcadores/Posión/Animada/2.png",
    "img/4. Marcadores/Posión/Animada/3.png",
    "img/4. Marcadores/Posión/Animada/4.png",
    "img/4. Marcadores/Posión/Animada/5.png",
    "img/4. Marcadores/Posión/Animada/6.png",
    "img/4. Marcadores/Posión/Animada/7.png",
    "img/4. Marcadores/Posión/Animada/8.png",
  ];

  static sound = new Audio('assets/audio/poison.mp3');

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

  PoisonFlask.sound.currentTime = 0;
  PoisonFlask.sound.play();

  // Respawn an gleicher Stelle nach 10 Sekunden
  setTimeout(() => {
    if (this.world && this.world.level && this.world.level.collectables) {
      const newFlask = new PoisonFlask(this.x, this.y);
      newFlask.world = this.world;
      this.world.level.collectables.push(newFlask);
    }
  }, 10000);
}

  respawn() {
    this.collected = false;
    this.animate();
  }
}
