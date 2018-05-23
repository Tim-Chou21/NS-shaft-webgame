var winState = {
    create:function(){
        var winLabel = game.add.text(80,80,'YOU LOSE',{font:'50px Arial',fill:'#00FF00'});
    },
    restart:function(){
        game.sate.start('menu');
    }
}