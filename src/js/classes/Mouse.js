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
    console.log(data);
    
    const mat = new THREE.MeshPhongMaterial({
      color: 0x0e2255,
      flatShading: true
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.name = this.id;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.mesh.position.set(0, 305, 5);
    this.mesh.scale.set(.03, .03, .03);
    this.mesh.rotation.y = 180 * Math.PI / 180;
    
  }

  moveMouse(v) {
    this.mesh.position.x = Lib.map(v, 0.35, 0.65, - 8, 8);
  }
}

module.exports = Mouse;