/**
 * Contains all image and sound configurations used by the character.
 */
const CHARACTER_CONFIG = {
  images: {
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
      "img/1.Sharkie/2.Long_IDLE/I1.png",
      "img/1.Sharkie/2.Long_IDLE/I2.png",
      "img/1.Sharkie/2.Long_IDLE/I3.png",
      "img/1.Sharkie/2.Long_IDLE/I4.png",
      "img/1.Sharkie/2.Long_IDLE/I5.png",
      "img/1.Sharkie/2.Long_IDLE/I6.png",
      "img/1.Sharkie/2.Long_IDLE/I7.png",
      "img/1.Sharkie/2.Long_IDLE/I8.png",
      "img/1.Sharkie/2.Long_IDLE/I9.png",
      "img/1.Sharkie/2.Long_IDLE/I10.png",
      "img/1.Sharkie/2.Long_IDLE/I11.png",
      "img/1.Sharkie/2.Long_IDLE/I12.png",
      "img/1.Sharkie/2.Long_IDLE/I13.png",
      "img/1.Sharkie/2.Long_IDLE/I14.png",
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
  },

  sounds: {
    swim: ["assets/audio/sharkieSwim.mp3", 0.2],
    sleepStart: ["assets/audio/sharkieSleepStart.mp3", 0.4],
    sleepLoop: ["assets/audio/sharkieSleepLoop.mp3", 0.4],
    punch: ["assets/audio/sharkiePunch.mp3", 0.5],
    hurt: ["assets/audio/sharkieHurt.mp3", 0.5],
    bubbleAttack: ["assets/audio/sharkieBubble.mp3", 0.5],
    dead: ["assets/audio/sharkieDead.mp3", 0.5],
  },
};