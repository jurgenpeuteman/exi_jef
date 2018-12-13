const THREE = require(`three`);
const data = require(`./../objects/Data.js`);
const Colors = require(`./../objects/Colors.js`);
const uniqid = require(`uniqid`);



class Cassette {
  constructor() {
    this.id = uniqid();
    this.cassetteGroup = new THREE.Group();
    this.heartGroup = new THREE.Group();
    this.heart1;
    this.heart2;
    this.heart3;

    const mat = new THREE.TextureLoader().load(`./assets/textures/cassette.png`);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: mat,
      metalness: .4,
      roughness: .8,
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

    const x = 0, y = 0;

    const heartShape = new THREE.Shape();

    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    const extrudeSettings = {amount: 10, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1};
    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);


    
    this.heart = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 0xd43434}));
    this.heart.name = `heart`;
    this.heart.position.set(6, 315, - 48);
    this.heart.rotation.x = 180 * Math.PI / 180;
    this.heart.scale.set(.15, .15, .15);
    this.heartGroup.add(this.heart);

    this.heart2 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 0xd43434}));
    this.heart2.name = `heart2`;
    this.heart2.position.set(10, 315, - 48);
    this.heart2.rotation.x = 180 * Math.PI / 180;
    this.heart2.scale.set(.15, .15, .15);
    this.heartGroup.add(this.heart2);


    this.heart3 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 0xd43434}));
    this.heart3.name = `heart3`;
    this.heart3.position.set(14, 315, - 48);
    this.heart3.rotation.x = 180 * Math.PI / 180;
    this.heart3.scale.set(.15, .15, .15);
    this.heartGroup.add(this.heart3);

    this.cassetteGroup.add(this.heartGroup);
    this.heartGroup.position.set(3.5, .3, 0);
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

    //this.cassetteGroup.rotation.x = - 2 * Math.PI / 180;

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