import Mouse from "./../classes/Mouse.js";
// const Mouse = require(`./../classes/Mouse.js`);
const Scene = require(`./../classes/Scene.js`);
const Arduino = require(`./../classes/Arduino.js`);
const BalanceBoardReader = require(`./../classes/BalanceBoardReader.js`);

class Game {
  constructor() {
    this.name = `gameState`;
    this.mouse = new Mouse();
  }

  setActive(bool) {
    bool ? this.setup(this.container) : this.quit(this.container);
  }

  setup() {
    Scene.create();
    this.mouse.createMouse(Scene.scene);

    this.loop();
    Arduino.on(`btnPressed`, this.getPressedButton);
    BalanceBoardReader.on(`oscMessage`, this.getMousePosition);
    console.log(window);
  }

  loop() {
    // console.log(`goed bezig loop ❤️!`);
    Scene.renderer.render(Scene.scene, Scene.camera);
    requestAnimationFrame(() => this.loop());
  }

  getMousePosition(v) {
    console.log(v);
    this.mouse.moveMouse(v, this.mouse.mouse);
  }

  getPressedButton(name) {
    switch (name) {
    case `L`:
      console.log(`Left`);
      break;
    case `SL`:
      console.log(`Semi left`);
      break;
    case `R`:
      console.log(`Right`);
      break;
    case `SR`:
      console.log(`Semi right`);
      break;
    default:
      console.log(`Left`);
      break;
    }
  }

  quit() {
    if (document.querySelector(`canvas`)) document.querySelector(`canvas`).remove();
  }
}

module.exports = new Game();