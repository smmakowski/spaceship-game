MyGame = MyGame || {};

MyGame.PreloadState = {
  preload: function() {
    // add sprites for logos and loading bar
    this.loadingBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBar');
    this.loadingBar.anchor.setTo(.5); // center anchor to midddle of bar
    this.load.setPreloadSprite(this.loadingBar); // crops arg image depening on load percentage
    // preload assets here
    this.load.image('space', '../../assets/images/space.png');
    this.load.image('player', '../../assets/images/player.png');
    this.load.image('bullet', '../../assets/images/bullet.png');
    this.load.image('enemyParticle', '../../assets/images/enemyParticle.png');
    this.load.spritesheet('yellowEnemy', '../../assets/images/yellow_enemy.png', 50, 46, 3, 1, 1);
    this.load.spritesheet('redEnemy', '../../assets/images/red_enemy.png', 50, 46, 3, 1, 1);
    this.load.spritesheet('greenEnemy', '../../assets/images/green_enemy.png', 50, 46, 3, 1, 1);

    // load level data
    this.load.text('level1', '../../assets/data/level1.json');
    this.load.text('level2', '../../assets/data/level2.json');
    this.load.text('level3', '../../assets/data/level3.json');

  },
  create: function() {
    console.log('Now in PreloadState');
    this.state.start('HomeState'); // start gameState
  },
}
