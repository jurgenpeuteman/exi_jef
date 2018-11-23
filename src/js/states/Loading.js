class Loading {

  constructor() {
    this.name = `loadingState`;
  }

  setActive(bool) {
    this.container = document.querySelector(`.container`);
    bool ? this.addContent(this.container) : this.removeContent(this.container);
  }

  addContent(container) {
    const loadingTitle = document.createElement(`h1`);
    loadingTitle.textContent = `Loading`;
    loadingTitle.classList.add(`loadingTitle`);
    container.appendChild(loadingTitle);
  }

  removeContent(container) {
    const title = container.querySelector(`.loadingTitle`);
    if (title) title.remove();
  }
}
  
module.exports = new Loading();