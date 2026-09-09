let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = false;
let soundMuted = localStorage.getItem("soundMuted") === "true";

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
bossMusic.volume = 0.2;

gameOverMusic.loop = true;
gameOverMusic.volume = 0.2;

/**
 * Initializes the game canvas, controls, and sound state.
 *
 * @returns {void}
 */
function init() {
  canvas = document.getElementById("canvas");
  initKeyboardControls();
  disableControlContextMenu();
  applySoundState();
}

/**
 * Starts a new game and initializes the game world.
 */
function startGame() {
  enterFullscreen();
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
 * Opens the game in fullscreen mode.
 *
 * @returns {void}
 */
function enterFullscreen() {
  const element = document.documentElement;

  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
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
  localStorage.setItem("soundMuted", soundMuted);
  backgroundMusic.muted = soundMuted;
  bossMusic.muted = soundMuted;
  gameOverMusic.muted = soundMuted;
  muteObjectSounds();
  updateSoundButton();
}

/**
 * Updates the sound button based on the current mute state.
 *
 * @returns {void}
 */
function updateSoundButton() {
  const button = document.getElementById("soundButton");
  if (button) button.innerText = soundMuted ? "🔇" : "🔊";
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
 * Applies the saved mute state to the game sounds and sound button.
 *
 * @returns {void}
 */
function applySoundState() {
  backgroundMusic.muted = soundMuted;
  bossMusic.muted = soundMuted;
  gameOverMusic.muted = soundMuted;
  muteObjectSounds();
  updateSoundButton();
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

/**
 * Disables the context menu on mobile control buttons.
 *
 * @returns {void}
 */
function disableControlContextMenu() {
  document.querySelectorAll(".control-button").forEach((button) => {
    button.addEventListener("contextmenu", (event) => event.preventDefault());
  });
}
