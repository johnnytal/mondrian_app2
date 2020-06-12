var game_main = function(game){
	totalWidth = 0;
	totalHeight = 0;
	
	colors = [0xffffff, 0x20100, getGrey(), getGrey(), 0x324E8D, 0xD01619, 
	0xFCE317, 0x0E7CB8, 0xD43E29, 0xAECC34, 0x0016AD, 0x0A9145];

    config = {
	    SHAPE_SIZE: 360,
	    COLORS: 6, 
	    LINE_WIDTH: 3
	};
};

game_main.prototype = {
    create: function(){
    	shuffle(colors);
		createNew(); 
   	 	
   	 	var rnd = game.rnd.integerInRange(0, 15);
   	 	if (rnd == 2){ 	 	 	
			if(AdMob) AdMob.showInterstitial();
	  	}
	  	
	  	if (!started){
	    	instructText = game.add.text(578, 680, '', {
	        	font: '42px', fill: 'white', align: 'center', stroke:'black', strokeThickness: 1, backgroundColor: 'rgba(0,0,139,0.8)'
	   		});
	
	    	instructText.text = "Generate Mondrian paintings - \n- Tap the screen to create a new painting." +
	    	"\n- Use the controls to change shapes' size & color\n" +
	    	"- For interesting results try tapping multiple times\nwhile the image compiles";
	    	
	   		instructText.x = game.world.centerX - instructText.width / 2;
	   		instructText.y = game.world.centerY - instructText.height / 2 - 200;
	   		
	   		started = true;
   		}
    },
    update: function(){
    	if (game.input.activePointer.isDown){
    		game.state.start("Game"); 
    		
    		if (instructText.visible){
    			instructText.destroy();
    		}
    	}
    }
};

function createNew(){
   frameGraphics = game.add.graphics(0, 0);
   frameGraphics.lineStyle(3, 0x000000, 1);
   
   frameGraphics.drawRect(0, 0,  WIDTH, HEIGHT);
   
   graphics = game.add.graphics(0, 0);
	 
   graphics.lineStyle(game.rnd.integerInRange(1 * config.LINE_WIDTH, 5 * config.LINE_WIDTH), getGrey(), 1);

   game.stage.backgroundColor = getRndColor();
	
   setTimeout(function(){
   	   var colorIndex = game.rnd.integerInRange(0, config.COLORS);
	   draw(
   		   game.rnd.integerInRange(config.SHAPE_SIZE / 3, config.SHAPE_SIZE), 
   		   game.rnd.integerInRange(config.SHAPE_SIZE / 3, config.SHAPE_SIZE), 
   		   colors[colorIndex],
   		   0, 
   		   0
	   );
   }, 400);
}

function draw(randomW, randomH, randomColor, startX, startY, _colorIndex){
	graphics.beginFill(getRndColor());
	rect = graphics.drawRect(startX, startY,  randomW, randomH);
	graphics.endFill();

	totalWidth += randomW;
	totalHeight += randomH;

	randomW = game.rnd.integerInRange(config.SHAPE_SIZE / 3, config.SHAPE_SIZE);
	randomH = game.rnd.integerInRange(config.SHAPE_SIZE / 3, config.SHAPE_SIZE);
	
	setTimeout(function(){			    
		if (totalWidth < WIDTH){
			draw(randomW, randomH, randomColor, totalWidth, startY); 
		}  
			
		else{
			startY += game.rnd.integerInRange(config.SHAPE_SIZE / 3, config.SHAPE_SIZE / 1.5);
			
			if (startY < HEIGHT){
				startX = 0;
				
				draw(randomW, randomH, randomColor, startX, startY); 
				totalWidth = 0;
			}
		}
	}, 70);
}

function getGrey(){
	var value = Math.random() * 0xFF | 0;
	var grayscale = (value << 16) | (value << 8) | value;
	var color = '0x' + grayscale.toString(16);
	
	return color;
}

function getRndColor(){
	_color = colors[game.rnd.integerInRange(0, config.COLORS)];
	return _color;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function initAd(){		
	admobid = {
      banner: 'ca-app-pub-9795366520625065/6484168320',
      interstitial: 'ca-app-pub-9795366520625065/4376879737'
    };
    
    if(AdMob) AdMob.createBanner({
	    adId: admobid.banner,
	    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    	autoShow: true 
	});
	
	if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
}