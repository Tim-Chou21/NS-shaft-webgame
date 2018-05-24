var winState = {
    create:function(){
        var winLabel = game.add.text(100,80,'YOU LOSE',{font:'50px Arial',fill:'#00FF00'});
        var winLabel = game.add.text(80,300,'PRESS ESC TO RESTART',{font:'25px Arial',fill:'#00FF00'});
        game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(back, this);
    },
    // restart:function(){
    //     game.sate.start('menu');
    // }
}

function back(){
    game.state.start('menu');
}