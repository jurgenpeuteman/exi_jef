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
    this.light2;
    this.light3;
    this.light4;
    this.light5;
    this.light6;
    this.light7;
    this.lightGroup = new THREE.Group();
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

    const spotLight = new THREE.SpotLight(0xffffff, .7);
    spotLight.position.set(150, 355, 90);
    spotLight.rotation.x = 25 * Math.PI / 180;

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    
    this.scene.add(spotLight);

    const light = new THREE.PointLight(0xADADAD, .4, 300);
    light.position.set(50, 320, 50);
    this.scene.add(light);

    const hemisphereLight2 = new THREE.AmbientLight(0xfffafa, 0x000000, .4);
    hemisphereLight.position.set(100, 500, - 800);
    this.scene.add(hemisphereLight2);
    /*
    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);


    //set up color this.lights
 
    const intensity = .5;
    const distance = 100;
    const decay = 2.0;

    const c1 = 0xff0040,
      c2 = 0x0040ff,
      c3 = 0x80ff80,
      c4 = 0xffaa00,
      c5 = 0x00ffaa,
      c6 = 0xff1100;

    const dot = new THREE.SphereGeometry(0.25, 16, 8);

    this.light2 = new THREE.PointLight(c1, intensity, distance, decay);
    this.light2.add(new THREE.Mesh(dot, new THREE.MeshBasicMaterial({
      color: c1
    })));
  
    this.lightGroup.add(this.ligth2);

    this.light3 = new THREE.PointLight(c2, intensity, distance, decay);
    this.light3.add(new THREE.Mesh(dot, new THREE.MeshBasicMaterial({
      color: c2
    })));
    this.lightGroup.add(this.ligth3);

    this.light4 = new THREE.PointLight(c3, intensity, distance, decay);
    this.light4.add(new THREE.Mesh(dot, new THREE.MeshBasicMaterial({
      color: c3
    })));
    this.lightGroup.add(this.ligth4);

    this.light5 = new THREE.PointLight(c4, intensity, distance, decay);
    this.light5.add(new THREE.Mesh(dot, new THREE.MeshBasicMaterial({
      color: c4
    })));
    this.lightGroup.add(this.ligth5);

    this.light6 = new THREE.PointLight(c5, intensity, distance, decay);
    this.light6.add(new THREE.Mesh(dot, new THREE.MeshBasicMaterial({
      color: c5
    })));
    this.lightGroup.add(this.ligth6);

    this.light7 = new THREE.PointLight(c6, intensity, distance, decay);
    this.light7.add(new THREE.Mesh(dot, new THREE.MeshBasicMaterial({
      color: c6
    })));
    this.lightGroup.add(this.ligth7);  
    this.lightGroup.position.set(0, 350, 20);
    //this.scene.fog = new THREE.Fog(0xA9A9A9, 20, 100);
*/
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
  }

  updateSpotLights () {
    const time = Date.now() * 0.0025;
    const d = 100;
    this.light2.position.x = Math.cos(time * 0.3) * d;
    this.light2.position.y = Math.cos(time * 0.1) * d;
    this.light2.position.z = Math.sin(time * 0.7) * d;

    this.light3.position.x = Math.sin(time * 0.5) * d;
    this.light3.position.y = Math.cos(time * 0.1) * d;
    this.light3.position.z = Math.sin(time * 0.5) * d;

    this.light4.position.x = Math.sin(time * 0.3) * d;
    this.light4.position.y = Math.sin(time * 0.1) * d;
    this.light4.position.z = Math.sin(time * 0.5) * d;

    this.light5.position.x = Math.cos(time * 0.3) * d;
    this.light5.position.y = Math.cos(time * 0.1) * d;
    this.light5.position.z = Math.sin(time * 0.5) * d;

    this.light6.position.x = Math.cos(time * 0.5) * d;
    this.light6.position.y = Math.sin(time * 0.3) * d;
    this.light6.position.z = Math.cos(time * 0.5) * d;

    this.light7.position.x = Math.cos(time * 0.5) * d;
    this.light7.position.y = Math.sin(time * 0.1) * d;
    this.light7.position.z = Math.cos(time * 0.5) * d;
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