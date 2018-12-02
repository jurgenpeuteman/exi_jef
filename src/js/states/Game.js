const Mouse = require(`./../classes/Mouse.js`);
const Scene = require(`./../classes/Scene.js`);
const Arduino = require(`./../classes/Arduino.js`);
const BalanceBoardReader = require(`./../classes/BalanceBoardReader.js`);
const Foot = require(`./../classes/Foot.js`);
const Dancefloor = require(`./../classes/Dancefloor.js`);

let feet = [];
const footBoxes = [];

class Game {
  constructor() {
    this.name = `gameState`;
    this.mouse;
  }

  setActive(bool) {
    bool ? this.setup(this.container) : this.quit(this.container);
  }

  setup() {
    Scene.create();
    this.createDancefloor();
    this.createMouse();
    
    Arduino.on(`btnPressed`, v => this.createFoot(this.checkedPressedButton(v)));
    BalanceBoardReader.on(`oscMessage`, v => this.mouse.moveMouse(v));

    this.loop();
  }

  createDancefloor() {
    Scene.scene.add(Dancefloor.mesh);
  }

  createMouse() {
    this.mouse = new Mouse();
    Scene.scene.add(this.mouse.mesh);
  }

  createFoot(selectedBlock) {
    const w = window.innerWidth / 50;
    const block = w / 4;
    const blockHalf = block / 2;
    
    feet.push(new Foot(((block * selectedBlock) - blockHalf) - (w / 2)));
    Scene.scene.add(feet[feet.length - 1].mesh);

    footBoxes.push(feet[feet.length - 1].feetBox);
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

  checkCollisions() {
    // footBoxes.forEach(box => box.intersectsBox(this.mouse.mouseBox) ? console.log(`Hit ${box.id}`) : console.log(`no hit`));
    // alle voeten die gebotst hebben met de muis wissen + levens muis verminderen
    // hittarget = true -> adhv dit de objecten filteren/verwijderen uit de scene
    // wissen uit array
  }

  quit() {
    if (document.querySelector(`canvas`)) document.querySelector(`canvas`).remove();
  }

  loop() {
    Dancefloor.update();

    feet.forEach(f => {
      f.update();
      f.checkLocation();
      if (f.outOfSight) Scene.remove(f.mesh.name);
    });

    feet = feet.filter(f => !f.outOfSight);
    
    this.checkCollisions();

    Scene.renderer.render(Scene.scene, Scene.camera);
    requestAnimationFrame(() => this.loop());
  }
}

module.exports = new Game();