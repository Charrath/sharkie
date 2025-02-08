

const layerPaths = [
    { folder: '5. Water',   fileL1: 'L1.png', fileL2: 'L2.png' },
    { folder: '4.Fondo 2',   fileL1: 'L1.png', fileL2: 'L2.png' },
    { folder: '3.Fondo 1',   fileL1: 'L1.png', fileL2: 'L2.png' },
    { folder: '2. Floor',    fileL1: 'L1.png', fileL2: 'L2.png' },
    { folder: '1. Light',    fileL1: '1.png',  fileL2: '2.png' }
  ];
  

  function createBackgroundObjects(startX, step, groupCount, layerPaths) {
    const backgroundObjects = [];
    for (let i = 0; i < groupCount; i++) {
      const xPos = startX + i * step;
      const useL1 = i % 2 !== 0; 
      layerPaths.forEach(layer => {
        const file = useL1 ? layer.fileL1 : layer.fileL2;
        const imagePath = `img/3. Background/Layers/${layer.folder}/${file}`;
        backgroundObjects.push(new BackgroundObject(imagePath, xPos, 0));
      });
    }
    return backgroundObjects;
  }
  

  const enemies = [
    ...Array.from({ length: 6 }, () => new PufferFish()),
    new Endboss() 
  ];
  
  const level1 = new Level(
    enemies,
    createBackgroundObjects(-719, 719, 4, layerPaths)
  );