var select_one_in_menu = 0;
var menu_style = { fill: '#0000ff', fontSize: '30px' };
var unselect_style = { fill: '#ffffff', fontSize: '30px' };

var menuState = {
    preload:function(){
        game.load.audio('bg','./assets/bgmusic.mp3')
    },
    create:function(){
        var nameLabel = game.add.text(80,80,'小朋友下樓梯',{font:'50px Arial',fill:'#ffffff'});
        var startLabel = game.add.text(80,game.world.height-80,'          Hello World' ,{font:'30px Arial',fill:'#ffffff'});
        
        if (select_one_in_menu == 0) {
            menu_StartGame = game.add.text(game.width / 2 - 100, game.height / 2, 'Start', menu_style);
            menu_2Players = game.add.text(game.width / 2 - 100, game.height / 2 + 40, '2 Players', unselect_style);
            menu_leaderboard = game.add.text(game.width / 2 - 100, game.height / 2 + 80, 'Leaderboard', unselect_style);
        } else if (select_one_in_menu == 1) {
            menu_StartGame = game.add.text(game.width / 2 - 100, game.height / 2, 'Start', unselect_style);
            menu_2Players = game.add.text(game.width / 2 - 100, game.height / 2 + 40, '2 Players', menu_style);
            menu_leaderboard = game.add.text(game.width / 2 - 100, game.height / 2 + 80, 'Leaderboard', unselect_style);
        } else if (select_one_in_menu == 2) {
            menu_StartGame = game.add.text(game.width / 2 - 100, game.height / 2, 'Start', unselect_style);
            menu_2Players = game.add.text(game.width / 2 - 100, game.height / 2 + 40, '2 Players', unselect_style);
            menu_leaderboard = game.add.text(game.width / 2 - 100, game.height / 2 + 80, 'Leaderboard', menu_style);
        }

        game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.previosoption, this);
        game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(this.nextoption, this);
        game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(this.previosoption, this);
        game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(this.nextoption, this);

        game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.start,this);
  }  ,
  start:function(){
        if(select_one_in_menu==0)
            game.state.start('index');
        else if(select_one_in_menu==1)
            game.state.start('multiplayer');
        else if(select_one_in_menu==2)
            game.state.start('scoreboard');
  },
  nextoption: function () {
    if (select_one_in_menu == 0) {
        select_one_in_menu = 1;
        menu_StartGame = game.add.text(game.width / 2 - 100, game.height / 2, 'Start', unselect_style);
        menu_2Players = game.add.text(game.width / 2 - 100, game.height / 2 + 40, '2 Players', menu_style);
        menu_leaderboard = game.add.text(game.width / 2 - 100, game.height / 2 + 80, 'Leaderboard', unselect_style);
    } else if (select_one_in_menu == 1) {
        select_one_in_menu = 2;
        menu_StartGame = game.add.text(game.width / 2 - 100, game.height / 2, 'Start', unselect_style);
        menu_2Players = game.add.text(game.width / 2 - 100, game.height / 2 + 40, '2 Players', unselect_style);
        menu_leaderboard = game.add.text(game.width / 2 - 100, game.height / 2 + 80, 'Leaderboard', menu_style);
    } else if (select_one_in_menu == 2) {
        select_one_in_menu = 0;
        menu_StartGame = game.add.text(game.width / 2 - 100, game.height / 2, 'Start', menu_style);
        menu_2Players = game.add.text(game.width / 2 - 100, game.height / 2 + 40, '2 Players', unselect_style);
        menu_leaderboard = game.add.text(game.width / 2 - 100, game.height / 2 + 80, 'Leaderboard', unselect_style);
    }
},
previosoption: function () {
    if (select_one_in_menu == 0) {
        select_one_in_menu = 2;
        menu_StartGame = game.add.text(game.width / 2 - 100, game.height / 2, 'Start', unselect_style);
        menu_2Players = game.add.text(game.width / 2 - 100, game.height / 2 + 40, '2 Players', unselect_style);
        menu_leaderboard = game.add.text(game.width / 2 - 100, game.height / 2 + 80, 'Leaderboard', menu_style);
    } else if (select_one_in_menu == 1) {
        select_one_in_menu = 0;
        menu_StartGame = game.add.text(game.width / 2 - 100, game.height / 2, 'Start', menu_style);
        menu_2Players = game.add.text(game.width / 2 - 100, game.height / 2 + 40, '2 Players', unselect_style);
        menu_leaderboard = game.add.text(game.width / 2 - 100, game.height / 2 + 80, 'Leaderboard', unselect_style);
    } else if (select_one_in_menu == 2) {
        select_one_in_menu = 1;
        menu_StartGame = game.add.text(game.width / 2 - 100, game.height / 2, 'Start', unselect_style);
        menu_2Players = game.add.text(game.width / 2 - 100, game.height / 2 + 40, '2 Players', menu_style);
        menu_leaderboard = game.add.text(game.width / 2 - 100, game.height / 2 + 80, 'Leaderboard', unselect_style);
    }
}
};

