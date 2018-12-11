const THREE = require(`three`);
const Lib = require(`./../functions/lib.js`);
const data = require(`./../objects/Data.js`);
const uniqid = require(`uniqid`);

class Mouse {
  constructor() {
    this.mouse;
    this.geom;
    this.lives = 3;
    this.score = 0;
    this.id = uniqid();
    this.mouseGroup = new THREE.Group();
    this.clock = new THREE.Clock();
    this.mixers  = [];
    
    const Mgeom = data.mouseGeom;
    const mat = new THREE.MeshPhongMaterial({
      color: 0x808080,
      flatShading: true
    });

    this.mesh = new THREE.Mesh(Mgeom, mat);
    this.mesh.name = this.id;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.mesh.position.set(0, 301, 1);
    this.mesh.scale.set(.5, .8, .8);
    this.mesh.rotation.y = 180 * Math.PI / 180;
    this.mesh.geometry.mergeVertices();
    this.mesh.traverse(function (object) { object.visible = false; });
    
    // Animation Running
    this.geom = data.runningMouse;
    this.geom.mixer = new THREE.AnimationMixer(this.geom);
    this.mixers.push(this.geom.mixer);
    const action = this.geom.mixer.clipAction(this.geom.animations[0]);
    action.play();
    this.geom.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    this.geom.scale.set(1, 1, 1);
    this.geom.position.set(0, 300, 1);
    this.geom.rotation.y = 180 * Math.PI / 180;

    this.mouseGroup.add(this.mesh);
    this.mouseGroup.add(this.geom);

    // collision box
    this.mouseBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.mouseBox.setFromObject(this.mesh);
    this.mouseBox.id = this.id;
  }

  updateRunning() {
    if (this.mixers.length > 0) {
      for (let i = 0;i < this.mixers.length;i ++) {
        this.mixers[i].update(this.clock.getDelta());
      }
    }
  }

  moveMouse(v) {
    this.mouseGroup.position.x = Lib.map(v, 0.35, 0.70, - 4.3, 4.3);
    this.mouseBox.setFromObject(this.mesh);
  }
  
  increaseScore() {
    this.score += .18;
  }

  checkLives() {
    if (this.lives === 0) return true;
  }
}

module.exports = Mouse;