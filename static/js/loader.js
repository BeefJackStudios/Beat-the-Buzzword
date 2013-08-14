
(function($){
	
	$(function(){
		
		var str, txt1, txt2, txt3, txt4;
		
		function load1(){
			$.ajax({
				cache:false,
				url : "pt1.txt",
				success: function(data, textStatus, jqXHR) {
					console.log('1 success');
					console.log(data);
				},
				error: function(jqXHR, textStatus, errorThrown) {
						console.log('1 fail');
						txt1 = jqXHR.responseText;
						load2()
					}
			});
		}
		
		function load2(){
			$.ajax({
				cache:false,
				url : "pt2.txt",
				success: function(data, textStatus, jqXHR) {
					console.log('2 success');
					txt2 = jqXHR.responseText;
					load3()
				},
				error: function(jqXHR, textStatus, errorThrown) {
						console.log('2 fail');
						txt2 = jqXHR.responseText;
						load3()
					}
			});
		}
		
		function load3(){
			$.ajax({
				cache:false,
				url : "pt3.txt",
				success: function(data, textStatus, jqXHR) {
					console.log('3 success');
					txt3 = jqXHR.responseText;
					load4()
				},
				error: function(jqXHR, textStatus, errorThrown) {
						console.log('3 fail');
						txt3 = jqXHR.responseText;
						load4()
					}
			});
		}
		
		function load4(){
			$.ajax({
				cache:false,
				url : "pt4.txt",
				success: function(data, textStatus, jqXHR) {
					console.log('4 success');
					//console.log(data);
				},
				error: function(jqXHR, textStatus, errorThrown) {
						console.log('4 fail');
						txt4 = jqXHR.responseText;
						str = txt1+"IntroController"+txt2+txt3+txt4
						//document.body.innerHTML = str;
						//document.all[0].innerHTML = str;
						
						
						var templateHTML = angular.element(str);
						var scope = document;
						var clonedElement = $compile(templateHTML)(scope, function(clonedElement, scope) {
							//attach the clone to DOM document at the right place
							alert(clonedElement)
						});
						 


						$(document.body).html(str);
						
						//$(document.body).html(str);

					}
			});
		}
		
		load1()

	});
})(jQuery);


		