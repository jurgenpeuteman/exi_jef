{
  const BalanceBoardReader = require(`./classes/BalanceBoardReader.js`);
  const Arduino = require(`./classes/Arduino.js`);
  const loadingState = require(`./states/Loading.js`);
  const menuState = require(`./states/Menu.js`);
  const gameState = require(`./states/Game.js`);

  const states = [
    menuState,
    loadingState,
    gameState
  ];

  let board = false,
    arduino = false;

  const setState = name => {
    states.forEach(state => {
      state.name === name ? state.setActive(true) : state.setActive(false);
    });
  };

  const setupParts = () => {
    setState(`loadingState`);
    BalanceBoardReader.setupOSC();
    Arduino.setupArduino();
  }; 

  const checkParts = () => {
    if (arduino && board) {
      setState(`menuState`);
      document.querySelector(`.startButton`).addEventListener(`click`, () => setState(`gameState`));
    }
  };

  const init = () => {
    setupParts();

    Arduino.on(`arduinoReady`, () => {
      arduino = true;
      checkParts();
    });
    BalanceBoardReader.on(`boardReady`, () => {
      board = true;
      checkParts();
    });
  };

  init();
}
