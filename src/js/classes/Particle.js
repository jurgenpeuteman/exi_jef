const THREE = require(`three`);
const Lib = require(`./../functions/lib.js`);

class Particle {
  constructor(x) {
    this.x = x;
    this.visible = false;

    const geom = new THREE.DodecahedronGeometry(Lib.random(0, 3));
    const mat = new THREE.MeshPhongMaterial({
      color: 0xff6974,
      flatShading: true
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.position.set(this.x, 301, 1);
  }

  moveParticle() {
    this.mesh.x = - 0.2 + Math.random() * 0.4;
    this.mesh.y = - 0.2 + Math.random() * 0.4;
    this.mesh.z = - 0.2 + Math.random() * 0.4;
  }
}

module.exports = Particle;