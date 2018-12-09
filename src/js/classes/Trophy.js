const THREE = require(`three`);
const data = require(`../objects/Data.js`);

class Trophy {
  constructor() {
    const material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(data.trophyGeom, material);
    this.mesh.position.set(0, 305, 0);
    this.mesh.name = `trophy`;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.scale.set(.05, .05 , .05);
  }
}

module.exports = Trophy;