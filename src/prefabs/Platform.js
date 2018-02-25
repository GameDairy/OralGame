import Phaser from 'phaser'

class Platform extends Phaser.Sprite {
  constructor (game, x, y) {
    super(game, x, y, 'tile1')
    this.game.physics.arcade.enableBody(this)
    this.body.immovable = true
    this.anchor.setTo(1, 1)
    this.game.add.existing(this)
  }

  update () {
  }
}
export default Platform
