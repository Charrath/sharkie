/**
 * Contains the sound configuration for the character.
 * Each entry defines the audio file path and its volume.
 *
 * @type {Object.<string, [string, number]>}
 */
const CHARACTER_SOUNDS = {
  swim: ["assets/audio/sharkieSwim.mp3", 0.2],
  sleepStart: ["assets/audio/sharkieSleepStart.mp3", 0.4],
  sleepLoop: ["assets/audio/sharkieSleepLoop.mp3", 0.4],
  punch: ["assets/audio/sharkiePunch.mp3", 0.5],
  hurt: ["assets/audio/sharkieHurt.mp3", 0.5],
  bubbleAttack: ["assets/audio/sharkieBubble.mp3", 0.5],
  dead: ["assets/audio/sharkieDead.mp3", 0.5],
};