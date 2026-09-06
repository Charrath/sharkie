let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = false;
let soundMuted = false;

let backgroundMusic = new Audio("assets/audio/backgroundSound.mp3");
let bossMusic = new Audio("assets/audio/backgroundSoundBossFight.mp3");
let gameOverMusic = new Audio("assets/audio/backgroundSoundGameOver.mp3");

backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;

bossMusic.loop = true;
bossMusic.volume = 0.3;

gameOverMusic.loop = true;
gameOverMusic.volume = 0.3;

function init() {
  canvas = document.getElementById("canvas");
}

function startGame() {
  gameRunning = true;

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameOverScreen").classList.add("d-none");
  document.getElementById("mobileControls").classList.remove("d-none");
  document.getElementById("gameMenuButtons").classList.remove("d-none");

  backgroundMusic.currentTime = 1;
  backgroundMusic.play();

  level1 = createLevel1();
  world = new World(canvas, keyboard);
}

function showGameOver(won = false) {
  gameRunning = false;

  backgroundMusic.pause();
  bossMusic.pause();

  document.getElementById("gameOverTitle").innerHTML = won
    ? "YOU WIN"
    : "GAME OVER";

  gameOverMusic.currentTime = 0;
  gameOverMusic.play();

  document.getElementById("mobileControls").classList.add("d-none");
  document.getElementById("gameOverScreen").classList.remove("d-none");
  document.getElementById("gameMenuButtons").classList.add("d-none");
}

function restartGame() {
  document.getElementById("gameOverScreen").classList.add("d-none");

  gameOverMusic.pause();
  gameOverMusic.currentTime = 0;

  startGame();
}

function backToMenu() {
  gameRunning = false;

  gameOverMusic.pause();
  gameOverMusic.currentTime = 0;

  document.getElementById("mobileControls").classList.add("d-none");
  document.getElementById("gameOverScreen").classList.add("d-none");
  document.getElementById("startScreen").style.display = "block";
  document.getElementById("gameMenuButtons").classList.add("d-none");
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

function toggleSound() {
  soundMuted = !soundMuted;

  backgroundMusic.muted = soundMuted;
  bossMusic.muted = soundMuted;
  gameOverMusic.muted = soundMuted;

  document.getElementById("soundButton").innerText = soundMuted ? "🔇" : "🔊";
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
