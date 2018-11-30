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
    this.camera.position.set.x = 0;
    this.camera.position.z = 800;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false
    });
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    
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