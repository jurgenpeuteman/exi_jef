const THREE = require(`three`);
const data = require(`./../objects/Data.js`);
const Lib = require(`./../functions/lib.js`);
const uniqid = require(`uniqid`);



class Cassette {
  constructor() {
    this.id = uniqid();
    this.cassetteGroup = new THREE.Group();
    this.score = 20;
    console.log(data.font);
    

    const colors = [`Red`, `Blue`, `Green`];
    const color = colors[Lib.random(0, colors.length)];

    //const mat = new THREE.TextureLoader().load(`./assets/textures/Group/cassette${color}.png`);
    const mat = new THREE.TextureLoader().load(`./assets/textures/cassette.png`);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: mat,
      metalness: .2,
      roughness: 10,
      wireframe: false,
      flatShading: true
    });

    
    //CASSETTE BASE
    this.cassetteBase = new THREE.Mesh(data.cassetteGeom, material);
    this.cassetteBase.position.set(0, 300, - 50);
    //this.cassetteBase.rotation.x = - 30 * Math.PI / 180;
    this.cassetteBase.name = `cassette`;
    this.cassetteBase.receiveShadow = true;
    this.cassetteBase.castShadow = true;
    this.cassetteBase.scale.set(.11, .11, .11);
    this.cassetteGroup.add(this.cassetteBase);
    
    //HOLES
    this.cassetteHole1 = new THREE.Mesh(data.cassetteHoleGeom, material);
    this.cassetteHole1.position.set(10.5, 301.5, - 50);
    this.cassetteHole1.scale.set(.11, .11, .11);
    this.cassetteGroup.add(this.cassetteHole1);

    this.cassetteHole2 = new THREE.Mesh(data.cassetteHoleGeom, material);
    this.cassetteHole2.position.set(- 10.5, 301.5, - 50);
    this.cassetteHole2.scale.set(.11, .11, .11);
    this.cassetteGroup.add(this.cassetteHole2);
    this.createText();
  }

  createText() {
    //TEXT
    this.scoreTextGeom = new THREE.TextGeometry(`Your score is: ${this.score}`, {
      font: data.font,
      size: 2,
      height: 5,
      curveSegments: 2
    });

    const material = new THREE.MeshStandardMaterial({color: 0x000000});
    this.scoreText = new THREE.Mesh(this.scoreTextGeom, material);
    this.scoreText.name = `text`;
    this.scoreText.position.set(- 20, 308, - 53.1);
    this.cassetteGroup.add(this.scoreText);
  }

  updateScore() {
    this.cassetteGroup.remove(this.scoreText);
    this.score ++;
    this.createText();
  }

  updateHoles() {
    this.cassetteHole1.rotation.z ++;
    this.cassetteHole2.rotation.z ++;
    
  }
}


module.exports = Cassette;