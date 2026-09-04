let canvas;
let world;
let keyboard = new Keyboard();

let backgroundMusic = new Audio("assets/audio/backgroundSound.mp3");
let bossMusic = new Audio("assets/audio/backgroundbossFight.mp3");

backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;

bossMusic.loop = true;
bossMusic.volume = 0.3;

function init() {
  canvas = document.getElementById("canvas");
}

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  backgroundMusic.currentTime = 1;
  backgroundMusic.play();
  world = new World(canvas, keyboard);
}

function playBossMusic() {
  backgroundMusic.pause();

  bossMusic.currentTime = 1;
  bossMusic.play();
}

function showInstructions() {
  document.getElementById("instructions").classList.remove("d-none");
}

function hideInstructions() {
  document.getElementById("instructions").classList.add("d-none");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.code === "KeyA") {
    keyboard.LEFT = true;
  }
  if (event.key === "ArrowUp" || event.code === "KeyW") {
    keyboard.UP = true;
  }
  if (event.key === "ArrowRight" || event.code === "KeyD") {
    keyboard.RIGHT = true;
  }
  if (event.key === "ArrowDown" || event.code === "KeyS") {
    keyboard.DOWN = true;
  }
  if (event.code === "KeyF") {
    keyboard.F = true;
  }
  if (event.code === "KeyE") {
    keyboard.E = true;
  }
  console.log(event);
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft" || event.code === "KeyA") {
    keyboard.LEFT = false;
  }
  if (event.key === "ArrowUp" || event.code === "KeyW") {
    keyboard.UP = false;
  }
  if (event.key === "ArrowRight" || event.code === "KeyD") {
    keyboard.RIGHT = false;
  }
  if (event.key === "ArrowDown" || event.code === "KeyS") {
    keyboard.DOWN = false;
  }
  if (event.code === "KeyF") {
    keyboard.F = false;
  }
  if (event.code === "KeyE") {
    keyboard.E = false;
  }
  console.log(event);
});
