// Add States to game Object
MyGame.game.state.add('BootState', MyGame.BootState); // preload loading assets, and set window ratios
MyGame.game.state.add('PreloadState', MyGame.PreloadState); // preload game and home assets and be loading screen
MyGame.game.state.add('HomeState', MyGame.HomeState); // home screen state/main menu
MyGame.game.state.add('GameState', MyGame.GameState); // add GameState this is where the main game will occur

//Start Game From Boot state
MyGame.game.state.start('BootState'); // start game state


/*
	Note: file formerly main.js has been split into this file and createGame.js in order to accomdate HTML script loading
*/