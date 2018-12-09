const Scene = require(`../classes/Scene.js`);
const Arduino = require(`../classes/Arduino.js`);
const BalanceBoardReader = require(`../classes/BalanceBoardReader.js`);
const Trophy = require(`../classes/Trophy.js`);
const THREE = require(`three`);
const $section = document.createElement(`section`);


class GameEnd {
  constructor() {
    this.name = `gameEndState`;
    this.trophy;
    this.container = document.querySelector(`.container`);
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
  }

  setActive(bool) {
    bool ? this.setup() : this.quit(this.container);
  }

  setup() {
    this.createScene();
    this.createTrophy();
    this.createWinningText();
    this.loop();
  }

  createScene() {
    $section.classList.add(`gameEndRenderContainer`);
    this.container.appendChild($section);
    
    Scene.create(`.gameEndRenderContainer`);
    Scene.renderer.setSize(this.WIDTH / 2, this.HEIGHT / 2);
  }

  createTrophy() {
    this.trophy = new Trophy();
    console.log(this.trophy);
    Scene.scene.add(this.trophy.mesh);
  }

  createWinningText() {
    const $win = document.createElement(`h1`);
    $win.textContent = `player 1 WON with a score of 10000!!!!!`;

    $section.appendChild($win);
  }

  loop() {
    this.trophy.updateTrophy();
    Scene.renderer.render(Scene.scene, Scene.camera);
    //Scene.scene.children[3].rotation.y += .1;
    requestAnimationFrame(() => this.loop());
  }

  quit() {
    if (document.querySelector(`canvas`)) document.querySelector(`canvas`).remove();
  }


}

module.exports = new GameEnd();