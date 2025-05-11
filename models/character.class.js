class Character extends MoveableObject {
  height = 150;
  width = 200;
  y = 50;
  speed = 2.5;
  world;
  idleTimer = 0;
  longIdlePlayed = false;
  isAttacking = false;
  isUntouchable = false;
  attackType = 0;
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

  IMAGES_ATTACK_BUBBLE = [
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
  ];

  IMAGES_ATTACK_FINAL_SLAP = [
    "img/1.Sharkie/4.Attack/Fin slap/1.png",
    "img/1.Sharkie/4.Attack/Fin slap/2.png",
    "img/1.Sharkie/4.Attack/Fin slap/3.png",
    "img/1.Sharkie/4.Attack/Fin slap/4.png",
    "img/1.Sharkie/4.Attack/Fin slap/5.png",
    "img/1.Sharkie/4.Attack/Fin slap/6.png",
    "img/1.Sharkie/4.Attack/Fin slap/7.png",
    "img/1.Sharkie/4.Attack/Fin slap/8.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.IMAGES_LONG_IDLE_LAST4 = this.IMAGES_LONG_IDLE.slice(-4);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_ATTACK_BUBBLE);
    this.loadImages(this.IMAGES_ATTACK_FINAL_SLAP);
    this.animate();
  }

  animate() {
    this.startInputLoop();
    this.startAnimationLoop();
  }

  startInputLoop() {
    setInterval(() => {
      if (this.world.keyboard.F && !this.isAttacking) {
        this.attackType = 'bubble';
        this.startAttack();
      }
      if (this.world.keyboard.E && !this.isAttacking) {
        this.attackType = 'finalSlap';
        this.startAttack();
      }
      if (!this.isDead()) {
        if (this.canMoveRight()) this.moveRight();
        if (this.canMoveLeft()) this.moveLeft();
        if (this.canMoveUp()) this.moveUp();
        if (this.canMoveDown()) this.moveDown();
      }
      this.updateCamera();
    }, 16);
  }

  startAnimationLoop() {
    setInterval(() => {
      if (this.isDead()) this.handleDeadAnimation();
      else if (this.attackType === 'bubble' || this.attackType === 'finalSlap') {
        this.handleAttackAnimation(this.attackType);
      } else if (this.isHurt()) this.handleHurtAnimation();
      else if (this.isMoving()) this.handleMovementAnimation();
      else this.handleIdleAnimation();
    }, 100);
  }

  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }

  startAttack() {
    if (!this.isHurt()) {
      this.isAttacking  = true;
      this.currentImage = 0;
      this.idleTimer    = 0;

      // wenn es die Final Slap ist, sofort unverwundbar schalten
      if (this.attackType === 'finalSlap') {
        this.isUntouchable = true;

        // Frames * Frame-Dauer (100 ms) + 1000 ms Nach-Schutz
        const attackDuration = this.IMAGES_ATTACK_FINAL_SLAP.length * 100;
        setTimeout(() => {
          this.isUntouchable = false;
        }, attackDuration + 1000);
      }
    }
  }


  handleAttackAnimation(attackType) {
    if (attackType === "bubble") {
    this.bubbleAttack();
    } else if (attackType === "finalSlap") {
    this.finalSlapAttack();
    }
    
  }

  finalSlapAttack() {
    const step = 4;

    if (this.currentImage < this.IMAGES_ATTACK_FINAL_SLAP.length) {
      this.img = this.imageCache[this.IMAGES_ATTACK_FINAL_SLAP[this.currentImage]];
      if (!this.otherDirection) {
        this.x = Math.min(this.maxX, this.x + step);
      } else {
        this.x = Math.max(this.minX, this.x - step);
      }
      this.currentImage++;
    } else {
      this.isAttacking = false;
      this.currentImage = 0;
      this.attackType = 0;
    }
  }

  bubbleAttack() {
    if (this.currentImage < this.IMAGES_ATTACK_BUBBLE.length) {
      this.img =
        this.imageCache[this.IMAGES_ATTACK_BUBBLE[this.currentImage]];
      this.currentImage++;
    } else {
      this.spawnBubble();
      this.attackType = 0;
    }
  }

  spawnBubble() {
    const bx = this.x + (this.otherDirection ? 0 : 180);
    const by = this.y + 85;
    const bubble = new ThrowableObject(bx, by, this.world);
    bubble.speedX = this.otherDirection ? -20 : 20;
    this.world.throwableObjects.push(bubble);
    this.isAttacking = false;
    this.currentImage = 0;
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
