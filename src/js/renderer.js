{
  const BalanceBoardReader = require(`./classes/BalanceBoardReader.js`);
  const Arduino = require(`./classes/Arduino.js`);
  const loadingState = require(`./states/Loading.js`);
  const menuState = require(`./states/Menu.js`);
  const gameState = require(`./states/Game.js`);
  const data = require(`./objects/Data.js`);
  const THREE = require(`three`);

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

    loadWithJSONLoader(`./assets/models/foot.json`)
      .then(geometry => {
        geometry.name = `vans`;
        data.footGeom = geometry;
      })
      .then(() => Arduino.setupArduino())
      .then(() => BalanceBoardReader.setupOSC())
      .then(() => {
        setState(`menuState`);
        document.querySelector(`.startButton`).addEventListener(`click`, () => setState(`gameState`));
      });
  };

  init();
}
