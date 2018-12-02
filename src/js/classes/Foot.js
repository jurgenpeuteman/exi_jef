const THREE = require(`three`);
const data = require(`./../objects/Data.js`);
const Lib = require(`./../functions/lib.js`);

class Foot {
  constructor(x) {
    this.x = x;
    this.mouse;
    this.hitTarget = false;

    const colors = [`Red`, `Blue`, `Pink`, `Black`, `Green`];
    const color = colors[Lib.random(0, colors.length)];

    const mat = new THREE.TextureLoader().load(`./assets/textures/vans${color}.png`);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: mat,
      metalness: .3,
      roughness: .5,
      wireframe: false
    });
  
    this.mesh = new THREE.Mesh(data.footGeom, material);
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