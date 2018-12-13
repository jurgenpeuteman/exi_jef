{
  const BalanceBoardReader = require(`./classes/BalanceBoardReader.js`);
  const Arduino = require(`./classes/Arduino.js`);
  const loadingState = require(`./states/Loading.js`);
  const menuState = require(`./states/Menu.js`);
  const Game = require(`./states/Game.js`);
  const endState = require(`./states/End.js`);
  const startState = require(`./states/Start.js`);
  const changeState = require(`./states/Change.js`);
  const data = require(`./objects/Data.js`);
  const THREE = require(`three`);
  const fontLoader = new THREE.FontLoader();
  const FBXL = require(`three-fbxloader-offical`);
  const fbxLoader = new FBXL();
  const audioLoader = new THREE.AudioLoader();

  const gameState1 = new Game(`gameState1`, `game-canvas1`);
  const gameState2 = new Game(`gameState2`, `game-canvas2`);

  const states = [
    loadingState,
    startState,
    menuState,
    gameState1,
    changeState,
    gameState2,
    endState
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
    localStorage.removeItem(`player1`);
    localStorage.removeItem(`player2`);

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
      .then(loadWithJSONLoader(`./assets/models/cassette.json`)
        .then(geometry => {
          geometry.name = `cassette`;
          data.cassetteGeom = geometry;
        }))
      .then(loadWithJSONLoader(`./assets/models/cassetteHole.json`)
        .then(geometry => {
          geometry.name = `cassetteHole`;
          data.cassetteHoleGeom = geometry;
        }))
      .then(loadWithJSONLoader(`./assets/models/lowpolyMouse.json`)
        .then(geometry => {
          geometry.name = `mouseGeom`;
          data.mouseGeom = geometry;
        }))
      .then(fontLoader.load(`./assets/fonts/helvitker.json`, font => {
        data.font = font;
      }))
      .then(fbxLoader.load(`./assets/models/running.fbx`, geometry => {
        geometry.name = `runningMouse`;
        data.runningMouse = geometry;
      }))
      .then(audioLoader.load(`./assets/audio/themesong.mp3`, audio => {
        audio.name = `song`;
        data.song = audio;
      }))
      .then(() => Arduino.setupArduino())
      .then(() => BalanceBoardReader.setupOSC())
      .then(() => setState(`startState`))
      .then(() => startState.checkStart())
      .then(() => setState(`menuState`))
      .then(() => menuState.checkPlayers())
      .then(() => setState(`gameState1`))
      .then(() => gameState1.checkGameOver())
      .then(() => setState(`changeState`))
      .then(() => changeState.checkPlayers())
      .then(() => setState(`gameState2`))
      .then(() => gameState2.checkGameOver()) 
      .then(() => setState(`endState`));
  };

  init();
}
