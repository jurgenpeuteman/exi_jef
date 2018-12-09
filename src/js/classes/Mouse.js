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

    this.mesh.position.set(0, 303, 5);
    this.mesh.scale.set(.02, .02, .02);
    this.mesh.rotation.y = 180 * Math.PI / 180;
    
  }

  moveMouse(v) {
    this.mesh.position.x = Lib.map(v, 0.35, 0.70, - 4.3, 4.3);
  }
  
  increaseScore() {
    this.score += .18;
  }
}

module.exports = Mouse;