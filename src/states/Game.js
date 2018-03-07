/* globals __DEV__ */
import Phaser from 'phaser'
import Platform from '../prefabs/Platform'
import Cat from '../prefabs/Cat'
import Enemy from '../prefabs/Enemy'
import DecMeter from '../utils/DecMeter'

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
    this.game.score = 0
    this.game.lives = 5
    this.game.line_height = 125
    this.game.steps_till_score = 60
    this.game.cat_jump_up = this.game.add.sprite(101, 101, 'catJumpUp')
    this.game.cat_jump_down = this.game.add.sprite(101, 101, 'catJumpDown')
    //this.game.cat_died = this.game.add.sprite(122, 101, 'catDied')
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
    this.game.steps_till_enemy = 0
    this.setUpText()
    this.catAdd()
    this.platformsSetUp()
    this.levelGenerate()
    this.enemiesSetUp()
    this.enemyCreate()
    this.lineSet()
    this.rectCreate()
    this.dbmCreate()
  }

  setUpText() {
    this.score_text = this.createText(20, 20, 'left', `Score: ${this.game.score}`)
    this.lives_text = this.createText(20, 50, 'left', `Lives: ${this.game.lives}`)
  }

  createText(xOffset, yOffset, align, text) {
    return this.game.add.text(
      xOffset,
      yOffset,
      text,
      {
        font: '28px Times New Roman',
        fill: '#000000',
        boundsAlignH:align
      }
    ).setTextBounds(0,0, this.game.world.width,0)
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
    if (this.dbmeter.getSpeed() >= 100) {
      this.cat.body.velocity.y = -this.dbmeter.getSpeed()
      //this.game.cat_jump_up.frame = 0
      this.game.cat_jump_up.animations.add('catJumpUp')
      this.game.cat_jump_up.animations.play('catJumpUp')
    }
    if (this.dbmeter.getSpeed() < 100) {
      this.game.cat_jump_down.animations.add('catJumpDown')
      this.game.cat_jump_down.animations.play('catJumpDown')
    }
  }

  checkCatOnThePlatform() {
    this.catOnThePlatform = true
  }

  checkCatOverEnemy() {
    for(let i = this.enemies.children.length - 1; i >= 0; i--) {
      if(this.enemies.children[i].x <= 0) {
        if(this.cat.y < this.enemies.children[i].y) {
          this.game.score += Math.floor((this.game.world.height - this.enemies.children[i].y) * 0.2)
          this.score_text.text = `Score: ${this.game.score}`
        }
      this.enemies.children[i].destroy()
      }
   }
  }

  enemiesSetUp() {
    this.enemies = this.game.add.group()
  }

  enemyCreate() {
    let enemy = new Enemy (
      this.game,
      this.game.world.width,
      this.game.rnd.integerInRange(
        0,
        (this.game.world.height - this.game.platform_height - this.game.line_height - 50)
      ),
      -this.game.speed * 60
    )
    this.enemies.add(enemy)
    this.game.steps_till_enemy = this.game.rnd.integerInRange(50, 180)
  }

  lineSet() {
    this.line = this.game.add.sprite(0,0)
    this.game.physics.arcade.enableBody(this.line)
    this.line.body.immovable = true
    this.line.body.allowGravity = false
    this.line.body.setSize (
      this.game.world.width,
      1,
      0,
      this.game.world.height-(this.game.platform_height + this.game.line_height)
    )
  }

  rectCreate() {
    this.rect = new Phaser.Rectangle(
      0,
      (this.game.world.height-(this.game.platform_height + this.game.line_height)),
      this.game.world.width,
      1
    )
    this.game.physics.arcade.enableBody(this)
    this.game.physics.enable(this.rect, Phaser.Physics.Arcade)
  }

  dbmCreate() {
    this.dbmeter = new DecMeter()
  }

  update() {
    this.platformsMove(this.game.speed)
    this.game.physics.arcade.collide(this.cat, this.platforms)
    this.game.physics.arcade.collide(this.cat, this.enemies, this.enemyCollidedCat, null, this)
    this.game.physics.arcade.collide(this.enemies, this.platforms)
    this.game.physics.arcade.collide(this.enemies, this.line)
    this.catJump()
    this.checkCatOverEnemy()
    this.game.steps_till_enemy--
    if(this.game.steps_till_enemy === 0) {
      this.enemyCreate()
    }
  }

  gameEnd() {
    this.setUpText()
    this.game.state.start('Gameover')
  }

  enemyCollidedCat(cat, enemy) {
    enemy.destroy()
    this.cat.body.velocity.x = 0
    this.game.lives = this.game.lives - 1
    this.lives_text.text = `Lives: ${this.game.lives}`
    if(this.game.lives === 0) {
      this.gameEnd()
    }
  }

  render () {
    this.game.debug.geom(this.rect,'#566b8c')
  }
}
