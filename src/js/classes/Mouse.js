const THREE = require(`three`);
const Lib = require(`./../functions/lib.js`);

class Mouse {
  constructor() {
    this.mouse;
    this.lives = 3;
    this.score = 0;
    const geom = new THREE.CubeGeometry(5, 5, 5);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x0e2255,
      flatShading: true
    });
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.name = `Mouse`;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.position.set(0, 990, 980);
  }

  moveMouse(v) {
    const sr = this.mesh.geometry.boundingSphere.radius * 2;
    this.mesh.position.x = Lib.map(v, 0.35, 0.65, (- window.innerWidth / 2) + sr, (window.innerWidth / 2) - sr);
  }
}

module.exports = Mouse;