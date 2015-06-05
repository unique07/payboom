ding.fixedNotice = (function ($) {
    var self = ding.fixedNotice.propertys;
    $(document).ready(function () {



        // 쿠키 생성 함수.
        var createCookie = (function(e, t, n){
            if (n) {
                var o = new Date;
                o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3);
                var r = "; expires=" + o.toGMTString()
            } else var r = "";
            document.cookie = e + "=" + t + r + "; path=/"
        });

        // 닫기 버튼 생성 함수.
        var setCloseEvent = (function (node){
            $(node).click(function (e) {
                createCookie("ding_fixed_banner", 1, self.cookieTime);

                if(self.animation_decision == "enable"){
                    $(e.currentTarget).closest("div.ding-fixed-container").animate({
                        "opacity": 0,
                        "height": "0px",
                        "min-height": "0px",
                        "max-height": "0px"
                    }, self.animationSpped, function () {
                        $("div.ding-fixed-container").css("display", "none");
                    });
                }else{
                    $(e.currentTarget).closest("div.ding-fixed-container").css({
                        "opacity": 0,
                        "height": "0px",
                        "min-height": "0px",
                        "max-height": "0px"
                    }, function (){
                        $("div.ding-fixed-container").css("display", "none");
                    });
                }
                $(self.target_css).animate({"top": 0}, self.animationSpped);
            });
        });

        // HTML Render.
        var bannerRender = (function () {
            if(self.deleteClassName != "none") {
                if (self.direction == "down") {
                    setCloseEvent(".ding-fixed-container " + self.deleteClassName);
                } else if (self.direction == "up") {
                    if (self.default == "enable") {
                        var enableButton = '<svg class="close" style="'+ self.button_multi_position +';"><line style="fill:none;stroke:' + self.defaultColor + ';stroke-miterlimit:10;" x1="0.048" y1="0.048" x2="34.064" y2="34.064"/><line style="fill:none;stroke:'+ self.defaultColor +';stroke-miterlimit:10;" x1="34.064" y1="0.048" x2="0.048" y2="34.064"/>' + '</svg>';
                    }else{
                        var enableButton = '';
                    }
                    $(self.target_css).css("top", self.target_css_top);
                    $(self.inner_html).before('<div class="ding-fixed-container ding-fixed-container-rel" style="z-index:'+ self.z_index +'; height:'+ self.height +'; min-height:'+self.height+'; max-height:'+ self.height +'; background-color:'+self.colors+'; margin-bottom:'+self.bottom_position+';">'+ self.context+ enableButton +'</div>');
                    setCloseEvent(".ding-fixed-container " + self.deleteClassName);
                }
                //Ding 기본 제공 버튼 활성화.
                if (self.default == "enable") {
                    setCloseEvent(".ding-fixed-container .close");
                }
            }
        });
        bannerRender();
    });
})(jQuery.noConflict());