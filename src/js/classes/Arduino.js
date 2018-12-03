const EventEmitter2 = require(`eventemitter2`).EventEmitter2;
const Readable = require(`stream`).Readable;
const five = require(`johnny-five`);
const board = new five.Board();

class MyStream extends Readable {
  constructor(opts) {
    super(opts);
  }
  _read() {}
}

process.__defineGetter__(`stdin`, () => {
  if (process.__stdin) return process.__stdin;
  process.__stdin = new MyStream();
  return process.__stdin;
});

class Arduino extends EventEmitter2 {
  constructor() {
    super({});
  }

  setupArduino() {
    return new Promise(resolve => {
      board.on(`ready`, () => {
        const btnLeft = new five.Button(11);
        const btnSemiLeft = new five.Button(10);
        const btnSemiRight = new five.Button(9);
        const btnRight = new five.Button(8);

        btnLeft.custom = {
          name: `L`
        };
        btnSemiLeft.custom = {
          name: `SL`
        };
        btnRight.custom = {
          name: `R`
        },
        btnSemiRight.custom = {
          name: `SR`
        },

        // btnLeft.on(`press`, () => this.startGame(btnLeft));
        
        btnLeft.on(`press`, () => this.getArduinoInput(btnLeft.custom.name));
        btnSemiLeft.on(`press`, () => this.getArduinoInput(btnSemiLeft.custom.name));
        btnRight.on(`press`, () => this.getArduinoInput(btnRight.custom.name));
        btnSemiRight.on(`press`, () => this.getArduinoInput(btnSemiRight.custom.name));

        resolve();
      });
    });
  }

  startGame(btn) {
    this.emit(`start`, btn);
  }

  getArduinoInput(name) {
    this.emit(`btnPressed`, name);
  }
}

module.exports = new Arduino();