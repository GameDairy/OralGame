import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#76cfe2'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.image('tile1', './assets/images/tile1.png')
    this.load.atlasJSONHash('cat', './assets/images/cat.png','./assets/images/cat.json')
    this.load.image('enemy1', './assets/images/enemy1.gif')
    this.load.image('enemy2', './assets/images/enemy2.gif')
    this.load.image('enemy3', './assets/images/enemy3.gif')
    this.load.image('enemy4', './assets/images/enemy4.gif')
    this.load.image('enemy5', './assets/images/enemy5.gif')
    this.load.image('enemy6', './assets/images/enemy6.gif')
    this.load.image('enemy7', './assets/images/enemy7.gif')
    this.load.image('enemy8', './assets/images/enemy8.gif')
    this.load.image('enemy9', './assets/images/enemy9.gif')
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
