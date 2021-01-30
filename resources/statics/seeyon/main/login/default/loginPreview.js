var _newfeature = false; //显示系统新特性
var _topbgi = ""; //LOGO
var _topbgiposition = ["18%", "10%"]; //LOGO位置：【0】，居上；【1】，居左；
var _mainbgcDefault = ""; //登录页默认背景色
var _mainbgcOpacityDefault = ""; //登录页默认背景色透明度
var _mainbgc = ""; //登录页背景色
var _mainbgcOpacity = ""; //登录页背景色透明度
var _changebgi = []; //登录页背景图片
var _bgialign = "center"; //背景图片显示方式
var _changebgispeed = "speed2"; //切换速度
var _changebgiheight = 0; //背景图片高度
var _shownumber = true; //显示并发数
var _loginboxposition = []; //登录框位置：全屏布局【0】，居右；【1】，居上；上下布局【0】，居下；左右布局【0】，居右；
var _loginboxmainbgcDefault = ""; //登录框默认背景色
var _loginboxmainbgcOpacityDefault = ""; //登录框默认背景色透明度
var _loginboxmainbgc = ""; //登录框背景色
var _loginboxmainbgcOpacity = ""; //登录框背景色透明度
var _loginboxbottombgcDefault = ""; //登录框默认底部色
var _loginboxbottombgcOpacityDefault = ""; //登录框默认底部色透明度
var _loginboxbottombgc = ""; //登录框底部色
var _loginboxbottombgcOpacity = ""; //登录框底部色透明度
var _loginboxbuttonbgcDefault = ""; //登录框默认按钮色
var _loginboxbuttonbgcOpacityDefault = ""; //登录框默认按钮色透明度
var _loginboxbuttonbgc = ""; //登录框按钮色
var _loginboxbuttonbgcOpacity = ""; //登录框按钮色透明度
var _icpDisplay = ""; //是否显示ICP备案信息
var _icpInfo = ""; //ICP备案信息
var _icpLink = ""; //ICP备案信息的链接
var	_dueRamindDisplay = ""; //产品到期提醒

function loginDefault() {
    //赋初始值
    //模板布局：all，全屏；t_b，上下；l_r，左右；center，上下留白；
    if (_layout == "all") {
        _mainbgcDefault = "#ffffff";
        _mainbgcOpacityDefault = "100";
        _loginboxmainbgcDefault = "#ffffff";
        _loginboxmainbgcOpacityDefault = "50";
        _loginboxbottombgcDefault = "#133e64";
        _loginboxbottombgcOpacityDefault = "100";
        _loginboxbuttonbgcDefault = "#38c64e";
        _loginboxbuttonbgcOpacityDefault = "100";
        
        _mainbgc = _mainbgcDefault;
        _mainbgcOpacity = _mainbgcOpacityDefault;
        _loginboxposition = ["15%", "30%"];
        _loginboxmainbgc = _loginboxmainbgcDefault;
        _loginboxmainbgcOpacity = _loginboxmainbgcOpacityDefault;
        _loginboxbottombgc = _loginboxbottombgcDefault;
        _loginboxbottombgcOpacity = _loginboxbottombgcOpacityDefault;
        _loginboxbuttonbgc = _loginboxbuttonbgcDefault;
        _loginboxbuttonbgcOpacity = _loginboxbuttonbgcOpacityDefault;
    } else if (_layout == "t_b") {
        _mainbgcDefault = "#ffffff";
        _mainbgcOpacityDefault = "100";
        _loginboxmainbgcDefault = "#ffffff";
        _loginboxmainbgcOpacityDefault = "40";
        _loginboxbottombgcDefault = "#ffffff";
        _loginboxbottombgcOpacityDefault = "0";
        _loginboxbuttonbgcDefault = "#38c64e";
        _loginboxbuttonbgcOpacityDefault = "100";
        
        _mainbgc = _mainbgcDefault;
        _mainbgcOpacity = _mainbgcOpacityDefault;
        _loginboxposition = ["0", "0"];
        _loginboxmainbgc = _loginboxmainbgcDefault;
        _loginboxmainbgcOpacity = _loginboxmainbgcOpacityDefault;
        _loginboxbottombgc = _loginboxbottombgcDefault;
        _loginboxbottombgcOpacity = _loginboxbottombgcOpacityDefault;
        _loginboxbuttonbgc = _loginboxbuttonbgcDefault;
        _loginboxbuttonbgcOpacity = _loginboxbuttonbgcOpacityDefault;
    } else if (_layout == "l_r") {
        _mainbgcDefault = "#ffffff";
        _mainbgcOpacityDefault = "100";
        _loginboxmainbgcDefault = "#000000";
        _loginboxmainbgcOpacityDefault = "20";
        _loginboxbottombgcDefault = "#ffffff";
        _loginboxbottombgcOpacityDefault = "0";
        _loginboxbuttonbgcDefault = "#38c64e";
        _loginboxbuttonbgcOpacityDefault = "100";
        
        _mainbgc = _mainbgcDefault;
        _mainbgcOpacity = _mainbgcOpacityDefault;
        _loginboxposition = ["0", "0"];
        _loginboxmainbgc = _loginboxmainbgcDefault;
        _loginboxmainbgcOpacity = _loginboxmainbgcOpacityDefault;
        _loginboxbottombgc = _loginboxbottombgcDefault;
        _loginboxbottombgcOpacity = _loginboxbottombgcOpacityDefault;
        _loginboxbuttonbgc = _loginboxbuttonbgcDefault;
        _loginboxbuttonbgcOpacity = _loginboxbuttonbgcOpacityDefault;
    } else if (_layout == "center") {
        _mainbgcDefault = "#ffffff";
        _mainbgcOpacityDefault = "70";
        _loginboxmainbgcDefault = "#ffffff";
        _loginboxmainbgcOpacityDefault = "20";
        _loginboxbottombgcDefault = "#ffffff";
        _loginboxbottombgcOpacityDefault = "0";
        _loginboxbuttonbgcDefault = "#ff0000";
        _loginboxbuttonbgcOpacityDefault = "100";
        
        _mainbgc = _mainbgcDefault;
        _mainbgcOpacity = _mainbgcOpacityDefault;
        _loginboxposition = ["54%", "20%"];
        _loginboxmainbgc = _loginboxmainbgcDefault;
        _loginboxmainbgcOpacity = _loginboxmainbgcOpacityDefault;
        _loginboxbottombgc = _loginboxbottombgcDefault;
        _loginboxbottombgcOpacity = _loginboxbottombgcOpacityDefault;
        _loginboxbuttonbgc = _loginboxbuttonbgcDefault;
        _loginboxbuttonbgcOpacity = _loginboxbuttonbgcOpacityDefault;
    }
    if ($.ctx.hotSpots) {
        for (var i = 0; i < $.ctx.hotSpots.length; i++) {
            var hotspotkey = $.ctx.hotSpots[i].hotspotkey;
            var hotspotvalue = $.ctx.hotSpots[i].hotspotvalue;
            var ext3 = $.ctx.hotSpots[i].ext3; //图片是否选中
            var ext5 = $.ctx.hotSpots[i].ext5; //颜色透明度
            if (hotspotkey == "newfeature") {
                if (hotspotvalue == "show") {
                    _newfeature = true;
                } else {
                    _newfeature = false;
                }
            }else if (hotspotkey == "topbgi") {
                if (hotspotvalue) {
                    if (hotspotvalue.indexOf("fileId") != -1) {
                        _topbgi = _ctxPath + "/fileUpload.do?method=showRTE&type=image&" + hotspotvalue;
                    } else {
                        _topbgi = _ctxPath + "/main/login/" + hotspotvalue + resSuffix;
                    }
                }
            }else if (hotspotkey == "topbgiposition") {
                if (hotspotvalue) {
                    var topbgipositions = hotspotvalue.split(",");
                    _topbgiposition[0] = topbgipositions[0];
                    _topbgiposition[1] = topbgipositions[1];
                }
            }else if (hotspotkey == "mainbgc") {
                if (hotspotvalue) {
                    _mainbgc = hotspotvalue;
                    _mainbgcOpacity = ext5;
                }
            }else if (hotspotkey == "changebgi") {
                var isSelected = ext3.split(",");
                var changebgis = hotspotvalue.split(",");
                for (var k = 0; k < changebgis.length; k++) {
                    if (isSelected[k] == "1") {
                        if (changebgis[k].indexOf("fileId") != -1) {
                            _changebgi[_changebgi.length] = _ctxPath + "/fileUpload.do?method=showRTE&type=image&" + changebgis[k];
                        } else {
                            _changebgi[_changebgi.length] = _ctxPath + "/main/login/" + changebgis[k] + resSuffix;
                        }
                    }
                }
            }else if (hotspotkey == "bgialign") {
                _bgialign = hotspotvalue;
            }else if (hotspotkey == "changebgispeed") {
                _changebgispeed = hotspotvalue;
            }else if (hotspotkey == "loginboxposition") {
                if (hotspotvalue) {
                    var loginboxpositions = hotspotvalue.split(",");
                    _loginboxposition[0] = loginboxpositions[0];
                    _loginboxposition[1] = loginboxpositions[1];
                }
            }else if (hotspotkey == "shownumber") {
                if (hotspotvalue == "show") {
                    _shownumber = true;
                } else {
                    _shownumber = false;
                }
            }else if (hotspotkey == "loginboxmainbgc") {
                if (hotspotvalue) {
                    _loginboxmainbgc = hotspotvalue;
                    _loginboxmainbgcOpacity = ext5;
                }
            }else if (hotspotkey == "loginboxbottombgc") {
                if (hotspotvalue) {
                    _loginboxbottombgc = hotspotvalue;
                    _loginboxbottombgcOpacity = ext5;
                }
            }else if (hotspotkey == "loginboxbuttonbgc") {
                if (hotspotvalue) {
                    _loginboxbuttonbgc = hotspotvalue;
                    _loginboxbuttonbgcOpacity = ext5;
                }
            }else if(hotspotkey == "icp"){
                if (hotspotvalue) {
                    _icpDisplay = ($.ctx.hotSpots[i].display!=undefined) ? $.ctx.hotSpots[i].display : "0";
                    _icpInfo = (hotspotvalue!=undefined) ? hotspotvalue : "";
                    _icpLink = ($.ctx.hotSpots[i].description!=undefined) ? $.ctx.hotSpots[i].description : "";
                }
            }
        }
    }
    if(dueRemindV){
    	_dueRamindDisplay=dueRemindV==''?"1":dueRemindV;
    }
    //添加背景色
    $("#login_wrap").css({
        "background": converColorToNum(_mainbgc, _mainbgcOpacity)
    });
    
    //添加背景图片
    setSliderBgImg();

	    $(window).resize(function(){
	        if(typeof($("#bgialign").val()) === "undefined"){
	            changeSlide(_bgialign);
	        }else{
	            setSliderBgImg($("#bgialign").val());
	        }

	        if(typeof($("#changebgispeed").val()) === "undefined"){
	            changeSlide(_changebgispeed);
	        }else{
	            changeSlide($("#changebgispeed").val());
	        }
	    });

    //LOGO位置
    if (_topbgi) {
        $("#login_logo").css({
            "top": _topbgiposition[0],
            "left": _topbgiposition[1]
        });
        $("#login_logo img").attr("src",_topbgi);
        $("#login_logo img").show();
    }else{
        $("#login_logo img").attr("src",_topbgi);
        $("#login_logo img").hide();
    }
    //是否显示新特性
    if (_newfeature) {
        $("#new56").hide();
    } else {
        $("#new56").hide();
    }
    //是否显示并发数
    if (_shownumber) {
        $("#login_text_div").css("visibility", "visible");
    } else {
        $("#login_text_div").css("visibility", "hidden");
    }
    //判断普通用户和管理员登录
    if (login_index == "adminLogin") {
        if (_layout == "all") {
            $(".login_area_div").css({
                "width": "250px",
                "height": "292px",
                "background": converColorToNum(_loginboxmainbgc, _loginboxmainbgcOpacity),
                "right": _loginboxposition[0],
                "top": _loginboxposition[1],
                "margin-top":"50px"
            });
            $(".login_body").css({
                "top": "0px",
                "margin-top": "0px",
                "left": "0px"
            });
            $("#login_bottom_div").css("background", converColorToNum(_loginboxbottombgc, _loginboxbottombgcOpacity));
            $("#login_button").css("background", converColorToNum(_loginboxbuttonbgc, _loginboxbuttonbgcOpacity));
        } else if (_layout == "t_b") {
            $(".login_area_div").css({
                "width": "100%",
                "height": "210px",
                "left":"0px;",
                "background": converColorToNum(_loginboxmainbgc, _loginboxmainbgcOpacity),
                "bottom": _loginboxposition[0]
            });
            $("#login_bottom_div").css("background", converColorToNum(_loginboxbottombgc, _loginboxbottombgcOpacity));
            $("#login_button").css("background", converColorToNum(_loginboxbuttonbgc, _loginboxbuttonbgcOpacity));
        } else if (_layout == "l_r") {
            $(".login_area_div").css({
                "background": converColorToNum(_loginboxmainbgc, _loginboxmainbgcOpacity),
                "top":"0px",
                "right": _loginboxposition[0]
            });
            $(".login_body").css({
                "right": "-25px"
            });
            $(".login_top").find("input").css({
                "border-radius": "18px"
            });
            $(".login_top").css({
                "height": "250px"
            });
            $(".login_top .text").css({
                "color": "#fff"
            });
            // var login_bottom = $(".login_bottom").clone();
            // $(".login_bottom").remove();
            // $("#login_button").before(login_bottom);
            $(".login_bottom").css({
                "padding-left": "20px"
            });
            $(".login_bottom").find("span").css({
                "width": "70px",
                "font-size": "smaller"
            });
            $("#login_bottom_div").css("background", converColorToNum(_loginboxbottombgc, _loginboxbottombgcOpacity));
            $("#login_button").css("background", converColorToNum(_loginboxbuttonbgc, _loginboxbuttonbgcOpacity));
        } else if (_layout == "center") {
            $(".masks").css({
                "display": "block",
                "background": converColorToNum(_mainbgc, _mainbgcOpacity)
            });
            $(".login_area_div").css({
                "width": "250px",
                "height": "292px",
                "background": converColorToNum(_loginboxmainbgc, _loginboxmainbgcOpacity),
                "right": _loginboxposition[0],
                "top": _loginboxposition[1]
            });
            $(".login_body").css({
                "top": "0px",
                "right": "0px",
                "margin-top": "0px"
            });
            $(".login_top").find("input").css({
                "border-radius": "0"
            });
            $(".login_top .text").css({
                "color": "#fff"
            });
            $("#login_bottom_div").css({
                "background": converColorToNum(_loginboxbottombgc, _loginboxbottombgcOpacity)
            });
            $(".login_bottom_div").find("span").css({
                "width": "70px",
                "font-size": "smaller"
            });
            $("#login_button").css("background", converColorToNum(_loginboxbuttonbgc, _loginboxbuttonbgcOpacity));
        }

        //登录框元件拖动
        $("#login_area").draggable({
            containment: "parent",
            stop:function(){
                left = $("#login_area").offset().left -21;
            }
        });
        $("#login_logo").draggable({
            containment: "parent"
        });
        $(".login_area_botttom").draggable({
            containment: "parent"
        });

        //背景图片高度
        _changebgiheight = $("#previewDiv").height();
    } else {
        if (_layout == "all") {
            $("#login_area_div").css({
                "background": converColorToNum(_loginboxmainbgc, _loginboxmainbgcOpacity),
                "right": _loginboxposition[0],
                "top": _loginboxposition[1]
            });
        } else if (_layout == "t_b") {
            $("#login_area_div").css({
                "background": converColorToNum(_loginboxmainbgc, _loginboxmainbgcOpacity),
                "left":"0px",
                "top":"inherit",
                "bottom": _loginboxposition[0]
            });
        } else if (_layout == "l_r") {
            $("#login_area_div").css({
                "background": converColorToNum(_loginboxmainbgc, _loginboxmainbgcOpacity),
                "top":"0px",
                "right": _loginboxposition[0]
            });
        } else if (_layout == "center") {
            $("#login_area_div").css({
                "background": converColorToNum(_loginboxmainbgc, _loginboxmainbgcOpacity),
                "right": _loginboxposition[0],
                "top": _loginboxposition[1]
            });

            $(".masks").css({
                "display": "block",
                "background": converColorToNum(_mainbgc, _mainbgcOpacity)
            });
        }
        $("#login_bottom_div").css("background", converColorToNum(_loginboxbottombgc, _loginboxbottombgcOpacity));
        $("#login_button").css("background", converColorToNum(_loginboxbuttonbgc, _loginboxbuttonbgcOpacity));
        //背景图片高度
        _changebgiheight = $("body").height();
        if(_changebgiheight <= 0){
        	_changebgiheight = $(document).height();
        }
    }
    //背景图片轮播
    changeSlide(_changebgispeed);
    //在设计器IE8下输入框背景色,主要针对t_b结构
    if ($.browser.msie && $.browser.version < 9) {
            //在设计器IE8下输入框背景色,主要针对t_b结构
            $(".login_inputs #login_usernames").css("background-color","#f8f8f8");
            $(".login_inputs #login_password").css("background-color","#f8f8f8");

            //在左右布局的时候top50%不识别，然后重新计算 margin值；
            var m_top = ($(".login_area_l_r").height() - $(".login_area_l_r .login_body").height())/2;
            $(".login_area_l_r .login_body").css({"top":m_top,"margin-top":"0px"});

             //Ie8下面欧式输入框输不了的解决方案
            $(".login_box .login_top .password input").css("background","url(/seeyon/main/login/default/images/white.png)");
            $(".login_box .login_top .username input").css("background","url(/seeyon/main/login/default/images/white.png)");
            $(".login_box .login_top .captcha_box").css("background","url(/seeyon/main/login/default/images/white.png)");
    }

    //ICP备案信息
    showHideIcp();
}
//添加背景图片
function setSliderBgImg(fromCheckVal){
    if(typeof(fromCheckVal)!="undefined"){  //如果有fromCheckVal表明：窗口缩放时进行的背景图片渲染，需要从右侧图片的复选框中取值。
        var _bgialignVal=fromCheckVal;
        if (_bgialignVal == "center") {
            var _setBgDom = new changeDomImg("center");
        } else if(_bgialignVal == "left") {
            var _setBgDom = new changeDomImg("left");
        } else {
             var _setBgDom = new changeDomImg("zoom");
        }
    }else{  //fromeCheckVal无值表明：此处属于初始化页面时的背景图片渲染，直接取_bgialign的值即可。
        if (_bgialign == "center") {
            var _setBgDom = new changeDomImg("center");
        } else if(_bgialign == "left") {
            var _setBgDom = new changeDomImg("left");
        } else {
             var _setBgDom = new changeDomImg("zoom");
        }
    }
}
//原图居左、原图居中、等比缩放，针对这三项所做的dom操作
function changeDomImg(_style){
    this._style=_style;
    var _sliderWidth=$("#login_wrap").width();
    $("#login_bg").width(_sliderWidth);
    $("#scroll_ul").html("").width(_sliderWidth);
    //判断图片来源，如果页面中有changebgiUl，可知当前是设计器页面，需要从选中的列表中取得图片，否则可知是登录页，直接取_changebgi
    if($('#changebgiUl').length){
        this._imgList = this.getActiveImgUrl();
    }else{
        this._imgList = _changebgi;
    }
    //背景图片显示方式为等比缩放，添加img子元素
    if (_style=="zoom") {
        //查找imgSize中的键值
        this._imgSizeList = this.getKeys();
        //在imgSize中查找当前为选中状态的图片尺寸
        this._iSizeArray = this.getSize();
        //拼装li和img
        this.setImgDom();
    }else{//背景图片显示方式为居左或居中显示时，移除img子元素并还原background
        this.setImgBg();
    }
}
//获取当前为选中状态的图片列表
changeDomImg.prototype.getActiveImgUrl = function(){
    var _ImgUrl=[];
    var _activeImgList=$("#changebgiUl").find("input[type=checkbox]:checked");
    for(i=0;i<_activeImgList.length;i++){
        _imgSrc=_activeImgList.eq(i).parent().siblings("img").attr("src");
        _ImgUrl.push(_imgSrc);
    }
    return _ImgUrl;
}
//返回imgSize中的keys
changeDomImg.prototype.getKeys = function(){
    //Object.keys for IE8
        if (!Object.keys) Object.keys = function(o) {
          if (o !== Object(o))
            throw new TypeError('Object.keys called on a non-object');
          var k=[],p;
          for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
          return k;
        }
        //Object.keys
        return Object.keys(imgSize);
}
//查找当前为选中状态的图片在imgSize中的尺寸
changeDomImg.prototype.getSize = function(){
    var _tempArray=[];
    for (var i = 0; i < this._imgList.length; i++) {//当前为选中状态的图片
        for (var j = 0; j < this._imgSizeList.length; j++) {//所有的图片
            var _thisImgStr=this._imgSizeList[j].toString();
            if(this._imgList[i].indexOf(_thisImgStr)!=-1){
                _tempArray.push(imgSize[_thisImgStr]);
                break;
            }
        }
    }
    return _tempArray;
}
//当图片显示方式为“等比缩放”时，移除background，为li添加用于定位的div或img子元素
changeDomImg.prototype.setImgDom = function(){
    var _ul=$("#scroll_ul"),
    _lbg=$("#login_bg"),
    _cw=_lbg.width(),
    _ch=_lbg.height(),
    _imgStr=_imgSizeStr=_liStr="",
    isXpIE8=navigator.userAgent.toLowerCase().indexOf("nt 5.1")!=-1&&navigator.userAgent.toLowerCase().indexOf("msie 8")!=-1;;
    for (var i = 0; i < this._imgList.length; i++) {
        if(this._iSizeArray[i] == null) return;
        var _iw=this._iSizeArray[i].split(",")[0];
        var _ih=this._iSizeArray[i].split(",")[1];
        if(_cw / _ch > _iw / _ih){
            var _new_h = Math.floor(_cw * _ih / _iw),
            _imgTop = Math.floor((_ch - _new_h) / 2);
            _imgSizeStr="width:"+_cw+"px;height:"+_new_h+"px;top:"+_imgTop+"px;";
        }else{
            var _new_w = Math.floor(_ch * _iw / _ih),
            _imgLeft = Math.floor((_cw - _new_w) / 2);
            _imgSizeStr="width:"+_new_w+"px;height:"+_ch+"px;left:"+_imgLeft+"px;";
        }
        if(isXpIE8){
            _imgStr="<div style='background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="+this._imgList[i]+",sizingMethod=scale);"+_imgSizeStr+"'></div>";
        }else{
            _imgStr="<img src='"+this._imgList[i]+"' style='"+_imgSizeStr+"display:block;position:absolute;'>";
        }       
        _liStr += "<li style='float:left;width:"+_cw+"px;height:"+_ch+"px;'>"+_imgStr+"</li>";
    }
    $("#scroll_ul").append(_liStr);
}
//当图片显示方式为“居左对齐”，“居中对齐”时，移除div或img子元素，为li添加background
changeDomImg.prototype.setImgBg = function(){
    var _lbg=$("#login_bg"),
        _cw=_lbg.width(),
        _ch=_lbg.height(),
        _imgStr=_liStr="";
        if(this._style=="center"){
            var _imgPosition="center center;";
        }else{
            var _imgPosition="0 0;";
        }
        for (var i = 0; i < this._imgList.length; i++) {
            _imgStr="background-image:url("+this._imgList[i]+");background-repeat:no-repeat;background-position:"+_imgPosition;
            _liStr += "<li style='float:left;width:"+_cw+"px;height:"+_ch+"px;"+_imgStr+"'>"+"</li>";
        }
        $("#scroll_ul").append(_liStr);
}

//图片轮播
function changeSlide(speed) {
    var delayTime = 0;
    if (speed == "speed1") {
        delayTime = 3000;
    } else if (speed == "speed2") {
        delayTime = 5000;
    } else if (speed == "speed3") {
        delayTime = 8000;
    }
    $("#login_bg").slide({
        //height: _changebgiheight,
        height: '100%',
        delayTime: delayTime,
        slidePage: false,
        slideTitle: false,
        effect: 'horizontal',
        triggerType: "hover"
    });
}

//颜色值转换
function converColorToNum(_color, num) {
    num = num / 100;
    if ($.browser.msie && ($.browser.version == '6.0' || $.browser.version == '7.0' || $.browser.version == '8.0')) {
        return _color;
    }
    if (_color.indexOf("#") == 0) {
        _color = _color.replace(/#/g, "");
        if (_color.length != 6) {
            return;
        }
        var r = _color.substr(0, 2).toNum();
        var g = _color.substr(2, 2).toNum();
        var b = _color.substr(4, 2).toNum();
        _color = "rgb(" + r + "," + g + "," + b + ")";
    }
    _color = _color.replace("rgb", "rgba").replace(")", "," + num + ")");
    return _color;
}
String.prototype.toNum = function() {
    var hex = {
        a: 10,
        b: 11,
        c: 12,
        d: 13,
        e: 14,
        f: 15
    };
    var str = this.toLowerCase();
    var sw = hex[str.substr(0, 1)];
    if (sw == undefined) {
        sw = str.substr(0, 1) * 16;
    } else {
        sw = hex[str.substr(0, 1)] * 16;
    };
    var gw = hex[str.substr(1, 1)];
    if (gw == undefined) {
        gw = str.substr(1, 1) * 1;
    } else {
        gw = hex[str.substr(1, 1)] * 1;
    };
    return sw + gw;
};

//ICP备案信息
function showHideIcp(){
    if(_icpDisplay=="1"){
        if(_icpLink==""){
            _icpLinkStr1="<p>";
            _icpLinkStr2="</p>";
            if(_dueRamindDisplay=="1"){
            	_icpLinkStr2="</p><p>"+dueRemind+"</p>";
            }
        }else{
            _icpLinkStr1="<a href='" + icpToTxt(_icpLink) + "' target='_blank'>";
            _icpLinkStr2="</a>";
            if(_dueRamindDisplay=="1"){
            	 _icpLinkStr2="</a><p>"+dueRemind+"</p>";
            }
        }
        var _icpStr = _icpLinkStr1 + icpToTxt(_icpInfo) + _icpLinkStr2;
        $(".icp_info").empty().append(_icpStr).show();
        if((".login_area_t_b").length){
            $("#login_bottom_div").css("padding-top","0");
        }
    }else{
    	if(dueRemind){
    		if(_dueRamindDisplay=="1"){
	            $(".icp_info").empty().append("<p>"+dueRemind+"</p>").show();
	            if((".login_area_t_b").length){
	                $("#login_bottom_div").css("padding-top","0");
	            }
    		}else{
    			$(".icp_info").empty().hide();
    		}
    	}else{
    		$(".icp_info").empty().hide();
            $("#icp").attr("disabled","disabled");
            $("#icpUrl").attr("disabled","disabled");
    	}
    }
    
}
function changeDueRamind(){
    if($("#dueRemind").is(":checked")){
    	_dueRamindDisplay = "1";
        showHideIcp();
    }else{
    	_dueRamindDisplay="0";
        showHideIcp();
    }
}

function changeIcpStatus(){
    if($("#showIcp").is(":checked")){
        _icpDisplay = "1";
        _icpInfo = $("#icp").removeAttr("disabled").val();
        _icpLink = $("#icpUrl").removeAttr("disabled").val();
        showHideIcp();
    }else{
        _icpDisplay="0";
        showHideIcp();
        $("#icp").attr("disabled","disabled");
        $("#icpUrl").attr("disabled","disabled");
    }
}

function changeIcpText(){
    _icpInfo = icpToTxt($("#icp").val());
    _icpLink = icpToTxt($("#icpUrl").val());
    showHideIcp();
}

function icpToTxt(str) {
  var RexStr = /\<|\>|\"|\'|\&/g
  str = str.replace(RexStr, function(MatchStr) {
    switch (MatchStr) {
    case "<":
      return "&lt;";
      break;
    case ">":
      return "&gt";
      break;
    case "\"":
      return '"';
      break;
    case "'":
      return "'";
      break;
    case "&":
      return "&";
      break;
    default:
      break;
    }
  })
  return str;
}