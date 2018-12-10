{
  const BalanceBoardReader = require(`./classes/BalanceBoardReader.js`);
  const Arduino = require(`./classes/Arduino.js`);
  const loadingState = require(`./states/Loading.js`);
  const menuState = require(`./states/Menu.js`);
  const gameState = require(`./states/Game.js`);
  const endState = require(`./states/End.js`);
  const changeState = require(`./states/Change.js`);
  const data = require(`./objects/Data.js`);
  const THREE = require(`three`);
  const fontLoader = new THREE.FontLoader();
  const FBXL = require(`three-fbxloader-offical`);
  const fbxLoader = new FBXL();


  const states = [
    loadingState,
    menuState,
    endState,
    gameState,
    changeState
  ];

  const setState = name => {
    states.forEach(state => {
      state.name === name ? state.setActive(true) : state.setActive(false);
    });
  };

  const loadWithJSONLoader = url => {
    const loader = new THREE.JSONLoader();
    return new Promise(resolve => {
      loader.load(url, geometry => {
        resolve(geometry);
      });
    });
  };

  const init = () => {
    setState(`loadingState`);

    loadWithJSONLoader(`./assets/models/lowpolyVans.json`)
      .then(geometry => {
        geometry.name = `vans`;
        data.footGeom = geometry;
      })
      .then(loadWithJSONLoader(`./assets/models/trophy.json`)
        .then(geometry => {
          geometry.name = `trophy`;
          data.trophyGeom = geometry;
        }))
      .then(loadWithJSONLoader(`./assets/models/cassette4.json`)
        .then(geometry => {
          geometry.name = `cassette`;
          data.cassetteGeom = geometry;
        }))
      .then(loadWithJSONLoader(`./assets/models/cassetteHole.json`)
        .then(geometry => {
          geometry.name = `cassetteHole`;
          data.cassetteHoleGeom = geometry;
        }))
      .then(fontLoader.load(`./assets/fonts/helvitker.json`, font => {
        data.font = font;
      }))
      .then(fbxLoader.load(`./assets/models/Running4.fbx`, geometry => {
        geometry.name = `runningMouse`;
        data.runningMouse = geometry;
      }))
      .then(loadWithJSONLoader(`./assets/models/lowpolyMouse.json`)
        .then(geometry => {
          geometry.name = `mouseGeom`;
          data.mouseGeom = geometry;
        }))
      .then(() => Arduino.setupArduino())
      .then(() => BalanceBoardReader.setupOSC())
      .then(() => setState(`menuState`))
      .then(() => menuState.checkPlayers())
      .then(() => setState(`gameState`))
      .then(() => gameState.checkGameOver())
      .then(() => setState(`endState`));
  };

  init();
}
