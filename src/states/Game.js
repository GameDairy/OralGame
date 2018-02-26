/* globals __DEV__ */
import Phaser from 'phaser'
import Platform from '../prefabs/Platform'
import Cat from '../prefabs/Cat'
import Enemy from '../prefabs/Enemy'

export default class extends Phaser.State {
  constructor() {
    super()
    this.catOnThePlatform = true
  }

  init () {}

  preload () {}

  create () {
    this.game.angle = 180
    this.game.speed = 5
    this.game.cursors = game.input.keyboard.createCursorKeys();
    this.game.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game.roadStartPosition = {
       x: this.game.world.width + 100,
       y: this.game.world.height
    }
    this.game.input.onDown.add(this.catJump, this)

    this.game.cat_initial_position = {
      x: 100,
      y: this.game.height - this.game.platform_height
    }
    this.game.enemies_set = ['enemy1', 'enemy2', 'enemy3']
    this.game.enemy_inintial_position = this.game.rnd.integerInRange(0, this.game.world.height - 115)
    this.game.steps_till_enemy = 0

    this.catAdd()
    this.platformsSetUp()
    this.levelGenerate()
    this.enemyAdd()

  }

  platformsSetUp() {
    this.platforms = this.game.add.group()
    this.game.platform_width = 65.9
    this.game.platform_height = 105
  }

  platformCreate() {
    let platform = new Platform(
      this.game,
      this.game.roadStartPosition.x,
      this.game.roadStartPosition.y
    )
    this.platforms.add(platform)
  }

  platformsMove(speed) {
    let i = this.platforms.countLiving() - 1
    while(i >= 0 ) {
      this.platforms.children[i].x += speed * Math.cos(this.game.angle * Math.PI/180)
      this.platforms.children[i].y -= speed * Math.sin(this.game.angle * Math.PI/180)
      if(this.platforms.children[i].x < 0 - this.platforms.children[i].width) {
        this.platforms.children[i].destroy()
        this.platformCreate()
      }
      i--
    }
  }

  levelGenerate() {
    let i = 0
    let number_of_platforms = Math.ceil(this.game.world.width/this.game.platform_width) + 2
    while (i <= number_of_platforms) {
      this.platformCreate()
      if(i != number_of_platforms) {
        this.platformsMove(this.game.platform_width)
      }
      i++
    }
  }

  catAdd() {
    this.cat = new Cat (
      this.game,
      this.game.cat_initial_position.x,
      this.game.cat_initial_position.y
    )
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

  enemyAdd() {
    this.enemy = new Enemy (
      this.game,
      this.game.world.randomX,
      this.game.enemy_inintial_position
      )
    this.game.steps_till_enemy = this.game.rnd.integerInRange(50, 180)
  }

  update() {
    this.platformsMove(this.game.speed)
    this.game.physics.arcade.collide(this.cat, this.platforms)
    this.catJump()
    this.game.steps_till_enemy--
    if(this.game.steps_till_enemy === 0) {
      this.enemyAdd()
    }
  }

  render () {
  }
}
