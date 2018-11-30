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
    this.mesh.position.x = this.x;
    this.mesh.position.y = (- window.innerHeight / 2) + 800;
    this.mesh.receiveShadow = true;
  }

  update() {
    console.log(`👟 Move forward`);
    this.mesh.position.y -= 10;
  }
}

module.exports = Foot;