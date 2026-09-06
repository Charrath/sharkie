class World {
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  runInterval;
  coinBar = new CoinBar();
  poisonBar = new PoisonBar();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character = new Character(this);
    this.healthBar = new HealthBar(this.character);
    this.endboss = null;
    this.bossHealthBar = null;
    this.draw();
    this.setWorld();
    this.run();
    window.character = this.character;
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    if (!this.level.collectables) this.level.collectables = [];
    this.level.collectables.forEach((c) => (c.world = this));
  }

  ensureBossBar() {
    if (!this.endboss) {
      this.endboss = this.level.enemies.find((e) => e instanceof Endboss);
    }
    if (this.endboss && this.endboss.introduced && !this.bossHealthBar) {
      this.bossHealthBar = new BossHealthBar(this.endboss);
    }
  }

  run() {
    this.runInterval = setInterval(() => {
      if (!gameRunning) return;
      this.checkCollisions();
      this.ensureBossBar();
      if (this.bossHealthBar) this.bossHealthBar.update();
      this.healthBar.update();
    }, 200);
  }

  stop() {
  clearInterval(this.runInterval);
}

  checkCollisions() {
    this.level.enemies.forEach((enemy) =>
      this.checkCharacterEnemyCollision(enemy),
    );
    for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
      this.checkBubbleCollisions(this.throwableObjects[i], i);
    }
    this.level.collectables.forEach((item, i) => {
      if (!item.collected && this.character.isColliding(item)) {
        item.collect();
        this.level.collectables.splice(i, 1);
      }
    });
  }

  checkCharacterEnemyCollision(enemy) {
    if (enemy.introduced === false) return;
    if (!this.character.isColliding(enemy)) return;

    if (
      enemy instanceof PufferFish &&
      this.character.isAttacking &&
      this.character.attackType === "finalSlap"
    ) {
      if (!enemy.slapped) enemy.onFinalSlap(this.character.otherDirection);
      return;
    }

    if (!this.character.isUntouchable) {
      const damage = enemy instanceof Endboss ? 20 : 20;
      this.character.hit(damage);
    }
  }

  checkBubbleCollisions(bubble, i) {
    for (const enemy of this.level.enemies) {
      if (!bubble.isColliding(enemy)) continue;
      this.handleEnemyHitByBubble(enemy);
      this.throwableObjects.splice(i, 1);
      break;
    }
  }

  handleEnemyHitByBubble(enemy) {
    if (enemy instanceof Endboss) this.endboss.hit(20);
    else if (enemy instanceof JellyFish) enemy.die();
    else enemy.hit(5);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    if (this.level.collectables) {
      this.addObjectsToMap(this.level.collectables.filter((c) => !c.collected));
    }
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.coinBar);
    this.addToMap(this.healthBar);
    if (this.bossHealthBar && this.bossHealthBar.isVisible()) {
      this.addToMap(this.bossHealthBar);
    }
    this.addToMap(this.poisonBar);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
    this.healthBar.update();
    if (this.bossHealthBar) this.bossHealthBar.update();

    if (gameRunning) {
      requestAnimationFrame(this.draw.bind(this));
    }
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mO) {
    if (typeof mO.isVisible === "function" && !mO.isVisible()) {
      return;
    }
    if (mO.otherDirection) {
      this.flipImage(mO);
    }
    mO.draw(this.ctx);

    if (mO.otherDirection) {
      this.flipImageBack(mO);
    }
  }

  flipImage(mO) {
    this.ctx.save();
    this.ctx.translate(mO.width, 0);
    this.ctx.scale(-1, 1);
    mO.x = mO.x * -1;
  }

  flipImageBack(mO) {
    mO.x = mO.x * -1;
    this.ctx.restore();
  }
}
