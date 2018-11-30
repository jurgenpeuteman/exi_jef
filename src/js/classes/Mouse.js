const THREE = require(`three`);
const Lib = require(`./../functions/lib.js`);

class Mouse {
  constructor() {
    this.scene;
    this.x;
    this.mouse;
    this.lives = 3;

    const geom = new THREE.SphereGeometry(100, 200, 200);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffff00
    });
    
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;

    window.myMouse = this;
  }

  moveMouse(v) {
    const sr = this.mesh.geometry.boundingSphere.radius * 2;
    this.mesh.position.x = Lib.map(v, 0.35, 0.65, (- window.innerWidth / 2) + sr, (window.innerWidth / 2) - sr);
  }
}

module.exports = Mouse;