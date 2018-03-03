MyGame = MyGame || {};

// Game state
MyGame.GameState = {
  init: function(currentLevel) {

    this.PLAYER_SPEED = 200;
    this.BULLET_SPEED = -1000;
    this.game.physics.startSystem(Phaser.ARCADE);
    this.numLevels = 3;
    this.currentLevel = ((typeof currentLevel === 'object' || !currentLevel) ? 1: currentLevel);
  },

  create: function(currentLevel) { // create scene here
  	// place background and add other sprites
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
    console.log('the thing passed into create is', currentLevel)
    this.background.autoScroll(0, 30); // autoscroll background (x y direction)
    console.log('Now in GameState!'); // tiles sprite to fit entire background (x, y, width, height, sprite);

    //establish constants


    // set level infomration
    
    
    const self = this;
    console.log('THE CURRENT LEVEL AS DEFINED BY CREAT() :', self.currentLevel);

    // add paleyr spites
    this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 50, 'player');
    this.player.anchor.setTo(0.5); // set anchor to absolute center (omit y)
    this.game.physics.arcade.enable(this.player); //enable phyics
    this.player.body.collideWorldBounds = true; // ensure collisionm wit gma world bounds
    // init bullet pool
    this.initBullets(); // add group of bullets and enable phyics 
    this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND / 5, this.createPlayerBullet, this); // repeats bullet creation 
    // init enemies
    this.initEnemies();
    // load level
    this.loadLevel();

  },

  update: function() { // update methid

  	this.game.physics.arcade.overlap(this.playerBullets, this.enemies, this.damageEnemy, null, this);
  	this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.killPlayer, null, this);
  	// (Collider a, COllider, b, cb, cb conditonal funciton [runs callback if evals as true], obj context)
  	/*
		NOTE MAKE SURE TO CHANGE KILL PLAYEER TO DAMAGE PLAYER SO PLAYER CAN LIVE LONGER (similar to damageEnmey)
		ALSO, REFACTOR PLAYER FUNCTIONALITY INTO OWN CLASS (Non- PLAYER)
  	*/

  	// update will run overthing under this method periodically during runtime
  	this.player.body.velocity.x = 0;

  	if (this.game.input.activePointer.isDown) { // if player is touching screen
  		 // console.log('Currently Pressing Down')
  		let targetX = this.game.input.activePointer.position.x; // set target destination to x/y coords
  		// let targetY = this.game.input.activePointer.position.y; // no need for y since player only moves left to right

  		let direction = targetX >= this.game.world.centerX ? 1 : -1; // change velocity direction depending on touch location

  		//console.log('TargetX = ', targetX);

  		this.player.body.velocity.x = direction * this.PLAYER_SPEED;
  	}
  },

  initBullets: function() { // function to create gourp of bullers
  	this.playerBullets = this.add.group();
  	

  	this.playerBullets.enableBody = true;
  	
  },

  createPlayerBullet: function() {
  	let bullet = this.playerBullets.getFirstExists(false);

  	if (!bullet) {
  		bullet = new PlayerBullet(this.game, this.player.x, this.player.top); // creates new instance of 
  		this.playerBullets.add(bullet); // add to the group
  	} else {
  		bullet.reset(this.player.x, this.player.top);
  	}

  	//sert velocity
  	bullet.body.velocity.y = this.BULLET_SPEED;
  },

  initEnemies: function()  {
  	this.enemies = this.game.add.group();
  	this.enemies.enableBody = true;

  	this.enemyBullets = this.game.add.group();
  	this.enemyBullets.enableBody = true;

  	//this.enemy = new Enemy(this.game, 100, 100, 'greenEnemy', 10, this.enemyBullets, 2); // change from var dec to this
    //this.enemies.add(this.enemy);

    //this.enemy.body.velocity.x = 0; // oriignally 100
    //this.enemy.body.velocity.y = 0; // oriignallly 50
  },

  damageEnemy: function(bullet, enemy) {
  	enemy.damage(1);
  	bullet.kill();
  },

  killPlayer: function(bullet, player) { // make sure to implement helath and damage for later
  	player.damage(1);
  	bullet.kill();
  	this.game.state.start('GameState');
  },

  createEnemy: function(x, y, key, health, scale, shotInterval, speedX, speedY) {
    let enemy = this.enemies.getFirstExists(false);

    if (!enemy) {
      enemy = new Enemy(this.game, x, y, key, health, this.enemyBullets, shotInterval);
      this.enemies.add(enemy);
    }
      enemy.reset(x, y, health, key, scale, speedX, speedY);
  },

  loadLevel: function() {
    this.currentEnemyIndex = 0; // start with first enemy on level data
    const self = this;
    console.log('level passed in: ', self.currentLevel)
    this.levelData = JSON.parse(self.game.cache.getText('level' + self.currentLevel)); // this will be the pare
    //console.log('levelData is: ', self.levelData);
    //console.log('level data', self.levelData)

    // sets end of level timer based on level duration in level data
    this.endOfLevelTimer = this.game.time.events.add(this.levelData.duration * 1000, function() {
      //console.log('level ended');
      //console.log('now loading', self.currentLevel);

      if (self.currentLevel < 3) { // if there are levels left then increment curent level
        self.currentLevel++;
      } else { // else set back to level 1
        self.currentLevel = 1; 
      }
      self.game.state.start('GameState', true, false, self.currentLevel); // start the game state again
    }, self); // takes timer duration, callbaclk and context; callback called after timer is done

    this.scheduleNextEnemy();
  },

  scheduleNextEnemy: function() {
    let nextEnemy = this.levelData.enemies[this.currentEnemyIndex];
    if (nextEnemy) {
      //console.log('Next Enemy', nextEnemy);
      // if first enmey set gap to time/ else set diffrence between currenty and last time
      let nextTime = 1000 * (nextEnemy.time - (this.currentEnemyIndex === 0 ? nextEnemy.time : 
      nextEnemy.time - this.levelData.enemies[this.currentEnemyIndex - 1].time));

      this.nextEnemyTimer = this.game.time.events.add(nextTime, function() {
        this.createEnemy(nextEnemy.x, nextEnemy.y, nextEnemy.key, nextEnemy.health, nextEnemy.scale, 2, 
        nextEnemy.speedX, nextEnemy.speedY);
      }, this);

      // above methode (.add) takes interval and callback (in this case using a lambda) and context

      this.currentEnemyIndex++; // increment to go to next enemy
      this.scheduleNextEnemy(); // call function again to
    }
  },

};
