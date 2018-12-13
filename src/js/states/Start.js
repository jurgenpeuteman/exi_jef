const Arduino = require(`./../classes/Arduino.js`);
const timeout = require(`../functions/lib.js`).timeout;
const Scene = require(`./../classes/Scene.js`);
const Background = require(`./../classes/Background.js`);

class Menu {
  constructor() {
    this.name = `startState`;
    this.events = false;
    this.startReady = false;
  }

  setActive(bool) {
    this.isActive = bool;

    this.container = document.querySelector(`.container`);
    bool ? this.setup(this.container) : this.removeContent(this.container);
  }

  setup(c) {
    this.addEvents();
    Scene.create(`start-canvas`);
    this.createBackground();
    this.addContent(c);

    this.loop();
  }

  addEvents() {
    this.events = true;
    this.onStart = v => this.start(v);

    Arduino.on(`powerButtonPressed`, this.onStart);
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

  addContent(container) {
    const $startContainer = document.createElement(`section`);
    $startContainer.classList.add(`start-container`);

    const $press = document.createElement(`p`);
    $press.classList.add(`btn-start`);
    $press.textContent = `Druk op de gele knop om het spel te starten`;

    const $descriptionContainer = document.createElement(`div`);
    $descriptionContainer.classList.add(`description-container`);

    const $part1 = document.createElement(`article`);
    $part1.classList.add(`description-item`);
    const $part1Title = document.createElement(`h1`);
    $part1Title.classList.add(`description-title`);
    $part1Title.textContent = `De dancebooth`;
    const $part1Img = document.createElement(`img`);
    $part1Img.classList.add(`description-img`);
    $part1Img.src = `./assets/img/start/1.png`;
    const $part1Desc = document.createElement(`p`);
    $part1Desc.classList.add(`description-txt`);
    $part1Desc.textContent = `Verhinder de muis door voeten op de dansvloer te plaatsen.`;

    const $part2 = document.createElement(`article`);
    $part2.classList.add(`description-item`);
    const $part2Title = document.createElement(`h1`);
    $part2Title.classList.add(`description-title`);
    $part2Title.textContent = `Balanceboard`;
    const $part2Img = document.createElement(`img`);
    $part2Img.classList.add(`description-img`);
    $part2Img.src = `./assets/img/start/2.png`;
    const $part2Desc = document.createElement(`p`);
    $part2Desc.classList.add(`description-txt`);
    $part2Desc.textContent = `Ontwijk de voeten en probeer zo ver mogelijk over de dansvloer te lopen.`;

    const $part3 = document.createElement(`article`);
    $part3.classList.add(`description-item`);
    const $part3Title = document.createElement(`h1`);
    $part3Title.classList.add(`description-title`);
    $part3Title.textContent = `Wissel`;
    const $part3Img = document.createElement(`img`);
    $part3Img.classList.add(`description-img`);
    $part3Img.src = `./assets/img/start/3.png`;
    const $part3Desc = document.createElement(`p`);
    $part3Desc.classList.add(`description-txt`);
    $part3Desc.textContent = `Wissel van positie en zie wie het verst over de dansvloer kan lopen!`;

    container.appendChild($startContainer);
    $startContainer.appendChild($descriptionContainer);
    $startContainer.appendChild($press);
    $descriptionContainer.appendChild($part1);
    $part1.appendChild($part1Title);
    $part1.appendChild($part1Img);
    $part1.appendChild($part1Desc);
    $descriptionContainer.appendChild($part2);
    $part2.appendChild($part2Title);
    $part2.appendChild($part2Img);
    $part2.appendChild($part2Desc);
    $descriptionContainer.appendChild($part3);
    $part3.appendChild($part3Title);
    $part3.appendChild($part3Img);
    $part3.appendChild($part3Desc);

    Arduino.ledPower.on();
  }

  removeContent(container) {
    if (this.events) {
      Arduino.off(`start`, this.onStart);
    }

    const $canvas = document.querySelector(`.start-canvas`);
    if ($canvas) $canvas.remove();

    const $start = container.querySelector(`.start-container`);
    if ($start) $start.remove();
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
