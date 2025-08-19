class BossHealthBar extends StatusBar {
  constructor(boss) {
    super();
    this.boss = boss;
    this.IMAGES = {
      100: 'img/4. Marcadores/orange/100_  copia.png',
       80: 'img/4. Marcadores/orange/80_  copia.png',
       60: 'img/4. Marcadores/orange/60_  copia.png',
       40: 'img/4. Marcadores/orange/40_  copia.png',
       20: 'img/4. Marcadores/orange/20_  copia.png',
        0: 'img/4. Marcadores/orange/0_   copia.png',
    };
    this.loadImages(Object.values(this.IMAGES));
    this.img = this.imageCache[this.IMAGES[100]];
    this.x = 450;
    this.y = -5;
    this.width = 250;
    this.height = 60;
    this.showNumber = false;
    this._maxHP = boss.maxEnergy ?? boss.energyMax ?? boss.energyStart ?? boss.energy;
  }

  update() {
    const hp = Math.max(0, this.boss.energy);
    const pct = Math.round((hp / this._maxHP) * 100);
    const step = pct >= 100 ? 100 : pct >= 80 ? 80 : pct >= 60 ? 60 : pct >= 40 ? 40 : pct >= 20 ? 20 : 0;
    const path = this.IMAGES[step];
    if (path && this.imageCache[path]) {
      this.img = this.imageCache[path];
    }
    this.number = hp;
  }

  isVisible() {
    return !!this.boss && !!this.boss.introduced && !this.boss.isDead?.();
  }
}