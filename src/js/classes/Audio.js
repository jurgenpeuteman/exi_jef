const THREE = require(`three`);
const data = require(`../objects/Data.js`);
const audioLoader = new THREE.AudioLoader();

class Audio {
  constructor() {
    this.listener = new THREE.AudioListener();
    this.listener2 = new THREE.AudioListener();
    
    this.themeSong = new THREE.Audio(this.listener);
    
    audioLoader.load(`./assets/audio/themesong.mp3`, audio => {
      this.themeSong.setBuffer(audio);
      this.themeSong.setLoop(true);
      this.themeSong.setVolume(.2);
      this.themeSong.play();
    });
    this.hitSound = new THREE.Audio(this.listener2);

    audioLoader.load(`./assets/audio/hit.wav`, audio => {
      this.hitSound.setBuffer(audio);
      this.hitSound.setLoop(false);
      this.hitSound.setVolume(1);
    });
  
    this.buffer = data.song;
  }
   
}

module.exports = Audio;