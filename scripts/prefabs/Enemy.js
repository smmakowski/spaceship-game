MyGame = MyGame || {};

class Enemy extends Phaser.Sprite {
	constructor(game, x, y, key, health, enemyBullets) {
		super(game, x, y, key);
		this.animations.add('getHit', [0, 1, 2, 1, 0], 25, false);
		this.anchor.setTo(0.5);
		this.health = health;

		this.enemyBullets = enemyBullets;
		//game.physics.arcade.enable(this);
	}

	damage(amount) {
		Phaser.Sprite.prototype.damage.call(this, amount);
		this.play('getHit');
	}

	update() {
		if (this.x < 0.05 * this.game.world.width) {
			this.x = 0.05 * this.game.world.width + 2;
			this.body.velocity.x *= -1;
			
		} else if (this.x > 0.95 * this.game.world.width) {
			this.x = 0.95 * this.game.world.width - 2;
			this.body.velocity.x *= -1;
		}

		if (this.top > this.game.world.height) {
			this.kill();
		}
		
	}

}