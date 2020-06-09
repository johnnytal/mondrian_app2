var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '',{
             font: '25px', fill: 'white', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);

        this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "", {
            font: '18px', fill: 'lightgrey', align: 'center'
        });
    },
    
    create: function(){		
	   try{
           StatusBar.hide;
       } catch(e){} 
       try{
           window.plugins.insomnia.keepAwake();
       } catch(e){}  
       
       startGUI();
       
       initAd();
        
       game.state.start("Game");
    },
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text ="";
};

function startGUI () {
    var gui = new dat.GUI({ width: 300 });
    gui.add(config, 'COLORS', 2, 12).name('COLORS').step(1);
    gui.add(config, 'SHAPE_SIZE', 256, 768).name('SHAPE_SIZE').step(1);

    if (isMobile()) gui.close();
}

function isMobile () {
    return /Mobi|Android/i.test(navigator.userAgent);
}