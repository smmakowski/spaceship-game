MyGame = MyGame || {};

class EnemyBullet extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'bullet');
		this.anchor.setTo(0.5);
		this.checkWorldBounds = true; // be aware for if in game bounds
		this.outOfBoundsKill = true; // kill if it leaves

	}
}