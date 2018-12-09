const THREE = require(`three`);
const Lib = require(`./../functions/lib.js`);

class Particle {
  constructor(x) {
    this.x = x;
    this.visible = false;

    const geom = new THREE.DodecahedronGeometry(Lib.random(0, 3));
    const mat = new THREE.MeshPhongMaterial({
      color: 0xA9A9A9,
      flatShading: true
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.position.set(this.x, 301, 1);
    this.mesh.scale.set(.1, .1, .1);
  }

  moveParticle() {
    this.mesh.position.x += Lib.random(- Lib.random(- .05, 0.4), Lib.random(- .05, 0.4));
    this.mesh.position.y += Lib.random(- Lib.random(- .05, 0.4), Lib.random(- .05, 0.4));
    this.mesh.position.z -= Lib.random(Lib.random(0, 0.4), Lib.random(0, 0.4));
  }
}

module.exports = Particle;