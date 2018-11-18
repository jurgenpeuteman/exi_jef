const EventEmitter2 = require(`eventemitter2`).EventEmitter2;
const Readable = require(`stream`).Readable;
const five = require(`johnny-five`);
const board = new five.Board();

class Arduino extends EventEmitter2 {
  constructor() {
    super({});
  }

  setupArduino() {
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

    board.on(`ready`, () => {
      const btn1 = new five.Button(2);
      btn1.custom = {name: `test`};
      btn1.on(`press`, () => this.getArduinoInput(btn1.custom.name));
    });
  }

  getArduinoInput(name) {
    this.emit(`btnPressed`, name);
  }
}

module.exports = new Arduino();