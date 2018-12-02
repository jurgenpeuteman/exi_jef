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
    this.mesh.position.set(this.x, 990, 800);
    this.mesh.name = this.id;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.scale.set(.05, .05, .05);

    // collision box
    this.feetBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.feetBox.setFromObject(this.mesh);
    this.feetBox.id = this.id;
  }

  update() {
    this.mesh.position.z += 1;
  }

  checkLocation() {
    if (this.mesh.position.z >= 1100) this.outOfSight = true;
  }
}

module.exports = Foot;