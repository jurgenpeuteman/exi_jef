const THREE = require(`three`);
const Colors = require(`./../objects/Colors.js`);

class Scene {
  constructor() {
    this.scene;
    this.HEIGHT;
    this.WIDTH;
    this.camera;
    this.aspectRatio;
    this.fieldOfView = 70;
    this.near = 1;
    this.far = 10000;
    this.renderer;
    this.hemisphereLight;
    this.shadowLight;
    this.ambientLight;
  }

  create(className) {
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.aspectRatio = this.WIDTH / this.HEIGHT;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      this.aspectRatio,
      this.near,
      this.far
    );
    this.camera.position.set(0, 306.5, 10);

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    this.renderer.setClearColor(Colors.black);
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(this.WIDTH, this.HEIGHT);

    const hemisphereLight = new THREE.HemisphereLight(0xfffafa, 0x000000, .9);
    this.scene.add(hemisphereLight);

    const sun = new THREE.DirectionalLight(0xcdc1c5, 0.9);
    sun.position.set(12, 6, - 7);
    sun.castShadow = true;
    this.scene.add(sun);
    
    sun.shadow.mapSize.width = 256;
    sun.shadow.mapSize.height = 256;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;

    this.renderer.gammeFactor = 3;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
   
    document.querySelector(`.container`).appendChild(this.renderer.domElement);
    window.addEventListener(`resize`, () => this.handleWindowResize(), false);

    window.scene = this.scene;
    window.camera = this.camera;

    const axesHelper = new THREE.AxesHelper(300);
    this.scene.add(axesHelper);

    document.querySelector(`canvas`).classList.add(className);
  }

  handleWindowResize() {
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;

    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.camera.aspect = this.WIDTH / this.HEIGHT;
    this.camera.updateProjectionMatrix();
  }

  remove(id) {
    this.scene.remove(this.scene.getObjectByName(id));
  }
}

module.exports = new Scene();