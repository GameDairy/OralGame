/* globals __DEV__ */
import Phaser from 'phaser'
import Platform from '../prefabs/Platform'
import Cat from '../prefabs/Cat'

export default class extends Phaser.State {
  constructor() {
    super()
    this.catOnThePlatform = true
  }

  init () {}

  preload () {}

  create () {
    this.game.platformsArr = []
    this.game.angle = 180
    this.game.number_of_iterations = 0
    this.game.platform_width = 65.9
    this.game.platform_height = 105
    this.game.speed = 5
    this.game.cursors = game.input.keyboard.createCursorKeys();
    this.game.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game.roadStartPosition = {
       x: this.game.world.width + 100,
       y: this.game.world.height
    }
    this.generateLevel()
    this.addCat()
    this.game.input.onDown.add(this.catJump, this)
  }

  setUpPlatforms() {
    this.platforms = new Platform(this.game, 0, 0, 'tile1')
    this.game.world.addChildAt(this.platforms, 0)
    this.game.add.existing(this.platforms)
    this.platforms.x = this.game.roadStartPosition.x
    this.platforms.y = this.game.roadStartPosition.y
    this.platforms.anchor.setTo(1, 1)
    this.game.platformsArr.push(this.platforms)
  }

  movePlatforms(speed) {
    let i = this.game.platformsArr.length - 1
    while(i >= 0) {
      let sprite = this.game.platformsArr[i]
      sprite.x += speed * Math.cos(this.game.angle * Math.PI/180)
      sprite.y -= speed * Math.sin(this.game.angle * Math.PI/180)
      if (this.platforms.x < -120) {
        this.game.platformsArr.splice(i, 1)
        sprite.destroy()
      }
     i--
    }
  }

  generateLevel() {
    let i = 0
    let number_of_platforms = Math.ceil(this.game.world.width/this.game.platform_width) + 2
    while (i <= number_of_platforms) {
      this.setUpPlatforms()
      if(i != number_of_platforms) {
        this.movePlatforms(this.game.platform_width)
      }
      i++
    }
  }

  addCat() {
    this.cat = new Cat (this.game, 0, 0, 'cat')
    this.game.add.existing(this.cat)
    this.cat.x = 100
    this.cat.y = this.game.height - this.game.platform_height
    this.cat.anchor.setTo(1, 1)
  }

  catJump() {
    if (this.game.cursors.left.isDown) {
      this.cat.body.velocity.y = -250;
    }
    if (this.game.jumpButton.isDown) {
      this.cat.body.velocity.y = -250;
    }
  }

  checkCatOnThePlatform() {
    this.catOnThePlatform = true
  }


  update() {
    this.movePlatforms(this.game.speed)
    this.game.number_of_iterations++
    if(this.game.number_of_iterations > this.game.platform_width/this.game.speed) {
      this.game.number_of_iterations = 0
      this.setUpPlatforms()
    }
    this.game.physics.arcade.collide(this.cat, this.platforms)
    this.catJump()
  }

  render () {
  }
}
