const THREE = require(`three`);
const Lib = require(`./../functions/lib.js`);
const uniqid = require(`uniqid`);

class Mouse {
  constructor() {
    this.mouse;
    this.lives = 3;
    this.score = 0;
    this.id = uniqid();

    const geom = new THREE.CubeGeometry(3, 3, 3);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x0e2255,
      flatShading: true
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.name = this.id;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.position.set(0, 990, 980);
  }

  moveMouse(v) {
    this.mesh.position.x = Lib.map(v, 0.35, 0.65, - 10, 10);
  }
}

module.exports = Mouse;