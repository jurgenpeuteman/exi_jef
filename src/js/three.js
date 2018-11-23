{
  const BalanceBoardReader = require(`./classes/BalanceBoardReader.js`);
  const Arduino = require(`./classes/Arduino.js`);
  const THREE = require(`three`);

  const loadingState = require(`./states/loadingState.js`);
  const menuState = require(`./states/menuState.js`);

  const states = [
    menuState,
    loadingState
  ];

  let scene,
    camera,
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane,
    HEIGHT,
    WIDTH,
    renderer,
    sphere;

  const createScene = () => {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    scene = new THREE.Scene();

    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 45;
    nearPlane = 1;
    farPlane = 10000;

    camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    camera.position.set.x = 0;
    camera.position.z = 800;

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false
    });
    renderer.setSize(WIDTH, HEIGHT);

    document.body.appendChild(renderer.domElement);

    window.addEventListener(`resize`, handleWindowResize, false);
    window.scene = scene;
  };

  const createSphere = () => {
    const geometry = new THREE.SphereGeometry(100, 200, 200);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffff00
    });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
  };

  const controlBall = v => {
    console.log(v);
    const sx = sphere.position.x;
    const sr = sphere.geometry.boundingSphere.radius * 2;

    //WIDTH / 2 omdat het null punt van three (voor een of andere reden) in het midden staat
    //dus vb: Width = 900  ->  0 + 450 is helemaal rechts van scherm / 0 - 450 is helemaal links het scherm
    if (v > .5 && sx < WIDTH / 2 - sr) {
      sphere.position.x += 10;
    } else if (v < .5 && sx > - WIDTH / 2 + sr) {
      sphere.position.x -= 10;
    }
  };

  const keyPressed = e => {
    switch (e.key) {
    case `ArrowLeft`:
      sphere.position.x -= 10;
      break;
    case `ArrowRight`:
      sphere.position.x += 10;
      break;
    }
    e.preventDefault();
  };

  const handleWindowResize = () => {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  };

  const loop = () => {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
    document.body.addEventListener(`keydown`, keyPressed, false);
  };

  const setState = name => {
    // overloop alle states
    states.forEach(state => {
      if (state.name === name) {
        state.setActive(true);
      } else {
        state.setActive(false);
      }
    });
  };


  const load = () => {
    setState(`menuState`);
    const button = document.getElementById(`startButton`);
    button.addEventListener(`click`, () => setState(`loadingState`));
  };
  
  const getPressedButton = name => {
    switch (name) {
    case `L`:
      console.log(`Left`);
      break;
    case `SL`:
      console.log(`Semi left`);
      break;
    case `R`:
      console.log(`Right`);
      break;
    case `SR`:
      console.log(`Semi right`);
      break;
    default:
      console.log(`Left`);
      break;
    }
  };

  const init = () => {
    load();
    BalanceBoardReader.on(`oscMessage`, controlBall); 
    Arduino.on(`btnPressed`, getPressedButton);
  };

  init();

}