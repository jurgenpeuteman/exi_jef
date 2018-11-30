const Mouse = require(`./../classes/Mouse.js`);
const Scene = require(`./../classes/Scene.js`);
const Arduino = require(`./../classes/Arduino.js`);
const BalanceBoardReader = require(`./../classes/BalanceBoardReader.js`);

class Game {
  constructor() {
    this.name = `gameState`;
    this.mouse;
  }

  setActive(bool) {
    bool ? this.setup(this.container) : this.quit(this.container);
  }

  setup() {
    Scene.create();
    this.createMouse();

    this.loop();
    Arduino.on(`btnPressed`, this.getPressedButton);
    BalanceBoardReader.on(`oscMessage`, this.getMousePosition);
    console.log(window);
  }

  createMouse() {
    this.mouse = new Mouse();

    console.log(this.mouse);
    Scene.scene.add(this.mouse.mesh);
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