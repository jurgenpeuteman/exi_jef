{
  const osc = require('osc');
  const THREE = require('three');

  let scene,
    camera,
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane,
    HEIGHT,
    WIDTH,
    renderer,
    container;

  const setupOSC = () => {
    const udpPort = new osc.UDPPort({
      localAddress: '127.0.0.1',
      localPort: 8765
    });

    udpPort.on('ready', () => {
      console.log('Listening for OSC over UDP.');
    });

    udpPort.on('message', oscMessage => {
      getWiiValue(oscMessage);
    });

    udpPort.on('error', err => {
      console.log(err);
    });

    udpPort.open();
  };

  const getWiiValue = oscMessage => {
    console.log(oscMessage);
  };

  const createScene = () => {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    scene = new THREE.Scene();

    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 70;
    nearPlane = 1;
    farPlane = 10000;

    camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    camera.position.set.x = 0;
    camera.position.y = 100;
    camera.position.z = 200;

    renderer = new THREE.WebGLRenderer({
      alpha: true, 
      antialias: false 
    });

    renderer.setSize(WIDTH, HEIGHT);

    container = document.getElementById('canvas');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', handleWindowResize, false);

    window.scene = scene;
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
  };

  const init = () => {
    setupOSC();
    createScene();
    loop();
  };

  init();

}