const THREE = require(`three`);

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
    console.log(this.camera);

    

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false
    });

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    
    const geometry = new THREE.SphereGeometry(4000, 100, 100, 1);
    const material = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: true});
    const floor = new THREE.Mesh(geometry, material);
    floor.position.y = - 4000;
    floor.position.z = 2000;
    floor.name = `floor`;
    this.scene.add(floor);


    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x7E0, .5);
    const ambientLight = new THREE.AmbientLight(0xdc8874, .5);

    this.scene.add(hemisphereLight);
    this.scene.add(ambientLight);

    
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    
    
    document.querySelector(`.container`).appendChild(this.renderer.domElement);
    window.addEventListener(`resize`, () => this.handleWindowResize(), false);

    window.scene = this.scene;
    window.camera = this.camera;
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