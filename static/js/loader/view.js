// Namespace
this.BD = this.BD || {};

(function() {
	
	"use strict";

	function PreloaderPage(o){
		
		var _this 			= this
		this.params			= o
		
		var barW = 200
		var barH = 30
		
			
		//---------------------------------------------------
		this.execute = function(o){
			this.params = o
			this.buildPage()
			return this
		}
		

		this.buildPage = function(){
			this.xpos = 200
			//BD.stage.addDomChild({assetName:"preloader_background", cssId:"loaderBg"})
			BD.stage.addChild({assetName:"gamebg", pos:{x:0, y:0}, w:BD.canvasWidth/BD.stage.scale, h:BD.canvasHeight/BD.stage.scale});
		
			var x = BD.canvasWidth/2-barW/2
			var y = BD.canvasHeight/2-barH/2
			this.pos = {x:x, y:y}
			
			this.backbar = BD.stage.addChild({assetName:"preloader_bar_bg", pos:this.pos, w:barW, h:barH});
			this.backbar.callback = function(){ _this.addMask()}
		}
		
		this.addMask = function (){
			var status = _this.params.loader.getStatus()
			var perc = _this.params.loader.getPerc()
			
			if (!BD.stage.useDom){
				var ctx = BD.stage.context
				ctx.save();
				ctx.beginPath();
				ctx.rect(_this.pos.x+(perc*barW*BD.stage.scale), _this.pos.y*BD.stage.scale, 800, barW);
				ctx.clip();
				ctx.drawImage(assets.preloader_bar_fill, _this.pos.x*BD.stage.scale ,  _this.pos.y*BD.stage.scale, barW*BD.stage.scale, barH*BD.stage.scale);
				ctx.restore();
			}
		}
		
		
		this.destroy = function (){
			BD.stage.destroy()
		}
	
	};
	
	BD.PreloaderPage = PreloaderPage;
	
}());
