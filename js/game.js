let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);

  console.log("My Character is", world.character);
}

document.addEventListener('keydown', (event) => {
  if(event.key === "ArrowLeft" || event.code === "KeyA") {
    keyboard.LEFT = true;
  }
  if(event.key === "ArrowUp" || event.code === "KeyW") {
    keyboard.UP = true;
  }
  if(event.key === "ArrowRight" || event.code === "KeyD") {
    keyboard.RIGHT = true;
  }
  if(event.key === "ArrowDown" || event.code === "KeyS") {
    keyboard.DOWN = true;
  }
  if(event.code === "KeyF") {
    keyboard.F = true;
  }
  if(event.code === "KeyE") {
    keyboard.E = true;
  }
  console.log(event);
});

document.addEventListener('keyup', (event) => {
  if(event.key === "ArrowLeft" || event.code === "KeyA") {
    keyboard.LEFT = false;
  }
  if(event.key === "ArrowUp" || event.code === "KeyW") {
    keyboard.UP = false;
  }
  if(event.key === "ArrowRight" || event.code === "KeyD") {
    keyboard.RIGHT = false;
  }
  if(event.key === "ArrowDown" || event.code === "KeyS") {
    keyboard.DOWN = false;
  }
  if(event.code === "KeyF") {
    keyboard.F = false;
  }
  if(event.code === "KeyE") {
    keyboard.E = false;
  }
console.log(event);
});
