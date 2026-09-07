/**
 * Represents the status bar for collected coins.
 * @extends StatusBar
 */
class CoinBar extends StatusBar {
  /**
   * Creates a new coin status bar and initializes the coin counter.
   */
  constructor() {
    super().loadImage("img/4. Marcadores/green/100_ copia 6.png");
    this.x = 75;
    this.y = 4;
    this.numberY = 36;
    this.numberX = 48;
    this.number = 0;
  }
}
