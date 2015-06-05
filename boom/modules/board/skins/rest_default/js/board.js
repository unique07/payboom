// Board
function board(bdObj){
(function($){
// Option
	var bd = $(bdObj);
	var default_style = bd.attr('data-default_style');
// Read Page Only
if(bd.find('div.rd').length || default_style=='blog'){
	// Editor
	if(default_style=='blog') $.getScript(default_url+"/files/cache/js_filter_compiled/35d29adbe4b14641f9eac243af40093b.ko.compiled.js");
	var simpleWrt = bd.find('.simple_wrt textarea');
	var cmtWrt = bd.find('form.cmt_wrt .simple_wrt textarea');
	simpleWrt.focus(function(){
		$(this).parent().parent().next().slideDown();
	})
	.autoGrow();
	if(cmtWrt.length){
		$.getScript(default_url+"/modules/editor/tpl/js/editor_common.min.js", function(data, textStatus, jqxhr){	
			simpleWrt.each(function(){
				editorStartTextarea($(this).attr('id').split('_')[1],'content','comment_srl');
			});
		});
	};
};

})(jQuery)
}

function reComment(doc_srl,cmt_srl,edit_url){
	var o = jQuery('#re_cmt').eq(0);
	o.find('input[name=error_return_url]').val('/'+doc_srl);
	o.find('input[name=mid]').val(current_mid);
	o.find('input[name=document_srl]').val(doc_srl);
	o.appendTo(jQuery('#comment_'+cmt_srl)).fadeIn().find('input[name=parent_srl]').val(cmt_srl);
	o.find('a.wysiwyg').attr('href',edit_url);
	o.find('textarea').focus();
}

function modComment(cmt_srl,doc_srl){
	var fdbItm = jQuery('#comment_'+cmt_srl);
	var o = jQuery('#mod_cmt');
	var getCon = jQuery('#cmt-content-'+cmt_srl).html(); //댓글내용 얻어오기
	var convertText = getCon.replace(/(<|<\;)br\s*\/*(>|>\;)/gi, "\r\n").replace(/<a href[^>]*>/, "").replace(/<\/a>/ig,"").replace(/&gt;/,">").replace(/&lt;/,"<").replace(/&amp;/,"&").replace(/^\s+/,"").replace(/\s+$/,"").replace(/<!--[^>](.*?)content">/g,"").replace(/<\/div><!--[^>](.*?)-->/g,"").replace(/<(\/)?[Pp](\/)?>/gi, "");
	o.appendTo(fdbItm).fadeIn().find('input[name=comment_srl]').val(cmt_srl);
	o.find('textarea').val(convertText);
	o.find('textarea').focus();	
};

function delComment(cmt_srl){
    var msg = window.confirm('이 댓글을 삭제하시겠습니까?');
    if(msg){
        var params = new Array();
        params["comment_srl"] = cmt_srl;
        exec_xml("board","procBoardDeleteComment", params, function(){
            location.reload()
        })
    } else {
    }
};

// xe_textarea.min.js
function editorStartTextarea(a,b,e){var c=xGetElementById("editor_"+a),d=xGetElementById("htm_"+a).value;c.form.setAttribute("editor_sequence",a);c.style.width="100%";editorRelKeys[a]=[];editorRelKeys[a].primary=c.form[e];editorRelKeys[a].content=c.form[b];editorRelKeys[a].func=editorGetContentTextarea;a=c.form[b].value;d&&(a=a.replace(/<br([^>]*)>/ig,"\n"),"br"!=d&&(a=a.replace(/&lt;/g,"<"),a=a.replace(/&gt;/g,">"),a=a.replace(/&quot;/g,'"'),a=a.replace(/&amp;/g,"&")));c.value=a}
function editorGetContentTextarea(a){var b=xGetElementById("editor_"+a),a=xGetElementById("htm_"+a).value,b=b.value.trim();a&&("br"!=a&&(b=b.replace(/&/g,"&amp;"),b=b.replace(/</g,"&lt;"),b=b.replace(/>/g,"&gt;"),b=b.replace(/\"/g,"&quot;")),b=b.replace(/(\r\n|\n)/g,"<br />"));return b};

/*!
 * Autogrow Textarea Plugin Version v2.0
 * http://www.technoreply.com/autogrow-textarea-plugin-version-2-0
 *
 * Copyright 2011, Jevin O. Sewaruth
 *
 * Date: March 13, 2011
 */
jQuery.fn.autoGrow=function(){return this.each(function(){var c=this.cols;var b=this.rows;var d=function(){e(this)};var e=function(j){var h=0;var f=j.value.split("\n");for(var g=f.length-1;g>=0;--g){h+=Math.floor((f[g].length/c)+1)}if(h>=b){j.rows=h+1}else{j.rows=b}};var a=function(g){var f=0;var j=0;var i=0;var h=g.cols;g.cols=1;j=g.offsetWidth;g.cols=2;i=g.offsetWidth;f=i-j;g.cols=h;return f};this.style.height="auto";this.style.overflow="hidden";this.onkeyup=d;this.onfocus=d;this.onblur=d;e(this)})};