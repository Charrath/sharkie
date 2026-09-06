const layerPaths = [
  { folder: "5. Water", fileL1: "L1.png", fileL2: "L2.png" },
  { folder: "4.Fondo 2", fileL1: "L1.png", fileL2: "L2.png" },
  { folder: "3.Fondo 1", fileL1: "L1.png", fileL2: "L2.png" },
  { folder: "2. Floor", fileL1: "L1.png", fileL2: "L2.png" },
  { folder: "1. Light", fileL1: "1.png", fileL2: "2.png" },
];

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

function buildMixedOrder(pufferFishCount, jellyFishCount) {
  if (jellyFishCount === 0) return Array(pufferFishCount).fill("PufferFish");
  if (pufferFishCount === 0) return Array(jellyFishCount).fill("JellyFish");
  const order = [],
    pufferPerJelly = Math.floor(pufferFishCount / jellyFishCount),
    extraPuffer = pufferFishCount % jellyFishCount;
  for (let jellyIndex = 0; jellyIndex < jellyFishCount; jellyIndex++) {
    const groupSize = pufferPerJelly + (jellyIndex < extraPuffer ? 1 : 0);
    for (let pufferIndex = 0; pufferIndex < groupSize; pufferIndex++)
      order.push("PufferFish");
    order.push("JellyFish");
  }
  return order;
}

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

function createEnemy(EnemyType, type, x, minY, maxY) {
  const enemy = new EnemyType();
  enemy.x = x;
  const centerY = (minY + maxY) / 2;
  enemy.y =
    type === "JellyFish" ? centerY : minY + Math.random() * (maxY - minY);
  return enemy;
}

function setEnemyPatrol(enemy) {
  if (enemy instanceof PufferFish) {
    enemy.setPatrol(enemy.x, 500);
  }
  if (enemy instanceof JellyFish) {
    enemy.setVerticalPatrol(enemy.y, 500);
  }
}

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

function createPoisonFlask(enemy) {
  const x = enemy.x + enemy.width / 2;
  return new PoisonFlask(x, 430);
}

function createLevel1() {
  const enemies = createEnemies(
    { PufferFish: 6, JellyFish: 3 },
    550,
    3500,
    50,
    405,
  );
  const background = createBackgroundObjects(-719, 719, 8, layerPaths);
  const collectables = createCollectables(enemies);
  return new Level(enemies, background, collectables);
}

let level1;
