{
  const BalanceBoardReader = require(`./classes/BalanceBoardReader.js`);
  const Arduino = require(`./classes/Arduino.js`);

  const init = () => {
    BalanceBoardReader.setupOSC();
    Arduino.setupArduino();
  };

  init();
}
