const EventEmitter2 = require(`eventemitter2`).EventEmitter2;

class CollisionDetector extends EventEmitter2 {
  constructor() {
    super({});
  }

  detectCollisions(elements1, elements2) {
    elements1.forEach(element1 => {
      elements2.forEach(element2 => {
        if (element1.collidesWith(element2)) {
          this.emit(`collision`, element1, element2);
        }
      });
    });
  }
}

module.exports = CollisionDetector;