import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#ffffff'
  }

  preload () {
    this.game.load.audio('gameover',['./assets/media/gameover.mp3'])
    this.game.load.image('pic', './assets/images/dick.png')
    this.game.load.spritesheet('button', './assets/images/button.png')
  }

  create () {
    this.gameover = this.game.add.audio('gameover')
    this.gameover.play()
    let pic = game.add.image(
      this.world.centerX,
      this.world.centerY - 50,
      'pic'
    )
    let button = game.add.button(
      this.game.world.centerX - 300,
      this.game.world.centerY - 100,
      'button',
      this.restartGame,
      this
    )

    this.gameover_text = this.createText(
      this.game.world.centerX,
      this.game.world.centerY - 150,
      'center',
      `Game over lalka. Your score: ${this.game.score}`
    )
    this.gameover_text.anchor.set(0)
  }

  createText(xOffset, yOffset, align, text) {
    return this.game.add.text(
      xOffset,
      yOffset,
      text,
      {
        font: '40px Times New Roman',
        fill: '#000000',
        boundsAlignH:align
      }
    ).setTextBounds(0, 0, this.game.world.center,0)
  }

  restartGame() {
    this.game.state.start('Game')
    this.stage.backgroundColor = '#76cfe2'
    this.gameover.stop()
  }
}
