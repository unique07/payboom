// <![CDATA[
(function($){
jQuery(function($){

    var $container = $('.wrap_box');
  
    $container.imagesLoaded( function(){
      $container.masonry({
        columnWidth: 1,
			isAnimated: true
      });
    });
  
});
})(jQuery);
// ]]>