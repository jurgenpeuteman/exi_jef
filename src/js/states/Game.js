const Mouse = require(`./../classes/Mouse.js`);
const Scene = require(`./../classes/Scene.js`);
const Arduino = require(`./../classes/Arduino.js`);
const BalanceBoardReader = require(`./../classes/BalanceBoardReader.js`);
const Foot = require(`./../classes/Foot.js`);
const Dancefloor = require(`./../classes/Dancefloor.js`);
const Cassette = require(`./../classes/Cassette.js`);
const Background = require(`./../classes/Background.js`);
const Audio = require(`./../classes/Audio.js`);
const Particle = require(`./../classes/Particle.js`);
const timeout = require(`../functions/lib.js`).timeout;

let feet = [];
let footBoxes = [];
const particles = [];
const particleCount = 10;

class Game {
  constructor() {
    this.name = `gameState`;
    this.mouse;
    this.cassette;
  }

  setActive(bool) {
    bool ? this.setup(this.container) : this.quit(this.container);
  }

  setup() {
    Scene.create(`game-canvas`);
    this.createBackground();
    this.createDancefloor();
    this.createMouse();
    this.setupAudio();

    this.createFoot(3);

    Arduino.on(`btnPressed`, v => this.createFoot(this.checkedPressedButton(v)));
    BalanceBoardReader.on(`oscMessage`, v => this.mouse.moveMouse(v));

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
    Scene.scene.add(this.mouse.mesh);
    //Scene.scene.add(this.mouse.geom);
  }
  
  setupAudio() {
    this.audio = new Audio();
    Scene.camera.add(this.audio.listener);
    Scene.camera.add(this.audio.listener2);
    //this.audio.themeSong.play();
    console.log(this.audio);
  }

  createFoot(selectedBlock) {
    const w = 12;
    const block = w / 4;
    const blockHalf = block / 2;

    feet.push(new Foot(((block * selectedBlock) - blockHalf) - (w / 2)));
    Scene.scene.add(feet[feet.length - 1].mesh);
  }

  checkedPressedButton(name) {
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
        this.mouse.lives --;
        
        //this.cassette.cassetteGroup.remove(`${this.heart}${this.mouse.lives}`);
        //this.cassette.cassetteGroup.heartGroup.remove(this.cassette.cassetteGroup.heartGroup.children.splice(- 1, 2));
        this.audio.hitSound.play();
        this.cassette.heartGroup.remove(this.cassette.heartGroup.children.splice(- 1, 1));
        console.log(this.cassette.heartGroup);
        console.log(`Levens: ${this.mouse.lives}`);
      }
    });
  }

  checkGameOver() {
    return new Promise(resolve => {
      if (this.mouse.checkLives()) {
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

  createParticles(x) {
    for (let i = 0;i < particleCount;i ++) {
      particles.push(new Particle(x));
      Scene.scene.add(particles[particles.length - 1].mesh);
    }
  }

  quit() {
    const $canvas = document.querySelector(`.game-canvas`);
    if ($canvas) $canvas.remove();
  }

  loop() {
    Background.update();
    Dancefloor.update();
    this.cassette.updateHoles();
    this.mouse.increaseScore();
    //this.mouse.updateRunning();
    this.cassette.updateScoreText(this.mouse.score);
    this.checkCollisions();

    // if (this.mouse.checkLives()) {
    //   // footBoxes = [];
    //   // feet = [];


    //   // eventemitter aanspreken om naar wissel state te gaan indien de data in local storage op 1 staat, op 2 = winner state + local storage wissen
    // }

    feet.forEach(f => {
      f.update();
      f.checkLocation();
      if (f.outOfSight) this.removeMesh(f);

      if (f.hitTarget) {
        // this.createParticles(this.mouse.mesh.position.x);
        this.removeMesh(f);
      }
    });

    //particles.forEach(p => console.log(p));
    particles.forEach(p => p.moveParticle());

    feet = feet.filter(f => !f.outOfSight);
    feet = feet.filter(f => !f.hitTarget);
    this.updateFootBoxes();

    Scene.renderer.render(Scene.scene, Scene.camera);
    requestAnimationFrame(() => this.loop());
  }
}

module.exports = new Game();