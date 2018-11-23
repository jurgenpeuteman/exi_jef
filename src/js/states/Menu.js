class Menu {

  constructor() {
    this.name = `menuState`;
  }

  setActive(bool) {
    this.container = document.querySelector(`.container`);
    bool ? this.addContent(this.container) : this.removeContent(this.container);
  }

  addContent(container) {
    const button = document.createElement(`button`);
    button.textContent = `start`;
    button.id = `startButton`;
    button.value = `start`;
    button.classList.add(`startButton`);
    container.appendChild(button);
  }

  removeContent(container) {
    const btn = container.querySelector(`.startButton`);

    if (btn) btn.remove();
  }
}

module.exports = new Menu();