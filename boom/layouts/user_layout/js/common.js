function setCookie(name, value, expiredays)
{
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + '=' + escape( value ) + '; path=/; expires=' + todayDate.toGMTString() + ';';
	return;
}

function getCookie(name)
{
	var nameOfCookie = name + "=";
	var x = 0;
	while (x <= document.cookie.length)
	{
		var y = (x + nameOfCookie.length);
		if (document.cookie.substring(x, y) == nameOfCookie )
		{
			if ((endOfCookie=document.cookie.indexOf(";", y)) == -1)
				endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x) + 1;
		if (x == 0)
			break;
	}

	return "";
}

function loginStatus()
{
	if (getCookie("login_id"))
		return true;
	else
		return false;
}

function isAdminUser()
{
	if (parseInt(getCookie("login_level")) > 3)
		return true;
	else
		return false;
}

function openWin(url, name, width, height, scrb)
{
	window.open(url, name, 'width=' + width + ' height=' + height + ' scrollbars=' + scrb);
}

function popupWindow(url, W, H, wName, schk)
{
    if (screen.width == W){
        var T = 0;
        var L = 0;
    }else{
        var L = ((screen.width) - W) / 2;
        var T = ((screen.height) - H) / 2;
    }
    var win = window.open(url+'', wName, 'width='+W+',height='+H+',top='+T+',left='+L+',resizable=yes,scrollbars='+schk+'');
    win.focus();
}

function popen(url,name,w,h,scroll,pos,res) {

	if (!scroll) scroll = "yes";
	if (!pos) pos = "center";
	if (!res) res = "no";

	switch (pos) {
		case 'topleft' :
			LeftPosition = 0;
			TopPosition = 0;
			break;
		case 'center' :
			LeftPosition = (screen.width) ? (screen.width - w) / 2 : 100;
			TopPosition = (screen.height) ? (screen.height - h - 100) / 2 : 100;
			break;
		case "random" :
			LeftPosition = (screen.width) ? Math.floor(Math.random() * (screen.width - w)) : 100;
			TopPosition = (screen.height) ? Math.floor(Math.random() * ((screen.height - h) - 75)) : 100;
			break;
		default :
			LeftPosition=0;
			TopPosition=0;
			break;
	}
	var settings = 'width=' + w + ',height=' + h + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=' + scroll + ',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=' + res;
	win = window.open(url,name,settings);
	if (win.focus) win.focus();
}

function initValidate()
{
	$.validator.setDefaults({
        onkeyup:false,
        onclick:false,
        onfocusout:false,
        showErrors:function(errorMap, errorList){
            if(this.numberOfInvalids())
                alert(errorList[0].message);
        }
    });

    $.validator.addMethod("selectCheck", function(value, element, arg){
          return arg != value;
     }, "Value must not equal arg.");
}

 function fileUploadPreview(thisObj, preViewer)
 {
	 if(!/(\.gif|\.jpg|\.jpeg|\.png)$/i.test(thisObj.value)) {
		 alert("이미지 형식의 파일을 선택하십시오");
		 return;
	 }

	 preViewer = (typeof(preViewer) == "object") ? preViewer : document.getElementById(preViewer);
	 var ua = window.navigator.userAgent;

	 if (ua.indexOf("MSIE") > -1) {
		 preViewer.innerHTML = "";		 
		 var img_path = "";
		 if (thisObj.value.indexOf("\\fakepath\\") < 0) {
			 img_path = thisObj.value;
		 } else {
			 thisObj.select();
			 var selectionRange = document.selection.createRange();
			 img_path = selectionRange.text.toString();
			 thisObj.blur();
		 }
		 preViewer.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='fi" + "le://" + img_path + "', sizingMethod='scale')";
	 } else {
		 preViewer.innerHTML = "";
		 var W = preViewer.offsetWidth;
		 var H = preViewer.offsetHeight;
		 var tmpImage = document.createElement("img");
		 preViewer.appendChild(tmpImage);

		 tmpImage.onerror = function () {
			 return preViewer.innerHTML = "";
		 }

		 tmpImage.onload = function () {
			 if (this.width > W) {
				 this.height = this.height / (this.width / W);
				 this.width = W;
			 }
			 if (this.height > H) {
				 this.width = this.width / (this.height / H);
				 this.height = H;
			 }
		 }
		 if (ua.indexOf("Firefox/3") > -1) {
			 var picData = thisObj.files.item(0).getAsDataURL();
			 tmpImage.src = picData;
		 } else {
			 tmpImage.src = "file://" + thisObj.value;
		 }
	 }
 }

function createBookmark()
{
    var title = "광고시스템";
    var url = "http://www.adxxxxx.co.kr";

    //FF
    if (window.sidebar) {
        window.sidebar.addPanel(title, url,"");
    }
    //IE
    else if( window.external ) {
        window.external.AddFavorite( url, title);
    }
    //Opera
    else if(window.opera && window.print) {
        return true;
    }
}

function startPage(Obj)
{
	var url = "http://www.adxxxxx.co.kr";
	
    if (document.all && window.external)
	{
        Obj.style.behavior='url(#default#homepage)';
        Obj.setHomePage(url);
    }
}


function moveItem(id)
{
	var item = $("#select2 option[value=" + id + "]");

	var str = '<input type="hidden" name="item" value="' + item.value + '" />';
	$("#list").append(str);

	$("#select1 option[value=" + id + "]").remove().appendTo("#select2");
}

function addItem()
{
	$("#select1 option:selected").remove().appendTo("#select2");

	makeItemList();
}

function addItemAll()
{
	$("#select1 option").remove().appendTo("#select2");

	makeItemList();
}

function removeItem()
{
	$("#select2 option:selected").remove().appendTo("#select1");

	makeItemList();
}

function removeItemAll()
{
	$("#select2 option").remove().appendTo("#select1");

	makeItemList();
}

function makeItemList()
{
	$("#list").empty();

	for(var i = 0; i < $("#select2 option").size(); i++)
	{
		var str = '<input type="hidden" name="item" value="' + $("#select2 option")[i].value + '" />';
		$("#list").append(str);
		
	}
}

function closePopup()
{
	$("#popup").hide();
	$("#popup2").hide();
}

function go(type, id, price)
{
	window.open('/link/index.php?type=' + type + '&id=' + id + '&price=' + price, '');
}

function mark(id)
{
	if (!loginStatus())
	{
		alert('로그인후 이용하세요');
		return;
	}
	
	$.ajax({
					type : 'POST',
							url : "/mypage/mark_process.php",
							data : "mode=insert&id=" + id,
							success : function(msg)
						{
							alert('찜하기 되었습니다')
						}
		})
}

function urldecode(utftext)
{
	var string = "";
	var i = 0;
	var c = c1 = c2 = 0;
 
	while ( i < utftext.length ) {
 
		c = utftext.charCodeAt(i);
 
		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		}
		else if((c > 191) && (c < 224)) {
			c2 = utftext.charCodeAt(i+1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		}
		else {
			c2 = utftext.charCodeAt(i+1);
			c3 = utftext.charCodeAt(i+2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
 
	}

	return string;
}

function addFavorite(title, id)
{
	var url = "http://www.codynjoy.com/link/index.php?type=1&id=" + id + "&price=1";
	if (window.sidebar)
		window.sidebar.addPanel(title, url);
	else if (window.external)
		window.external.AddFavorite(url, title);
}

function addMainFavorite()
{
	var url = "http://www.codynjoy.com";
	var title = "★ 코디앤조이 - 패션 쇼핑몰 순위 ★";
	
	if (window.sidebar)
		window.sidebar.addPanel(title, url);
	else if (window.external)
		window.external.AddFavorite(url, title);
}

function setPng24(obj) {
	obj.width=obj.height=1;
	obj.className=obj.className.replace(/\bpng24\b/i,'');
	obj.style.filter =
        "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
        obj.src=''; 
	return '';
}

function viewSlide(id, background)
{
	var width = parseInt($(window).width());
	var height = parseInt($(window).height()) - 30;

	var w = screen.availWidth;
	var h = screen.availHeight;

	if (width > 1365)
		width = 1365;

	if (height > 880)
		height = 880;

	if (w > 1365 + 16)
		w -= 16;
	
	if (h > 880 + 74)
		h -= 74;
	
	//47 22
	window.open('/board/slide.php?id=' + id + '&background=' + background + '&width=' + width + '&height=' + height, '', 'width='+w+',height='+h+',top='+0+',left='+0+',resizable=no,scrollbars='+'no'+'');
}

function viewBrandsearch(id)
{
  $('#brandsearch' + id).toggle();
}

function newsfeed(id, category, subcategory)
{
	if (isAdminUser())
	{
		openWin('/board/admin.php?id=' + id, '', 385, 530, 'no');
		
		return;
	}

	$('#divuserlayer').load('/newsfeed/userlayer.php?id=' + id);
	//$('#divuserlayer').css({"left" : _mouseX + 'px', "top" : _mouseY + 'px'});
	$('#divuserlayer').show();

	return;
	
	var param = '';

	if (id != '0')
		param = 'user=' + id;

	if (category != '0')
	{
		if (param)
			param += '&';
		
		param += 'category=' + category;
	}

	if (subcategory != '0')
	{
		if (param)
			param += '&';
		
		param += 'subcategory=' + subcategory;
	}

	var url = '/newsfeed/newsfeed.php';
	if (param)
		url += '?' + param;
	
	location.href = url;
}

function CheckSearchForm(f)
{
	if (!f.search.value)
	{
		alert('검색어를 입력해주세요');
		f.search.focus();
		return false;
	}

	return true;
}

function swf(w,h,flashName){
	document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="'+w+'" height="'+h+'" id="flashMovie" >');
	document.write('<param name="movie" value="'+flashName+'">');
	document.write('<param name="quality" value="high">');
	document.write('<param name="wmode" value="transparent">');
	document.write('<embed src="'+flashName+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+w+'" height="'+h+'" name="flashMovie" wmode="transparent"></embed>');
	document.write('</object>');
}


function add_friend2(fr_id) {
    if(!confirm('친구수락 하시겠습니까?')) {
	return;
    }
    $.post('/newsfeed/friend_confirm.php', {'mode':'agree','fr_id':fr_id}, function(result) {
			//viewAlarm('friend');
			$('#alarmfriend_' + fr_id).css('background', '#FFF');
			$('#alarmfriend_button_' + fr_id).html('친구 요청을 <b>수락</b>하였습니다');
			$('#logininfobox').load('/newsfeed/ajax_alarm_count.php');
			//alert(result);
    });
}
function remove_friend2(fr_id) {
    if(!confirm('거절하시겠습니까?')) {
	return;
    }
    $.post('/newsfeed/friend_confirm.php', {'mode':'remove','fr_id':fr_id}, function(result) {
			//viewAlarm('friend');
			$('#alarmfriend_' + fr_id).css('background', '#FFF');
			$('#alarmfriend_button_' + fr_id).html('친구 요청을 <b>거절</b>하였습니다');
			$('#logininfobox').load('/newsfeed/ajax_alarm_count.php');			
			//alert(result);
    });
}

function viewAlarm(id)
{
	/*
	$('#divAlarmfriend').css('z-index', 9999);
	$('#divAlarmmessage').css('z-index', 9999);
	$('#divAlarmalarm').css('z-index', 9999);
	*/

	$('#divAlarmfriend').hide();
	$('#divAlarmmessage').hide();
	$('#divAlarmalarm').hide();

	$('#divAlarm' + id).css('top', ($('#memocount').offset().top + 28) + 'px');
	$('#divAlarm' + id).css('left', ($('#memocount').offset().left - 250) + 'px');

	$('#divAlarm' + id).load('/newsfeed/ajax_alarm_' + id + '.php');

	$('#divAlarm' + id).css('z-index', 10000);
	$('#divAlarm' + id).css('height', '0px');
	$('#divAlarm' + id).show();
}

function viewPhotoview(user, id, category, subcategory)
{
	//$('#gallery-view .modal-dialog .modal-content').load('/newsfeed/photoview.php?user=' + user + '&id=' + id);
	$('#gallery-view .modal-dialog .modal-content').load('/newsfeed/photoview.php?user=' + user + '&id=' + id + '&category=' + category + "&subcategory=" + subcategory);
}

function closePhotoview()
{
	$('#photoview').hide();
	$('#dark').fadeOut();	
	
}

function addRecommendFriend(uid)
{
    $.post('/newsfeed/add_friend.php', {"user":uid}, function(result) {

			alert(result);
			if (result == '신청되었습니다.')
				$('#divRecommendfriend').load('/newsfeed/recommendfriend.php');
    });
}

function addRecommendFriend2(uid)
{
    $.post('/newsfeed/add_friend.php', {"user":uid}, function(result) {
			alert(result);
    });
}


function refreshRecommendFriend()
{
	$('#divRecommendfriend').load('/newsfeed/recommendfriend.php');
}


function message(id, name)
{
	openWin('/newsfeed/viewmessage.php?id=' + id, '', 610, 483, 'no');
	$('#alarmmessage_' + id).css('background', '#FFF');	
	$('#logininfobox').load('/newsfeed/ajax_alarm_count.php');				
}