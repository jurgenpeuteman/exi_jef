const THREE = require(`three`);
const data = require(`./../objects/Data.js`);
const Lib = require(`./../functions/lib.js`);
const Colors = require(`./../objects/Colors.js`);
const uniqid = require(`uniqid`);



class Cassette {
  constructor() {
    this.id = uniqid();
    this.cassetteGroup = new THREE.Group();

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
    this.cassetteBase.position.set(0, 305, - 50);
    this.cassetteBase.name = `cassette`;
    this.cassetteBase.receiveShadow = true;
    this.cassetteBase.castShadow = true;
    this.cassetteBase.scale.set(.11, .11, .11);
    this.cassetteGroup.add(this.cassetteBase);
    
    //HOLES
    this.cassetteHole1 = new THREE.Mesh(data.cassetteHoleGeom, material);
    this.cassetteHole1.position.set(10.5, 306.5, - 50);
    this.cassetteHole1.scale.set(.11, .11, .11);
    this.cassetteGroup.add(this.cassetteHole1);
    this.cassetteHole2 = new THREE.Mesh(data.cassetteHoleGeom, material);
    this.cassetteHole2.position.set(- 10.5, 306.5, - 50);
    this.cassetteHole2.scale.set(.11, .11, .11);
    this.cassetteGroup.add(this.cassetteHole2);
    this.createText();
  }

  createText(score) {
    this.scoreTextGeom = new THREE.TextGeometry(`Afstand: ${score}m`, {
      font: data.font,
      size: 2,
      height: 5,
      curveSegments: 2
    });

    const material = new THREE.MeshStandardMaterial({color: Colors.black});
    this.scoreText = new THREE.Mesh(this.scoreTextGeom, material);
    this.scoreText.name = `score`;
    this.scoreText.position.set(- 20, 312.5, - 53.1);
    this.cassetteGroup.add(this.scoreText);
  }

  updateScoreText(score) {
    this.cassetteGroup.remove(this.scoreText);
    this.createText(Math.floor(score));
  }

  updateHoles() {
    this.cassetteHole1.rotation.z += .01;
    this.cassetteHole2.rotation.z += .01;
  }
}

module.exports = Cassette;