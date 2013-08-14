;window.BTBW = window.BTBW || {};

(function($){
	BTBW.Utilities = BTBW.Utilities || (function(){
		var 
		private = {
		},
		public = {
			init : function() {

				public.initScrollbars();
				public.initScrollbarsHoriz();
				
				//vertically centering for big screens
				/*if($(window).height() > $('#wrap-centering-container').height()) {
					$('#wrap-centering-container').addClass('large');
				}*/

				$('#tidy').on('click', function(){
					$('body').toggleClass('tidy');
				});				
			},			
			initScrollbars : function(){
				//init the scrollbars
				$('.wrap-table').tinyscrollbar({ axis: 'y'});
			},
			
			initScrollbarsHoriz : function(){
				//init the scrollbars
				$('.wrap-table').tinyscrollbar({ axis: 'x'});
			}
		}
		;
		return public;
	})();

	$(function(){
		BTBW.Utilities.init();
		//$('#wrap-overlay').load('intro_partial.htm');
	});
	
})(jQuery);


		