import Phaser from 'phaser'

class Cloud extends Phaser.Sprite {
  constructor (game, x, y, speed) {
    let tile = game.clouds_set[Math.floor(Math.random()*game.clouds_set.length)]
    super(game, x, y, tile)
    this.game.physics.arcade.enableBody(this)
    this.checkWorldBounds = true
    this.body.collideWorldBounds = false
    this.game.add.existing(this)
    this.body.velocity.x = speed
    this.body.immovable = true
    this.body.checkCollision.down = false
    this.body.checkCollision.left = false
    this.body.checkCollision.right = false
  }

  update () {
    if(this.x <= 0) {
      this.destroy()
    }
  }
}
export default Cloud