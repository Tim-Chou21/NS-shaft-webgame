var game = new Phaser.Game(500, 500, Phaser.AUTO, 'canvas');


game.add.state('boot',bootState);
game.add.state('load',loadState);
game.add.state('index',playState);
game.add.state('menu',menuState);
game.add.state('win',winState);
game.add.state('multiplayer',multiplayerState);
game.add.state('scoreboard',scoreboardState);

game.state.start('boot');