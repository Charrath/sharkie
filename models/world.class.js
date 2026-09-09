/**
 * Represents the game world.
 * Manages the character, enemies, collectables, collisions,
 * status bars, drawing and the game loop.
 */
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

  /**
   * Creates a new game world and initializes all main game objects.
   *
   * @param {HTMLCanvasElement} canvas - The canvas used to render the game.
   * @param {Keyboard} keyboard - The keyboard input state of the game.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
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

  /**
   * Assigns the game world to the character, enemies and collectables.
   */
  setWorld() {
    this.character.world = this;

    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });

    if (!this.level.collectables) {
      this.level.collectables = [];
    }

    this.level.collectables.forEach((c) => (c.world = this));
  }

  /**
   * Finds the endboss and creates its health bar after its introduction.
   */
  ensureBossBar() {
    if (!this.endboss) {
      this.endboss = this.level.enemies.find((e) => e instanceof Endboss);
    }

    if (this.endboss && this.endboss.introduced && !this.bossHealthBar) {
      this.bossHealthBar = new BossHealthBar(this.endboss);
    }
  }

  /**
   * Starts the main game logic interval.
   * Continuously checks collisions and updates status bars.
   */
  run() {
    this.runInterval = setInterval(() => {
      if (!gameRunning) return;

      this.checkCollisions();
      this.ensureBossBar();

      if (this.bossHealthBar) {
        this.bossHealthBar.update();
      }

      this.healthBar.update();
    }, 50);
  }

  /**
   * Stops the main game logic interval.
   */
  stop() {
    clearInterval(this.runInterval);
  }

  /**
   * Checks collisions between the character, enemies,
   * throwable objects and collectables.
   */
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

  /**
   * Checks and handles a collision between the character and an enemy.
   *
   * @param {MoveableObject} enemy - The enemy that may collide with the character.
   */
  checkCharacterEnemyCollision(enemy) {
    if (enemy.introduced === false) return;
    if (!this.character.isColliding(enemy)) return;

    if (this.isFinalSlapOnPufferFish(enemy)) {
      this.handleFinalSlap(enemy);
      return;
    }

    this.damageCharacter(enemy);
  }

  /**
   * Checks whether a puffer fish is hit by the character's final slap attack.
   *
   * @param {MoveableObject} enemy - The enemy involved in the collision.
   * @returns {boolean} True if the enemy is a puffer fish hit by a final slap.
   */
  isFinalSlapOnPufferFish(enemy) {
    return (
      enemy instanceof PufferFish &&
      this.character.isAttacking &&
      this.character.attackType === "finalSlap"
    );
  }

  /**
   * Applies the final slap effect to a puffer fish.
   *
   * @param {PufferFish} enemy - The puffer fish hit by the final slap.
   */
  handleFinalSlap(enemy) {
    if (!enemy.slapped) {
      enemy.onFinalSlap(this.character.otherDirection);
    }
  }

  /**
   * Applies collision damage to the character.
   *
   * @param {MoveableObject} enemy - The enemy causing the damage.
   */
  damageCharacter(enemy) {
    if (this.character.isUntouchable) return;

    const damage = enemy instanceof Endboss ? 20 : 10;
    this.character.hit(damage);

    if (enemy instanceof Endboss) {
      enemy.pauseAfterAttack = true;
    }
  }

  /**
   * Checks whether a bubble collides with an enemy.
   *
   * @param {ThrowableObject} bubble - The bubble projectile to check.
   * @param {number} i - The index of the bubble in the throwable object array.
   */
  checkBubbleCollisions(bubble, i) {
    for (const enemy of this.level.enemies) {
      if (!bubble.isColliding(enemy)) continue;

      this.handleEnemyHitByBubble(enemy);
      this.throwableObjects.splice(i, 1);
      break;
    }
  }

  /**
   * Handles the effect of a bubble hitting an enemy.
   *
   * @param {MoveableObject} enemy - The enemy hit by the bubble.
   */
  handleEnemyHitByBubble(enemy) {
    if (enemy instanceof Endboss) {
      this.endboss.hit(20);
    } else if (enemy instanceof JellyFish) {
      enemy.die();
    } else {
      enemy.hit(5);
    }
  }

  /**
   * Draws the complete game world and starts the next animation frame.
   */
  draw() {
    this.clearCanvas();
    this.drawWorld();
    this.drawStatusBars();
    this.updateStatusBars();

    if (gameRunning) {
      requestAnimationFrame(this.draw.bind(this));
    }
  }

  /**
   * Clears the complete canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws all objects that belong to the game world.
   */
  drawWorld() {
    const cameraX = Math.round(this.camera_x);

    this.ctx.translate(cameraX, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.drawCollectables();
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);

    this.ctx.translate(-cameraX, 0);
  }

  /**
   * Draws all collectables that have not been collected.
   */
  drawCollectables() {
    if (!this.level.collectables) return;

    const activeCollectables = this.level.collectables.filter(
      (collectable) => !collectable.collected,
    );

    this.addObjectsToMap(activeCollectables);
  }

  /**
   * Draws all status bars on the canvas.
   */
  drawStatusBars() {
    this.addToMap(this.coinBar);
    this.addToMap(this.healthBar);

    if (this.bossHealthBar?.isVisible()) {
      this.addToMap(this.bossHealthBar);
    }

    this.addToMap(this.poisonBar);
  }

  /**
   * Updates the displayed values of the health bars.
   */
  updateStatusBars() {
    this.healthBar.update();

    if (this.bossHealthBar) {
      this.bossHealthBar.update();
    }
  }

  /**
   * Adds multiple drawable objects to the canvas.
   *
   * @param {DrawableObject[]} objects - The objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws a single object on the canvas.
   * Flips the object horizontally if it faces the opposite direction.
   *
   * @param {DrawableObject} mO - The object to draw.
   */
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

  /**
   * Flips an object horizontally before drawing it.
   *
   * @param {DrawableObject} mO - The object to flip.
   */
  flipImage(mO) {
    this.ctx.save();
    this.ctx.translate(mO.width, 0);
    this.ctx.scale(-1, 1);
    mO.x = mO.x * -1;
  }

  /**
   * Restores the position and canvas state after flipping an object.
   *
   * @param {DrawableObject} mO - The previously flipped object.
   */
  flipImageBack(mO) {
    mO.x = mO.x * -1;
    this.ctx.restore();
  }
}
