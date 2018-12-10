const THREE = require(`three`);
const Colors = require(`./../objects/Colors.js`);
const OrbitControls = require(`three-orbitcontrols`);

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

    //this.renderer.setClearColor(Colors.black);
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    
    const hemisphereLight = new THREE.HemisphereLight(0xfffafa, 0x000000, .5);
    hemisphereLight.position.set(100, 350, 20);
    this.scene.add(hemisphereLight);

    
    // const sun = new THREE.DirectionalLight(0xcdc1c5, 0.4);
    // sun.position.set(20, 302, - 7);
    // sun.castShadow = true;
    // this.scene.add(sun);
    

    const spotLight = new THREE.SpotLight(0xffffff, .8);
    spotLight.position.set(100, 350, 90);
    spotLight.rotation.x = 25 * Math.PI / 180;

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    console.log(spotLight);
    
    this.scene.add(spotLight);

    const light = new THREE.PointLight(0xADADAD, .4, 300);
    light.position.set(50, 320, 50);
    this.scene.add(light);
   
    //this.scene.fog = new THREE.Fog(0xA9A9A9, 20, 100);

    // this.scene.fog = new THREE.FogExp2(0xA9A9A9, 0.01);
    // this.renderer.gammeFactor = 1.5;
    // this.renderer.gammaInput = true;
    // this.renderer.gammaOutput = true;
   
    document.querySelector(`.container`).appendChild(this.renderer.domElement);
    window.addEventListener(`resize`, () => this.handleWindowResize(), false);

    window.scene = this.scene;
    window.camera = this.camera;

    const axesHelper = new THREE.AxesHelper(300);
    this.scene.add(axesHelper);

    document.querySelector(`canvas`).classList.add(className);

    // const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.25;
    // controls.enableZoom = true;
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