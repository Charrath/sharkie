class Endboss extends MoveableObject {
  IMAGES_SWIMMING = [
    'img/2.Enemy/3 Final Enemy/2.floating/1.png',
    'img/2.Enemy/3 Final Enemy/2.floating/2.png',
    'img/2.Enemy/3 Final Enemy/2.floating/3.png',
    'img/2.Enemy/3 Final Enemy/2.floating/4.png',
    'img/2.Enemy/3 Final Enemy/2.floating/5.png',
    'img/2.Enemy/3 Final Enemy/2.floating/6.png',
    'img/2.Enemy/3 Final Enemy/2.floating/7.png',
    'img/2.Enemy/3 Final Enemy/2.floating/8.png',
    'img/2.Enemy/3 Final Enemy/2.floating/9.png',
    'img/2.Enemy/3 Final Enemy/2.floating/10.png',
    'img/2.Enemy/3 Final Enemy/2.floating/11.png',
    'img/2.Enemy/3 Final Enemy/2.floating/12.png',
    'img/2.Enemy/3 Final Enemy/2.floating/13.png',
  ];

  IMAGES_INTRODUCE = [
    'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
  ];

  height = 200;
  width  = 200;
  y      = 50;
  offset = {
    top: 63,
    left: 10,
    right: 14,
    bottom: 30,
  };

  introduced = false;

  constructor(world) {
    super();
    this.world = world;
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_INTRODUCE);

    this.x = 300;
    this.animate();
  }

  isVisible() {
    return this.introduced;
  }

  animate() {
    setInterval(() => {
      if (!this.world?.character) return;

      if (!this.introduced && this.world.character.x >= 400) {
        this.introduced   = true;
        this.currentImage = 0;  
      }

      if (this.introduced) {
        if (this.world.character.x >= 400) {
          this.playAnimation(this.IMAGES_INTRODUCE);
        } else {
          this.playAnimation(this.IMAGES_SWIMMING);
        }
      }
    }, 150);
  }
}
