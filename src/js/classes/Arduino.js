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
  }

  setupArduino() {
    return new Promise(resolve => {
      boards.on(`ready`, () => {
        Object.keys(boards).forEach(() => {
          if (boards[1].id === `LIGHTS`) {
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
            // this.ledPower.on();
            // this.rgbLed.on();
          }

          // this.ledPower.on();
          // this.rgbLed.on();

          


          // this.rgbLed.color(`#ffff00`);

          if (boards[0].id === `BUTTONS`) {
            this.btnRight = new five.Button({
              pin: 3
            });
            this.btnSemiRight = new five.Button({
              pin: 4
            });
            this.btnSemiLeft = new five.Button({
              pin: 5
            });
            this.btnLeft = new five.Button({
              pin: 6
            });

            this.btnPower = new five.Button({
              pin: 8
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
            console.log(this.btnPower);
            this.btnPower.on(`press`, () => this.emit(`powerButtonPressed`, this.btnLeft.custom.name));
            this.btnLeft.on(`press`, () => {
              this.emit(`btnPressed`, this.btnLeft.custom.name);
              console.log(`btn`);
            });
            this.btnSemiLeft.on(`press`, () => this.emit(`btnPressed`, this.btnSemiLeft.custom.name));
            this.btnRight.on(`press`, () => this.emit(`btnPressed`, this.btnRight.custom.name));
            this.btnSemiRight.on(`press`, () => this.emit(`btnPressed`, this.btnSemiRight.custom.name));
          }          
        });


        // this.rgbLed = new five.Led.RGB({
        //   pins: {
        //     red: 11,
        //     green: 10,
        //     blue: 12
        //   },
        //   board: this.byId(`LIGHTS`)
        // });
        // this.ledPower = new five.Led({
        //   id: `ledPower`,
        //   pin: 7,
        //   board: this.byId(`LIGHTS`)
        // });

        // this.ledPower.on();
        // this.rgbLed.color(`#ffff00`);

        // this.btnRight = new five.Button({
        //   pin: 3
        // });
        // this.btnSemiRight = new five.Button({
        //   pin: 4
        // });
        // this.btnSemiLeft = new five.Button({
        //   pin: 5
        // });
        // this.btnLeft = new five.Button({
        //   pin: 6
        // });

        // this.btnPower = new five.Button({
        //   pin: 8
        // });
        // this.btnLeft.custom = {
        //   name: `L`
        // };
        // this.btnSemiLeft.custom = {
        //   name: `SL`
        // };
        // this.btnRight.custom = {
        //   name: `R`
        // },
        // this.btnSemiRight.custom = {
        //   name: `SR`
        // },
        // this.btnPower.custom = {
        //   name: `P`
        // };
        resolve();
      });
    });


    // boards.on(`ready`, function () {
    //   this.rgbLed = new five.Led.RGB({
    //     pins: {
    //       red: 11,
    //       green: 10,
    //       blue: 12
    //     },
    //     board: this.byId(`LIGHTS`)
    //   });
    //   this.ledPower = new five.Led({
    //     id: `ledPower`,
    //     pin: 7,
    //     board: this.byId(`LIGHTS`)
    //   });

    //   this.ledPower.on();
    //   this.rgbLed.color(`#ffff00`);

    //   this.btnRight = new five.Button({
    //     pin: 3
    //   });
    //   this.btnSemiRight = new five.Button({
    //     pin: 4
    //   });
    //   this.btnSemiLeft = new five.Button({
    //     pin: 5
    //   });
    //   this.btnLeft = new five.Button({
    //     pin: 6
    //   });

    //   this.btnPower = new five.Button({
    //     pin: 8
    //   });
    //   this.btnLeft.custom = {
    //     name: `L`
    //   };
    //   this.btnSemiLeft.custom = {
    //     name: `SL`
    //   };
    //   this.btnRight.custom = {
    //     name: `R`
    //   },
    //   this.btnSemiRight.custom = {
    //     name: `SR`
    //   },
    //   this.btnPower.custom = {
    //     name: `P`
    //   };

    //   this.btnPower.on(`press`, () => this.emit(`powerButtonPressed`, this.btnLeft.custom.name));
    //   this.btnLeft.on(`press`, () => this.emit(`btnPressed`, this.btnLeft.custom.name));
    //   this.btnSemiLeft.on(`press`, () => this.emit(`btnPressed`, this.btnSemiLeft.custom.name));
    //   this.btnRight.on(`press`, () => this.emit(`btnPressed`, this.btnRight.custom.name));
    //   this.btnSemiRight.on(`press`, () => this.emit(`btnPressed`, this.btnSemiRight.custom.name));

    //   resolve();
    // });
    // });
  }

  blinkPower() {
    this.ledPower.blink(200);
  }

  stopPowerBlink() {
    this.ledPower.off();
  }

  // powerButtonPressed() {
  //   this.emit(`powerButtonPressed`);
  // }

  // getArduinoInput(name) {
  //   this.emit(`btnPressed`, name);
  // }
}

module.exports = new Arduino();