import Phaser from 'phaser'

class Platform extends Phaser.Sprite {
  constructor (game, x, y, asset) {
    super(game, x, y, 'tile1')
    this.game.physics.arcade.enableBody(this)
    this.body.immovable = true

  }

  update () {
  }
}
export default Platform