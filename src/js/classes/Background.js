const THREE = require(`three`);
const Lib = require(`./../functions/lib.js`);
const Colors = require(`./../objects/Colors.js`);

class Background {
  constructor() {
    this.particles = new THREE.Group();
    
    const geom = new THREE.TetrahedronGeometry(Lib.random(0, 4), 0);

    for (let i = 0;i < 800;i ++) {
      const material = new THREE.MeshPhongMaterial({
        color: Colors.blue,
        flatShading: true
      });

      const mesh = new THREE.Mesh(geom, material);

      mesh.position.set((Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 500);
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;

      this.particles.add(mesh);
    }

    this.particles.position.set(0, 300, - 200);
  }

  update() {
    this.particles.rotation.x += 0.0001;
    this.particles.rotation.y -= 0.0004;
  }
}

module.exports = new Background();