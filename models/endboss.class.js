class Endboss extends MoveableObject {
  IMAGE_SETS = {
    swimming: [
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
    ],
    introduce: [
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
    ],
    attack: [
      "img/2.Enemy/3 Final Enemy/Attack/1.png",
      "img/2.Enemy/3 Final Enemy/Attack/2.png",
      "img/2.Enemy/3 Final Enemy/Attack/3.png",
      "img/2.Enemy/3 Final Enemy/Attack/4.png",
      "img/2.Enemy/3 Final Enemy/Attack/5.png",
      "img/2.Enemy/3 Final Enemy/Attack/6.png",
    ],
    hurt: [
      "img/2.Enemy/3 Final Enemy/Hurt/1.png",
      "img/2.Enemy/3 Final Enemy/Hurt/2.png",
      "img/2.Enemy/3 Final Enemy/Hurt/3.png",
      "img/2.Enemy/3 Final Enemy/Hurt/4.png",
    ],
    dead: [
      "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
      "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
      "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
      "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
      "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
    ],
  };

  SOUNDS = {
    attack: ["assets/audio/endbossAttack.mp3", 0.4],
    hurt: ["assets/audio/endbossHurt.wav", 0.5],
    dead: ["assets/audio/endbossDead.wav", 0.5],
  };

  height = 200;
  width = 200;
  y = 50;
  offset = { top: 63, left: 10, right: 14, bottom: 30 };
  introduced = false;
  introPlayed = false;
  hurtSoundPlayed = false;
  spawnPoint = { x: 4000, y: 50 };
  speed = 40;
  maxEnergy = 100;

  constructor(world) {
    super();
    this.world = world;
    this.loadAllImages();
    this.x = 4000;
    this.animate();
    this.loadSounds(this.SOUNDS);
  }

  loadAllImages() {
    Object.values(this.IMAGE_SETS).forEach((images) => this.loadImages(images));
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
      if (!gameRunning) return;
      if (!this.world?.character) return;
      if (!this.introduced && this.world.character.x >= 3550) {
        playBossMusic();
        this.startIntro();
        clearInterval(id);
      }
    }, 16);
  }

  startIntro() {
    this.introduced = true;
    this.currentImage = 0;
    this.img = this.imageCache[this.IMAGE_SETS.introduce[0]];
  }

  startAnimationLoop() {
    const loop = () => {
      if (!gameRunning) return;
      if (!this.ensureIntroduced()) return;
      const delay = this.handleAnimationState();
      setTimeout(loop, delay);
    };
    loop();
  }

  handleAnimationState() {
    if (!this.introPlayed) return this.playIntro();
    if (this.isDead()) return this.handleDeadAnimation();
    if (this.isHurt()) return this.handleHurtAnimation();

    this.hurtSoundPlayed = false;
    return this.moveEndboss();
  }

  ensureIntroduced(t) {
    if (!this.introduced) {
      setTimeout(() => this.startAnimationLoop(), t);
      return false;
    }
    return true;
  }

  moveEndboss() {
    const spawnDist = Math.abs(this.x - this.spawnPoint.x);
    const playerDist = Math.abs(this.world.character.x - this.x);

    if (this.returningToSpawn) return this.returnToSpawn();
    if (this.shouldReturnToSpawn(spawnDist, playerDist))
      return this.startReturn();
    if (this.canAttackPlayer(playerDist)) return this.attackCharacter(19);

    this.playAnimation(this.IMAGE_SETS.swimming);
    return 200;
  }

  startReturn() {
    this.returningToSpawn = true;
    return this.moveTo(this.spawnPoint.x);
  }

  shouldReturnToSpawn(spawnDist, playerDist) {
    return spawnDist >= 2000 || playerDist > 550;
  }

  canAttackPlayer(playerDist) {
    return playerDist <= 550 && !this.world.character.isDead();
  }

  returnToSpawn() {
    if (this.x !== this.spawnPoint.x) {
      return this.moveTo(this.spawnPoint.x);
    }
    this.returningToSpawn = false;
    return 200;
  }

  faceTowards(targetX) {
    this.otherDirection = targetX > this.x;
  }

  moveTo(targetX) {
    this.faceTowards(targetX);
    if (Math.abs(this.x - targetX) <= this.speed) {
      this.x = targetX;
    } else if (this.x < targetX) {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }
    this.playAnimation(this.IMAGE_SETS.swimming);
    return 150;
  }

  attackCharacter(speed = 10) {
    const char = this.world.character;
    this.faceTowards(char.x);
    this.moveTowardsCharacter(char, speed);
    this.handleAttackSound();
    this.playAnimation(this.IMAGE_SETS.attack);
    return 120;
  }

  moveTowardsCharacter(char, speed) {
    if (char.x > this.x) this.x += speed;
    else if (char.x < this.x) this.x -= speed;

    if (char.y - 40 > this.y) this.y += speed;
    else if (char.y - 40 < this.y) this.y -= speed;
  }

  handleAttackSound() {
    const frame = this.currentImage % this.IMAGE_SETS.attack.length;

    if (frame === 4 && !this.attackSoundPlayed) {
      this.playSound("attack");
      this.attackSoundPlayed = true;
    }

    if (frame === 0) this.attackSoundPlayed = false;
  }

  playIntro() {
    this.playAnimationNonLoop(this.IMAGE_SETS.introduce);
    if (this.currentImage >= this.IMAGE_SETS.introduce.length) {
      this.introPlayed = true;
      this.currentImage = 0;
      if (!this.spawnPoint) {
        this.spawnPoint = { x: this.x, y: this.y };
      }
    }
    return 150;
  }

  playAnimationNonLoop(images) {
    if (this.currentImage < images.length) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }

  handleHurtAnimation() {
    if (!this.hurtSoundPlayed) {
      this.playSound("hurt", 0, 0.5);
      this.hurtSoundPlayed = true;
    }

    this.playAnimation(this.IMAGE_SETS.hurt);

    return 200;
  }

  handleDeadAnimation() {
    if (!this.deadAnimationComplete) {
      this.playDeadAnimation();
      return 200;
    }
  }

  playDeadAnimation() {
    if (this.deadAnimationIndex < this.IMAGE_SETS.dead.length) {
      if (this.deadAnimationIndex === 0) {
        this.playSound("dead");
      }
      const path = this.IMAGE_SETS.dead[this.deadAnimationIndex];
      this.img = this.imageCache[path];
      this.deadAnimationIndex++;
    } else {
      this.deadAnimationComplete = true;
      showGameOver(true);
    }
  }
}
