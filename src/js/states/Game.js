const Mouse = require(`./../classes/Mouse.js`);
const Scene = require(`./../classes/Scene.js`);
const Arduino = require(`./../classes/Arduino.js`);
const BalanceBoardReader = require(`./../classes/BalanceBoardReader.js`);
const Foot = require(`./../classes/Foot.js`);
const Dancefloor = require(`./../classes/Dancefloor.js`);
const Cassette = require(`./../classes/Cassette.js`);
const Background = require(`./../classes/Background.js`);
const THREE = require(`three`);

let feet = [];
const collidableMeshList = [];

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
    Scene.create();
    this.createBackground();
    this.createDancefloor();
    this.createMouse();

    Arduino.on(`btnPressed`, v => this.createFoot(this.checkedPressedButton(v)));
    BalanceBoardReader.on(`oscMessage`, v => this.mouse.moveMouse(v));

    this.loop();
    const axesHelper = new THREE.AxesHelper(300);
    Scene.scene.add(axesHelper);
  }

  createBackground() {
    Scene.scene.add(Background.particles);
    this.cassette = new Cassette();
    Scene.scene.add(this.cassette.cassetteGroup);
    //this.cassette.cassetteGroup.position.x = 50;
  }

  createDancefloor() {
    Scene.scene.add(Dancefloor.mesh);
  }

  createMouse() {
    this.mouse = new Mouse();
    Scene.scene.add(this.mouse.mesh);
    console.log(this.mouse);
    
  }

  createFoot(selectedBlock) {
    const w = 12;
    const block = w / 4;
    const blockHalf = block / 2;

    feet.push(new Foot(((block * selectedBlock) - blockHalf) - (w / 2)));
    Scene.scene.add(feet[feet.length - 1].mesh);

    collidableMeshList.push(feet[feet.length - 1].mesh);
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
    
    const originPoint = this.mouse.mesh.position.clone();
    console.log(this.mouse);
    for (let i = 0;i < this.mouse.mesh.geometry.vertices.length;i ++) {
      const localVertex = this.mouse.mesh.geometry.vertices[i].clone();
      const globalVertex = localVertex.applyMatrix4(this.mouse.mesh.matrix);
      const directionVector = globalVertex.sub(this.mouse.mesh.position);

      const ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
      const collisionResults = ray.intersectObjects(collidableMeshList);
      if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length())
        console.log(`hit`);
    }
  }

  quit() {
    if (document.querySelector(`canvas`)) document.querySelector(`canvas`).remove();
  }

  loop() {
    Background.update();
    Dancefloor.update();


    feet.forEach(f => {
      f.update();
      f.checkLocation();
      if (f.outOfSight) {
        Scene.scene.remove(f.mesh);
        f.mesh.geometry.dispose();
        f.mesh.material.dispose();
        f.mesh = undefined;
      }
    });

    feet = feet.filter(f => !f.outOfSight);

    this.checkCollisions();
    this.cassette.updateHoles();
    //Scene.scene.remove(this.cassette.cassetteGroup.children[3]);
    this.cassette.updateScore();

    Scene.renderer.render(Scene.scene, Scene.camera);
    requestAnimationFrame(() => this.loop());
  }
}

module.exports = new Game();