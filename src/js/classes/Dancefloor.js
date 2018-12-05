const THREE = require(`three`);

class Dancefloor {
  constructor() {
    const geom = new THREE.CylinderGeometry(300, 300, 26, 150, 10);

    geom.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI / 2));
    geom.applyMatrix(new THREE.Matrix4().makeRotationY(- Math.PI / 2));

    const material = new THREE.MeshPhongMaterial({
      color: 0xfffbf0,
      flatShading: true,
      visible: true
    });

    this.mesh = new THREE.Mesh(geom, material);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
  }

  update() {
    this.mesh.rotation.x += 0.0005;
  }
}

module.exports = new Dancefloor();