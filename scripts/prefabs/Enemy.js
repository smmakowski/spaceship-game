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

			this.enemyTimer.pause(); // pauses the enemy shooting time
			// when enemys die and are in pool the Class instance is still there
			// killing nemey does not stop any timers that are created
			// make sure to pause timers to avoid unecessayr script runs obj is awaiting reset
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

	reset(x, y, health, key, scale, speedX, speedY) {
		// Sprites built in Class has reset method that takes, xY location and new health)
		Phaser.Sprite.prototype.reset.call(this, x, y, health);

		// This method calls that method and then uses extra parameters to set addtional properties that
		// original methodcannot
		this.loadTexture(key); // sets the texture of the sprite
		this.scale.setTo(scale);

		// when a spreite is killed it's velocity is set to 0; this reset includes parametesto cahgne them back
		this.body.velocity.x = speedX;
		this.body.velocity.y = speedY;

		this.enemyTimer.resume(); // resume timer to continue shooting.
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