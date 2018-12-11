const Scene = require(`./../classes/Scene.js`);
const Trophy = require(`./../classes/Trophy.js`);
const Background = require(`./../classes/Background.js`);

class End {
  constructor() {
    this.name = `endState`;
  }

  setActive(bool) {
    this.isActive = bool;
    bool ? this.setup() : this.quit();
  }

  setup() {
    Scene.create(`end-canvas`);
    this.createBackground();
    this.createTrophy();
    this.checkWinner();
    this.loop();
  }

  checkWinner() {
    const p1 = localStorage.getItem(`player1`);
    const p2 = localStorage.getItem(`player2`);

    (p1 > p2) ? console.log(`player 1 won`) : console.log(`player 2 won`);
  }

  createBackground() {
    Scene.scene.add(Background.particles);
  }

  createTrophy() {
    this.trophy = new Trophy();
    Scene.scene.add(this.trophy.mesh);
  }

  loop() {
    if (this.isActive) {
      requestAnimationFrame(() => this.loop());
    } else {
      return;
    }
    
    Background.update();
    this.trophy.update();

    Scene.renderer.render(Scene.scene, Scene.camera);
  }

  quit() {
    const $canvas = document.querySelector(`.end-canvas`);
    if ($canvas) $canvas.remove();
  }
}

module.exports = new End();