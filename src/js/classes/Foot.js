const THREE = require(`three`);
const data = require(`./../objects/Data.js`);

class Foot {
  constructor(x) {
    this.x = x;
    this.mouse;
    this.hitTarget = false;

    const colors = [`Red`, `Blue`, `Pink`, `Black`, `Green`];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const mat = new THREE.TextureLoader().load(`./assets/textures/vans${color}.png`);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: mat,
      metalness: .3,
      roughness: .5,
      wireframe: false
    });
  
    material.name = color;

    /*
    const mat = new THREE.MeshBasicMaterial({
      color: 0xfa7374
    });
*/
    this.mesh = new THREE.Mesh(data.footGeom, material);
    this.mesh.position.x = this.x;
    this.mesh.position.z = 3500;
    this.mesh.castShadow = true;
    this.mesh.geometry.computeVertexNormals();
    //this.mesh.scale.set(.1, .1, .1);
    //this.mesh.position.y = (- window.innerHeight / 2) + 800;
    this.mesh.receiveShadow = true;
  }

  update() {
    console.log(`👟 Move forward`);
    this.mesh.position.y -= 10;
  }
}

module.exports = Foot;