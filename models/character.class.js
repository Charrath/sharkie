class Character extends MoveableObject {
  height = 150;
  width = 200;
  y = 50;
  speed = 2.5;
  world;
  idleTimer = 0;
  longIdlePlayed = false;
  offset = {
    top: 120,
    bottom: 85,
    left: 35,
    right: 35,
  };
  maxX = 1420;
  minX = -300;
  maxY = 350;
  minY = -20;

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
    this.startMovementLoop();
    this.startAnimationLoop();
  }

  startMovementLoop() {
    setInterval(() => {
      if (this.canMoveRight()) this.moveRight();
      if (this.canMoveLeft()) this.moveLeft();
      if (this.canMoveUp()) this.moveUp();
      if (this.canMoveDown()) this.moveDown();
      this.updateCamera();
    }, 16);
  }

  startAnimationLoop() {
    setInterval(() => {
      if (this.isDead()) this.handleDeadAnimation();
      else if (this.isHurt()) this.handleHurtAnimation();
      else if (this.isMoving()) this.handleMovementAnimation();
      else this.handleIdleAnimation();
    }, 300);
  }

  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }

  isMoving() {
    return (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.UP ||
      this.world.keyboard.DOWN
    );
  }

  handleDeadAnimation() {
    if (!this.deadAnimationComplete) {
      this.playDeadAnimation();
    }
    this.resetIdle();
  }

  handleHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.resetIdle();
    this.longIdlePlayed = false;
  }

  handleMovementAnimation() {
    this.playAnimation(this.IMAGES_SWIMMING);
    this.resetIdle();
    this.longIdlePlayed = false;
  }

  handleIdleAnimation() {
    this.idleTimer += 100;
    if (this.idleTimer >= 4000) {
      if (!this.longIdlePlayed) this.playFullLongIdle();
      else this.playAnimation(this.IMAGES_LONG_IDLE_LAST4);
    } else {
      this.animationState = "idle";
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  playFullLongIdle() {
    if (this.animationState !== "longIdleFull") {
      this.animationState = "longIdleFull";
      this.currentImage = 0;
    }
    this.playAnimationNonLoop(this.IMAGES_LONG_IDLE);
    if (this.currentImage >= this.IMAGES_LONG_IDLE.length) {
      this.longIdlePlayed = true;
      this.animationState = "longIdleLoop";
      this.currentImage = 0;
    }
  }

  resetIdle() {
    this.idleTimer = 0;
    this.animationState = "idle";
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
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
