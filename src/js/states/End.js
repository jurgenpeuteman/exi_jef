const Scene = require(`./../classes/Scene.js`);
const Trophy = require(`./../classes/Trophy.js`);
const Background = require(`./../classes/Background.js`);

class End {
  constructor() {
    this.name = `endState`;
  }

  setActive(bool) {
    bool ? this.setup() : this.quit();
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

  quit() {
    const $canvas = document.querySelector(`.end-canvas`);
    if ($canvas) $canvas.remove();
  }
}

module.exports = new End();