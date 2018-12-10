const Scene = require(`./../classes/Scene.js`);
const Trophy = require(`./../classes/Trophy.js`);
const Background = require(`./../classes/Background.js`);

class End {
  constructor() {
    this.name = `endState`;
  }

  setActive(bool) {
    this.container = document.querySelector(`.container`);
    bool ? this.setup() : this.removeContent(this.container);
  }

  setup() {
    Scene.create(`end-canvas`);
    this.createBackground();
    this.createTrophy();
    this.loop();
  }

  createBackground() {
    Scene.scene.add(Background.particles);
  }

  createTrophy() {
    this.trophy = new Trophy();
    Scene.scene.add(this.trophy.mesh);
  }

  loop() {
    Background.update();
    this.trophy.update();

    Scene.renderer.render(Scene.scene, Scene.camera);
    requestAnimationFrame(() => this.loop());
  }

  removeContent(container) {
    const $canvas = container.querySelector(`.end-canvas`);
    if ($canvas) $canvas.remove();
  }
}

module.exports = new End();