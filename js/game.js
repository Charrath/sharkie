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

/**
 * Initializes the game canvas and keyboard controls.
 */
function init() {
  canvas = document.getElementById("canvas");
  initKeyboardControls();
}

/**
 * Starts a new game and initializes the game world.
 */
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

/**
 * Ends the current game and displays the game over screen.
 *
 * @param {boolean} won - Indicates whether the player has won the game.
 */
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

/**
 * Restarts the game after a game over.
 */
function restartGame() {
  document.getElementById("gameOverScreen").classList.add("d-none");
  gameOverMusic.pause();
  gameOverMusic.currentTime = 0;
  startGame();
}

/**
 * Stops the current game and returns to the start menu.
 */
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

/**
 * Stops the background music and starts the boss fight music.
 */
function playBossMusic() {
  backgroundMusic.pause();
  bossMusic.currentTime = 1;
  bossMusic.play();
}

/**
 * Displays the game instructions.
 */
function showInstructions() {
  document.getElementById("instructions").classList.remove("d-none");
}

/**
 * Hides the game instructions.
 */
function hideInstructions() {
  document.getElementById("instructions").classList.add("d-none");
}

/**
 * Toggles the global sound state and updates all active sounds.
 *
 * @returns {void}
 */
function toggleSound() {
  soundMuted = !soundMuted;
  backgroundMusic.muted = soundMuted;
  bossMusic.muted = soundMuted;
  gameOverMusic.muted = soundMuted;
  muteObjectSounds();
  document.getElementById("soundButton").innerText = soundMuted ? "🔇" : "🔊";
}

/**
 * Updates the mute state of all character and enemy sounds.
 *
 * @returns {void}
 */
function muteObjectSounds() {
  setSoundsMuted(world?.character?.sounds);

  world?.level?.enemies?.forEach((enemy) => {
    setSoundsMuted(enemy.sounds);
  });
}

/**
 * Sets the mute state for all sounds in a sound collection.
 *
 * @param {Object} sounds - Collection of audio objects.
 * @returns {void}
 */
function setSoundsMuted(sounds) {
  if (!sounds) return;

  Object.values(sounds).forEach((sound) => {
    sound.muted = soundMuted;
  });
}

/**
 * Initializes keyboard event listeners for game controls.
 */
function initKeyboardControls() {
  document.addEventListener("keydown", (event) => setKey(event, true));
  document.addEventListener("keyup", (event) => setKey(event, false));
}

/**
 * Updates the state of a game control based on a keyboard event.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by the user.
 * @param {boolean} pressed - Indicates whether the key is pressed or released.
 */
function setKey(event, pressed) {
  const key = keyMap[event.code] || keyMap[event.key];

  if (key) {
    keyboard[key] = pressed;
  }
}
