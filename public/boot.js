var bootState = {
    /*preload: function () {
        // Load the progress bar image.
        game.load.image('progressBar', 'assets/progressBar.png');
    }, */
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }
};