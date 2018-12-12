const Arduino = require(`./../classes/Arduino.js`);
const timeout = require(`../functions/lib.js`).timeout;

class Menu {
  constructor() {
    this.name = `startState`;
    this.events = false;
    this.startReady = false;
  }

  setActive(bool) {
    this.isActive = bool;

    this.container = document.querySelector(`.container`);
    bool ? this.addContent(this.container) : this.removeContent(this.container);
  }

  addEvents() {
    this.events = true;
    this.onStart = v => this.start(v);

    Arduino.on(`powerButtonPressed`, this.onStart);
  }

  addContent(container) {
    this.addEvents();

    const $logo = document.createElement(`img`);
    $logo.classList.add(`logo`);
    $logo.src = `./assets/img/logo.png`;
    $logo.width = `2764`;
    $logo.height = `2764`;

    container.appendChild($logo);

    Arduino.ledPower.on();
  }

  removeContent(container) {
    if (this.events) {
      Arduino.off(`start`, this.onStart);
    }

    const $logo = container.querySelector(`.logo`);
    if ($logo) $logo.remove();
  }

  checkStart() {
    return new Promise(resolve => {
      if (this.startReady) {
        resolve();
      } else {
        timeout(500)
          .then(() => this.checkStart())
          .then(() => resolve());
      }
    });
  }

  start() {
    this.startReady = true;
    Arduino.ledPower.off();
  }

  boardReady(v) {
    if (v !== `0.50`) {
      if (!this.board) this.styleActive(0);
      this.board = true;
    }
    this.checkStart();
  }
}

module.exports = new Menu();