var loadState = {
    preload: function(){
        var loadingLabel = game.add.text(80,150,'loading...',{font:'30px Courier',fill:'#ffffff'});
        game.load.spritesheet('player', './assets/player.png', 32, 32);
        game.load.image('normal', './assets/normal.png');
        game.load.image('nails', './assets/nails.png');
        game.load.spritesheet('conveyorRight', './assets/conveyor_right.png', 96, 16);
        game.load.spritesheet('conveyorLeft', './assets/conveyor_left.png', 96, 16);
        game.load.spritesheet('trampoline', './assets/trampoline.png', 96, 22);
        game.load.spritesheet('fake', './assets/fake.png', 96, 36);
        game.load.image('wall', './assets/wall.png');
        game.load.image('ceiling', './assets/ceiling.png');
    
        game.load.audio('jumpmusic', './assets/jump.mp3');
        game.load.audio('hitmusic','./assets/hit.mp3');
        game.load.audio('dead','./assets/dead.mp3');
    },
    create: function(){
        game.state.start('menu');
    }
};