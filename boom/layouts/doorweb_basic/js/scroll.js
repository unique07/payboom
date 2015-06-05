jQuery(function($){
	$(document).ready(function(){

		var flag = false;
		$(window).scroll(function(){

			if  ($(window).scrollTop() >= 100 && flag == false){
				flag = true;
				

				
				 $('.header').stop().animate({
                    top: '-100px'                  
                    }, 200, 'swing');
				
			}
       

			if  ($(window).scrollTop() <= 100 && flag == true){
				flag = false;
					 $('.header').stop().animate({
                    top: '0'                  
                    }, 100, 'swing');
				
			 }
         
            
		});
 
	});
});