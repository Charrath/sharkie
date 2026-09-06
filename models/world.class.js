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

    if (this.isFinalSlapOnPufferFish(enemy)) {
      this.handleFinalSlap(enemy);
      return;
    }

    this.damageCharacter(enemy);
  }

  isFinalSlapOnPufferFish(enemy) {
    return (
      enemy instanceof PufferFish &&
      this.character.isAttacking &&
      this.character.attackType === "finalSlap"
    );
  }

  handleFinalSlap(enemy) {
    if (!enemy.slapped) {
      enemy.onFinalSlap(this.character.otherDirection);
    }
  }

  damageCharacter(enemy) {
    if (this.character.isUntouchable) return;

    const damage = enemy instanceof Endboss ? 20 : 10;
    this.character.hit(damage);
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
    this.clearCanvas();
    this.drawWorld();
    this.drawStatusBars();
    this.updateStatusBars();

    if (gameRunning) {
      requestAnimationFrame(this.draw.bind(this));
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawWorld() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.drawCollectables();
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);
    this.ctx.translate(-this.camera_x, 0);
  }

  drawCollectables() {
    if (!this.level.collectables) return;

    const activeCollectables = this.level.collectables.filter(
      (collectable) => !collectable.collected,
    );

    this.addObjectsToMap(activeCollectables);
  }

  drawStatusBars() {
    this.addToMap(this.coinBar);
    this.addToMap(this.healthBar);

    if (this.bossHealthBar?.isVisible()) {
      this.addToMap(this.bossHealthBar);
    }

    this.addToMap(this.poisonBar);
  }

  updateStatusBars() {
    this.healthBar.update();

    if (this.bossHealthBar) {
      this.bossHealthBar.update();
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
