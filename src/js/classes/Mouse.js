const THREE = require(`three`);
const Lib = require(`./../functions/lib.js`);
const data = require(`./../objects/Data.js`);
const uniqid = require(`uniqid`);

class Mouse {
  constructor() {
    this.mouse;
    this.lives = 3;
    this.score = 0;
    this.id = uniqid();

    const geom = data.mouseGeom;
    const mat = new THREE.MeshPhongMaterial({
      color: 0xA9A9A9,
      flatShading: true
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.name = this.id;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.mesh.position.set(0, 301, 1);
    this.mesh.scale.set(.8, .8, .8);
    this.mesh.rotation.y = 180 * Math.PI / 180;
    this.mesh.geometry.mergeVertices();

    // collision box
    this.mouseBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.mouseBox.setFromObject(this.mesh);
    this.mouseBox.id = this.id;
  }

  moveMouse(v) {
    this.mesh.position.x = Lib.map(v, 0.35, 0.70, - 4.3, 4.3);
    this.mouseBox.setFromObject(this.mesh);
  }
  
  increaseScore() {
    this.score += .18;
  }

  checkLives() {
    if (this.lives === 0) return true;
  }
}

module.exports = Mouse;