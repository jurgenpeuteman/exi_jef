const EventEmitter2 = require(`eventemitter2`).EventEmitter2;
const Readable = require(`stream`).Readable;
const five = require(`johnny-five`);
const boards = new five.Boards([`BUTTONS`, `LIGHTS`]);

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

class Arduino extends EventEmitter2 {
  constructor() {
    super({});
    this.rgbLed;
    this.ledPower;
    this;
  }

  setupArduino() {
    return new Promise(resolve => {
      boards.on(`ready`, () => {
        Object.keys(boards).forEach(b => {
          if (boards[b].id === `LIGHTS`) {
            this.rgbLed = new five.Led.RGB({
              pins: {
                red: 11,
                green: 10,
                blue: 12
              },
              board: boards[1]
            });
            this.ledPower = new five.Led({
              id: `ledPower`,
              pin: 7,
              board: boards[1]
            });

            this.rgbLed.on();
            this.rgbLed.color(`#ff0000`);
          }

          if (boards[b].id === `BUTTONS`) {
            this.btnRight = new five.Button({
              pin: 3,
              isPulldown: true
            });
            this.btnSemiRight = new five.Button({
              pin: 4,
              isPulldown: true
            });
            this.btnSemiLeft = new five.Button({
              pin: 5,
              isPulldown: true
            });
            this.btnLeft = new five.Button({
              pin: 6,
              isPulldown: true
            });

            this.btnPower = new five.Button({
              pin: 8,
              isPulldown: true,
              holdtime: 1000
            });
            
            this.btnLeft.custom = {
              name: `L`
            };
            this.btnSemiLeft.custom = {
              name: `SL`
            };
            this.btnRight.custom = {
              name: `R`
            };
            this.btnSemiRight.custom = {
              name: `SR`
            };
            this.btnPower.custom = {
              name: `P`
            };

            this.btnPower.on(`press`, () => this.powerButtonPressed(this.btnPower.custom.name));
            this.btnLeft.on(`press`, () => this.getArduinoInput(this.btnLeft.custom.name));
            this.btnSemiLeft.on(`press`, () => this.getArduinoInput(this.btnSemiLeft.custom.name));
            this.btnRight.on(`press`, () => this.getArduinoInput(this.btnRight.custom.name));
            this.btnSemiRight.on(`press`, () => this.getArduinoInput(this.btnSemiRight.custom.name));
          }          
        });
        resolve();
      });
    });
  }

  blinkPower() {
    this.ledPower.blink(200);
  }

  stopPowerBlink() {
    this.ledPower.stop();
    this.ledPower.off();
  }

  powerButtonPressed() {
    this.emit(`powerButtonPressed`);
  }

  getArduinoInput(name) {
    this.emit(`btnPressed`, name);
  }
}

module.exports = new Arduino();