class Character extends MoveableObject {
  IMAGE_SETS = {
    idle: [
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
    ],
    longIdle: [
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
    ],
    swimming: [
      "img/1.Sharkie/3.Swim/1.png",
      "img/1.Sharkie/3.Swim/2.png",
      "img/1.Sharkie/3.Swim/3.png",
      "img/1.Sharkie/3.Swim/4.png",
      "img/1.Sharkie/3.Swim/5.png",
      "img/1.Sharkie/3.Swim/6.png",
    ],
    dead: [
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
    ],
    hurt: [
      "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
      "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
      "img/1.Sharkie/5.Hurt/1.Poisoned/5.png",
      "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
      "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    ],
    attackBubble: [
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
    ],
    attackFinalSlap: [
      "img/1.Sharkie/4.Attack/Fin slap/1.png",
      "img/1.Sharkie/4.Attack/Fin slap/2.png",
      "img/1.Sharkie/4.Attack/Fin slap/3.png",
      "img/1.Sharkie/4.Attack/Fin slap/4.png",
      "img/1.Sharkie/4.Attack/Fin slap/5.png",
      "img/1.Sharkie/4.Attack/Fin slap/6.png",
      "img/1.Sharkie/4.Attack/Fin slap/7.png",
      "img/1.Sharkie/4.Attack/Fin slap/8.png",
    ],
  };

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
  offset = { top: 120, bottom: 85, left: 35, right: 35 };
  maxX = 4410;
  minX = -300;
  maxY = 350;
  minY = -20;

  constructor(world) {
    super().loadImage(this.IMAGE_SETS.swimming[0]);
    this.world = world;
    this.loadAllImages();
    this.loadCharacterSounds();
    this.imagesLongIdleLast4 = this.IMAGE_SETS.longIdle.slice(-4);
    this.animate();
  }

  loadAllImages() {
    Object.values(this.IMAGE_SETS).forEach((arr) => this.loadImages(arr));
  }

  loadCharacterSounds() {
    this.loadSound("swim", "assets/audio/sharkieSwim.mp3", 0.2);
    this.loadSound("sleepStart", "assets/audio/sharkieSleepStart.mp3");
    this.loadSound("sleepLoop", "assets/audio/sharkieSleepLoop.mp3");
    this.loadSound("punch", "assets/audio/sharkiePunch.mp3");
    this.loadSound("hurt", "assets/audio/sharkieHurt.mp3");
    this.loadSound("bubbleAttack", "assets/audio/sharkieBubble.mp3");
    this.loadSound("dead", "assets/audio/sharkieDead.mp3");
  }

  animate() {
    this.startInputLoop();
    this.startAnimationLoop();
  }

  startInputLoop() {
    setInterval(() => {
      if (this.world.keyboard.F && !this.isAttacking)
        this.startAttack("bubble");
      if (this.world.keyboard.E && !this.isAttacking)
        this.startAttack("finalSlap");
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
    const loop = () => {
      let t = 100;
      if (this.isDead()) {
        t = 150;
        this.handleDeadAnimation();
      } else if (this.attackType) {
        t = 40;
        this.handleAttackAnimation(this.attackType);
      } else if (this.isHurt()) {
        t = 200;
        this.handleHurtAnimation();
      } else if (this.isMoving()) {
        t = 100;
        this.handleMovementAnimation();
      } else {
        t = 175;
        this.handleIdleAnimation();
      }
      setTimeout(loop, t);
    };
    loop();
  }

  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }

  startAttack(type) {
    if (this.cannotAttack(type)) return;
    this.stopSound("sleepLoop");
    this.initializeAttack(type);

    if (type === "bubble") this.consumePoison();
    if (type === "finalSlap") this.activateFinalSlapImmunity();
  }

  cannotAttack(type) {
    if (this.isHurt()) return true;
    if (type === "bubble" && this.world.poisonBar?.number <= 0) return true;
    return false;
  }

  initializeAttack(type) {
    this.attackType = type;
    this.isAttacking = true;
    this.currentImage = 0;
    this.idleTimer = 0;
  }

  consumePoison() {
    this.world.poisonBar.number -= 1;
  }

  activateFinalSlapImmunity() {
    this.isUntouchable = true;
  }

  handleAttackAnimation(attackType) {
    if (attackType === "bubble") this.bubbleAttack();
    else if (attackType === "finalSlap") this.finalSlapAttack();
  }

  finalSlapAttack() {
    const step = 8;
    const frames = this.IMAGE_SETS.attackFinalSlap;

    if (this.currentImage < frames.length) {
      this.img = this.imageCache[frames[this.currentImage]];
      this.x += this.otherDirection ? -step : step;
      this.currentImage++;
      if (this.currentImage === 1) this.playSound("punch");
    } else {
      this.isUntouchable = false;
      this.isAttacking = false;
      this.currentImage = 0;
      this.attackType = 0;
    }
  }

  bubbleAttack() {
    if (this.currentImage < this.IMAGE_SETS.attackBubble.length) {
      this.img =
        this.imageCache[this.IMAGE_SETS.attackBubble[this.currentImage]];
      this.currentImage++;
      if (this.currentImage === 1) this.playSound("bubbleAttack", 150);
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
    if (!this.deadAnimationComplete) this.playDeadAnimation();
    this.resetIdle();
  }

  handleHurtAnimation() {
    this.playAnimation(this.IMAGE_SETS.hurt);
    this.resetIdle();
    this.longIdlePlayed = false;
    if (this.currentImage === 1) this.playSound("hurt");
  }

  handleMovementAnimation() {
    this.playAnimation(this.IMAGE_SETS.swimming);
    this.resetIdle();
    this.longIdlePlayed = false;
    const swim = this.sounds["swim"];
    if (swim && swim.paused) this.playSound("swim");
  }

  handleIdleAnimation() {
    this.idleTimer += 100;
    if (this.idleTimer >= 4000) {
      if (!this.longIdlePlayed) this.playFullLongIdle();
      else this.playAnimation(this.imagesLongIdleLast4);
    } else {
      this.animationState = "idle";
      this.playAnimation(this.IMAGE_SETS.idle);
    }
  }

  playFullLongIdle() {
    if (this.animationState !== "longIdleFull") {
      this.startIdleSleep();
    }

    this.playAnimationNonLoop(this.IMAGE_SETS.longIdle);
    this.completeIdleSleepIfFinished();
  }

  startIdleSleep() {
    this.animationState = "longIdleFull";
    this.currentImage = 0;
    this.playSound("sleepStart");
    this.setupIdleSleepLoop();
  }

  setupIdleSleepLoop() {
    const startSound = this.sounds["sleepStart"];
    if (!startSound) return;

    startSound.onended = () => {
      const loopSound = this.sounds["sleepLoop"];
      if (loopSound) {
        loopSound.loop = true;
        loopSound.play();
      }
    };
  }

  completeIdleSleepIfFinished() {
    const sequenceDone = this.currentImage >= this.IMAGE_SETS.longIdle.length;
    if (!sequenceDone) return;

    this.longIdlePlayed = true;
    this.animationState = "longIdleLoop";
    this.currentImage = 0;
    Object.assign(this.offset, { top: 132, bottom: 62 });
  }

  resetIdle() {
    this.idleTimer = 0;
    this.animationState = "idle";
    Object.assign(this.offset, { top: 120, bottom: 85 });
    this.stopSound("sleepLoop");
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
    if (this.deadAnimationIndex < this.IMAGE_SETS.dead.length) {
      const currentFramePath = this.IMAGE_SETS.dead[this.deadAnimationIndex];
      this.img = this.imageCache[currentFramePath];
      this.deadAnimationIndex++;
      if (this.deadAnimationIndex === 1) this.playSound("dead");
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
