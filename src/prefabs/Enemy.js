import Phaser from 'phaser'

class Enemy extends Phaser.Sprite {
  constructor (game, x, y, speed) {
    let tile = game.enemies_set[Math.floor(Math.random()*game.enemies_set.length)]
    super(game, x, y, tile)
    this.game.physics.arcade.enableBody(this)
    this.checkWorldBounds = true
    this.body.collideWorldBounds = true
    this.game.add.existing(this)
    this.body.velocity.x = speed
    this.body.velocity.y = this.game.rnd.integerInRange(300, -300)
    this.body.bounce.set(1)
  }

  update () {
    if(this.x <= 0) {
      this.destroy()
    }
  }
}
export default Enemy