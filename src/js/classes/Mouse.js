const THREE = require(`three`);

class Mouse {
  constructor() {
    this.scene;
    this.x;
    this.mouse;
    this.lives = 3;

    const geom = new THREE.SphereGeometry(100, 200, 200);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffff00
    });
    
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
  }

  moveMouse(v, m) {
    const sx = m.position.x;
    const sr = m.geometry.boundingSphere.radius * 2;

    //WIDTH / 2 omdat het null punt van three (voor een of andere reden) in het midden staat
    //dus vb: Width = 900  ->  0 + 450 is helemaal rechts van scherm / 0 - 450 is helemaal links het scherm
    // v > .5 && sx < this.scene.WIDTH / 2 - sr ? m.position.x += 10 : m.position.x -= 10;
    if (v > .5 && sx < this.scene.WIDTH / 2 - sr) {
      console.log(`meer`);
      m.position.x += 10;
    } else if (v < .5 && sx > - this.scene.WIDTH / 2 + sr) {
      console.log(`minder`);
      m.position.x -= 10;
    }

    console.log(m.position.x);
  }
}

module.exports = Mouse;