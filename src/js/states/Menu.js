const Arduino = require(`./../classes/Arduino.js`);
const BalanceBoardReader = require(`./../classes/BalanceBoardReader.js`);

class Menu {

  constructor() {
    this.name = `menuState`;
    this.dancebooth = false;
    this.board = false;
  }

  setActive(bool) {
    this.container = document.querySelector(`.container`);
    bool ? this.addContent(this.container) : this.removeContent(this.container);

    Arduino.on(`start`, v => this.danceBoothReady(v));
    BalanceBoardReader.on(`start`, v => this.boardReady(v));
  }

  addContent(container) {
    const $btn = document.createElement(`button`);
    $btn.textContent = `start`;
    $btn.id = `startButton`;
    $btn.value = `start`;
    $btn.classList.add(`startButton`);
    container.appendChild($btn);

    const $section = document.createElement(`section`);
    $section.classList.add(`menu`);

    const $div1 = document.createElement(`div`);
    $div1.classList.add(`player1`);
    const $player1 = document.createElement(`h1`);
    $player1.textContent = `Player 1`;

    const $div2 = document.createElement(`div`);
    $div2.classList.add(`player2`);
    const $player2 = document.createElement(`h1`);
    $player2.textContent = `Player 2`;

    container.appendChild($section);
    $section.appendChild($div1);
    $section.appendChild($div2);
    $div1.appendChild($player1);
    $div2.appendChild($player2);
  }

  removeContent(container) {
    const $btn = container.querySelector(`.startButton`);
    const $section = container.querySelector(`.menu`);

    if ($btn) $btn.remove();
    if ($section) $section.remove();
  }

  checkPlayers() {
    return new Promise(resolve => {
      if (this.dancebooth && this.board) {
        console.log(`resolve`);
        resolve();
      }
    });
  }

  styleActive(player) {
    document.querySelector(player).style.backgroundColor = `#b2f7d9`;
  }

  danceBoothReady() {
    if (!this.dancebooth) this.styleActive(`.player1`);
    this.dancebooth = true;
    this.checkPlayers();
  }

  boardReady(v) {
    if (v !== `0.50`) {
      if (!this.board) this.styleActive(`.player2`);
      this.board = true;
    }
    this.checkPlayers();
  }
}

module.exports = new Menu();