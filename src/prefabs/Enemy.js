import Phaser from 'phaser'

class Enemy extends Phaser.Sprite {
  constructor (game, x, y, speed) {
    let tile = game.enemies_set[Math.floor(Math.random()*game.enemies_set.length)]
    super(game, x, y, tile)
    this.game.physics.arcade.enableBody(this)
    this.checkWorldBounds = true
    this.body.collideWorldBounds = false
    this.game.add.existing(this)
    this.body.velocity.x = speed
  }

  update () {
    if(this.x < 0) {
      this.destroy()
    }
  }
}
export default Enemy