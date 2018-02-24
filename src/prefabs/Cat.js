import Phaser from 'phaser'

class Cat extends Phaser.Sprite {
  constructor (game, x, y, asset) {
    super(game, x, y, 'cat')
    this.game.physics.arcade.enableBody(this)
    this.body.immovable = true

  }

  update () {
  }
}
export default Cat