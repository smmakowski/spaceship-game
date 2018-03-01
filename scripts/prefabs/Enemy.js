MyGame = MyGame || {};

class Enemy extends Phaser.Sprite {
	constructor(game, x, y, key, health, enemyBullets, shotInterval) {
		super(game, x, y, key);
		this.animations.add('getHit', [0, 1, 2, 1, 0], 25, false);
		this.anchor.setTo(0.5);
		this.health = health;

		this.enemyBullets = enemyBullets;
		//game.physics.arcade.enable(this);
		this.enemyTimer = this.game.time.create(false); // timer will not self destroy after running
		this.enemyTimer.start();

		this.scheduleShooting(shotInterval);
	}

	damage(amount) {
		Phaser.Sprite.prototype.damage.call(this, amount);
		this.play('getHit');

		if (this.health <= 0) {
			let emitter = this.game.add.emitter(this.x, this.y, 100); // creates particle emitter (x, y, how many particles)
			emitter.makeParticles('enemyParticle'); //set particles
			emitter.minParticleSpeed.setTo(-200, -200); // sets min and max direction on x/y axis
			emitter.maxParticleSpeed.setTo(200, 200);
			emitter.gravity = 0; // no gravity
			emitter.start(true, 500, null, 100); 
			//FOR ABOVE: true (set all paricles lose at same time/expode), life of each aprticler(ms), frequency (how often to release if noit explosion)
			// How many of the partcles to release
			
		}
	}

	scheduleShooting(shotInterval) {
		this.shoot();
		this.enemyTimer.add(Phaser.Timer.SECOND * shotInterval, this.scheduleShooting, this);
		// Interval, Method to call after scheulding is done, this context)
	}

	shoot() {
		let bullet = this.enemyBullets.getFirstExists(false);

		if (!bullet) {
			bullet = new EnemyBullet(this.game, this.x, this.bottom);
			this.enemyBullets.add(bullet);
		} else {
			bullet.reset(this.x, this.y);
		}

		bullet.body.velocity.y = 100;
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