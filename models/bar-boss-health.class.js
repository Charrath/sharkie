/**
 * Represents the health bar of the endboss.
 * @extends StatusBar
 */
class BossHealthBar extends StatusBar {
  /**
   * Creates a new health bar for the given endboss.
   *
   * @param {Endboss} boss - The endboss whose health is displayed.
   */
  constructor(boss) {
    super();
    this.boss = boss;
    this.IMAGES = {
      100: "img/4. Marcadores/orange/100_  copia.png",
      80: "img/4. Marcadores/orange/80_  copia.png",
      60: "img/4. Marcadores/orange/60_  copia.png",
      40: "img/4. Marcadores/orange/40_  copia.png",
      20: "img/4. Marcadores/orange/20_ copia 2.png",
      0: "img/4. Marcadores/orange/0_  copia.png",
    };
    this.loadImages(Object.values(this.IMAGES));
    this.img = this.imageCache[this.IMAGES[100]];
    this.x = 450;
    this.y = -5;
    this.width = 250;
    this.height = 60;
    this.showNumber = false;
    this.maxHP = boss.maxEnergy;
  }

  /**
   * Updates the health bar based on the current health of the endboss.
   */
  update() {
    const hp = Math.max(0, this.boss.energy);
    const healthPercent = Math.round((hp / this.maxHP) * 100);
    const step = this.getHealthStep(healthPercent);
    const path = this.IMAGES[step];

    if (path && this.imageCache[path]) {
      this.img = this.imageCache[path];
    }

    this.number = hp;
  }

  /**
   * Determines the health bar image step for the current health percentage.
   *
   * @param {number} healthPercent - The current health percentage of the endboss.
   * @returns {number} The matching health bar step.
   */
  getHealthStep(healthPercent) {
    if (healthPercent >= 100) return 100;
    if (healthPercent >= 80) return 80;
    if (healthPercent >= 60) return 60;
    if (healthPercent >= 40) return 40;
    if (healthPercent >= 20) return 20;
    return 0;
  }

  /**
   * Checks whether the endboss health bar should be visible.
   *
   * @returns {boolean} True if the endboss has been introduced and is alive.
   */
  isVisible() {
    return !!this.boss && !!this.boss.introduced && !this.boss.isDead?.();
  }
}
