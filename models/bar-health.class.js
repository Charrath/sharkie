/**
 * Represents the health bar of the character.
 * @extends StatusBar
 */
class HealthBar extends StatusBar {
  /**
   * Creates a new health bar for the given character.
   *
   * @param {Character} character - The character whose health is displayed.
   */
  constructor(character) {
    super().loadImage("img/4. Marcadores/green/100_  copia 3.png");
    this.character = character;
    this.number = this.character.energy;
    this.x = 155;
    this.numberX = 46;
  }

  /**
   * Updates the health bar with the character's current energy.
   */
  update() {
    this.number = this.character.energy;
  }
}
