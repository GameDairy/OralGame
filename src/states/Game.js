/* globals __DEV__ */
import Phaser from 'phaser'
import Platform from '../prefabs/Platform'

export default class extends Phaser.State {
  init () {}
  preload () {
  }

  create () {
    this.game.platformsArr = []
    this.game.angle = 180
    this.game.number_of_iterations = 0
    this.game.platform_width = 65.9
    this.game.speed = 5
    //this.game.roadStartPosition = {
      //  x: this.game.world.width + 100,
      //  y: this.game.world.height/2 - 1
    //}
    this.setUpPlatforms()
  }

  setUpPlatforms() {
  this.platforms = new Platform(this.game, 0, 0, 'tile1')
  this.game.world.addChildAt(this.platforms, 0)
  this.game.add.existing(this.platforms)
  //this.platforms.x = this.game.roadStartPosition.x
  //this.platforms.y = this.game.roadStartPosition.y
  this.platforms.alignIn(this.game.world.bounds, Phaser.BOTTOM_RIGHT)
  this.game.platformsArr.push(this.platforms)
  if (this.platforms.x < -120) {
    this.game.platformsArr.splice(i, 1)
    this.platforms.destory()
  }
  }

  movePlatforms(speed) {
   let i = this.game.platformsArr.length - 1
   while(i >= 0) {
     let sprite = this.game.platformsArr[i]
     sprite.x += this.game.speed * Math.cos(this.game.angle * Math.PI/180)
     sprite.y -= this.game.speed * Math.sin(this.game.angle * Math.PI/180)
     i--
   }

}
  update() {
  this.movePlatforms(this.game.speed)
  this.game.number_of_iterations++
  if(this.game.number_of_iterations > this.game.platform_width/this.game.speed) {
    this.game.number_of_iterations = 0
    this.setUpPlatforms()
  }
}

  render () {
  }
}
