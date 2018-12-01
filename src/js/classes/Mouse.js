const THREE = require(`three`);
const Lib = require(`./../functions/lib.js`);

class Mouse {
  constructor() {
    this.mouse;
    this.lives = 3;
    this.score = 0;

    const cube = new THREE.CubeGeometry(100, 100, 100);
    const mat = new THREE.MeshPhongMaterial({color: 0xffffff});
    this.mesh = new THREE.Mesh(cube, mat);
    this.mesh.position.y = - 200;
    this.mesh.position.z = 3500;

    /*
    const geom = new THREE.SphereGeometry(100, 200, 200);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xfa7374
    });
    
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.position.y = (- window.innerHeight / 2) + 400;
    this.mesh.receiveShadow = true;
    */

    window.myMouse = this;
  }

  moveMouse(v) {
    const sr = this.mesh.geometry.boundingSphere.radius * 2;
    this.mesh.position.x = Lib.map(v, 0.35, 0.65, (- window.innerWidth / 2) + sr, (window.innerWidth / 2) - sr);
  }
}

module.exports = Mouse;