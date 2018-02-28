MyGame = MyGame || {};

// Game state
MyGame.GameState = {
  create: function() { // create scene here
  	// place background and add other sprites
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');

    this.background.autoScroll(0, 30); // autoscroll background (x y direction)
    console.log('Now in GameState!'); // tiles sprite to fit entire background (x, y, width, height, sprite);
  },
  update: function() { // update methid
  	// update will run overthing under this method periodically during runtime
  },
};
