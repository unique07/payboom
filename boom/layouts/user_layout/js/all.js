// GNB
var gnbNavi = function(gnbID,noscript,currentNum){
	var wrapper = document.getElementById(gnbID);
	if (noscript) removeClass(wrapper,noscript);	// 스크립트가 로딩되면 wrapper의 class중 'noscript'를 삭제합니다.

	var menu = getClass('depth1','li',wrapper);
	var menuLink = [];			// 이벤트를 발생시킬 대메뉴의 a들
	var submenu = [];			// 대메뉴의 하위에 위치한 ul들
	var submenuLink = [];		// 서브메뉴의 a들

	var initialize = function(){
		for (var i=0; i<menu.length; i++){
			menuLink[i] = menu[i].getElementsByTagName('a')[0];
			submenu[i] = menu[i].getElementsByTagName('div')[0];	// 서브메뉴는 div
			if(submenu[i] == undefined){
				submenu[i] = null;
			}
			if(submenu[i]) submenu[i].style.visibility = 'hidden';	// 서브메뉴 'hidden'초기화

			showCurrentmenu(i);
		}

		/*if (currentNum) menuLink[currentNum-1].onmouseover();		// 현재 메뉴 활성화*/
	};
	var showCurrentmenu = function(num){
		menuLink[num].onmouseover = menuLink[num].onfocus = function(){
			for(var i=0; i<menu.length; i++){
				var imgEl = menuLink[i].getElementsByTagName('img')[0];
				if(i == num){
					if (menu[i].className.indexOf('visible') == -1) addClass(menu[i],'visible');		// 활성화 된 메뉴에 class추가
					if (imgEl && imgEl.src.indexOf('_on.gif') == -1) imgEl.src = imgEl.src.replace('_off.gif', '_on.gif');	// 대메뉴 이미지 오버
					if(submenu[i]) {					// 서브메뉴가 있을때만 실행한다.
						submenu[i].style.visibility = 'visible';
						subImgOver(i);					// 서브메뉴의 이미지 오버
					}
				} else {
					removeClass(menu[i],'visible');
					if (imgEl) imgEl.src = imgEl.src.replace('_on.gif', '_off.gif');
					if(submenu[i]) {					// 서브메뉴가 있을때만 실행한다.
						submenu[i].style.visibility = 'hidden';
					}
				}
			}
		}
		/* 마우스 아웃시 최초 활성화된 서브메뉴를 자동 보임
		menuLink[num].onmouseout = function(){
			if(currentNum) {
				setTimeout(function(){if (currentNum) menuLink[currentNum-1].onmouseover();},1000);
			}
		}*/
	};
	var subImgOver = function(num){
		submenuLink = submenu[num].getElementsByTagName('a');
		for(var i=0; i<submenuLink.length; i++){
			var imgEl = submenuLink[i].getElementsByTagName('img');
			for(var j=0; j<imgEl.length; j++){
				imgEl[j].onmouseover = imgEl[j].onfocus = function(){
					this.src = this.src.replace('_off.gif','_on.gif');
				}
				imgEl[j].onmouseout = imgEl[j].onblur = function(){
                    
                    if(this.src.indexOf("navi_" + $("#menu1_index").val() + "_" + $("#menu2_index").val()) == -1){
					    this.src = this.src.replace('_on.gif','_off.gif');
                    }
                    
				}
			}
		}
	}
	initialize();
}
// lnbNavi
var lnbNavi = function(gnbID,noscript,currentNum){
	var wrapper = document.getElementById(gnbID);
	if (noscript) removeClass(wrapper,noscript);	// 스크립트가 로딩되면 wrapper의 class중 'noscript'를 삭제합니다.

	var menu = getClass('depth1','li',wrapper);
	var menuLink = [];			// 이벤트를 발생시킬 대메뉴의 a들
	var submenu = [];			// 대메뉴의 하위에 위치한 ul들
	var submenuLink = [];		// 서브메뉴의 a들

	var initialize = function(){
		for (var i=0; i<menu.length; i++){
			menuLink[i] = menu[i].getElementsByTagName('a')[0];
			submenu[i] = menu[i].getElementsByTagName('div')[0];	// 서브메뉴는 div
			if(submenu[i] == undefined){
				submenu[i] = null;
			}
			if(submenu[i]) submenu[i].style.display = 'none';	// 서브메뉴 'hidden'초기화

			showCurrentmenu(i);
		}

		if (currentNum) menuLink[currentNum-1].onmouseover();		// 현재 메뉴 활성화
	};
	var showCurrentmenu = function(num){
		menuLink[num].onmouseover = menuLink[num].onfocus = function(){
			for(var i=0; i<menu.length; i++){
				var imgEl = menuLink[i].getElementsByTagName('img')[0];
				if(i == num){
					if (menu[i].className.indexOf('visible') == -1) addClass(menu[i],'visible');		// 활성화 된 메뉴에 class추가
					if (imgEl && imgEl.src.indexOf('_on.gif') == -1) imgEl.src = imgEl.src.replace('_off.gif', '_on.gif');	// 대메뉴 이미지 오버
					if(submenu[i]) {					// 서브메뉴가 있을때만 실행한다.
						submenu[i].style.display = 'block';
						subImgOver(i);					// 서브메뉴의 이미지 오버
					}
				} else {
					removeClass(menu[i],'visible');
					if (imgEl) imgEl.src = imgEl.src.replace('_on.gif', '_off.gif');
					if(submenu[i]) {					// 서브메뉴가 있을때만 실행한다.
						submenu[i].style.display = 'none';
					}
				}
			}
		}
		/* 마우스 아웃시 최초 활성화된 서브메뉴를 자동 보임
		menuLink[num].onmouseout = function(){
			if(currentNum) {
				setTimeout(function(){if (currentNum) menuLink[currentNum-1].onmouseover();},1000);
			}
		}*/
	};
	var subImgOver = function(num){
		submenuLink = submenu[num].getElementsByTagName('a');
		for(var i=0; i<submenuLink.length; i++){
			var imgEl = submenuLink[i].getElementsByTagName('img');
			for(var j=0; j<imgEl.length; j++){
				imgEl[j].onmouseover = imgEl[j].onfocus = function(){
					this.src = this.src.replace('_off.gif','_on.gif');
				}
				imgEl[j].onmouseout = imgEl[j].onblur = function(){
                      this.src = this.src.replace('_on.gif','_off.gif');
				}
			}
		}
	}
	initialize();
}

// add class
function addClass(element,value) {
	if (!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}

// remove class
function removeClass(element,value) {
	if (element.className == value) {
		element.className = "";
	} else if (element.className.indexOf(value) != -1) {
		element.className = element.className.replace(value,"");
	}
}

// get Class
function getClass(classname, tagname, tarID) {
	if (tarID == undefined) tarID = document;
	var element = this.nodeType == 1 ? this : tarID;
	var elements = [], nodes = tagname ? element.getElementsByTagName(tagname) : element.getElementsByTagName('*');	
	for(var i=0; i<nodes.length; i++) {
		var elementClassName = nodes[i].className;
		if (elementClassName.length > 0 && (elementClassName == arguments[0] || new RegExp("(^|\\s)" + arguments[0] + "(\\s|$)").test(elementClassName))) {
			elements.push(nodes[i]);
		}
	}
	return elements;
}

//Element ID 불러쓰기
function dEI(elementID){
	return document.getElementById(elementID);
}

// 이미지 롤오버
function imgRollovermain(imgBoxID){
	var MenuCounts = dEI(imgBoxID).getElementsByTagName("img");

	for (i=0;i<MenuCounts.length;i++) {
		var numImg=MenuCounts.item(i);
		var ImgCheck = numImg.src.substring(numImg.src.length-6,numImg.src.length);
		if (ImgCheck!="_on.gif") {
				numImg.onmouseover = function () {
					this.src = this.src.replace("_off.gif", "_on.gif");
				}
				numImg.onmouseout = function () {
					this.src = this.src.replace("_on.gif", "_off.gif");
				}
			}
	}
}

/* css전혀 없으면 */
function styleLinkCheck(){
	var ss = document.styleSheets[0];
	if(ss) return true;
	else return false;
}

// tabList
function tabList(ele, active){
	if(styleLinkCheck() === false) return;
	
	var ele = document.getElementById(ele);
	if(active === undefined) active = 0;			
		
	// tabtit를 포함하는 제목 노드들 수집 
	var btn = ele.getElementsByTagName("*");
	for(var i=0; i<btn.length; i++){
		if(btn[i].className.indexOf('tabtit') != -1){
			btn = btn[i].nodeName;
			btn = ele.getElementsByTagName(btn);
			break;
		}
	}
	
	// 타이틀의 타겟 레이어 이름중 숫자만 뺀 영문만 tab1 중 tab만
	var layerName = btn[0].getElementsByTagName("A")[0].href.split("#")[1];
	layerName = layerName.slice(0, layerName.length-1);
	
	for(var i=0; i<btn.length; i++){
		ele["target" + i] = document.getElementById(layerName + (i+1)); // 노드저장 예) tab1, tab2, tab3
		ele["a" + i] = btn[i].getElementsByTagName("A")[0]; // 탭링크
		ele["img" + i] = btn[i].getElementsByTagName("IMG")[0]; // 이미지노드 저장
		btn[i].style.position = "absolute"; // 제목레이어 적용
		ele.getElementsByTagName("div")[i].style.marginTop = 0;
	}
	
	/* 초기세팅 */
	var oldActive = active;
	for(var i=0; i<btn.length; i++){
		ele["a" + i].cnt = i;
		ele["a" + i].onclick = ele["a" + i].onfocus = ele["a" + i].onfocus = function menuActive(){
			ele["target" + oldActive].style.display = "none";
			if(ele["img" + oldActive])
				ele["img" + oldActive].src = ele["img" + oldActive].src.replace("_on", "_off");
			else
				addClass2(btn[oldActive], "off");
			ele["target" + this.cnt].style.display = "block";
			
			if(ele["img" + this.cnt])
				ele["img" + this.cnt].src = ele["img" + this.cnt].src.replace("_off", "_on");
			else
				removeClass2(btn[this.cnt], "off");
			oldActive = this.cnt;
			return false;
		}
		
		if(active == i) continue; // 초기 활성화
		ele["target" + i].style.display = "none";
		if(ele["img" + i])
			ele["img" + i].src = ele["img" + i].src.replace("_on", "_off");
		else
			addClass2(btn[i], "off");
	}
}

