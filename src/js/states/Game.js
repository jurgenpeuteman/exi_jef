const Mouse = require(`./../classes/Mouse.js`);
const Scene = require(`./../classes/Scene.js`);
const Arduino = require(`./../classes/Arduino.js`);
const BalanceBoardReader = require(`./../classes/BalanceBoardReader.js`);
const CollisionDetector = require(`./../classes/CollisionDetector.js`);
const Foot = require(`./../classes/Foot.js`);
const Dancefloor = require(`./../classes/Dancefloor.js`);

const feet = [];

class Game {
  constructor() {
    this.name = `gameState`;
    this.mouse;
    this.mouseFootCollisionDetector;
  }

  setActive(bool) {
    bool ? this.setup(this.container) : this.quit(this.container);
  }

  setup() {
    Scene.create();
    this.createDancefloor();
    this.createMouse();
    this.mouseFootCollisionDetector = new CollisionDetector();


    Arduino.on(`btnPressed`, v => this.createFoot(this.checkedPressedButton(v)));
    BalanceBoardReader.on(`oscMessage`, v => this.mouse.moveMouse(v));
    this.mouseFootCollisionDetector.on(`collision`, this.handleCollisionMouseFoot);

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
    const w = window.innerWidth;
    const block = (w / 4);
    const blockHalf = block / 2;

    feet.push(new Foot((block * selectedBlock) + blockHalf));
    console.log(feet[feet.length - 1].mesh);
    Scene.scene.add(feet[feet.length - 1].mesh);
  }
  
  handleCollisionMouseFoot(m, f) {
    console.log(m, f);
    // foot hitTarget = true
    // update score
    // mouse.lives -- 
  }

  checkedPressedButton(name) {
    console.log(name);
    switch (name) {
    case `L`:
      console.log(`Left`);
      return 1;
    case `SL`:
      console.log(`Semi left`);
      return 2;
    case `R`:
      console.log(`Right`);
      return 4;
    case `SR`:
      console.log(`Semi right`);
      return 3;
    default:
      console.log(`Left`);
      return 1;
    }
  }

  quit() {
    if (document.querySelector(`canvas`)) document.querySelector(`canvas`).remove();
  }

  loop() {
    feet.forEach(foot => foot.update());
    Dancefloor.update();
    // alle voeten buiten beeld wissen uit de array (filter)
    // alle voeten die een collision hebben gehad moeten uit de array gewist worden -> filter op basis van hittarget

    Scene.renderer.render(Scene.scene, Scene.camera);
    requestAnimationFrame(() => this.loop());
  }
}

module.exports = new Game();