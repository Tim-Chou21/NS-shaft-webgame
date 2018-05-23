var game = new Phaser.Game(500, 500, Phaser.AUTO, '');
    
var player;
var keyboard;

var platforms = [];

var leftWall;
var rightWall;
var ceiling;

var leftWall2;
var rightWall2;
var ceiling2;

var text1;
var text2;
var text3;

var distance = 0;
var status = 'running';

var firstplace_name ;
var firstplace_record; 
var firstplace_time ;
var secondplace_name ;
var secondplace_record;
var secondplace_time ;
var thirdplace_name ;
var thirdplace_record; 
var thirdplace_time ;
var number_of_users;

var num1;
var num2;
var num3;
var num1_t;
var num2_t;
var num3_t;

//var bg_music;
var dead_music;
var playState = {
    preload:function(){
        

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
    create:function(){
        keyboard = game.input.keyboard.addKeys({
            'enter': Phaser.Keyboard.ENTER,
            'up': Phaser.Keyboard.UP,
            'down': Phaser.Keyboard.DOWN,
            'left': Phaser.Keyboard.LEFT,
            'right': Phaser.Keyboard.RIGHT,
            'w': Phaser.Keyboard.W,
            'a': Phaser.Keyboard.A,
            's': Phaser.Keyboard.S,
            'd': Phaser.Keyboard.D
        });
        bg_music = game.add.audio('bg');
        bg_music.play();
        jump_music = game.add.audio('jumpmusic');
        hit_music  = game.add.audio('hitmusic');
        dead_music = game.add.audio('dead');
        
        
        getranking();
        createBounders();
        createPlayer();
        createTextsBoard();
    },
    update:function(){
        if(status == 'gameOver' && keyboard.enter.isDown) restart();
        if(status != 'running') return;

        this.physics.arcade.collide(player, platforms, effect);
        this.physics.arcade.collide(player, [leftWall, rightWall]);
        this.physics.arcade.collide(player, [leftWall2, rightWall2]);

        checkTouchCeiling(player);
        checkGameOver();


        updatePlayer();
        updatePlatforms();
        updateTextsBoard();

        createPlatforms();
    }
}

function createBounders () {
    leftWall = game.add.sprite(0, 0, 'wall');
    game.physics.arcade.enable(leftWall);
    leftWall.body.immovable = true;

    rightWall = game.add.sprite(483, 0, 'wall');
    game.physics.arcade.enable(rightWall);
    rightWall.body.immovable = true;

    leftWall2 = game.add.sprite(0, 100, 'wall');
    game.physics.arcade.enable(leftWall2);
    leftWall2.body.immovable = true;

    rightWall2 = game.add.sprite(483, 100, 'wall');
    game.physics.arcade.enable(rightWall2);
    rightWall2.body.immovable = true;

    ceiling = game.add.image(0, 0, 'ceiling');
    ceiling2 = game.add.image(200,0,'ceiling');
}

var lastTime = 0;
function createPlatforms () {
    if(game.time.now > lastTime + 600) {
        lastTime = game.time.now;
        createOnePlatform();
        distance += 1;
    }
}

function createOnePlatform () {

    var platform;
    var x = Math.random()*(500 - 96 - 40) + 20;
    var y = 500;
    var rand = Math.random() * 100;

    if(rand < 20) {
        platform = game.add.sprite(x, y, 'normal');
    } else if (rand < 40) {
        platform = game.add.sprite(x, y, 'nails');
        game.physics.arcade.enable(platform);
        platform.body.setSize(96, 15, 0, 15);
    } else if (rand < 50) {
        platform = game.add.sprite(x, y, 'conveyorLeft');
        platform.animations.add('scroll', [0, 1, 2, 3], 16, true);
        platform.play('scroll');
    } else if (rand < 60) {
        platform = game.add.sprite(x, y, 'conveyorRight');
        platform.animations.add('scroll', [0, 1, 2, 3], 16, true);
        platform.play('scroll');
    } else if (rand < 80) {
        platform = game.add.sprite(x, y, 'trampoline');
        platform.animations.add('jump', [4, 5, 4, 3, 2, 1, 0, 1, 2, 3], 120);
        platform.frame = 3;
    } else {
        platform = game.add.sprite(x, y, 'fake');
        platform.animations.add('turn', [0, 1, 2, 3, 4, 5, 0], 14);
    }

    game.physics.arcade.enable(platform);
    platform.body.immovable = true;
    platforms.push(platform);

    platform.body.checkCollision.down = false;
    platform.body.checkCollision.left = false;
    platform.body.checkCollision.right = false;
}

function createPlayer() {
    player = game.add.sprite(200, 50, 'player');
    game.physics.arcade.enable(player);
    player.body.gravity.y = 500;
    player.animations.add('left', [0, 1, 2, 3], 8);
    player.animations.add('right', [9, 10, 11, 12], 8);
    player.animations.add('flyleft', [18, 19, 20, 21], 12);
    player.animations.add('flyright', [27, 28, 29, 30], 12);
    player.animations.add('fly', [36, 37, 38, 39], 12);
    player.life = 10;
    player.unbeatableTime = 0;
    player.touchOn = undefined;
}

function createTextsBoard () {
    var style = {fill: '#ff0000', fontSize: '20px'}
    text1 = game.add.text(10, 10, '', style);
    text2 = game.add.text(350, 10, '', style);
    text3 = game.add.text(140, 200, 'Enter 重新開始', style);
    text3.visible = false;

    num1 = game.add.text();

}

function updatePlayer () {
    if(keyboard.left.isDown) {
        player.body.velocity.x = -250;
    } else if(keyboard.right.isDown) {
        player.body.velocity.x = 250;
    } else {
        player.body.velocity.x = 0;
    }
    setPlayerAnimate(player);
}

function setPlayerAnimate(player) {
    var x = player.body.velocity.x;
    var y = player.body.velocity.y;

    if (x < 0 && y > 0) {
        player.animations.play('flyleft');
    }
    if (x > 0 && y > 0) {
        player.animations.play('flyright');
    }
    if (x < 0 && y == 0) {
        player.animations.play('left');
    }
    if (x > 0 && y == 0) {
        player.animations.play('right');
    }
    if (x == 0 && y != 0) {
        player.animations.play('fly');
    }
    if (x == 0 && y == 0) {
      player.frame = 8;
    }
}

function updatePlatforms () {
    for(var i=0; i<platforms.length; i++) {
        var platform = platforms[i];
        platform.body.position.y -= 2;
        if(platform.body.position.y <= -20) {
            platform.destroy();
            platforms.splice(i, 1);
        }
    }
}

function updateTextsBoard () {
    text1.setText('     life:' + player.life);
    text2.setText('               B' + distance);
}

function effect(player, platform) {
    if(platform.key == 'conveyorRight') {
        conveyorRightEffect(player, platform);
    }
    if(platform.key == 'conveyorLeft') {
        conveyorLeftEffect(player, platform);
    }
    if(platform.key == 'trampoline') {
        trampolineEffect(player, platform);
    }
    if(platform.key == 'nails') {
        nailsEffect(player, platform);
    }
    if(platform.key == 'normal') {
        basicEffect(player, platform);
    }
    if(platform.key == 'fake') {
        fakeEffect(player, platform);
    }
}

function conveyorRightEffect(player, platform) {
    player.body.x += 2;
}

function conveyorLeftEffect(player, platform) {
    player.body.x -= 2;
}

function trampolineEffect(player, platform) {
    platform.animations.play('jump');
    player.body.velocity.y = -350;
    jump_music.play();
}

function nailsEffect(player, platform) {
    if (player.touchOn !== platform) {
        player.life -= 3;
        player.touchOn = platform;
        hit_music.play();
        game.camera.flash(0xff0000, 100);
    }
}

function basicEffect(player, platform) {
    if (player.touchOn !== platform) {
        if(player.life < 10) {
            player.life += 1;
        }
        player.touchOn = platform;
    }
}

function fakeEffect(player, platform) {
    if(player.touchOn !== platform) {
        platform.animations.play('turn');
        setTimeout(function() {
            platform.body.checkCollision.up = false;
        }, 100);
        player.touchOn = platform;
    }
}

function checkTouchCeiling(player) {
    if(player.body.y < 0) {
        if(player.body.velocity.y < 0) {
            player.body.velocity.y = 0;
        }
        if(game.time.now > player.unbeatableTime) {
            player.life -= 3;
            game.camera.flash(0xff0000, 100);
            player.unbeatableTime = game.time.now + 2000;
        }
    }
}

function checkGameOver () {
    if(player.life <= 0 || player.body.y > 500) {
        gameOver();
    }
}

function gameOver () {
    text3.visible = true;
    platforms.forEach(function(s) {s.destroy()});
    platforms = [];
    dead_music.play();
    writedata();
    //status = 'gameOver';
    game.state.start('menu');
}

function restart () {
    text3.visible = false;
    distance = 0;
    createPlayer();
    status = 'running';
}

function writedata(){
    var name = firebase.auth().currentUser.displayName;
    var score = distance;
    var newpost = firebase.database().ref('Record').push();

    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if(h<10){
      h = '0'+h;
    }
    if(m<10){
      m = '0' + m;
    }
    if(s<10){   
      s = '0' + s;
    }
    var now = h+':'+m+':'+s;

    newpost.set({
        name : name,
        data : score,
        time : now
    })
}

firebase.auth().onAuthStateChanged(function (user) {
    var menu = document.getElementById('dynamic-menu');
    // Check user login
    if (user) {
        menu.innerHTML = "<span class='dropdown-item'>" + user.email +'     '+ "</span><span class='dropdown-item' id='logout-btn'>Logout</span>";
    
    /// TODO 5: Complete logout button event
        ///         1. Add a listener to logout button 
        ///         2. Show alert when logout success or error (use "then & catch" syntex)
        var btnLogout = document.getElementById('logout-btn');
        btnLogout.addEventListener('click', e => {
            firebase.auth().signOut().then(function(result){
                alert("success");
            }).catch(function(error){
                alert("error");
            });
        });
    } else {
        // It won't show any post if not login
        menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Login</a>";
        
    }
});

game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('scoreboard',scoreboardState);
game.state.add('index',playState);
game.state.add('menu',menuState);
game.state.add('win',winState);
game.state.add('multiplayer',multiplayerState);


game.state.start('boot');

