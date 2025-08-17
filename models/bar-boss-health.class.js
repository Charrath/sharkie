class BossHealthBar extends StatusBar {
  constructor(boss) {
    super().loadImage('img/4. Marcadores/orange/100_  copia.png');
    this.boss = boss;
    this.number = boss.energy;

    // Position
    this.x = 450;
    this.y = -5;

    // Größe anpassen
    this.width = 250;   // Breite (z. B. 250px)
    this.height = 60;   // Höhe (z. B. 60px)

    // falls StatusBar Zahlen zeichnet, ausblenden (siehe unten)
    this.showNumber = false;
  }

  update() { this.number = this.boss.energy; }

  isVisible() {
    return !!this.boss && !!this.boss.introduced && !this.boss.isDead?.();
  }
}