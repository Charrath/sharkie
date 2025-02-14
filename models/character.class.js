class Character extends MoveableObject {
  height = 150;
  width = 200;
  y = 50;
  IMAGES_SWIMMING = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png",
    "img/1.Sharkie/3.Swim/3.png",
    "img/1.Sharkie/3.Swim/4.png",
    "img/1.Sharkie/3.Swim/5.png",
    "img/1.Sharkie/3.Swim/6.png"
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
    "img/1.Sharkie/6.dead/1.Poisoned/12.png"
  ];

  IMAGES_HURT = [
    "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/5.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/1.png"
  ];
  speed = 0.8;
  world;
  offset = {
    top: 120,
    bottom: 85,
    left: 35,
    right: 35,
  };

  constructor() {
    super().loadImage("img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < 1420) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT && this.x > -300) {
        this.x -= this.speed;
        this.otherDirection = true;
      }

      if (this.world.keyboard.UP) {
        this.y -= this.speed;
      }

      if (this.world.keyboard.DOWN) {
        this.y += this.speed;
      }
      this.world.camera_x = -this.x + 100;
    });


    
    setInterval(() => {
      if (this.isDead()) {
        if (!this.deadAnimationComplete) {
          this.playDeadAnimation();
        }
        return;
      } else if(this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, 100);
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


}
