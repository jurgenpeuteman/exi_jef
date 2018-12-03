const THREE = require(`three`);
const data = require(`./../objects/Data.js`);
const Lib = require(`./../functions/lib.js`);
const uniqid = require(`uniqid`);

class Foot {
  constructor(x) {
    this.x = x;
    this.hitTarget = false;
    this.id = uniqid();
    this.outOfSight = false;

    const colors = [`Red`, `Blue`, `Pink`, `Black`, `Green`];
    const color = colors[Lib.random(0, colors.length)];

    const mat = new THREE.TextureLoader().load(`./assets/textures/vans${color}.png`);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: mat,
      metalness: .2,
      roughness: 10,
      wireframe: false,
      flatShading: true
    });
  
    this.mesh = new THREE.Mesh(data.footGeom, material);
    this.mesh.position.set(this.x, 300.5, - 100);
    this.mesh.name = this.id;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.scale.set(.02, .02, .02);
  }

  update() {
    this.mesh.position.z += .3;
    this.mesh.position.y += Math.sin(Math.PI);
  }

  checkLocation() {
    if (this.mesh.position.z >= 20) this.outOfSight = true;
  }
}

module.exports = Foot;