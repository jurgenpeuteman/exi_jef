const Arduino = require(`./../classes/Arduino.js`);
const BalanceBoardReader = require(`./../classes/BalanceBoardReader.js`);
const timeout = require(`../functions/lib.js`).timeout;
const Scene = require(`./../classes/Scene.js`);
const Background = require(`./../classes/Background.js`);

class Menu {
  constructor() {
    this.name = `menuState`;
    this.dancebooth = false;
    this.board = false;
    this.events = false;
  }

  setActive(bool) {
    this.isActive = bool;

    this.container = document.querySelector(`.container`);
    bool ? this.setup() : this.removeContent(this.container);
  }

  setup() {
    Scene.create(`menu-canvas`);
    this.createBackground();
    this.addContent();
    this.addEvents();

    this.loop();
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

    Scene.renderer.render(Scene.scene, Scene.camera);
  }

  addEvents() {
    this.events = true;
    this.onBoothReady = v => this.danceBoothReady(v);
    this.onBalanceReady = v => this.boardReady(v);

    Arduino.on(`powerButtonPressed`, this.onBoothReady);
    BalanceBoardReader.on(`start`, this.onBalanceReady);
  }

  addContent() {
    Arduino.blinkPower();

    const $section = document.createElement(`section`);
    $section.classList.add(`menu`);

    const $div1 = document.createElement(`div`);
    const $player1 = document.createElement(`h1`);
    const $function1 = document.createElement(`h2`);
    const $p1Image = document.createElement(`img`);
    const $p1Arrow = document.createElement(`img`);
    $div1.classList.add(`player-container`);
    $player1.textContent = `Player 1`;
    $player1.classList.add(`player-title`);
    $p1Image.src = `./assets/img/balanceboard.png`;
    $p1Image.width = `620`;
    $p1Image.height = `151`;
    $p1Image.classList.add(`balanceboard`);
    $p1Arrow.src = `./assets/img/arrow.svg`;
    $p1Arrow.width = `35`;
    $p1Arrow.height = `35`;
    $p1Arrow.classList.add(`arrow`);
    $function1.classList.add(`function`);
    $function1.textContent = `Balanceboard`;

    const $vs = document.createElement(`p`);
    $vs.textContent = `vs`;
    $vs.classList.add(`vs`);

    const $div2 = document.createElement(`div`);
    const $player2 = document.createElement(`h1`);
    const $function2 = document.createElement(`h2`);
    const $p2Image = document.createElement(`img`);
    const $p2Arrow = document.createElement(`img`);
    $div2.classList.add(`player-container`);
    $player2.textContent = `Player 2`;
    $player2.classList.add(`player-title`);
    $p2Image.src = `./assets/img/button.png`;
    $p2Image.width = `472`;
    $p2Image.height = `327`;
    $p2Image.classList.add(`button`);
    $p2Arrow.src = `./assets/img/arrow.svg`;
    $p2Arrow.width = `35`;
    $p2Arrow.height = `35`;
    $p2Arrow.classList.add(`arrow`);
    $function2.classList.add(`function`);
    $function2.textContent = `Dancebooth`;

    this.container.appendChild($section);
    $section.appendChild($div1);
    $section.appendChild($vs);
    $section.appendChild($div2);
    $div1.appendChild($player1);
    $div1.appendChild($function1);
    $div1.appendChild($p1Arrow);
    $div1.appendChild($p1Image);
    $div2.appendChild($player2);
    $div2.appendChild($function2);
    $div2.appendChild($p2Arrow);
    $div2.appendChild($p2Image);
  }

  removeContent(container) {
    if (this.events) {
      Arduino.off(`powerButtonPressed`, this.onBoothReady);
      BalanceBoardReader.off(`start`, this.onBalanceReady);
    }

    const $canvas = document.querySelector(`.menu-canvas`);
    if ($canvas) $canvas.remove();
    
    const $section = container.querySelector(`.menu`);
    if ($section) $section.remove();
  }

  checkPlayers() {
    return new Promise(resolve => {
      if (this.dancebooth && this.board) {
        resolve();
      } else {
        timeout(500)
          .then(() => this.checkPlayers())
          .then(() => resolve());
      }
    });
  }

  styleActive(player) {
    const $playerContainer = document.querySelectorAll(`.player-container`)[player];
    $playerContainer.style.backgroundColor = `#b2f7d9`;
    $playerContainer.querySelector(`.arrow`).style.opacity = `0`;
  }

  danceBoothReady() {
    if (!this.dancebooth) this.styleActive(1);
    this.dancebooth = true;
    Arduino.stopPowerBlink();
  }

  boardReady(v) {
    if (v !== `0.50`) {
      if (!this.board) this.styleActive(0);
      this.board = true;
    }
    this.checkPlayers();
  }
}

module.exports = new Menu();