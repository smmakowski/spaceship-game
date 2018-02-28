MyGame = MyGame || {};

class Enemy extends Phaser.Sprite {
	constructor(game, x, y, key, health, enemyBullets) {
		super(game, x, y, key);
		this.animations.add('getHit', [0, 1, 2, 1, 0], 25, false);
		this.anchor.setTo(0.5);
		this.health = health;

		this.enemyBullets = enemyBullets;
	}

}