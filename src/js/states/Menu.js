const Arduino = require(`./../classes/Arduino.js`);
const BalanceBoardReader = require(`./../classes/BalanceBoardReader.js`);
const timeout = require(`../functions/lib.js`).timeout;

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
    const $p1Arrow = document.createElement(`img`);
    $p1Arrow.src = `./assets/img/menu/arrow.svg`;
    const $p1Image = document.createElement(`img`);
    $p1Image.src = `./assets/img/menu/mouseplayer.png`;


    const $div2 = document.createElement(`div`);
    $div2.classList.add(`player2`);
    const $p2TitleContainer = document.createElement(`div`);
    $p2TitleContainer.classList.add(`player2TitleContainer`);
    const $player2 = document.createElement(`h1`);
    $player2.textContent = `Player 2`;
    const $p2Arrow = document.createElement(`img`);
    $p2Arrow.src = `./assets/img/menu/arrow.svg`;
    const $p2Image = document.createElement(`img`);
    $p2Image.src = `./assets/img/menu/arcadeButton.png`;


    container.appendChild($section);
    $section.appendChild($div1);
    $section.appendChild($div2);
    $div1.appendChild($player1);
    $div1.appendChild($p1Arrow);
    $div1.appendChild($p1Image);
    $div2.appendChild($player2);
    $div2.appendChild($p2Arrow);
    $div2.appendChild($p2Image);
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
        resolve();
      } else {
        timeout(500)
          .then(() => this.checkPlayers())
          .then(() => resolve());
      }
    });
  }

  styleActive(player) {
    document.querySelector(player).style.backgroundColor = `#b2f7d9`;
  }

  danceBoothReady() {
    if (!this.dancebooth) this.styleActive(`.player2`);
    this.dancebooth = true;
  }

  boardReady(v) {
    if (v !== `0.50`) {
      if (!this.board) this.styleActive(`.player1`);
      this.board = true;
    }
    this.checkPlayers();
  }
}

module.exports = new Menu();