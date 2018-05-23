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

var menu_music;
var crown;

var scoreboardState = {
    preload:function(){
        game.load.image('bgimage', './assets/bgimg.jpg');
        game.load.audio('menumusic', './assets/menumusic.mp3');
        getranking();
    },
    create:function(){
        menu_music = game.add.audio('menumusic');
        menu_music.play();
        game.add.image(0,0,'bgimage');
        game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(back, this);

        var first = game.add.text(5,200,'第一名 : '+firstplace_name +' : ' +firstplace_record + '階     '+firstplace_time,{font:'30px Arial',fill:'#ffffff'});
        var second = game.add.text(5,250,'第二名 : '+secondplace_name +' : '+ secondplace_record + '階     '+secondplace_time,{font:'30px Arial',fill:'#ffffff'});
        var third = game.add.text(5,300,'第三名 : '+thirdplace_name +' : '+ thirdplace_record + '階     '+thirdplace_time,{font:'30px Arial',fill:'#ffffff'});
    },
    /*update:function(){

    }*/
}
function back(){
    game.state.start('menu');
}

function getranking() {
    var postsRef = firebase.database().ref('Record');
    var total_post = [];
    var name_post = [];
    var time_post = [];
    var first_count = 0;
    var second_count = 0;
    
    postsRef.once('value')
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                var name = childSnapshot.val().name;
                var bestrecord = childSnapshot.val().data;
                var time = childSnapshot.val().time;
                
                total_post[total_post.length] = bestrecord;
                name_post[name_post.length] = name;
                time_post[time_post.length] = time;
                first_count += 1;
            });

            //add listener
            postsRef.on('child_added', function (data) {
                second_count += 1;
                if (second_count > first_count) {
                    var childData = data.val();
                    var name = data.val().name;
                    var bestrecord = data.val().data;
                    var time = data.val().time;
                    
                    total_post[total_post.length] = bestrecord;
                    name_post[name_post.length] = name;
                    time_post[time_post.length] = time;
                }
            });
            for (var i = total_post.length - 1; i > 0; i--) {
                for (var j = 0; j < i; j++) {
                    if (total_post[j] < total_post[j + 1]) {
                        var tmp, tmp_name, tmp_time;

                        tmp = total_post[j];
                        total_post[j] = total_post[j + 1];
                        total_post[j + 1] = tmp;

                        tmp_name = name_post[j];
                        name_post[j] = name_post[j + 1];
                        name_post[j + 1] = tmp_name;

                        tmp_time = time_post[j];
                        time_post[j] = time_post[j + 1];
                        time_post[j + 1] = tmp_time;
                    }
                }
            }
            firstplace_name = name_post[0];
            firstplace_record = total_post[0];
            firstplace_time = time_post[0];
            secondplace_name = name_post[1];
            secondplace_record = total_post[1];
            secondplace_time = time_post[1];
            thirdplace_name = name_post[2];
            thirdplace_record = total_post[2];
            thirdplace_time = time_post[2];
            number_of_users = total_post.length;
            console.log('lenght: ' + total_post.length);
            console.log('1.' + firstplace_name + ':' + firstplace_record + '->' + firstplace_time);
            console.log('2.' + secondplace_name + ':' + secondplace_record + '->' + secondplace_time);
            console.log('3.' + thirdplace_name + ':' + thirdplace_record + '->' + thirdplace_time);
        })
        .catch(e => console.log(e.message));
}