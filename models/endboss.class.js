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

  IMAGES_ATTACK = [
    "img/2.Enemy/3 Final Enemy/Attack/1.png",
    "img/2.Enemy/3 Final Enemy/Attack/2.png",
    "img/2.Enemy/3 Final Enemy/Attack/3.png",
    "img/2.Enemy/3 Final Enemy/Attack/4.png",
    "img/2.Enemy/3 Final Enemy/Attack/5.png",
    "img/2.Enemy/3 Final Enemy/Attack/6.png",
  ];

  IMAGES_HURT = [
    "img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "img/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
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
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
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
    const id = setInterval(() => {
      if (!this.world?.character) return;
      if (!this.introduced && this.world.character.x >= 350) {
        this.startIntro();
        clearInterval(id);
      }
    }, 16);
  }

  startIntro() {
    this.introduced = true;
    this.currentImage = 0;
    this.img = this.imageCache[this.IMAGES_INTRODUCE[0]];
  }

  startAnimationLoop() {
    setInterval(() => {
      if (!this.introduced) return;
      if (!this.introPlayed) {
        this.playIntro();
      } else if (this.isDead()) {
        this.handleDeadAnimation();
      } else if (this.isHurt()) {
        this.handleHurtAnimation();
      } else if (
        this.introPlayed &&
        Math.abs(this.world.character.x - this.x) <= 350
      ) {
        this.attackCharacter(3);
        this.playAnimation(this.IMAGES_ATTACK);
      } else {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, 150);
  }

  attackCharacter(speed = 10) {
    const char = this.world.character;
    this.otherDirection = char.x > this.x;
    if (char.x > this.x) {
      this.x += speed;
    } else if (char.x < this.x) {
      this.x -= speed;
    }
    if (char.y - 40 > this.y) {
      this.y += speed;
    } else if (char.y - 40 < this.y) {
      this.y -= speed;
    }
  }

  playIntro() {
    this.playAnimationNonLoop(this.IMAGES_INTRODUCE);
    if (this.currentImage >= this.IMAGES_INTRODUCE.length) {
      this.introPlayed = true;
      this.currentImage = 0;
    }
  }

  playAnimationNonLoop(images) {
    if (this.currentImage < images.length) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }

  handleHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
  }

 handleDeadAnimation() {
    if (!this.deadAnimationComplete) {
      this.playDeadAnimation();
    }
  }

  playDeadAnimation() {
    if (this.deadAnimationIndex < this.IMAGES_DEAD.length) {
      const currentFramePath = this.IMAGES_DEAD[this.deadAnimationIndex];
      this.img = this.imageCache[currentFramePath];
      this.deadAnimationIndex++;
    } else {
      this.deadAnimationComplete = true;
    }
  }
}
