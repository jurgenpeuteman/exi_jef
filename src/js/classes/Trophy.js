const THREE = require(`three`);
const data = require(`../objects/Data.js`);

class Trophy {
  constructor() {
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
    this.mesh.scale.set(.04, .04, .04);
  }

  update() {
    this.mesh.rotation.y += .002;
  }
}

module.exports = Trophy;