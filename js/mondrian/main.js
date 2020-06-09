var game_main = function(game){
	totalWidth = 0;
	totalHeight = 0;
	
	colors = [0xffffff, 0x20100, getGrey(), getGrey(), 0x324E8D, 0xD01619, 
	0xFCE317, 0x0E7CB8, 0xD43E29, 0xAECC34, 0x0016AD, 0x0A9145];

    notes_penta = [ 
        'C2','D2','F2','G2','A2',
        'C3','D3','F3','G3','A3',
        'C4','D4','F4','G4','A4',
        'C5','D5','F5','G5','A5',
        'C6','D6','F6','G6','A6'
    ];
    
    config = {
	    SHAPE_SIZE: 360,
	    COLORS: 6
	};
};

game_main.prototype = {
    create: function(){
    	shuffle(colors);
		createNew(); 
    },
    update: function(){
    	if (game.input.activePointer.isDown){
    		game.state.start("Game"); 
    	}
    }
};

function createNew(){
   frameGraphics = game.add.graphics(0, 0);
   frameGraphics.lineStyle(3, 0x000000, 1);
   
   frameGraphics.drawRect(0, 0,  WIDTH, HEIGHT);
   
   osc = T("cosc", {wave:'tri', mul:0.2}); 

   graphics = game.add.graphics(0, 0);
	 
   graphics.lineStyle(game.rnd.integerInRange(1, 10), getGrey(), 1);

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
    var frequency = notes_penta[game.rnd.integerInRange(0, notes_penta.length-1)];
    osc.freq = teoria.note(frequency).fq();
    
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
	    
	    var attack = game.rnd.integerInRange(0, 30);
	    var sustain = game.rnd.integerInRange(50, 140);
	    var decay = game.rnd.integerInRange(50, 120);
	    var release = game.rnd.integerInRange(50, 120);
	    
	    env = T("perc", {a: attack, s:sustain, d:sustain, r:release}, osc).on("ended", function() {
	        this.pause();
	    }).bang().play();  
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