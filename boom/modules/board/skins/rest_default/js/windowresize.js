jQuery(window).load(function() {
  var strWidth;
  var strHeight;
  //innerWidth / innerHeight / outerWidth / outerHeight 지원 브라우저 
  if ( window.innerWidth && window.innerHeight && window.outerWidth && window.outerHeight ) {
    strWidth = jQuery('#videoresize').outerWidth() + (window.outerWidth - window.innerWidth);
    strHeight = jQuery('#videoresize').outerHeight() + (window.outerHeight - window.innerHeight);
  }
  else {
    var strDocumentWidth = jQuery(document).outerWidth();
    var strDocumentHeight = jQuery(document).outerHeight();
    window.resizeTo ( strDocumentWidth, strDocumentHeight );
    var strMenuWidth = strDocumentWidth - jQuery(window).width();
    var strMenuHeight = strDocumentHeight - jQuery(window).height();
    strWidth = jQuery('#videoresize').outerWidth() + strMenuWidth;
    strHeight = jQuery('#videoresize').outerHeight() + strMenuHeight;
  }
  //resize 
  window.resizeTo( strWidth, strHeight );
}); 