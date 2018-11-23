const loadingState = bool => {

  const container = document.querySelector(`.loadingGameContainer`);

  if (bool) {
    if (!container) {
      const loadingGameContainer = document.createElement(`div`);
      loadingGameContainer.classList.add(`loadingGameContainer`);
      document.body.appendChild(loadingGameContainer);

      const loadingTitle = document.createElement(`h1`);
      loadingTitle.innerHTML = `LOADING`;
      loadingTitle.classList.add(`loadingTitle`);
      loadingGameContainer.appendChild(loadingTitle);
    } else {
      container.classList.toggle(`hide`);
    }
    
    console.log(`loading`);
  } else {
    console.log(`not loading`);
    container.classList.toggle(`hide`);
  }
};
  
module.exports = loadingState;