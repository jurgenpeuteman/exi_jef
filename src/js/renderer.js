{
  const BalanceBoardReader = require(`./classes/BalanceBoardReader.js`);
  const Arduino = require(`./classes/Arduino.js`);
  const loadingState = require(`./states/Loading.js`);
  const menuState = require(`./states/Menu.js`);
  const gameState = require(`./states/Game.js`);
  const data = require(`./objects/Data.js`);
  const THREE = require(`three`);
  const threeFbxLoader = require(`three-fbx-loader`);
  const fontLoader = new THREE.FontLoader();

  const FBXLoader = new threeFbxLoader();
  

  const states = [
    menuState,
    loadingState,
    gameState
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

    loadWithJSONLoader(`./assets/models/vansBlack.json`)
      .then(geometry => {
        geometry.name = `vans`;
        data.footGeom = geometry;
      })
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
      .then(loadWithJSONLoader(`./assets/models/mouse.json`)
        .then(geometry => {
          geometry.name = `mouseGeom`;
          data.mouseGeom = geometry;
        }))
      .then(() => Arduino.setupArduino())
      .then(() => BalanceBoardReader.setupOSC())
      .then(() => setState(`menuState`))
      .then(() => menuState.checkPlayers());
    // .then(() => setState(`gameState`));
  };

  init();
}
