const EventEmitter2 = require(`eventemitter2`).EventEmitter2;
const osc = require(`osc`);

class BalanceBoardReader extends EventEmitter2 {
  constructor() {
    super({});
  }

  setupOSC() {
    return new Promise(resolve => {
      const udpPort = new osc.UDPPort({
        localAddress: `127.0.0.1`,
        localPort: 8765
      });
      udpPort.on(`ready`, () => resolve());

      udpPort.on(`message`, oscMessage => this.getWiiValue(oscMessage));
      udpPort.on(`message`, oscMessage => this.playerReady(oscMessage));
      udpPort.on(`error`, err => console.log(err));
      udpPort.open();
    });
  }

  getWiiValue(oscMessage) {
    this.emit(`oscMessage`, oscMessage.args[0].toFixed(2));
  }

  playerReady(oscMessage) {
    this.emit(`start`, oscMessage.args[0].toFixed(2));
  }
}

module.exports = new BalanceBoardReader();