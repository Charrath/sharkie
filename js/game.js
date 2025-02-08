let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);

  console.log("My Character is", world.character);
}

document.addEventListener('keydown', (event) => {
  if(event.key === "ArrowLeft") {
    keyboard.LEFT = true;
  }
  if(event.key === "ArrowUp") {
    keyboard.UP = true;
  }
  if(event.key === "ArrowRight") {
    keyboard.RIGHT = true;
  }
  if(event.key === "ArrowDown") {
    keyboard.DOWN = true;
  }
console.log(event);
});

document.addEventListener('keyup', (event) => {
  if(event.key === "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if(event.key === "ArrowUp") {
    keyboard.UP = false;
  }
  if(event.key === "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if(event.key === "ArrowDown") {
    keyboard.DOWN = false;
  }
console.log(event);
});
