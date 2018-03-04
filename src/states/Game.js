/* globals __DEV__ */
import Phaser from 'phaser'
import Platform from '../prefabs/Platform'
import Cat from '../prefabs/Cat'
import Enemy from '../prefabs/Enemy'
import Cloud from '../prefabs/Cloud'

export default class extends Phaser.State {
  constructor() {
    super()
    this.catOnThePlatform = true
  }

  init () {}

  preload () {
  }

  create () {
    this.game.angle = 180
    this.game.speed = 5
    this.game.score = 0
    this.game.lives = 5
    this.game.line_height = 125
    this.game.locked = false
    this.game.lockedTo = null
    this.game.steps_till_score = 60
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
    this.game.clouds_set = ['cloud1', 'cloud2', 'cloud3']

    this.setUpText()
    this.catAdd()
    this.platformsSetUp()
    this.levelGenerate()
    this.enemiesSetUp()
    this.enemyCreate()
    this.cloudsSetUp()
    this.cloudCreate()
    this.lineCreate()
    this.safetyZoneCreate()
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
      this.cat.body.velocity.y = -350;
    }
    if (this.game.jumpButton.isDown) {
      this.cat.body.velocity.y = -350;
    }
  }

  checkCatOnThePlatform() {
    this.catOnThePlatform = true
  }

  enemiesSetUp() {
    this.enemies = this.game.add.group()
  }

  enemyCreate() {
    let enemy = new Enemy (
      this.game,
      this.game.world.width,
      this.game.rnd.integerInRange(0, (this.game.world.height - this.game.platform_height - 50)),
      -this.game.speed * 60
    )
    this.enemies.add(enemy)
    this.game.steps_till_enemy = this.game.rnd.integerInRange(50, 180)
  }

  cloudCreate() {
    let cloud = new Cloud (
      this.game,
      this.game.world.width,
      this.game.rnd.integerInRange(0, (this.game.world.height - this.game.platform_height - 50)),
      -this.game.speed*20
    )
    this.clouds.add(cloud)
    this.game.steps_till_cloud = this.game.rnd.integerInRange(80,200)
  }

  cloudsSetUp() {
    this.clouds = this.game.add.group()
  }

  cloudLocksCat(cat, cloud) {
    if (!this.game.locked && this.cat.body.velocity.y > 0) {
        this.game.locked = true;
        this.game.lockedTo = cloud;
        this.clouds.catLocked = true;
        this.cat.body.velocity.y = 0;
    }
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

  enemyCollidedCat(cat, enemy) {
    enemy.destroy()
    this.game.lives = this.game.lives - 1
    this.lives_text.text = `Lives: ${this.game.lives}`
    if(this.game.lives === 0) {
      this.gameEnd()
    }
  }

  lineCreate() {
    this.line = this.game.add.sprite(0,0)
    this.game.physics.enable(this.line, Phaser.Physics.ARCADE)
    this.game.physics.arcade.enableBody(this.line)
  }

  safetyZoneCreate() {
    let lines = game.add.graphics(0,0)
    lines.beginFill(0xffd900)
    lines.lineStyle(3, 0x000000, 1)
    lines.moveTo(
      -this.game.world.width, 
      (this.game.world.height-(this.game.platform_height + this.game.line_height))
    )
    lines.lineTo(
      this.game.world.width, 
      (this.game.world.height - (this.game.platform_height + this.game.line_height))
    )
    lines.endFill()
    this.line.addChild(lines)  
  }


  gameEnd() {
    this.game.state.start('Gameover')
    this.setUpText()
  }

  update() {
    this.platformsMove(this.game.speed)
    this.game.physics.arcade.collide(this.cat, this.platforms)
    this.game.physics.arcade.collide(this.cat, this.enemies, this.enemyCollidedCat, null, this)
    this.game.physics.arcade.collide(this.enemies, this.platforms)
    this.game.physics.arcade.collide(this.clouds, this.cat)
    this.game.physics.arcade.collide(this.enemies, this.line)
    this.catJump()
    this.cloudLocksCat(this.cat, this.clouds)
    this.game.steps_till_enemy--
    if(this.game.steps_till_enemy === 0) {
      this.enemyCreate()
    }
    this.game.steps_till_cloud--
    if(this.game.steps_till_cloud === 0) {
      this.cloudCreate()
    }
    this.game.steps_till_score--
    if(this.game.steps_till_score === 0) {
      this.game.score += 10
      this.game.steps_till_score = 60
      this.score_text.text = `Score: ${this.game.score}`
    }
  }

  render () {}
}
