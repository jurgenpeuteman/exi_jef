class Loading {

  constructor() {
    this.name = `loadingState`;
  }

  setActive(bool) {
    this.container = document.querySelector(`.container`);
    bool ? this.addContent(this.container) : this.removeContent(this.container);
  }

  addContent(container) {
    const $imgDiv = document.createElement(`div`);
    $imgDiv.classList.add(`container-img`);

    const $img = document.createElement(`img`);
    $img.src = `assets/img/loader.png`;
    $img.width = `177`;
    $img.height = `299`;
    $img.classList.add(`loader`);

    const $shadow = document.createElement(`img`);
    $shadow.src = `assets/img/loader_shadow.svg`;
    $shadow.width = `243`;
    $shadow.height = `47`;
    $shadow.classList.add(`shadow`);

    container.appendChild($imgDiv);
    $imgDiv.appendChild($img);
    $imgDiv.appendChild($shadow);
  }

  removeContent(container) {
    const loader = container.querySelector(`.loader`);
    if (loader) loader.remove();
    const shadow = container.querySelector(`.shadow`);
    if (shadow) shadow.remove();
  }
}
  
module.exports = new Loading();