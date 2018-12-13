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

    const $startContainer = document.createElement(`div`);
    $startContainer.classList.add(`startContainer`);

    const $section1 = document.createElement(`section`);
    $section1.classList.add(`startContent`);

    const $div1 = document.createElement(`div`);
    $div1.classList.add(`start1`);
    const $d1title = document.createElement(`h1`);
    $d1title.classList.add(`startd1`);
    $d1title.textContent = `Player 1`;
    const $d1imageContainer = document.createElement(`div`);
    const $d1image = document.createElement(`img`);
    $d1image.src = `./assets/img/start/1.png`;
    $d1image.width = `300`;
    $d1image.height = `300`;
    $d1imageContainer.classList.add(`startImageContainer`);
    const $d1text = document.createElement(`p`);
    $d1text.textContent = `Versla de muis met de dansen op de dansvloer`;
    $div1.appendChild($d1title);
    $div1.appendChild($d1imageContainer);
    $d1imageContainer.appendChild($d1image);
    $div1.appendChild($d1text);

    const $div2 = document.createElement(`div`);
    $div2.classList.add(`start2`);
    const $d2title = document.createElement(`h1`);
    $d2title.classList.add(`startd1`);
    $d2title.textContent = `Player 2`;
    const $d2imageContainer = document.createElement(`div`);
    $d2imageContainer.classList.add(`startImageContainer`);
    const $d2image = document.createElement(`img`);
    $d2image.src = `./assets/img/start/2.png`;
    $d2image.width = `300`;
    $d2image.height = `300`;
    $d2imageContainer.classList.add(`startImageContainer`);
    const $d2text = document.createElement(`p`);
    $d2text.textContent = `Probeer de voeten te ontwijken en geraak zo ver mogelijk`;
    $div2.appendChild($d2title);
    $div2.appendChild($d2imageContainer);
    $d2imageContainer.appendChild($d2image);
    $div2.appendChild($d2text);

    const $div3 = document.createElement(`div`);
    $div3.classList.add(`start3`);
    const $d3title = document.createElement(`h1`);
    $d3title.classList.add(`startd1`);
    $d3title.textContent = `Wissel`;
    const $d3imageContainer = document.createElement(`div`);
    $d3imageContainer.classList.add(`startImageContainer`);
    const $d3image = document.createElement(`img`);
    $d3image.src = `./assets/img/start/3.png`;
    $d3image.width = `300`;
    $d3image.height = `300`;
    $d3imageContainer.classList.add(`startImageContainer`);
    const $d3text = document.createElement(`p`);
    $d3text.textContent = `Na de eerste ronde wissel je van plaats`;
    $div3.appendChild($d3title);
    $div3.appendChild($d3imageContainer);
    $d3imageContainer.appendChild($d3image);
    $div3.appendChild($d3text);


    const $section2 = document.createElement(`section`);
    $section2.classList.add(`startButton`);

    const $pressButtonText = document.createElement(`h1`);
    $pressButtonText.textContent = `Press the startbutton to play`;

    const $buttonImage = document.createElement(`img`);
    $buttonImage.src = `./assets/img/button.png`;
    $buttonImage.width = `372`;
    $buttonImage.height = `227`;
    $section2.appendChild($pressButtonText);
    $section2.appendChild($buttonImage);

    
    container.appendChild($startContainer);
    $startContainer.appendChild($section1);
    $startContainer.appendChild($section2);
    $section1.appendChild($div1);
    $section1.appendChild($div2);
    $section1.appendChild($div3);



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