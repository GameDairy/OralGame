import Phaser from 'phaser'

class Cat extends Phaser.Sprite {
  constructor (game, x, y, asset) {
    super(game, x, y, 'cat')
    this.game.physics.arcade.enableBody(this)
    this.checkWorldBounds = true
    this.body.collideWorldBounds = true
    this.body.gravity.setTo(0, 500)

  }

  update () {
  }
}
export default Cat