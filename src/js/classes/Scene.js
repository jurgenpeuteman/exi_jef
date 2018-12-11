const THREE = require(`three`);

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

    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
   
    document.querySelector(`.container`).appendChild(this.renderer.domElement);
    window.addEventListener(`resize`, () => this.handleWindowResize(), false);

    window.scene = this.scene;
    window.camera = this.camera;

    this.scene.add(new THREE.AxesHelper(310));

    this.addLights();

    document.querySelector(`canvas`).classList.add(className);
  }

  addLights() {
    // gradient colored light
    this.hemisphereLight = new THREE.HemisphereLight(0x9dfad7, 0x000000, .9);
    
    this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);
    this.shadowLight.position.set(150, 310, 10);

    this.ambientLight = new THREE.AmbientLight(0xdc8874, .5);

    this.shadowLight.castShadow = true;

    // zichtbare area voor de schaduw definieren
    this.shadowLight.shadow.camera.left = - 400;
    this.shadowLight.shadow.camera.right = 400;
    this.shadowLight.shadow.camera.top = 400;
    this.shadowLight.shadow.camera.bottom = - 400;
    this.shadowLight.shadow.camera.near = 1;
    this.shadowLight.shadow.camera.far = 1000;

    this.shadowLight.shadow.mapSize.width = 2048;
    this.shadowLight.shadow.mapSize.height = 2048;

    this.scene.add(this.hemisphereLight);
    this.scene.add(this.shadowLight);
    this.scene.add(this.ambientLight);
  }

  addFog() {
    this.scene.fog = new THREE.Fog(0x1d1d1d, 10, 5);
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