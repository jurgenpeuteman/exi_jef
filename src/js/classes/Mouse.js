const THREE = require(`three`);
const Arduino = require(`./classes/Arduino.js`);

export default class Foot {
  constructor(scene) {
    this.scene = scene;
    this.x;
    this.mouse;
  }

  createMouse() {
    const geometry = new THREE.SphereGeometry(100, 200, 200);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffff00
    });
    this.mouse = new THREE.Mesh(geometry, material);
    this.scene.scene.add(this.mouse);

    Arduino.on(`oscMessage`, this.moveMouse);
  }

  moveMouse(v) {
    console.log(v);

    const sx = this.mouse.position.x;
    const sr = this.mouse.geometry.boundingSphere.radius * 2;

    //WIDTH / 2 omdat het null punt van three (voor een of andere reden) in het midden staat
    //dus vb: Width = 900  ->  0 + 450 is helemaal rechts van scherm / 0 - 450 is helemaal links het scherm
    if (v > .5 && sx < this.scene.WIDTH / 2 - sr) {
      this.mouse.position.x += 10;
    } else if (v < .5 && sx > - this.scene.WIDTH / 2 + sr) {
      this.mouse.position.x -= 10;
    }
  }
}