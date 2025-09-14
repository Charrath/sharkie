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

function createEnemies(numberOfFishes, minX, maxX, minY, maxY) {
  const enemies = [];

  for (let i = 0; i < numberOfFishes; i++) {
    const fish = new PufferFish();
    fish.x = minX + i * ((maxX - minX) / (numberOfFishes - 1));
    fish.y = minY + Math.random() * (maxY - minY);
    enemies.push(fish);
  }

  enemies.push(new Endboss());
  return enemies;
}

const level1 = new Level(
  createEnemies(6, 550, 3500, 50, 405),
  createBackgroundObjects(-719, 719, 8, layerPaths)
);
