class PufferFish extends MoveableObject {
  IMAGE_SETS = {
    swimming: [
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
    ],
    transition: [
      "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png",
    ],
    bubbleSwim: [
      "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png",
    ],
  };

  height = 75;
  width = 75;
  offset = { top: 5, left: 1, right: 3, bottom: 19 };
  maxY = 405;
  minY = 50;

  // fehlende Variablen hier initialisieren
  inBubbleMode = false;
  transitioning = false;
  currentAnim = "swim";

  constructor(world) {
    super().loadImage(this.IMAGE_SETS.swimming[0]);
    this.loadAllImages();
    this.world = world;
    this.speed = 0.7 + Math.random() * 0.6;

    this.inBubbleMode = false;
    this.transitioning = false;

    this.startFrameTicker(); // <— NEU
    this.animate();
  }

  loadAllImages() {
    Object.values(this.IMAGE_SETS).forEach((images) => this.loadImages(images));
  }

  setPatrol(centerX, zoneWidth) {
    const half = zoneWidth / 2;
    this.patrolMinX = centerX - half;
    this.patrolMaxX = centerX + half;
    this.otherDirection = Math.random() < 0.5;
  }

  animate() {
    this.startAnimationLoop();
    this.startPatrolLoop();
  }

  startAnimationLoop() {
  const loop = () => {
    const t = 120;
    const char = this.world?.character;
    if (!char) { setTimeout(loop, t); return; }

    const cx = (char.x ?? 0) + (char.width ?? 0)/2;
    const cy = (char.y ?? 0) + (char.height ?? 0)/2;
    const fx = this.x + this.width/2, fy = this.y + this.height/2;
    const close = Math.hypot(cx - fx, cy - fy) <= 300;

    if (!this.transitioning) {
      if (close && !this.inBubbleMode) {
        this.transitioning = true;
        this.playOnce(this.IMAGE_SETS.transition, 150, () => {
          this.transitioning = false;
          this.inBubbleMode = true;   // Ticker spielt jetzt bubbleSwim
        });
      } else if (!close && this.inBubbleMode) {
        this.transitioning = true;
        this.playOnceReverse(this.IMAGE_SETS.transition, 150, () => {
          this.transitioning = false;
          this.inBubbleMode = false;  // Ticker spielt jetzt swimming
        });
      }
    }

    setTimeout(loop, t);
  };
  loop();
}


  startFrameTicker() {
    setInterval(() => {
      if (this.transitioning) return; // Transition dominiert Frames
      const set = this.inBubbleMode
        ? this.IMAGE_SETS.bubbleSwim
        : this.IMAGE_SETS.swimming;
      this.playAnimation(set); // 1 Frame vorrücken
    }, 120);
  }

  playOnce(images, speed, done) {
    let i = 0;
    const id = setInterval(() => {
      if (i >= images.length) {
        clearInterval(id);
        done && done();
        return;
      }
      const img = this.imageCache[images[i]];
      if (img) this.img = img;
      i++;
    }, speed);
  }

  playOnceReverse(images, speed, done) {
    let i = images.length - 1;
    const id = setInterval(() => {
      if (i < 0) {
        clearInterval(id);
        done && done();
        return;
      }
      const img = this.imageCache[images[i]];
      if (img) this.img = img;
      i--;
    }, speed);
  }

  startPatrolLoop() {
    setInterval(() => {
      if (this.patrolMinX == null) return;
      this.otherDirection ? this.moveRight() : this.moveLeft();
      if (this.x <= this.patrolMinX)
        (this.x = this.patrolMinX), (this.otherDirection = true);
      if (this.x >= this.patrolMaxX)
        (this.x = this.patrolMaxX), (this.otherDirection = false);
    }, 1000 / 60);
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = true;
  }
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = false;
  }
}
