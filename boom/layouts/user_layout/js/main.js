"use strict";
function removeTamper() {
	jQuery(this).parent(".tamper").remove();
}
/*
jQuery('.start-billboard .billboardNest .row').royalSlider({
	autoHeight: true,
	transitionType: 'move',
	autoScaleSlider: true,
	transitionSpeed: 800,
	autoScaleSliderWidth: 530,
	autoScaleSliderHeight: "auto",
	arrowsNav: false,
	arrowsAutoHide:false,
	controlNavigation: 'bullets',
	imageScaleMode: 'fill',
	autoPlay: {
		enabled: true,
		pauseOnHover: true,
		delay:5000
	},
	loop: true,
	loopRewind: true,
	navigateByClick: false
});
*/ 
jQuery('.magazine-billBoard-banner .billboardNest').royalSlider({
	autoHeight: false,
	transitionType: 'move',
	autoScaleSlider: true,
	transitionSpeed: 800,
	autoScaleSliderWidth: 1000,
	autoScaleSliderHeight: 440,
	arrowsNav: false,
	arrowsAutoHide:false,
	controlNavigation: 'tabs',
	imageScaleMode: 'fill',
	imgWidth: 1000,
	imgHeight: 440,
	autoPlay: {
		enabled: true,
		pauseOnHover: true,
		delay:5000
	},
	loop: true,
	loopRewind: true,
	navigateByClick: false
});

// leftnav news slider
/*
var slider01 = jQuery('.leftNav-billboard .billboardNest').royalSlider({
	transitionType: 'move',
	autoScaleSlider: true,
	transitionSpeed: 800,
	autoScaleSliderWidth: 150,
	autoScaleSliderHeight: "auto",
	arrowsNav: false,
	arrowsAutoHide:false,
	controlNavigation: 'none',
	imgWidth: 150,
	imgHeight: 230,
	autoPlay: {
		enabled: true,
		pauseOnHover: true,
		delay:2000
	},
	autoHeight: true,
	loop: true,
	loopRewind: true,
	navigateByClick: false,
	sliderDrag: false
}).data('royalSlider');
*/
jQuery('.leftNav-billboard .indicator .glyphicon-chevron-right').click(function(){
	slider01.next();
});
jQuery('.leftNav-billboard .indicator .glyphicon-chevron-left').click(function(){
	slider01.prev();
});
var magazineViewSlider = jQuery('.view-contents-slider .billboardNest').royalSlider({
	autoHeight: false,
	transitionType: 'fade',
	autoScaleSlider: true,
	transitionSpeed: 800,
	autoScaleSliderWidth: 1340,
	autoScaleSliderHeight: 850,
	arrowsNav: false,
	arrowsAutoHide: false,
	controlNavigation: 'tabs',
	imageScaleMode: 'fill',
	imgWidth: 1340,
	imgHeight: 850,
	autoPlay: {
		enabled: false,
		pauseOnHover: true,
		delay:5000
	},
	loop: true,
	loopRewind: true,
	navigateByClick: false
}).data('royalSlider');
jQuery('.view-contents-slider .indicator .glyphicon-chevron-right').click(function(){
	magazineViewSlider.next();
});
jQuery('.view-contents-slider .indicator .glyphicon-chevron-left').click(function(){
	magazineViewSlider.prev();
});

jQuery('nav.mobile .toggleButton').on("click", function() {
	jQuery(this).toggleClass('nav-close');
	jQuery('nav.mobile').toggleClass('nav-open');
	jQuery('.container').toggleClass('nav-open');
	console.log("AaA");
});

jQuery('.modal-fade').on("click", function() {
	jQuery('nav.mobile').removeClass('nav-open');
	jQuery('.container').removeClass('nav-open');
});
jQuery('#service-terms a, #sns-join a').click(function (e) {
	jQuery(this).tab('show');
	e.preventDefault();
});
jQuery(window).resize(function(){
	var windowSize = jQuery(window).width();
	if (windowSize > 767) {
		jQuery('.modal-fade').css('opcity','0');
		jQuery('nav.mobile').removeClass('nav-open');
		jQuery('.container').removeClass('nav-open');
	}
});
jQuery(window).load(function(){
	jQuery('.tamper .remove').on("click", removeTamper);
	jQuery('.snaps-thumbnail').masonry({
		gutter: 0,
		temSelector: '.item',
		columnWidth: 0
	});
	jQuery('html.firefox .snaps-thumbnail').masonry({
		gutter: 0,
		temSelector: '.item',
		columnWidth: 2
	});
	jQuery('.contents#market.marketplace .row').masonry({
		gutter: 0,
		temSelector: '.item',
		columnWidth: 0
	});
	jQuery('.contents#searchBuysell .searchBuysell .row').masonry({
		gutter: 0,
		temSelector: '.item',
		columnWidth: 6
	});


	jQuery(".xe-widget-wrapper").removeAttr( 'style', '' );
		//float: left; width: 918px; height: 392px;

});

