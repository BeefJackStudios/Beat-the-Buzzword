// Namespace
this.BD = this.BD || {};

(function() {
	
	"use strict";

	function Loader(__src, __assets) {

		var _this = this
		
		//this.BASE_URL = ""
		//this.status = "loading"
		
		this.location = BTBW.CONST.BASE_URL+"/static/img/" // this.BASE_URL + "assets/"+'hd'+"/"
		
		var callback_loaded;
		var spriteList = []
		
		//preload font
		//if (stage.context){
		//	stage.context.font = "2pt 'MixedBreedBold'";
		//	stage.context.fillStyle = "#333333";
		//	stage.context.fillText("preloadtext", -99, -99); 
		//}
		
		
		this.getPerc = function(){
			var perc = 0
			if (PRERENDER){
				if (_this.status == "loading"){
					perc = ((_this.assets_loaded / _this.assets_toload)/2)
				} else if (_this.status == "rendering"){
					perc = 0.5 + ((_this.assets_rendered / _this.assets_toload)/2)
				}
			} else {
				perc = (_this.assets_loaded / _this.assets_toload)
			}
			
			if (perc>1) perc = 1
			return perc
		}
		
		this.getStatus = function(){
			return "Loading"
		}
		
		this.load = function(loaded_callback, type){
			callback_loaded 		= loaded_callback;
			_this.assets_loaded		= 0;
			_this.assets_rendered	= 0;
			_this.assets_toload		= 0;
			_this.type				= type;
			
			
			for(var src in __src){
				
				//console.log( __src[src].type+" "+__src[src].src+" "+__src[src].id)
				//console.log("load() _this.assets_toload : "+_this.assets_toload)
				
				if(__src[src].type == "image") {
					++_this.assets_toload;
					
					var id						= __src[src].id
					var spriteName				= __src[src].spriteName
					var frm						= __src[src].frm
					
					__assets[id]				= new Image();
					__assets[id].sprn			= spriteName
					__assets[id].frm			= frm
					__assets[id].flipped		= __src[src].flipped
					__assets[id].prerender		= __src[src].prerender
					__assets[id].id			= id
					__assets[id].onload		= asset_loaded;
					__assets[id].src			= this.location + __src[src].src;
					
					__assets[id].addEventListener('error', function() {
						alert("load error "+id)
					}, false);
		
					
				}
			}
		}

		
		function asset_loaded(evt){
			if(!evt) evt	= window.event;         //for IE
			var target = evt.target
			if (!target) target = this				//for IE
			
			var id		= target.id
			var sprn	= target.sprn
		
			__assets[id].origW = target.width
			__assets[id].origH = target.height
			__assets[id].id	= id
		
			if (sprn) spriteList.push(target)
		
			var str = "\nloaded() _this.assets_toload : "+_this.assets_loaded+"/"+_this.assets_toload+"  id:"+target.id
			//if (TESTING) console.log(str)
			
			++_this.assets_loaded;	
			_this.checkFullyloaded()
		}
		

		this.checkFullyloaded = function (){
			if(_this.assets_loaded>0 && _this.assets_toload>0 && _this.assets_loaded == _this.assets_toload){
				//alert("checkFullyloaded "+_this.assets_toload+" "+_this.assets_loaded)
				if (_this.type == "main" && PRERENDER){ //  && !stage.useDom
					_this.status = "rendering"
					_this.initPrerender()
				} else {
					callback_loaded()
				}
			}
		}
		
		//---------------------------------------------------------------------------
		//---- prerendering ---------------------------------------------------------
		//---------------------------------------------------------------------------
		this.preRenderI = 0
		this.temparr = []
		this.imageId
		
		this.initPrerender = function(){
			_this.imageId = null
			for (var i in __assets){
				if (!__assets[i].predone){
					if (__assets[i]){
						__assets[i].predone = true
						_this.imageId = i
						break
					}
				}
			}

			if ( _this.imageId ){
				_this.prerenderSingle()
			} else {
				callback_loaded()
			}
			
		}
		
		this.prerenderSingle = function(){
			var src 	= __assets[_this.imageId].src 
			var W 		= Math.floor(__assets[_this.imageId].origW) 
			var H 		= Math.floor(__assets[_this.imageId].origH) 
			var flipped = __assets[_this.imageId].flipped
			
			if (!__assets[_this.imageId].sprn && __assets[_this.imageId].prerender){
				if (PRERENDER){
					__assets[_this.imageId] = renderToCanvas(W, H, function (seq) {
						seq.drawImage(__assets[_this.imageId], 0, 0, W, H);
					});
					
					__assets[_this.imageId].src = src
					__assets[_this.imageId].origW = W
					__assets[_this.imageId].origH = H
					__assets[_this.imageId].id = _this.imageId
				}
			}
			
			//store FLIPPED version --------------------------------
			if (flipped){
				__assets[_this.imageId].flipped = renderToCanvas(W, H, function (seq) {
						seq.save();
						seq.translate(W/2, H/2);
						seq.scale(-1, 1);
						seq.drawImage(imagessource[i], -W/2, -H/2, W, H);
						seq.restore();
					});
				__assets[_this.imageId].flipped.origW = W
				__assets[_this.imageId].flipped.origH = H
			}
			//-------------------------------------------------------------
					
			_this.assets_rendered++
			setTimeout(function(){ _this.initPrerender()}, 5)
		}
		

	};
	
	BD.Loader = Loader;
	
}());

