const Mouse = require(`./../classes/Mouse.js`);
const Scene = require(`./../classes/Scene.js`);
const Arduino = require(`./../classes/Arduino.js`);
const BalanceBoardReader = require(`./../classes/BalanceBoardReader.js`);
const Foot = require(`./../classes/Foot.js`);
const Dancefloor = require(`./../classes/Dancefloor.js`);
const Cassette = require(`./../classes/Cassette.js`);
const Background = require(`./../classes/Background.js`);
const Audio = require(`./../classes/Audio.js`);
const timeout = require(`../functions/lib.js`).timeout;
const random = require(`../functions/lib.js`).random;

let feet = [];
let footBoxes = [];
const particleCount = 10;

class Game {
  constructor(name, cn) {
    this.name = name;
    this.cn = cn;
    this.savedScore = false;
    this.mouse;
    this.cassette;
    this.events = false;
    this.activatePowerUp = false;
    this.showPowerVisual = false;
  }

  setActive(bool) {
    this.isActive = bool;
    bool ? this.setup() : this.quit();
  }

  addEvents() {
    this.events = true;
    this.onButtonPressed = v => this.createFoot(this.checkButtonPressed(v));
    this.onMove = v => this.mouse.moveMouse(v);
    this.onPowerUp = v => this.activatePower(v);

    Arduino.on(`btnPressed`, this.onButtonPressed);
    Arduino.on(`powerButtonPressed`, this.onPowerUp);
    BalanceBoardReader.on(`oscMessage`, this.onMove);
  } 

  setup() {
    this.addEvents();

    Scene.create(this.cn);
    this.createBackground();
    this.createDancefloor();
    this.createMouse();
    this.setupAudio();
    this.setupPowerUp();
    this.checkGameOver();
    this.loop();
  }

  createBackground() {
    Scene.scene.add(Background.particles);
    this.cassette = new Cassette();
    Scene.scene.add(this.cassette.cassetteGroup);
  }

  createDancefloor() {
    Scene.scene.add(Dancefloor.mesh);
  }

  createMouse() {
    this.mouse = new Mouse();
    Scene.scene.add(this.mouse.mouseGroup);
  }
  
  setupAudio() {
    this.audio = new Audio();
    Scene.camera.add(this.audio.listener);
    Scene.camera.add(this.audio.listener2);
  }

  createFoot(selectedBlock) {  
    this.powerUpCounter ++;
  
    const w = 12;
    const block = w / 4;
    const blockHalf = block / 2;

    feet.push(new Foot(((block * selectedBlock) - blockHalf) - (w / 2)));
    Scene.scene.add(feet[feet.length - 1].mesh);
  }

  checkButtonPressed(name) {
    switch (name) {
    case `L`:
      return 1;
    case `SL`:
      return 2;
    case `R`:
      return 4;
    case `SR`:
      return 3;
    default:
      return 1;
    }
  }

  removeMesh(m) {
    Scene.scene.remove(m.mesh);
    m.mesh.geometry.dispose();
    m.mesh.material.dispose();
    m.mesh = undefined;
  }

  checkCollisions() {
    footBoxes.forEach(box => {
      if (box.intersectsBox(this.mouse.mouseBox)) {
        feet.forEach(f => {
          if (f.id === box.id) f.hitTarget = true;
        });
        this.audio.hitSound.play();
        Arduino.rgbDead();
        this.decreaseLives();
      }
    });
  }

  decreaseLives() {
    this.mouse.lives --;
    this.cassette.heartGroup.remove(this.cassette.heartGroup.children.splice(- 1, 1));
  }

  saveScore() {
    (localStorage.length === 0) ? localStorage.setItem(`player1`, Math.floor(this.mouse.score)) : localStorage.setItem(`player2`, Math.floor(this.mouse.score));
  }

  checkGameOver() {
    return new Promise(resolve => {
      if (this.mouse.checkLives()) {
        if (this.activatePowerUp) {
          Scene.removeFog();
        }
        resolve();
      } else {
        timeout(500)
          .then(() => this.checkGameOver())
          .then(() => resolve());
      }
    });
  }

  updateFootBoxes() {
    footBoxes = [];
    feet.forEach(f => footBoxes.push(f.footBox));
  }

  setupPowerUp() {
    this.powerUp = random(5, 18);
    this.powerUpCounter = 0;
  }

  checkPowerUp() {
    if (this.powerUpCounter === this.powerUp) {
      this.activatePowerUp = true;
      this.showPowerVisual = true;
      if (this.showPowerVisual) {
        if (document.querySelector(`.powerup-section`)) {
          console.log(`neuj`);
        } else {
          this.powerUpOnScreen();
        }
      }

      Arduino.blinkPower();
      Arduino.blinkRgb(`#ffff00`);
    }
  }

  powerUpOnScreen() {
    this.showPowerVisual = false;

    const $section = document.createElement(`section`);
    $section.classList.add(`powerup-section`);

    const $power = document.createElement(`h1`);
    $power.classList.add(`powerup-title`);
    $power.textContent = `Power up`;

    const $img = document.createElement(`img`);
    $img.src = `./assets/img/button.png`;
    $img.width = `472`;
    $img.height = `327`;
    $img.classList.add(`button`);

    const $arrow = document.createElement(`img`);
    $arrow.src = `./assets/img/arrow.svg`;
    $arrow.width = `35`;
    $arrow.height = `35`;
    $arrow.classList.add(`arrow`);

    $section.appendChild($power);
    $section.appendChild($arrow);
    $section.appendChild($img);

    document.querySelector(`.container`).appendChild($section);
  }

  removePowerOnScreen() {
    const $powerSection = document.querySelector(`.powerup-section`);
    if ($powerSection) $powerSection.remove();
  }

  activatePower() {
    if (this.activatePowerUp) {
      this.removePowerOnScreen();

      Arduino.stopPowerBlink();
      Arduino.stopBlinkRgb();

      this.activatePowerUp = false;
      
      Scene.addFog();
      setTimeout(() => this.deactivatePowerUp(), 4000);
    }
  }

  deactivatePowerUp() {
    Scene.removeFog();
    this.setupPowerUp();
  }

  quit() {
    if (this.events) {
      this.audio.themeSong.stop();
      this.audio.themeSong.pause();
      Arduino.rgbAlive();
      Arduino.stopBlinkRgb();
      Arduino.off(`btnPressed`, this.onButtonPressed);
      Arduino.off(`powerButtonPressed`, this.activatePower);
      BalanceBoardReader.off(`oscMessage`, this.onMove);
    }

    const $canvas = document.querySelector(`.${this.cn}`);
    if ($canvas) $canvas.remove();
  }

  loop() {
    if (this.isActive) {
      requestAnimationFrame(() => this.loop());
    } else {
      return;
    }
    
    Background.update();
    Dancefloor.update();
    this.cassette.updateHoles();
    this.mouse.increaseScore();
    this.mouse.updateRunning();
    this.cassette.updateScoreText(this.mouse.score);
    this.checkCollisions();
    this.checkPowerUp();

    feet.forEach(f => {
      f.update();
      f.checkLocation();
      if (f.outOfSight) this.removeMesh(f);
    });

    if (!this.savedScore) {
      if (this.mouse.checkLives()) {
        feet = [];
        footBoxes = [];
        this.saveScore();
        this.savedScore = true;
      }
    }

    feet = feet.filter(f => !f.outOfSight);

    feet.forEach(f => {
      if (f.hitTarget) {
        this.mouse.blinkMouse();
        this.removeMesh(f);
      }
    });

    feet = feet.filter(f => !f.hitTarget);
    this.updateFootBoxes();

    Scene.renderer.render(Scene.scene, Scene.camera);
    
  }
}

module.exports = Game;