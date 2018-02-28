import Phaser from 'phaser'

class Cat extends Phaser.Sprite {
  constructor (game, x, y) {
    super(game, x, y, 'cat')
    this.game.physics.arcade.enableBody(this)
    this.checkWorldBounds = true
    this.body.collideWorldBounds = true
    this.body.gravity.setTo(0, 800)
    this.game.add.existing(this)
    this.anchor.setTo(1, 1)
  }

  update () {
  }
}
export default Cat
