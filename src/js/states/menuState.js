class menuState {

  constructor() {
    this.name = `menuState`;
  }


  setActive(bool) {
    const container = document.querySelector(`.menuContainer`);

    if (bool) {
      if (!container) {
        console.log(`menu`);
        const menuContainer = document.createElement(`div`);
        menuContainer.classList.add(`menuContainer`);
        document.body.appendChild(menuContainer);

        const menuTitle = document.createElement(`h1`);
        menuTitle.innerHTML = `Game`;
        menuTitle.classList.add(`menuTitle`);
        menuContainer.appendChild(menuTitle);

        const button = document.createElement(`button`);
        button.innerHTML = `start`;
        button.id = `startButton`;
        button.value = `start`;
        button.classList.add(`startButton`);
        menuContainer.appendChild(button);
      } else {
        container.classList.toggle(`hide`);
      }
    } else {
      console.log(`not menu`);
      //container.classList.toggle(`hide`);
      container.parentNode.removeChild(container);
    }
  }
  
}
  
module.exports = new menuState();