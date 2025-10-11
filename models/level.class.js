class Level {
  enemies;
  backgroundObjects;
  collectables;

  constructor(enemies, backgroundObjects, collectables = []) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.collectables = collectables;
  }
}
