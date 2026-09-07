/**
 * Represents the status bar for collected poison flasks.
 * @extends StatusBar
 */
class PoisonBar extends StatusBar {
  /**
   * Creates a new poison status bar and initializes the poison counter.
   */
  constructor() {
    super().loadImage("img/4. Marcadores/green/100_ copia 5.png");
    this.number = 5;
  }
}
