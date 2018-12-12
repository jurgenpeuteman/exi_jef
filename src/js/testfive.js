const Readable = require(`stream`).Readable;

class MyStream extends Readable {
  constructor(opts) {
    super(opts);
  }
  _read() { }
}

process.__defineGetter__(`stdin`, () => {
  if (process.__stdin) return process.__stdin;
  process.__stdin = new MyStream();
  return process.__stdin;
});

const five = require(`johnny-five`);

const boards = new five.Boards([`BUTTONS`, `LIGHTS`]);

boards.on(`ready`, function() {

  const btnLeft = new five.Button({
    pin: 6
  });
  btnLeft.on(`press`, () => {
    console.log(`btnLeft`);
  });

  
  const ledPower = new five.Led({
    id: `ledPower`,
    pin: 7,
    board: this.byId(`LIGHTS`)
  });

  const rgbLed = new five.Led.RGB({
    pins: {
      red: 11,
      green: 10,
      blue: 12
    },
    board: this.byId(`LIGHTS`)
  });

  window.five = five;
  window.lightsBoard = this.byId(`LIGHTS`);
  window.buttonsBoard = this.byId(`BUTTONS`);
  window.ledPower = ledPower;
  window.rgbLed = rgbLed;

  ledPower.off();

});
// const board = new five.Board();

// board.on(`ready`, () => {
//   const btnRight = new five.Button(3);
//   const btnSemiRight = new five.Button(4);
//   const btnSemiLeft = new five.Button(5);
//   const btnLeft = new five.Button(6);
//   btnRight.on(`press`, () => {
//     console.log(`btnRight`);
//   }); 
//   btnSemiRight.on(`press`, () => {
//     console.log(`btnSemiRight`);
//   }); 
//   btnSemiLeft.on(`press`, () => {
//     console.log(`btnSemiLeft`);
//   }); 
//   btnLeft.on(`press`, () => {
//     console.log(`btnLeft`);
//   }); 
// });