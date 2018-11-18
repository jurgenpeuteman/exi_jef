{
  const BalanceBoardReader = require(`./classes/BalanceBoardReader.js`);
  const Arduino = require(`./classes/Arduino.js`);

  const getPressedButton = name => {
    console.log(name);
  };

  const init = () => {
    BalanceBoardReader.setupOSC();
    Arduino.setupArduino();
    Arduino.on(`btnPressed`, getPressedButton);
  };

  init();
}
