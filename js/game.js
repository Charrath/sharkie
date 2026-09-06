let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = false;
let soundMuted = false;

let backgroundMusic = new Audio("assets/audio/backgroundSound.mp3");
let bossMusic = new Audio("assets/audio/backgroundSoundBossFight.mp3");
let gameOverMusic = new Audio("assets/audio/backgroundSoundGameOver.mp3");

const keyMap = {
  ArrowLeft: "LEFT",
  KeyA: "LEFT",
  ArrowUp: "UP",
  KeyW: "UP",
  ArrowRight: "RIGHT",
  KeyD: "RIGHT",
  ArrowDown: "DOWN",
  KeyS: "DOWN",
  KeyE: "E",
  KeyF: "F",
};

backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;

bossMusic.loop = true;
bossMusic.volume = 0.3;

gameOverMusic.loop = true;
gameOverMusic.volume = 0.3;

function init() {
  canvas = document.getElementById("canvas");
  initKeyboardControls();
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
  if (world) {
    world.stop();
  }

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
  if (world) {
    world.stop();
  }

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

  if (world?.character) {
    Object.values(world.character.sounds).forEach((sound) => {
      sound.muted = soundMuted;
    });
  }

  document.getElementById("soundButton").innerText = soundMuted ? "🔇" : "🔊";
}

function initKeyboardControls() {
  document.addEventListener("keydown", (event) => setKey(event, true));
  document.addEventListener("keyup", (event) => setKey(event, false));
}

function setKey(event, pressed) {
  const key = keyMap[event.code] || keyMap[event.key];
  if (key) keyboard[key] = pressed;
}
