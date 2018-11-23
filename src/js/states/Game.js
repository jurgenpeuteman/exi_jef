const Scene = require(`./../classes/Scene.js`);
// const Mouse = require(`./../classes/Mouse.js`);
const Arduino = require(`./../classes/Arduino.js`);

class Game {

  constructor() {
    this.name = `gameState`;
    this.mouse;
  }

  setActive(bool) {
    bool ? this.init(this.container) : this.quit(this.container);
  }

  init() {
    Scene.create();
    this.loop();

    Arduino.on(`btnPressed`, this.getPressedButton);
  }

  loop() {
    console.log(`🤬 feking loop`);
    Scene.renderer.render(Scene.scene, Scene.camera);
    requestAnimationFrame(this.loop);

    // Update mouse using the Mouse class' moveMouse method
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