const THREE = require(`three`);

class Dancefloor {
  constructor() {
    const geom = new THREE.SphereGeometry(4000, 100, 100, 1);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x0e2255,
      wireframe: true
    });

    this.mesh =  new THREE.Mesh(geom, mat);
    this.mesh.position.y = - 4000;
    this.mesh.position.z = 2000;
    this.mesh.name = `dancefloor`;

    window.dancefloor = this.mesh;
  }

  update() {
    this.mesh.rotation.x += .002;
  }
}

module.exports = new Dancefloor();