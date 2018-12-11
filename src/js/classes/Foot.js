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
    this.i = - Math.PI;

    const colors = [`Red`, `Blue`, `Pink`, `Black`, `Green`];
    const color = colors[Lib.random(0, colors.length)];

    const mat = new THREE.TextureLoader().load(`./assets/textures/lowpolyVans${color}.png`);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: mat,
      metalness: .2,
      roughness: .6,
      wireframe: false,
      flatShading: false
    });
  
    this.mesh = new THREE.Mesh(data.footGeom, material);
    this.mesh.position.set(this.x, 296.3, - 46.9);
    this.mesh.name = this.id;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.scale.set(.02, .02, .02);

    // collision box
    this.footBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.footBox.setFromObject(this.mesh);
    this.footBox.id = this.id;
  }

  update() {
    const r = 300.7;
    const h = Math.atan(this.mesh.position.y / this.mesh.position.z);
    this.mesh.position.z = Math.cos(h - this.i) * r;
    this.mesh.position.y = Math.sin(h - this.i) * r;
    this.mesh.rotation.x = - (Math.atan(this.mesh.position.y / this.mesh.position.z) + (Math.PI / 2));

    this.i += 0.00001;

    this.footBox.setFromObject(this.mesh);
  }

  checkLocation() {
    if (this.mesh.position.z > 0) this.outOfSight = true;
  }
}

module.exports = Foot;