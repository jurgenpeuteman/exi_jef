const THREE = require(`three`);
const data = require(`./../objects/Data.js`);

class Foot {
  constructor(x) {
    this.x = x;
    this.mouse;
    this.hitTarget = false;

    const mat = new THREE.MeshBasicMaterial({
      color: 0xfa7374
    });
    this.mesh = new THREE.Mesh(data.footGeom, mat);
    this.mesh.position.set(this.x, 990, 800);
    this.mesh.position.x = this.x;
    this.mesh.name = `foot`;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.scale.set(.05, .05, .05);
  }

  update() {
    this.mesh.position.z += 1;
  }
}

module.exports = Foot;