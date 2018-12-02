const THREE = require(`three`);
const data = require(`./../objects/Data.js`);
const Lib = require(`./../functions/lib.js`);

class Foot {
  constructor(x) {
    this.x = x;
    this.hitTarget = false;

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
    // this.mesh.position.set(this.x, 990, 800);
    this.mesh.position.set(0, 990, 980);
    this.mesh.name = `foot`;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.scale.set(.05, .05, .05);

    // collision box
    this.feetBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.feetBox.setFromObject(this.mesh);
  }

  update() {
    // this.mesh.position.z += 1;
  }
}

module.exports = Foot;