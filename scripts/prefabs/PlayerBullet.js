MyGame = MyGame || {};

// es6 classversion of the 

class PlayerBullet extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'bullet');
		this.anchor.setTo(0.5);
		this.checkWorldBounds = true; // be aware for if in game bounds
		this.outOfBoundsKill = true; // kill if it leaves

	}
}


/*
	below is working code based off of tutorial (refactored above to use ES6 Classes)
*/

// MyGame.PlayerBullet = function(game, x, y) {
// 	Phaser.Sprite.call(this, game, x, y, 'bullet'); //create phaser sprite

// 	this.anchor.setTo(0.5);
// 	this.checkWorldBounds = true; // be aware for if in game bounds
// 	this.outOfBoundsKill = true; // kill if it leaves
// };

// MyGame.PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype); // inherit preotoy from phaser sprite
// MyGame.PlayerBullet.prototype.contructor = MyGame.PlayerBullet; // set construtcot