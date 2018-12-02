const THREE = require(`three`);
const loader = new THREE.JSONLoader();

class Scene {
  constructor() {
    this.scene;
    this.HEIGHT;
    this.WIDTH;
    this.camera;
    this.aspectRatio;
    this.fieldOfView = 45;
    this.nearPlane = 1;
    this.farPlane = 10000;
    this.renderer;
    this.hemisphereLight;
    this.shadowLight;
    this.ambientLight;
    this.controls;
  }

  create() {
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.aspectRatio = this.WIDTH / this.HEIGHT;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      this.aspectRatio,
      this.nearPlane,
      this.farPlane
    );
    this.camera.position.set.x = - 100;
    this.camera.position.z = 4000;

    

    this.renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true
    });

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    
    //FLOOR
    const geometry = new THREE.SphereGeometry(4000, 100, 100, 1);
    const mat = new THREE.TextureLoader().load(`./assets/textures/danceFloor.jpg`);
    mat.wrapS = THREE.RepeatWrapping;
    mat.wrapT = THREE.RepeatWrapping;
    mat.repeat.set(20, 25);
    const material = new THREE.MeshStandardMaterial({
      map: mat,
      color: 0xffffff,
      wireframe: false
    });
    
    const floor = new THREE.Mesh(geometry, material);
    floor.position.y = - 4000;
    floor.position.z = 2000;
    floor.name = `floor`;
    
    floor.receiveShadow = true;
    floor.castShadow = true;
    this.scene.add(floor);


    const hemisphereLight = new THREE.HemisphereLight(0xfffafa, 0x000000, .9);
    this.scene.add(hemisphereLight);
    const sun = new THREE.DirectionalLight(0xcdc1c5, 0.9);
    sun.position.set(12, 6, - 7);
    sun.castShadow = true;
    this.scene.add(sun);
    //Set up shadow properties for the sun light
    sun.shadow.mapSize.width = 256;
    sun.shadow.mapSize.height = 256;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;


    //OUDE LIGHTNING TESTS
    /*
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 200, 100);

    /*
    const partyLight = new THREE.DirectionalLight(0xffffff, .2);
    partyLight.position.set(- 300, 800, 100);
    const randomLight = Math.floor(Math.random() * 1);
    partyLight.color.setRGB(randomLight, randomLight, randomLight);
*/
    /*
    const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, .6);
    hemisphereLight.color.setRGB(0.6, 0.75, 0.5);
    hemisphereLight.groundColor.setRGB(0.095, 0.5, 0.5);
    hemisphereLight.position.set(- 1000, 500, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, .5);

    this.scene.add(directionalLight);
    this.scene.add(hemisphereLight);
    this.scene.add(ambientLight);
*/

    /*
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 1).normalize();
    this.scene.add(light);
    */
    /*
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white ambientLight
    this.scene.add(ambientLight);
*/

    
    this.renderer.gammeFactor = 3;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    
    document.querySelector(`.container`).appendChild(this.renderer.domElement);
    window.addEventListener(`resize`, () => this.handleWindowResize(), false);

    window.scene = this.scene;
    window.camera = this.camera;

    console.log(this.scene);
    
  }

  handleWindowResize() {
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;

    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.camera.aspect = this.WIDTH / this.HEIGHT;
    this.camera.updateProjectionMatrix();
  }
}

module.exports = new Scene();