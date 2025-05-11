class Endboss extends MoveableObject {
  IMAGES_SWIMMING = [
    "img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];

  IMAGES_INTRODUCE = [
    "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];

  height = 200;
  width = 200;
  y = 50;
  offset = {
    top: 63,
    left: 10,
    right: 14,
    bottom: 30,
  };

  introduced = false;
  introPlayed = false;

  constructor(world) {
    super();
    this.world = world;
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_INTRODUCE);
    this.x = 800;
    this.animate();
  }

  isVisible() {
    return this.introduced;
  }

  animate() {
    this.startInputLoop();
    this.startAnimationLoop();
  }

  startInputLoop() {
    setInterval(() => {
      if (!this.world?.character) return;

      if (!this.introduced && this.world.character.x >= 400) {
        this.introduced = true;
        this.currentImage = 0;
        this.img = this.imageCache[this.IMAGES_INTRODUCE[0]];
      }
    }, 16);
  }

  startAnimationLoop() {
    setInterval(() => {
      if (!this.introduced) return;

      if (!this.introPlayed) {
        this.playAnimationNonLoop(this.IMAGES_INTRODUCE);
        if (this.currentImage >= this.IMAGES_INTRODUCE.length) {
          this.introPlayed   = true;
          this.currentImage  = 0;  
        }
      }

      else {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, 150);
  }

  playAnimationNonLoop(images) {
    if (this.currentImage < images.length) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }

}
