/**
 * Represents a collectible coin in the game world.
 * The coin rotates continuously and can be collected by the character.
 *
 * @extends MoveableObject
 */
class Coin extends MoveableObject {
  IMAGES_ROTATE = [
    "img/4. Marcadores/1. Coins/1.png",
    "img/4. Marcadores/1. Coins/2.png",
    "img/4. Marcadores/1. Coins/3.png",
    "img/4. Marcadores/1. Coins/4.png",
  ];

  static sound = new Audio("assets/audio/coin.mp3");

  /**
   * Creates a new coin at the specified position.
   *
   * @param {number} x - The horizontal position of the coin.
   * @param {number} y - The vertical position of the coin.
   */
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

  /**
   * Starts the rotating animation of the coin.
   */
  animate() {
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATE);
    }, 175);
  }

  /**
   * Collects the coin, stops its animation and increases the coin counter.
   * The collection sound is played if the game sound is not muted.
   */
  collect() {
    if (this.collected) return;

    this.collected = true;
    clearInterval(this.animationInterval);

    if (this.world.coinBar) {
      this.world.coinBar.number += 1;
    }

    if (!soundMuted) {
      Coin.sound.currentTime = 0;
      Coin.sound.play();
    }
  }
}
