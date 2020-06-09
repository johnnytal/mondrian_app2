//window.onload = start;

document.addEventListener("deviceready", start, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);

function start(){
    WIDTH = 960; 
    HEIGHT = 960;
    
    w = window.innerWidth * window.devicePixelRatio;
    h = window.innerHeight * window.devicePixelRatio;

    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, 'game');

    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
    game.state.add("Game", game_main);
    
    game.state.start("Boot");  
};

var boot = function(game){};

boot.prototype = {
    preload: function(){},
    
    create: function(){     
        if (this.game.device.desktop){
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 
            this.scale.maxWidth = WIDTH; 
            this.scale.maxHeight = HEIGHT; 
            
            this.game.scale.pageAlignHorizontally = true;
        } 
        
        else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
            this.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
            
            this.scale.forceOrientation(true, false);
        }
        
        game.state.start('Preloader');
    }
};

function onPause(){
    game.paused = true;
}

function onResume(){
    game.paused = false;
    setTimeout(function(){
        try{
            StatusBar.hide();
        }catch(e){}   
    }, 1000);
}