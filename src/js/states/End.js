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
    this.checkWinner();
    this.loop();
  }

  checkWinner() {
    console.log(localStorage);
    const p1 = localStorage.getItem(`player1`);
    const p2 = localStorage.getItem(`player2`);

    (p1 > p2) ? this.createWinnerScreen(1) : this.createWinnerScreen(2);
  }

  createWinnerScreen(selectedBlock) {
    const w = 16;
    const block = w / 2;
    const blockHalf = block / 2;

    this.trophy = new Trophy(((block * selectedBlock) - blockHalf) - (w / 2));
    Scene.scene.add(this.trophy.mesh);

    this.createText();
  }

  createText() {
    const p1 = localStorage.getItem(`player1`);
    const p2 = localStorage.getItem(`player2`);

    const $container = document.querySelector(`.container`);
    const $section = document.createElement(`section`);
    const $p1Container = document.createElement(`div`);
    const $p2Container = document.createElement(`div`);
    const $p1Title = document.createElement(`h1`);
    const $p2Title = document.createElement(`h1`);
    const $p1Score = document.createElement(`p`);
    const $p2Score = document.createElement(`p`);

    $section.classList.add(`end-container`);
    $p1Container.classList.add(`end-p1`);
    $p2Container.classList.add(`end-p2`);
    $p1Title.classList.add(`player-end-title`);
    $p2Title.classList.add(`player-end-title`);
    $p1Score.classList.add(`player-score`);
    $p2Score.classList.add(`player-score`);

    $p1Title.textContent = `Player 1`;
    $p2Title.textContent = `Player 2`;
    $p1Score.textContent = `${p1}`;
    $p2Score.textContent = `${p2}`;

    $container.appendChild($section);
    $section.appendChild($p1Container);
    $section.appendChild($p2Container);

    $p1Container.appendChild($p1Score);
    $p1Container.appendChild($p1Title);
    $p2Container.appendChild($p2Score);
    $p2Container.appendChild($p2Title);
  }

  createBackground() {
    Scene.scene.add(Background.particles);
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