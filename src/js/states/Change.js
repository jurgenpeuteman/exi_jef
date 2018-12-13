const Arduino = require(`./../classes/Arduino.js`);
const BalanceBoardReader = require(`./../classes/BalanceBoardReader.js`);
const timeout = require(`../functions/lib.js`).timeout;
const Scene = require(`./../classes/Scene.js`);
const Background = require(`./../classes/Background.js`);

class Change {
  constructor() {
    this.name = `changeState`;
    this.danceboothChange = false;
    this.boardChange = false;
    this.events = false;
  }

  setActive(bool) {
    this.isActive = bool;
    
    this.container = document.querySelector(`.container`);
    bool ? this.setup() : this.removeContent(this.container);
  }

  setup() {
    Scene.create(`change-canvas`);
    this.createBackground();
    this.addContent();
    setTimeout(() => this.addEvents(), 3000);

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
    this.onBoothChangeReady = v => this.danceBoothChangeReady(v);
    this.onBalanceChangeReady = v => this.boardChangeReady(v);

    Arduino.on(`powerButtonPressed`, this.onBoothChangeReady);
    BalanceBoardReader.on(`changeStart`, this.onBalanceChangeReady);
  }

  addContent() {    
    Arduino.blinkPower();

    const $section = document.createElement(`section`);
    $section.classList.add(`menu-change`);

    const $sectionTxt = document.createElement(`section`);
    $sectionTxt.classList.add(`switch-container`);

    const $switch = document.createElement(`p`);
    $switch.textContent = `Wissel van plaats`;
    $switch.classList.add(`vs`);

    const $div1 = document.createElement(`div`);
    const $player1 = document.createElement(`h1`);
    const $function1 = document.createElement(`h2`);
    const $p1Image = document.createElement(`img`);
    const $p1Arrow = document.createElement(`img`);
    $div1.classList.add(`player-container`);
    $player1.textContent = `Player 2`;
    $player1.classList.add(`player-title`);
    $p1Image.src = `./assets/img/balanceboard.png`;
    $p1Image.width = `620`;
    $p1Image.height = `151`;
    $p1Image.classList.add(`balanceboard`);
    $p1Image.classList.add(`switch`);
    $p1Arrow.src = `./assets/img/arrow.svg`;
    $p1Arrow.width = `35`;
    $p1Arrow.height = `35`;
    $p1Arrow.classList.add(`arrow`);
    $function1.classList.add(`function`);
    $function1.textContent = `Balanceboard`;

    const $div2 = document.createElement(`div`);
    const $player2 = document.createElement(`h1`);
    const $function2 = document.createElement(`h2`);
    const $p2Image = document.createElement(`img`);
    const $p2Arrow = document.createElement(`img`);
    $div2.classList.add(`player-container`);
    $player2.textContent = `Player 1`;
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

    this.container.appendChild($sectionTxt);
    $sectionTxt.appendChild($switch);
    this.container.appendChild($section);
    $section.appendChild($div1);
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
      Arduino.off(`powerButtonPressed`, this.onBoothChangeReady);
      BalanceBoardReader.off(`changeStart`, this.onBalanceChangeReady);
    }

    const $section = container.querySelector(`.menu-change`);
    if ($section) $section.remove();

    const $sectionTxt = container.querySelector(`.switch-container`);
    if ($sectionTxt) $sectionTxt.remove();

    const $canvas = document.querySelector(`.change-canvas`);
    if ($canvas) $canvas.remove();
  }

  checkPlayers() {
    return new Promise(resolve => {
      if (this.danceboothChange && this.boardChange) {
        resolve();
      } else {
        timeout(500)
          .then(() => this.checkPlayers())
          .then(() => resolve());
      }
    });
  }

  styleChangeActive(player) {
    const $playerContainer = document.querySelectorAll(`.player-container`)[player];
    $playerContainer.style.backgroundColor = `#b2f7d9`;
    $playerContainer.querySelector(`.arrow`).style.opacity = `0`;
  }

  danceBoothChangeReady() {
    if (!this.danceboothChange) this.styleChangeActive(1);
    this.danceboothChange = true;
    Arduino.stopPowerBlink();
  }

  boardChangeReady(v) {
    if (v !== `0.50`) {
      if (!this.boardChange) this.styleChangeActive(0);
      this.boardChange = true;
    }
    this.checkPlayers();
  }
}

module.exports = new Change();