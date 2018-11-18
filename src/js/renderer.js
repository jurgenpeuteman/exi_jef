{
  const BalanceBoardReader = require(`./classes/BalanceBoardReader.js`);
  const Arduino = require(`./classes/Arduino.js`);

  const getBalanceValue = v => {
    console.log(v);
  };

  const getPressedButton = name => {
    console.log(name);
  };
  
  const init = () => {
    BalanceBoardReader.setupOSC();
    Arduino.setupArduino();

    BalanceBoardReader.on(`oscMessage`, getBalanceValue);
    Arduino.on(`btnPressed`, getPressedButton);
  };

  init();
}