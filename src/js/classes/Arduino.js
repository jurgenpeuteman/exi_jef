const EventEmitter2 = require(`eventemitter2`).EventEmitter2;
const Readable = require(`stream`).Readable;
const five = require(`johnny-five`);
const board = new five.Board({

}); 

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
    this.RGBLed;
    this.ledPower;
  }

  setupArduino() {
    const self = this;
    return new Promise(resolve => {
      board.on(`ready`, () => {
        self.btnRight = new five.Button(3);
        self.btnSemiRight = new five.Button(4);
        self.btnSemiLeft = new five.Button(5);
        self.btnLeft = new five.Button(6);
        
        self.RGBLed = new five.Led.RGB([11, 10, 12]);

        self.ledPower = new five.Led(7);
        self.btnPower = new five.Button(8);

        self.btnLeft.custom = {
          name: `L`
        };
        self.btnSemiLeft.custom = {
          name: `SL`
        };
        self.btnRight.custom = {
          name: `R`
        },
        self.btnSemiRight.custom = {
          name: `SR`
        },
        self.btnPower.custom = {
          name: `P`
        };

        self.btnPower.on(`press`, () => self.powerButtonPressed());

        self.RGBLed.on();
        self.RGBLed.color(`#ff6973`);
    
        self.btnLeft.on(`press`, () => self.getArduinoInput(self.btnLeft.custom.name));
        self.btnSemiLeft.on(`press`, () => self.getArduinoInput(self.btnSemiLeft.custom.name));
        self.btnRight.on(`press`, () => self.getArduinoInput(self.btnRight.custom.name));
        self.btnSemiRight.on(`press`, () => self.getArduinoInput(self.btnSemiRight.custom.name));

        resolve();
      });
    });
  }

  blinkPower(value = 200) {
    // this.ledPower.on();
  }

  stopPowerBlink() {
    // this.ledPower.off();
  }

  powerButtonPressed() {
    this.emit(`powerButtonPressed`);
  }

  // powerUp(btn) {
  //   this.emit(`powerup`, btn);
  // }

  // restartGame(btn) {
  //   this.emit(`restartGame`, btn);
  // }

  getArduinoInput(name) {
    console.log(name);
    this.emit(`btnPressed`, name);
  }
}

module.exports = new Arduino();