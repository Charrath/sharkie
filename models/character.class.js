class Character extends MoveableObject {
  height = 150;
  width = 200;
  y = 50;

  IMAGES_IDLE = [
    "img/1.Sharkie/1.IDLE/1.png",
    "img/1.Sharkie/1.IDLE/2.png",
    "img/1.Sharkie/1.IDLE/3.png",
    "img/1.Sharkie/1.IDLE/4.png",
    "img/1.Sharkie/1.IDLE/5.png",
    "img/1.Sharkie/1.IDLE/6.png",
    "img/1.Sharkie/1.IDLE/7.png",
    "img/1.Sharkie/1.IDLE/8.png",
    "img/1.Sharkie/1.IDLE/9.png",
    "img/1.Sharkie/1.IDLE/10.png",
    "img/1.Sharkie/1.IDLE/11.png",
    "img/1.Sharkie/1.IDLE/12.png",
    "img/1.Sharkie/1.IDLE/13.png",
    "img/1.Sharkie/1.IDLE/14.png",
    "img/1.Sharkie/1.IDLE/15.png",
    "img/1.Sharkie/1.IDLE/16.png",
    "img/1.Sharkie/1.IDLE/17.png",
    "img/1.Sharkie/1.IDLE/18.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/1.Sharkie/2.Long_IDLE/i1.png",
    "img/1.Sharkie/2.Long_IDLE/i2.png",
    "img/1.Sharkie/2.Long_IDLE/i3.png",
    "img/1.Sharkie/2.Long_IDLE/i4.png",
    "img/1.Sharkie/2.Long_IDLE/i5.png",
    "img/1.Sharkie/2.Long_IDLE/i6.png",
    "img/1.Sharkie/2.Long_IDLE/i7.png",
    "img/1.Sharkie/2.Long_IDLE/i8.png",
    "img/1.Sharkie/2.Long_IDLE/i9.png",
    "img/1.Sharkie/2.Long_IDLE/i10.png",
    "img/1.Sharkie/2.Long_IDLE/i11.png",
    "img/1.Sharkie/2.Long_IDLE/i12.png",
    "img/1.Sharkie/2.Long_IDLE/i13.png",
    "img/1.Sharkie/2.Long_IDLE/i14.png",
  ];

  IMAGES_SWIMMING = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png",
    "img/1.Sharkie/3.Swim/3.png",
    "img/1.Sharkie/3.Swim/4.png",
    "img/1.Sharkie/3.Swim/5.png",
    "img/1.Sharkie/3.Swim/6.png",
  ];

  IMAGES_DEAD = [
    "img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "img/1.Sharkie/6.dead/1.Poisoned/10.png",
    "img/1.Sharkie/6.dead/1.Poisoned/11.png",
    "img/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];

  IMAGES_HURT = [
    "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/5.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
  ];
  speed = 0.8;
  world;
  idleTimer = 0;
  longIdlePlayed = false;
  offset = {
    top: 120,
    bottom: 85,
    left: 35,
    right: 35,
  };

  constructor() {
    super().loadImage("img/1.Sharkie/1.IDLE/1.png");
    this.IMAGES_LONG_IDLE_LAST4 = this.IMAGES_LONG_IDLE.slice(-4);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < 1420) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT && this.x > -300) {
        this.x -= this.speed;
        this.otherDirection = true;
      }

      if (this.world.keyboard.UP) {
        this.y -= this.speed;
      }

      if (this.world.keyboard.DOWN) {
        this.y += this.speed;
      }
      this.world.camera_x = -this.x + 100;
    });

  

    setInterval(() => {
      if (this.isDead()) {
        if (!this.deadAnimationComplete) {
          this.playDeadAnimation();
        }
        this.idleTimer = 0;
        this.animationState = 'idle';
        return;
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        this.idleTimer = 0;
        this.animationState = 'idle';
        this.longIdlePlayed = false;
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_SWIMMING);
        this.idleTimer = 0;
        this.animationState = 'idle';
        this.longIdlePlayed = false;
      } else {
        this.idleTimer += 100;
        if (this.idleTimer >= 2000) {
          if (!this.longIdlePlayed) {
            if (this.animationState !== 'longIdleFull') {
              this.animationState = 'longIdleFull';
              this.currentImage = 0;
            }
            this.playAnimationNonLoop(this.IMAGES_LONG_IDLE);
            if (this.currentImage >= this.IMAGES_LONG_IDLE.length) {
              this.longIdlePlayed = true;
              this.animationState = 'longIdleLoop';
              this.currentImage = 0;
            }
          } else {
            this.playAnimation(this.IMAGES_LONG_IDLE_LAST4);
          }
        } else {
          this.animationState = 'idle';
          this.playAnimation(this.IMAGES_IDLE);
        }
      }
    }, 200);
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

  playAnimationNonLoop(images) {
    if (this.currentImage < images.length) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }
}
