/**
 * Represents a level in the game.
 * Stores the enemies, background objects and collectable objects.
 */
class Level {
  enemies;
  backgroundObjects;
  collectables;

  /**
   * Creates a new game level.
   *
   * @param {MoveableObject[]} enemies - The enemies contained in the level.
   * @param {BackgroundObject[]} backgroundObjects - The background objects of the level.
   * @param {Collectable[]} [collectables=[]] - The collectable objects in the level.
   */
  constructor(enemies, backgroundObjects, collectables = []) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.collectables = collectables;
  }
}
