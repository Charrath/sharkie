const layerPaths = [
  { folder: "5. Water", fileL1: "L1.png", fileL2: "L2.png" },
  { folder: "4.Fondo 2", fileL1: "L1.png", fileL2: "L2.png" },
  { folder: "3.Fondo 1", fileL1: "L1.png", fileL2: "L2.png" },
  { folder: "2. Floor", fileL1: "L1.png", fileL2: "L2.png" },
  { folder: "1. Light", fileL1: "1.png", fileL2: "2.png" },
];

function createBackgroundObjects(startX, step, groupCount, layerPaths) {
  const backgroundObjects = [];
  for (let i = 0; i < groupCount; i++) {
    const xPos = startX + i * step;
    const useL1 = i % 2 !== 0;
    layerPaths.forEach((layer) => {
      const file = useL1 ? layer.fileL1 : layer.fileL2;
      const imagePath = `img/3. Background/Layers/${layer.folder}/${file}`;
      backgroundObjects.push(new BackgroundObject(imagePath, xPos, 0));
    });
  }
  return backgroundObjects;
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
  const EnemyTypes = { PufferFish, JellyFish }, enemies = [];
  const puffer = config.PufferFish || 0, jelly = config.JellyFish || 0;
  const order = buildMixedOrder(puffer, jelly);
  const total = order.length, stepX = (maxX - minX) / Math.max(1, total - 1);
  order.forEach((type, i) => {
    const centerY = (minY + maxY) / 2;
    const enemy = new EnemyTypes[type]();
    enemy.x = minX + i * stepX;
    enemy.y = type === "JellyFish" ? centerY : minY + Math.random() * (maxY - minY);
    enemies.push(enemy);
  });
  const patrolZoneWidth = 500;
  const patrolZoneHeight = 500;
  enemies.forEach((enemy) => {
    if (enemy instanceof PufferFish && typeof enemy.setPatrol === "function") {
      enemy.setPatrol(enemy.x, patrolZoneWidth);
    }
    if (enemy instanceof JellyFish && enemy.setVerticalPatrol)
      enemy.setVerticalPatrol(enemy.y, patrolZoneHeight);
  });
  enemies.push(new Endboss());
  return enemies;
}

function createCollectables(enemies) {
  const collectables = [];
  enemies.forEach(enemy => {
    if (enemy instanceof PufferFish) {
      const radius = 100;
      const centerX = enemy.x + enemy.width / 2;
      const centerY = enemy.y + 50;
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI * (i / 5);
        const x = centerX + radius * Math.cos(angle - Math.PI);
        const y = centerY + radius * Math.sin(angle - Math.PI);
        collectables.push(new Coin(x, y));
      }
    }
    if (enemy instanceof JellyFish) {
      const groundY = 430;
      const x = enemy.x + enemy.width / 2;
      collectables.push(new PoisonFlask(x, groundY));
    }
  });
  return collectables;
}

function createLevel1() {
  const enemies = createEnemies({ PufferFish: 6, JellyFish: 3 }, 550, 3500, 50, 405);
  const background = createBackgroundObjects(-719, 719, 8, layerPaths);
  const collectables = createCollectables(enemies);
  return new Level(enemies, background, collectables);
}

const level1 = createLevel1();
