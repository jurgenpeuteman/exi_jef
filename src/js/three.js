{
  const BalanceBoardReader = require(`./classes/BalanceBoardReader.js`);
  const THREE = require(`three`);

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
    const material = new THREE.MeshBasicMaterial({color: 0xffff00});
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
  };

  const controlBall = v => {
    const sx = sphere.position.x;
    const sr = sphere.geometry.boundingSphere.radius * 2;

    //WIDTH / 2 omdat het null punt van three (voor een of andere reden) in het midden staat
    //dus vb: Width = 900  ->  0 + 450 is helemaal rechts van scherm / 0 - 450 is helemaal links het scherm
    if (v > .5  && sx < WIDTH / 2 - sr) {
      sphere.position.x += 10;
    } else if (v < .5  && sx > - WIDTH / 2 + sr) {
      sphere.position.x -= 10;
    }
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
    createScene();
    createSphere();
    loop();
    BalanceBoardReader.on(`oscMessage`, controlBall);
  };

  init();

}
