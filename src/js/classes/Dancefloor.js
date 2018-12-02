const THREE = require(`three`);

class Dancefloor {
  constructor() {
    const geom = new THREE.CylinderGeometry(800, 800, window.innerWidth, 40, 10);

    geom.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI / 2));
    geom.applyMatrix(new THREE.Matrix4().makeRotationY(- Math.PI / 2));

    const mat = new THREE.MeshPhongMaterial({
      color: 0xff707a,
      flatShading: true,
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
  }

  update() {
    this.mesh.rotation.x += 0.005;
  }
}

module.exports = new Dancefloor();