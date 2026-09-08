/**
 * Represents a collectible poison flask in the game.
 * Handles rotation animation, collection behavior and respawning.
 *
 * @extends MoveableObject
 */
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

  static sound = new Audio("assets/audio/poison.mp3");

  /**
   * Creates a new poison flask at the specified position.
   *
   * @param {number} x - The horizontal position of the poison flask.
   * @param {number} y - The vertical position of the poison flask.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES_ROTATE[0]);
    this.loadImages(this.IMAGES_ROTATE);
    this.x = x;
    this.y = y - 20;
    this.width = 60;
    this.height = 60;
    this.collected = false;
    this.animate();
  }

  /**
   * Starts the rotating animation of the poison flask.
   */
  animate() {
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATE);
    }, 150);
  }

  /**
   * Collects the poison flask, increases the poison counter
   * and creates a new flask after a delay.
   */
  collect() {
    if (this.collected) return;

    this.collected = true;
    clearInterval(this.animationInterval);

    if (this.world.poisonBar) {
      this.world.poisonBar.number += 1;
    }

    if (!soundMuted) {
      PoisonFlask.sound.currentTime = 0;
      PoisonFlask.sound.play();
    }

    setTimeout(() => {
      if (this.world && this.world.level && this.world.level.collectables) {
        const newFlask = new PoisonFlask(this.x, this.y);
        newFlask.world = this.world;
        this.world.level.collectables.push(newFlask);
      }
    }, 10000);
  }

  /**
   * Makes the poison flask collectable again
   * and restarts its animation.
   */
  respawn() {
    this.collected = false;
    this.animate();
  }
}
