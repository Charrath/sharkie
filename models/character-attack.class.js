/**
 * Handles all attack actions of the character.
 */
class CharacterAttack {
  /**
   * Creates a new attack handler.
   *
   * @param {Character} character - The character whose attacks are handled.
   */
  constructor(character) {
    this.character = character;
  }

  /**
   * Handles attack input from the keyboard.
   */
  handleAttacks() {
    const character = this.character;

    if (character.world.keyboard.F && !character.isAttacking) {
      this.startAttack("bubble");
    }

    if (character.world.keyboard.E && !character.isAttacking) {
      this.startAttack("finalSlap");
    }
  }

  /**
   * Starts an attack of the specified type.
   *
   * @param {string} type - The type of attack to start.
   */
  startAttack(type) {
    const character = this.character;

    if (this.cannotAttack(type)) return;

    character.stopSound("sleepLoop");
    this.initializeAttack(type);

    if (type === "bubble") this.consumePoison();
    if (type === "finalSlap") this.activateFinalSlapImmunity();
  }

  /**
   * Checks whether the requested attack cannot be performed.
   *
   * @param {string} type - The type of attack to check.
   * @returns {boolean} True if the attack cannot be performed.
   */
  cannotAttack(type) {
    const character = this.character;

    if (character.isHurt()) return true;

    if (type === "bubble" && character.world.poisonBar?.number <= 0) {
      return true;
    }

    return false;
  }

  /**
   * Initializes the properties required for an attack.
   *
   * @param {string} type - The type of attack to initialize.
   */
  initializeAttack(type) {
    const character = this.character;

    character.attackType = type;
    character.isAttacking = true;
    character.currentImage = 0;
    character.idleTimer = 0;
  }

  /**
   * Removes one poison flask from the poison counter.
   */
  consumePoison() {
    this.character.world.poisonBar.number -= 1;
  }

  /**
   * Makes the character temporarily untouchable during the final slap.
   */
  activateFinalSlapImmunity() {
    this.character.isUntouchable = true;
  }

  /**
   * Handles the animation for the currently active attack.
   *
   * @param {string} attackType - The active attack type.
   */
  handleAttackAnimation(attackType) {
    if (attackType === "bubble") {
      this.bubbleAttack();
    } else if (attackType === "finalSlap") {
      this.finalSlapAttack();
    }
  }

  /**
   * Handles the complete final slap attack animation.
   */
  finalSlapAttack() {
    const character = this.character;
    const frames = character.IMAGE_SETS.attackFinalSlap;

    if (character.currentImage < frames.length) {
      this.playFinalSlapFrame(frames);
    } else {
      this.finishFinalSlap();
    }
  }

  /**
   * Displays the next frame of the final slap attack.
   *
   * @param {string[]} frames - The final slap animation frames.
   */
  playFinalSlapFrame(frames) {
    const character = this.character;
    const step = 8;

    character.img = character.imageCache[frames[character.currentImage]];
    character.x += character.otherDirection ? -step : step;
    character.currentImage++;

    if (character.currentImage === 1) {
      character.playSound("punch");
    }
  }

  /**
   * Finishes the final slap attack.
   */
  finishFinalSlap() {
    const character = this.character;

    character.isUntouchable = false;
    character.isAttacking = false;
    character.currentImage = 0;
    character.attackType = 0;
  }

  /**
   * Handles the bubble attack animation.
   */
  bubbleAttack() {
    const character = this.character;

    if (character.currentImage < character.IMAGE_SETS.attackBubble.length) {
      this.playBubbleFrame();
    } else {
      this.spawnBubble();
      character.attackType = 0;
    }
  }

  /**
   * Plays the next frame of the bubble attack.
   */
  playBubbleFrame() {
    const character = this.character;
    const frames = character.IMAGE_SETS.attackBubble;

    character.img = character.imageCache[frames[character.currentImage]];
    character.currentImage++;

    if (character.currentImage === 1) {
      character.playSound("bubbleAttack", 150);
    }
  }

  /**
   * Creates a new bubble projectile.
   */
  spawnBubble() {
    const character = this.character;
    const bx = character.x + (character.otherDirection ? 20 : 140);
    const by = character.y + 85;
    const bubble = new ThrowableObject(bx, by, character.world);

    bubble.speedX = character.otherDirection ? -20 : 20;

    character.world.throwableObjects.push(bubble);
    character.isAttacking = false;
    character.currentImage = 0;
  }
}