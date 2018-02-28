MyGame = MyGame || {};

// Game state
MyGame.GameState = {
  create: function() { // create scene here
  	// place background and add other sprites
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');

    this.background.autoScroll(0, 30); // autoscroll background (x y direction)
    console.log('Now in GameState!'); // tiles sprite to fit entire background (x, y, width, height, sprite);

    //establish constants
    this.PLAYER_SPEED = 200;
    this.BULLET_SPEED = -1000;

    this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 50, 'player');
    this.player.anchor.setTo(0.5); // set anchor to absolute center (omit y)
    this.game.physics.arcade.enable(this.player); //enable phyics
    this.player.body.collideWorldBounds = true; // ensure collisionm wit gma world bounds
  },

  update: function() { // update methid
  	// update will run overthing under this method periodically during runtime
  	this.player.body.velocity.x = 0;

  	if (this.game.input.activePointer.isDown) { // if player is touching screen
  		console.log('Currently Pressing Down')
  		let targetX = this.game.input.activePointer.position.x; // set target destination to x/y coords
  		// let targetY = this.game.input.activePointer.position.y; // no need for y since player only moves left to right

  		let direction = targetX >= this.game.world.centerX ? 1 : -1; // change velocity direction depending on touch location

  		console.log('TargetX = ', targetX);

  		this.player.body.velocity.x = direction * this.PLAYER_SPEED;
  	}
  },
};
