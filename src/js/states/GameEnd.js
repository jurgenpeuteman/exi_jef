const Scene = require(`../classes/Scene.js`);
const Arduino = require(`../classes/Arduino.js`);
const BalanceBoardReader = require(`../classes/BalanceBoardReader.js`);
const Trophy = require(`../classes/Trophy.js`);
const THREE = require(`three`);

class GameEnd {
  constructor() {
    this.name = `gameEndState`;
    this.trophy;
  }

  setActive(bool) {
    bool ? this.setup(this.container) : this.quit(this.container);
  }

  setup() {
    Scene.create();
    this.createTrophy();
    console.log(`gameEndState`);
    this.loop();
  }

  createTrophy() {
    this.trophy = new Trophy();
    Scene.scene.add(this.trophy.mesh);
  }

  loop() {
    Scene.renderer.render(Scene.scene, Scene.camera);
    requestAnimationFrame(() => this.loop());
  }

  quit() {
    if (document.querySelector(`canvas`)) document.querySelector(`canvas`).remove();
  }


}

module.exports = new GameEnd();