const layerPaths = [
  { folder: "5. Water", fileL1: "L1.png", fileL2: "L2.png" },
  { folder: "4.Fondo 2", fileL1: "L1.png", fileL2: "L2.png" },
  { folder: "3.Fondo 1", fileL1: "L1.png", fileL2: "L2.png" },
  { folder: "2. Floor", fileL1: "L1.png", fileL2: "L2.png" },
  { folder: "1. Light", fileL1: "1.png", fileL2: "2.png" },
];

/**
 * Creates background objects for the level.
 *
 * @param {number} startX - The starting x-position of the background.
 * @param {number} step - The horizontal distance between background groups.
 * @param {number} groupCount - The number of background groups to create.
 * @param {Object[]} layerPaths - The background layer configuration.
 * @returns {BackgroundObject[]} The created background objects.
 */
function createBackgroundObjects(startX, step, groupCount, layerPaths) {
  const objects = [];

  for (let i = 0; i < groupCount; i++) {
    const x = startX + i * step;

    layerPaths.forEach((layer) => {
      const file = i % 2 ? layer.fileL1 : layer.fileL2;
      const path = `img/3. Background/Layers/${layer.folder}/${file}`;
      objects.push(new BackgroundObject(path, x, 0));
    });
  }

  return objects;
}

/**
 * Creates a mixed order of puffer fish and jelly fish.
 *
 * @param {number} pufferFishCount - The number of puffer fish.
 * @param {number} jellyFishCount - The number of jelly fish.
 * @returns {string[]} The ordered list of enemy type names.
 */
function buildMixedOrder(pufferFishCount, jellyFishCount) {
  if (jellyFishCount === 0) {
    return Array(pufferFishCount).fill("PufferFish");
  }

  if (pufferFishCount === 0) {
    return Array(jellyFishCount).fill("JellyFish");
  }

  const order = [];
  const pufferPerJelly = Math.floor(pufferFishCount / jellyFishCount);
  const extraPuffer = pufferFishCount % jellyFishCount;

  for (let jellyIndex = 0; jellyIndex < jellyFishCount; jellyIndex++) {
    const groupSize = pufferPerJelly + (jellyIndex < extraPuffer ? 1 : 0);

    for (let pufferIndex = 0; pufferIndex < groupSize; pufferIndex++) {
      order.push("PufferFish");
    }

    order.push("JellyFish");
  }

  return order;
}

/**
 * Creates all enemies for the level.
 *
 * @param {Object} config - Configuration containing the number of enemy types.
 * @param {number} minX - The minimum horizontal spawn position.
 * @param {number} maxX - The maximum horizontal spawn position.
 * @param {number} minY - The minimum vertical spawn position.
 * @param {number} maxY - The maximum vertical spawn position.
 * @returns {MoveableObject[]} The created enemies including the endboss.
 */
function createEnemies(config, minX, maxX, minY, maxY) {
  const types = { PufferFish, JellyFish };
  const enemies = [];

  const order = buildMixedOrder(config.PufferFish || 0, config.JellyFish || 0);

  const stepX = (maxX - minX) / Math.max(1, order.length - 1);

  order.forEach((type, i) => {
    const enemy = createEnemy(types[type], type, minX + i * stepX, minY, maxY);

    setEnemyPatrol(enemy);
    enemies.push(enemy);
  });

  enemies.push(new Endboss());

  return enemies;
}

/**
 * Creates a single enemy at a given position.
 *
 * @param {Function} EnemyType - The class used to create the enemy.
 * @param {string} type - The name of the enemy type.
 * @param {number} x - The horizontal spawn position.
 * @param {number} minY - The minimum vertical spawn position.
 * @param {number} maxY - The maximum vertical spawn position.
 * @returns {MoveableObject} The created enemy.
 */
function createEnemy(EnemyType, type, x, minY, maxY) {
  const enemy = new EnemyType();

  enemy.x = x;

  const centerY = (minY + maxY) / 2;

  enemy.y =
    type === "JellyFish" ? centerY : minY + Math.random() * (maxY - minY);

  return enemy;
}

/**
 * Sets the patrol area for an enemy.
 *
 * @param {MoveableObject} enemy - The enemy whose patrol area is configured.
 */
function setEnemyPatrol(enemy) {
  if (enemy instanceof PufferFish) {
    enemy.setPatrol(enemy.x, 500);
  }

  if (enemy instanceof JellyFish) {
    enemy.setVerticalPatrol(enemy.y, 500);
  }
}

/**
 * Creates collectable objects based on the enemies in the level.
 *
 * @param {MoveableObject[]} enemies - The enemies used to place collectables.
 * @returns {Collectable[]} The created collectable objects.
 */
function createCollectables(enemies) {
  const collectables = [];

  enemies.forEach((enemy) => {
    if (enemy instanceof PufferFish) {
      collectables.push(...createCoins(enemy));
    }

    if (enemy instanceof JellyFish) {
      collectables.push(createPoisonFlask(enemy));
    }
  });

  return collectables;
}

/**
 * Creates six coins around a puffer fish.
 *
 * @param {PufferFish} enemy - The puffer fish used as the center position.
 * @returns {Coin[]} The created coins.
 */
function createCoins(enemy) {
  const coins = [];
  const centerX = enemy.x + enemy.width / 2;
  const centerY = enemy.y + 50;

  for (let i = 0; i < 6; i++) {
    const angle = Math.PI * (i / 5);
    const x = centerX + 100 * Math.cos(angle - Math.PI);
    const y = centerY + 100 * Math.sin(angle - Math.PI);

    coins.push(new Coin(x, y));
  }

  return coins;
}

/**
 * Creates a poison flask near a jelly fish.
 *
 * @param {JellyFish} enemy - The jelly fish used to determine the x-position.
 * @returns {PoisonFlask} The created poison flask.
 */
function createPoisonFlask(enemy) {
  const x = enemy.x + enemy.width / 2;

  return new PoisonFlask(x, 430);
}

/**
 * Creates and returns the first game level.
 *
 * @returns {Level} The configured first level.
 */
function createLevel1() {
  const enemies = createEnemies(
    { PufferFish: 6, JellyFish: 3 },
    550,
    3500,
    50,
    405,
  );

  const background = createBackgroundObjects(-717, 717, 8, layerPaths);

  const collectables = createCollectables(enemies);

  return new Level(enemies, background, collectables);
}

let level1;
