const THREE = require(`three`);
const data = require(`../objects/Data.js`);

class Trophy {
  constructor() {
    console.log(data.trophyGeom);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: .7,
      roughness: .2,
      wireframe: false,
      flatShading: true
    });
    this.mesh = new THREE.Mesh(data.trophyGeom, material);
    this.mesh.position.set(0, 307, 0);
    this.mesh.name = `trophy`;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.scale.set(.05, .05, .05);
  }

  updateTrophy() {
    this.mesh.rotation.y += .02;
  }
}

module.exports = Trophy;