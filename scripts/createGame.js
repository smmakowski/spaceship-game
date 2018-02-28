//Create Game as Empty Object

let MyGame = {};

//Create Phaser Game as property of MyGame Object
MyGame.game = new Phaser.Game('100%', '100%', Phaser.AUTO); // init new Game; pahser will automatically append a canvas (also accepts percentage of screen size)

/*
	Note: file formerly main.js has been split into this file and startGame.js in order to accomdate HTML script loading
*/