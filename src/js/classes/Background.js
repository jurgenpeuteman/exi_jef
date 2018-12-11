const THREE = require(`three`);
const Lib = require(`./../functions/lib.js`);
// const Colors = require(`./../objects/Colors.js`);

const colors = [0xff6974, 0xfffbf0, 0x95e1ff, 0xf8d472, 0x1d1d1d];
/*
  red: 0xff6974,
  white: 0xfffbf0,
  blue: 0x95e1ff,
  yellow: 0xf8d472,
  black: 0x1d1d1d
*/
class Background {
  constructor() {

    this.particles = new THREE.Group();
    
    const geom = new THREE.TetrahedronGeometry(Lib.random(0, 3), 0);
    for (let i = 0;i < 400;i ++) {
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
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

    this.particles.position.set(0, 300, - 250);
  }

  update() {
    this.particles.rotation.x += 0.0001;
    this.particles.rotation.y -= 0.0004;
  }
}

module.exports = new Background();