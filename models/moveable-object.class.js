/**
 * Represents a movable object in the game.
 * Provides movement, collision detection, damage handling and sound functions.
 *
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
  speed = 0.2;
  otherDirection = false;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  energy = 100;
  lastHit = 0;
  deadAnimationIndex = 0;
  deadAnimationComplete = false;
  maxX;
  minX;

  /**
   * Creates a new movable object and initializes its sound collection.
   */
  constructor() {
    super();
    this.sounds = {};
  }

  /**
   * Applies horizontal movement, friction and buoyancy continuously.
   */
  applyGravity() {
    setInterval(() => {
      this.x += this.speedX;
      this.applyFriction();
      this.applyBuoyancy();
    }, 1000 / 25);
  }

  /**
   * Reduces the horizontal speed using friction.
   */
  applyFriction() {
    if (this.speedX > 0) {
      this.speedX = Math.max(0, this.speedX - this.friction);
    } else if (this.speedX < 0) {
      this.speedX = Math.min(0, this.speedX + this.friction);
    }
  }

  /**
   * Applies upward buoyancy while the object is underwater.
   */
  applyBuoyancy() {
    if (!this.isUnderWater()) return;

    const horizontalFactor = Math.abs(this.speedX) / this.initialSpeedX;
    const riseSpeed = this.buoyancy * (1 - horizontalFactor);

    this.y -= riseSpeed;
  }

  /**
   * Checks whether the object is below the water surface.
   *
   * @returns {boolean} True if the object is underwater.
   */
  isUnderWater() {
    return this.y > this.waterSurfaceY - this.height;
  }

  /**
   * Checks whether the object can move to the right.
   *
   * @returns {boolean} True if the right key is pressed and the object is within its boundary.
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.maxX;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Checks whether the object can move to the left.
   *
   * @returns {boolean} True if the left key is pressed and the object is within its boundary.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > this.minX;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Checks whether the object can move upward.
   *
   * @returns {boolean} True if the up key is pressed and the object is within its boundary.
   */
  canMoveUp() {
    return this.world.keyboard.UP && this.y > this.minY;
  }

  /**
   * Moves the object upward.
   */
  moveUp() {
    this.y -= this.speed;
  }

  /**
   * Checks whether the object can move downward.
   *
   * @returns {boolean} True if the down key is pressed and the object is within its boundary.
   */
  canMoveDown() {
    return this.world.keyboard.DOWN && this.y < this.maxY;
  }

  /**
   * Moves the object downward.
   */
  moveDown() {
    this.y += this.speed;
  }

  /**
   * Checks whether two line segments intersect.
   *
   * @param {{x: number, y: number}} l1Start - The start point of the first line.
   * @param {{x: number, y: number}} l1End - The end point of the first line.
   * @param {{x: number, y: number}} l2Start - The start point of the second line.
   * @param {{x: number, y: number}} l2End - The end point of the second line.
   * @returns {boolean} True if the two line segments intersect.
   */
  doLinesIntersect(l1Start, l1End, l2Start, l2End) {
    const cross = (o, a, b) =>
      (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

    return (
      cross(l1Start, l2Start, l2End) * cross(l1End, l2Start, l2End) < 0 &&
      cross(l2Start, l1Start, l1End) * cross(l2End, l1Start, l1End) < 0
    );
  }

  /**
   * Returns the corner points of the object's collision box.
   *
   * @returns {{x: number, y: number}[]} The corner points of the collision box.
   */
  getCorners() {
    const off = this.offset || {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    };

    return [
      { x: this.x + off.left, y: this.y + off.top },
      { x: this.x + this.width - off.right, y: this.y + off.top },
      { x: this.x + off.left, y: this.y + this.height - off.bottom },
      {
        x: this.x + this.width - off.right,
        y: this.y + this.height - off.bottom,
      },
    ];
  }

  /**
   * Creates the edges of a collision box from its corner points.
   *
   * @param {{x: number, y: number}[]} corners - The corner points of the collision box.
   * @returns {Array<Array<{x: number, y: number}>>} The edges of the collision box.
   */
  getEdges(corners) {
    return [
      [corners[0], corners[1]],
      [corners[1], corners[3]],
      [corners[3], corners[2]],
      [corners[2], corners[0]],
    ];
  }

  /**
   * Checks whether a point is inside another object's collision box.
   *
   * @param {{x: number, y: number}} point - The point to check.
   * @param {MoveableObject} obj - The object whose collision box is checked.
   * @returns {boolean} True if the point is inside the object's collision box.
   */
  isPointInsideRect(point, obj) {
    const off = obj.offset || {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    };

    return (
      point.x >= obj.x + off.left &&
      point.x <= obj.x + obj.width - off.right &&
      point.y >= obj.y + off.top &&
      point.y <= obj.y + obj.height - off.bottom
    );
  }

  /**
   * Checks whether this object collides with another object.
   *
   * @param {MoveableObject} mO - The other object to check for collision.
   * @returns {boolean} True if the objects are colliding.
   */
  isColliding(mO) {
    const myCorners = this.getCorners();

    if (myCorners.some((p) => this.isPointInsideRect(p, mO))) {
      return true;
    }

    const myEdges = this.getEdges(myCorners);
    const otherCorners = this.getOtherCorners(mO);
    const otherEdges = this.getEdges(otherCorners);

    return this.checkEdgeIntersections(myEdges, otherEdges);
  }

  /**
   * Returns the corner points of another object's collision box.
   *
   * @param {MoveableObject} mO - The object whose corners should be determined.
   * @returns {{x: number, y: number}[]} The corner points of the other object.
   */
  getOtherCorners(mO) {
    if (mO.getCorners && typeof mO.getCorners === "function") {
      return mO.getCorners();
    } else {
      const off = mO.offset || {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      };

      return [
        { x: mO.x + off.left, y: mO.y + off.top },
        { x: mO.x + mO.width - off.right, y: mO.y + off.top },
        { x: mO.x + off.left, y: mO.y + mO.height - off.bottom },
        {
          x: mO.x + mO.width - off.right,
          y: mO.y + mO.height - off.bottom,
        },
      ];
    }
  }

  /**
   * Checks whether any edges of two collision boxes intersect.
   *
   * @param {Array<Array<{x: number, y: number}>>} myEdges - The edges of this object.
   * @param {Array<Array<{x: number, y: number}>>} otherEdges - The edges of the other object.
   * @returns {boolean} True if any edges intersect.
   */
  checkEdgeIntersections(myEdges, otherEdges) {
    for (const [s1, e1] of myEdges) {
      for (const [s2, e2] of otherEdges) {
        if (this.doLinesIntersect(s1, e1, s2, e2)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Reduces the object's energy and temporarily makes it untouchable.
   *
   * @param {number} [damage=5] - The amount of damage to apply.
   */
  hit(damage = 5) {
    if (this.isUntouchable) return;

    this.energy = Math.max(0, this.energy - damage);
    this.isUntouchable = true;
    this.currentImage = 0;
    this.lastHit = Date.now();

    this.resetUntouchable();
  }

  /**
   * Removes the temporary untouchable state after the hurt animation.
   */
  resetUntouchable() {
    const frames = this.IMAGE_SETS?.hurt?.length ?? 1;
    const hurtDuration = frames * 200;

    setTimeout(() => {
      this.isUntouchable = false;
    }, hurtDuration);
  }

  /**
   * Checks whether the object has no energy left.
   *
   * @returns {boolean} True if the object's energy is zero.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks whether the object is currently in its hurt state.
   *
   * @returns {boolean} True if the hurt duration is still active.
   */
  isHurt() {
    const frames = this.IMAGE_SETS?.hurt?.length ?? 0;
    const durationMs = frames * 200;

    return Date.now() - this.lastHit < durationMs;
  }

  /**
   * Loads a sound and stores it in the sound collection.
   *
   * @param {string} name - The name used to identify the sound.
   * @param {string} path - The path to the audio file.
   * @param {number} [volume=0.5] - The playback volume of the sound.
   */
  loadSound(name, path, volume = 0.5) {
    const audio = new Audio(path);
    audio.volume = volume;
    this.sounds[name] = audio;
  }

  /**
   * Loads multiple sounds from a sound configuration object.
   *
   * @param {Object.<string, [string, number]>} sounds - The sound configuration.
   */
  loadSounds(sounds) {
    Object.entries(sounds).forEach(([name, [path, volume]]) => {
      this.loadSound(name, path, volume);
    });
  }

  /**
   * Plays a stored sound.
   *
   * @param {string} name - The name of the sound to play.
   * @param {number} [delay=0] - The delay before playback in milliseconds.
   * @param {number} [startTime=0] - The position in the audio file where playback starts.
   */
  playSound(name, delay = 0, startTime = 0) {
    if (soundMuted) return;

    const sound = this.sounds[name];

    if (!sound) return;

    sound.currentTime = startTime;

    if (delay > 0) {
      setTimeout(() => sound.play(), delay);
    } else {
      sound.play();
    }
  }

  /**
   * Stops a stored sound and resets its playback position.
   *
   * @param {string} name - The name of the sound to stop.
   */
  stopSound(name) {
    const sound = this.sounds[name];

    if (sound && !sound.paused) {
      sound.pause();
      sound.currentTime = 0;
    }
  }
}
