class Endboss extends MoveableObject {
    IMAGES_SWIMMING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png'
    ];
    height = 200;
    width = 200;
    y = 50;
    offset = {
      top: 63,
      left: 10,
      right: 14,
      bottom: 30,
    };


    constructor() {
        super().loadImage(this.IMAGES_SWIMMING[0])
        this.loadImages(this.IMAGES_SWIMMING);
        this.x = 300;
        this.animate();
    }

    animate() {
        setInterval(() => {
          this.playAnimation(this.IMAGES_SWIMMING);
        }, 200);
      }
}
