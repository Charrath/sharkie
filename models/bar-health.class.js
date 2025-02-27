class HealthBar extends StatusBar {
    constructor(character) {
        super().loadImage('img/4. Marcadores/green/100_  copia 3.png');
        this.character = character;
        this.number = this.character.energy;
        this.x = 180;
        this.numberX = 47;
      }

      update() {
        this.number = this.character.energy;
    }
}