/*！
 * @name		jQuery touchTouch plugin
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://www.sucaijiayuan.com
 * @license		MIT License
 * 
 * modified by He.t Copyright (C) 2015 Seeyon
 * modifiy  by shuqi @2017-01-08
 */
;~(function($) {
	
	function _i18n(key){
		var rs = "";
		if($.i18n){
			rs = $.i18n(key);
		}else if(top &&  top.$.i18n){
			rs = top.$.i18n(key);
		}else if(typeof  CTPLang !== "undefined" && _locale!== "undefined"){
			rs = CTPLang[_locale][key];
		}
		return rs;
	}
	
	/**
	 * <pre>
	 * $("selector").touch(options);
	 * 可自定义的参数options：
	 * {
	 *     id 				: new Date().getTime() + "",//唯一的Id
	 *     targetWindow 	: window,	//目标window
	 *     zoomer 			: true,		//是否启用缩小放大功能
	 *     showContent 		: false,	//是否显示内容
	 *     datas			: [{}],		//大图查看的内容，也可以用dom的属性
	 *     extensions		: function()//扩展工具区域的回调（用于回调显示右侧下边的功能，详细使用方法看demo）
	 *     textClick		: function()//文字点击事件
	 *	   onShow:function(){  },		//打开之前回调
	 *	   onHide:function(){  },		//隐藏之后回调
	 *
	 * 	   //=========== 秀私有属性 ===========//
	 *     reply 			: false,	//是否启用回复（秀专用）
	 *     showpostContent	: false 	//是否启用秀圈内容（秀专用）
	 * }
	 * 
	 * 1、使用json数组的方式传递参数
	 * {
	 * 		src			:	图片的src
	 * 		originalsrc	:	原图src(如果传入，就不显示查看原图按钮)
	 * 		title		:	图片的title
	 * 		text		:	文字(左侧文字 OR dom )
	 * 		
	 * 		//=========== 秀私有属性 ===========//
	 * 		textUrl		:	文字的URL
	 * 		userPic		:	秀用户头像URL
	 * 		userName	:	秀用户名
	 * 		userId		:	当前登录用户的Id（秀回复使用）
	 * 		dataId		:	秀圈的Id（秀回复使用）
	 * }
	 * 2、使用dom元素的属性方式传递参数
	 * 	&lt;a href="javascript:void(0);"
	 * 		 _src="图片的URL" 
	 * 		 _originalsrc="原图的URL(如果传入，就不显示查看原图按钮)" 
	 * 		 title="图片的title"
	 * 		 _text="文字(左侧文字）" 
	 * 
	 * 		//=========== 秀私有属性 ===========//
	 * 		 _textUrl="文字的URL" 
	 * 		 _userPic="秀用户头像URL"  
	 * 		 _userName="秀用户名"  
	 * 		 _userId="当前登录用户的Id（秀回复使用）"
	 * 		 _dataId="秀圈的Id（秀回复使用））" 
	 * 	/&gt;
	 * </pre>
	 */
	$.fn.touch = function(params) {
		var viewOrginal = _i18n('common.touchtouch.viewOrginal');
		var loadfailure = _i18n("common.touchtouch.image.loadfailure");
		var ishowReply = _i18n("showReply.reply.name");
		// 初始化数据
		var options = $.extend(true, {}, defaultParmas, params);
		var $items = this;
		var currentIndex = 0;// 当前图片位置
		
		// 如果已经注册一次，删除原来的
		removeDom(options);
		$(window).unload(function() {
			removeDom(options);
		});

		/** 背景iframe */
		var $bgIframe = $('<iframe id="galleryOverlayIframe' + options.id + '" class="galleryOverlayIframe" allowtransparency="true" src="about:blank" frameborder="0" style="display:none;" scrolling="no"></iframe>');

		/** 大图查看dom结构 */
		var html = "";
		html += '<div id="galleryOverlay' + options.id + '" class="galleryOverlay" style="display:none;">';
		html += '	<div class="gallerySlider"></div>';// 图片容器
		html += '	<span class="hideOverlay"></span>';// 关闭按钮
		html += '	<a class="prevArrow"></a>';// 上一个
		html += '	<a class="nextArrow"></a>';// 下一个
		//扩展工具区域---start
		html += '	<div class="gallery-content-area" style="display:none;">';
		//用户头像
		html += '	   <div class="userPic" style="display:none;">';
		html += '	   		<img  title=""/>';
		html += '	   </div>';
		html += '	   <div class="line-content show-content" style="display:none;">中文长城中文长城中文长城中文长城中文长城中文长城中文长城中文长城中文长城中文长城中文长城中文长城中文长城</div>';
		html += '	   <div class="line-content dispaly-content" style="display:none;">中文长城中文长城中文长城中文长城中文长城中文长城中文长城中文长城中文长城中文长城中文长城中文长城中文长城</div>';
		//工具功能区域
		html += '	   <div class="scale-toolbox">';// 更大
		html += '	     <span class="ico24 photo_minify_24 hand smaller"></span>';// 更大
		html += '	     <span class="viewScale">100%</span>';
		html += '	     <span class="ico24 photo_magnify_24 hand biger"></span>';// 更小
		html += '	     <span class="ico24 photo_realsize_24 hand one2one"></span>';// 一比一
		html += '	     <span class="ico24 photo_selfadaption_24 hand suitsize"></span>';// 复原
		html += '		 <span class="viewRotate"></span>';//旋转
		html += '		 <span class="viewOrginal" style="display:none;" title="' + viewOrginal + '">' + viewOrginal + '</span>';// 查看原图
		html += '	   </div>';
		//秀的回复点赞
		html += '	   <div class="moreAction" style="display:none;">';
		html += '	  	   <p class="moreAction_like">';
		html += '	  	  	<span class="liked_gray">';
		html += '	  	  		<span class="ico16 no_like_16 praise"></span>';
		html += '	  	  		<span class="praiseNum">0</span>';
		html += '	  	  	</span>';
		html += '	  	   </p>';
		html += '	  	   <p title="' + ishowReply + '" class="moreAction_reply">';
		html += '	  	  	<span class="estimate_gray">';
		html += '	  	  		<span class="ico16 show_replyNumberWhite"></span>';
		html += '	  	  		<span class="commentNum">0</span>';
		html += '	  	  	</span>';
		html += '	  	   </p>';
		html += '	       <span class="moreAction32"></span>';
		html += '	   </div>';
		//扩展工具区域
		html += '	   <div class="extendArea" style="display:none;">';
		/*html += '	   		<span class="ico24Span"><span class="ico24 unstore_24"></span>收藏</span>';
		html += '	   		<span class="ico24Span"><span class="ico24 download_24"></span>下载</span>';
		html += '	   		<span class="ico24Span"><span class="ico24 unstore_24"></span>收藏</span>';*/
		html += '	   </div>';
		//扩展工具区域---end
		
		html += '	</div>';
		html += '</div>';
		var $html = $(html);
		var $viewOrginal = $html.find(".viewOrginal");
		$(options.targetWindow.document.body).append($bgIframe).append($html);

		// 填充图片内容
		var $gallerySlider = $html.find(".gallerySlider");
		var $images = $(processData($items, options));
		$gallerySlider.append($images);

		// 是否显示扩展工作区域
		if (options.showContent || options.zoomer || options.reply || options.showpostContent) {
			$html.find(".gallery-content-area").show();
		}
		// 秀的回复内容显示
		if(options.reply){
			$html.find(".moreAction").show();
			$html.find(".scale-toolbox").css({
				"position" : "absolute",
				"right" : "80px",
				"width" : "auto"
			});
		}

		// 初始化事件
		initEvent();

		// 窗口高宽
		var windowsHeight = $(options.targetWindow).height();
		var windowsWidth = $(options.targetWindow).width();
		$(options.targetWindow).resize(function() {
			windowsHeight = $(options.targetWindow).height();
			windowsWidth = $(options.targetWindow).width();
		});

		/** 初始化事件 */
		function initEvent() {
			
			/** 大图查看dom绑定 */
			$items.off("click").on("click", function(event) {
				//显示图片回调
				if(typeof options.onShow === 'function'){
					options.onShow();
				}
				
				var e = event ? event : window.event;
				// 取消冒泡事件
				if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 27) {
					e.preventDefault && e.preventDefault();
					e.stopPropagation && e.stopPropagation();
					e.cancelBubble = true;
				}
				// 左右按钮 keydown keyup
				$(options.targetWindow.document).off('keydown').on('keydown', function(e) {
					if (e.keyCode == 37) {
						// <==
						showPrevious()
					} else if (e.keyCode == 39) {
						// ==>
						showNext();
					}
				});
				$(options.targetWindow.document).off('keyup').on('keyup', function(e) {
					if (e.keyCode == 27) {
						// ESC 退出
						hideDom($bgIframe, $html, options);
						//隐藏回复框
						hideShowReply();
						//隐藏回调
						if(typeof options.onHide === 'function'){
							options.onHide();
						}
					}
				});
				// 显示当前
				currentIndex = $items.index(this)
				// 显示弹出层
				showDom($bgIframe, $html, options);
				// 显示当前图片
				showImage();
			});
			
			/** 启用秀的回复功能 */
			if(options.reply){
				var _showPraiseManager = new showPraiseManager();
				var _showReplyManager = new showPostReplyManager();
				$html.find(".moreAction").hover(function() {
					var $this = $(this);
					$this.find('p').slideDown();
					var dataId = options.datas[currentIndex].dataId;
					var userId = options.datas[currentIndex].userId;
					_showPraiseManager.getShowPraiseNum(dataId, {
						success : function(num) {
							var $target = $this.find(".praiseNum").html(num);
							// 点赞组件
							$this.find(".moreAction_like").praise({
								targetNum : $target,
								targetIcon : $this.find(".praise"),
								paramObj : {
									moduleId : dataId,
									publishId : userId
								},
								hoverMember : false
							});
						},error:function(){
							//报错忽略
						}
					});
					_showReplyManager.getShowReplyNum(dataId, {
						success : function(num) {
							$this.find(".commentNum").html(num);
							// 回复组件
							$this.find(".moreAction_reply").replyPic({
								target : $this.parents(".gallery-content-area"),
								paramObj : {
									moduleId : dataId,
									publishId : userId
								}
							});
						},error:function(){
							//报错忽略
						}
					})
				}, function() {
					$(this).find('p').hide();
				});
			}
			
			/** 放大缩小按钮(功能区域) */
			if (options.zoomer) {
				var $photoViewMode = $html.find(".gallery-content-area .scale-toolbox").show();
				/** 合适的大小 */
				$photoViewMode.find(".suitsize").off('click').on("click", function() {
					var $currentImg = $(this).parents(".galleryOverlay").find(".block_img img.content-image");
					if ($currentImg.length != 0 && $currentImg.attr("loaded") == "true") {
						$currentImg.removeClass("scaling").addClass("normal").attr("style", "");
						var size = getNaturalSize($currentImg);
						$currentImg.parents(".galleryOverlay").find(".viewScale").html(($currentImg.width() / size.width * 100).toFixed(0) + "%");
					}
				});
				/** 1:1 */
				$photoViewMode.find(".one2one").off('click').on("click", function() {
					var $currentImg = $(this).parents(".galleryOverlay").find(".block_img img.content-image");
					if ($currentImg.length != 0 && $currentImg.attr("loaded") == "true") {
						$currentImg.attr("style", "");
						var naturalsize = getNaturalSize($currentImg);
						var top = (windowsHeight - naturalsize.height) / 2.0;
						var left = (windowsWidth - naturalsize.width) / 2.0;
						resizeImage($currentImg, naturalsize.height, naturalsize.width, top, left);
					}
				});
				/** 放大 */
				$photoViewMode.find(".biger").off('click').on("click", function() {
					var $currentImg = $(this).parents(".galleryOverlay").find(".block_img img.content-image");
					if ($currentImg.length != 0 && $currentImg.attr("loaded") == "true") {
						changeSize($currentImg, 1.05 );
					}
				});
				/** 缩小 */
				$photoViewMode.find(".smaller").off('click').on("click", function() {
					var $currentImg = $(this).parents(".galleryOverlay").find(".block_img img.content-image");
					if ($currentImg.length != 0 && $currentImg.attr("loaded") == "true") {
						changeSize($currentImg, 0.95 );
					}
				});
				/** 滚轮事件 */
				/*$(options.targetWindow.document)*/
				$html.off("DOMMouseScroll mousewheel").on("DOMMouseScroll mousewheel", function(e) {
					var event = e ? e : window.event;
					var delta = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail);
					var $target = $(event.srcElement || event.target);
					if ($target.length != 0 && $target.hasClass("touch-content-image") && $target.attr("loaded") == "true") {
						//图片上滚动是图片的放大、缩小
						var resize = delta > 0 ? 1.05 : 0.95 ;//缩放比例
						changeSize($target, resize );;
						/* 
						//中心点为鼠标位置，计算出来的结果不是很精准，先不放开
						var nowX = event.originalEvent.clientX, nowY = event.originalEvent.clientY;//鼠标当前的位置
						var oldHeigt = $target.height(), oldWidth = $target.width();//没改变前的高宽
						var towidth = oldWidth * resize, toHeight = oldHeigt * resize;//目标高宽
						var oldLeft = 0 ,oldTop = 0;//原有的top/left
						if($target.hasClass("normal")){//还没进行过缩放
							oldLeft = ( windowsWidth - oldWidth ) / 2.0;
							oldTop =  ( windowsHeight - oldHeigt ) / 2.0;
						}else{//已经缩放过
							oldLeft = getNumCss($target,"left");
							oldTop = getNumCss($target,"top");
						}
						//目标高宽top/left
						var top = oldTop -  ( toHeight - oldHeigt ) * ( nowY / windowsHeight );
						var left = oldLeft - ( towidth  - oldWidth ) * ( nowX / windowsWidth );
						resizeImage($target, toHeight,towidth,top,left);
						*/
					}else if($target.length != 0 && $target.hasClass("placeholder")){
						//在空白区域移动，表示图片上下移动
						var $img = $target.find("img");
						if ($img.length != 0 && $img.attr("loaded") == "true") {
							var toppx = $img.css("top");
							if (/(\\-)*\d+(\\.\d+)*px/gi.test(toppx)) {
								var top = parseInt(toppx);
								delta > 0 ? (top = top + 30) : (top = top - 30);
								$img.css("top",top + "px");
							}
						}
						
					}
				});
			}
			//避免选中
			$html.off("selectstart").on("selectstart", function() {
				return false;
			});
			// 上一个
			$html.find(".prevArrow").off('click').on("click", function() {
				showPrevious();
			});
			// 下一个
			$html.find(".nextArrow").off('click').on("click", function() {
				showNext();
			});
			// x关闭
			$html.find(".hideOverlay").off('click').on("click", function() {
				hideDom($bgIframe, $html, options);
				//隐藏回复框
				hideShowReply();
				//隐藏回调
				if(typeof options.onHide === 'function'){
					options.onHide();
				}
			});
			// 空白处关闭
			$html.find(".gallerySlider").off('click').on("click", function(e) {
				e.preventDefault && e.preventDefault();
				e.stopPropagation && e.stopPropagation();
				e.cancelBubble = true;
				//正在放大、缩小时，点击图图片本身不关闭
				var $element = $(e.srcElement || e.target);
				if ($element.hasClass("scaling")) {
					return false;
				}
				hideDom($bgIframe, $html, options);
				//隐藏回复框
				hideShowReply();
				//隐藏回调
				if(typeof options.onHide === 'function'){
					options.onHide();
				}
			});
			
			// 查看原图
			$viewOrginal.off('click').on("click", function() {
				loadImage(currentIndex, true);
			});
			
			//旋转
			$html.find(".viewRotate").off('click').on("click", function() {
				var $currentImg = $(this).parents(".galleryOverlay").find(".block_img img.content-image");//当前图片
				if ($currentImg.length != 0 && $currentImg.attr("loaded") == "true") {
					var transform;//取当前图片的角度
                    //IE8及以下版本采用滤镜方式实现旋转
                    if(v3x.isMSIE8 || v3x.isMSIE7 || v3x.isMSIE6){
                        transform = $currentImg[0].style.filter;
                        var a = transform.substring(54, 55);
                        var deg = 1;
                        if(a != "" && !isNaN(a)){
                            deg = parseInt(a) + 1 < 4 ? parseInt(a) + 1 : 0;
                        }
                        if($currentImg[0].width > $currentImg[0].height){
                        	if(deg == 1 || deg == 3){
                        		$currentImg[0].style.marginTop = "-100px";
                        		$currentImg[0].style.marginLeft = "350px";
                        	}else{
                        		$currentImg[0].style.marginTop = "0px";
                        		$currentImg[0].style.marginLeft = "0px";
                        	}
                        }else{
                        	if(deg == 1 || deg == 3){
                        		$currentImg[0].style.marginTop = "100px";
                        		$currentImg[0].style.marginLeft = "-150px";
                        	}else{
                        		$currentImg[0].style.marginTop = "0px";
                        		$currentImg[0].style.marginLeft = "0px";
                        	}
                        }
                        $currentImg[0].style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation="+ deg +")​";
                    }else{
                    	if('msTransform' in document.documentElement.style){
							transform = $currentImg[0].style.msTransform;
						}else if('transform' in document.documentElement.style){
							transform = $currentImg[0].style.transform;
						}
						var last_index=transform.indexOf("deg");
						var	a = transform.substring(7,last_index);
						var deg;
						if(a==""||a==null){
							deg=0;
						}else{
							deg=parseInt(a);
						}
						deg=(deg+90)%360;
						if('msTransform' in document.documentElement.style){
							$currentImg[0].style.msTransform = "rotate("+deg+"deg)";
						}else if('transform' in document.documentElement.style){
							$currentImg[0].style.transform = "rotate("+deg+"deg)";
						}
					}
				}
			});
		}
		
		/** 隐藏秀的回复框 */
		function hideShowReply() {
			if (options.reply) {
				var $replay = $html.find(".reply_common");
				if ($replay.length == 1) {
					$replay.remove();
				}
			}
		}
		/** 显示下一张 */
		function showNext() {
			if (currentIndex + 1 < options.datas.length) {
				currentIndex++;
				showImage();
			} else {
				// 去除动画效果
				$gallerySlider.addClass('rightSpring');
				setTimeout(function() {
					$gallerySlider.removeClass('rightSpring');
				}, 500);
				// 提示：最后一张
				if (options.targetWindow.layer_dialog) {
					options.targetWindow.layer_dialog(false, 'action_warning', _i18n('common.touchtouch.lasttips'), 2, 1);
				}else{
					alert(_i18n('common.touchtouch.lasttips'));
				}
			}
		}

		/** 显示上一张 */
		function showPrevious() {
			if (currentIndex > 0) {
				currentIndex--;
				showImage();
			} else {
				// 去除动画效果
				$gallerySlider.addClass('leftSpring');
				setTimeout(function() {
					$gallerySlider.removeClass('leftSpring');
				}, 500);
			}
		}

		/** 显示第imageIndex图片 */
		function showImage() {
			//隐藏回复框
			hideShowReply();
			//计算显示内容
			loadContent(currentIndex);
			// 显示当前
			$gallerySlider.find(".block_img").removeClass("block_img").addClass("hide_img");
			$images.eq(currentIndex).removeClass("hide_img").addClass("block_img");
			var $currentImg = $images.eq(currentIndex).find("img");
			if ($currentImg.length == 0) {
				loadImage(currentIndex, false);
			} else {
				if ($currentImg.attr("loaded") == "true") {
					var size = getNaturalSize($currentImg);
					$currentImg.removeClass("scaling").addClass("normal").attr("style", "");
					$currentImg.parents(".galleryOverlay").find(".viewScale").html(($currentImg.width() / size.width * 100).toFixed(0) + "%");
				}
			}
			// 是否显示查看原图按钮
			if (currentIndex >= 0 
					&& currentIndex < options.datas.length 
					&& options.datas[currentIndex].originalsrc 
					&& $images.eq(currentIndex).attr("loadOriginal") != "yes") {
				$viewOrginal.show();
			} else {
				$viewOrginal.hide();
			}
			
			// 预加载上一张
			loadImage(currentIndex - 1, false);

			// 预加载下一张
			loadImage(currentIndex + 1, false);
		}
		/** 加载扩展功能区域的内容 */
		function loadContent(index){
			var data = options.datas[index];
			//秀的内容区域加载 (秀独有的特性)
			if(options.showpostContent || options.userPic){
				var $userPic = $html.find(".userPic");
				if (data.userPic && data.userPic !== '') {
					$userPic.show().find("img").attr("src", data.userPic).attr("title", data.userName);
				} else {
					$userPic.hide();
				}
				var $showContent = $html.find(".show-content");
				if(options.showpostContent){
					var text = _i18n("common.touchtouch.image.viewdetail");
					if(data.text && data.text != ""){
						text = data.text;
					}
					$showContent.html(convertFace(escapeStringToHTML(text))).attr("title",text);
					if(data.textUrl){
						$showContent.addClass("show-content-link").show().off("click").on("click",function(){
							options.targetWindow.location = data.textUrl;
						});
					}else{
						$showContent.removeClass("show-content-link").off("click");
					}
				}
			}
			//文字区域
			if(options.showContent){
				var $dispalyContent = $html.find(".dispaly-content");
				if(data.text){
					$dispalyContent.html(data.text).show();
				}else{
					$dispalyContent.hide();
				}
				//文字点击事件回调
				if (options.textClick && typeof options.textClick == "function") {
					$dispalyContent.off("click").on("click",function(e){
						var target = ( e.srcElement || e.target );
						options.textClick.call(target,index,data,options.datas);
					});
				}
			}
			//扩展菜单加载
			if (options.extensions && typeof options.extensions == "function") {
				var $extendArea = $html.find(".extendArea");
				options.extensions.call($extendArea[0],index,data,options.datas);
			}
		}
		
		/** 加载图片 */
		function loadImage(index, loadOriginal) {
			if (index < 0 || index >= options.datas.length) {
				return;
			}
			var data = options.datas[index];
			var src = data.src;
			if (loadOriginal) {
				src = data.originalsrc;
				$images.eq(index).html("").attr("loadOriginal", "yes").removeClass("nobg").addClass("bgloading");
				$viewOrginal.hide();// 隐藏显示查看原图按钮
			}
			if ($images.eq(index).find("img").length == 0) {
				$('<img class="normal content-image touch-content-image" />').on('load', function() {
					// 成功回调
					var $currentImg = $images.eq(index).find("img");
					$images.eq(index).removeClass("bgloading").addClass("nobg");
					if ($currentImg.length == 0) {
						$currentImg = $(this);
						$images.eq(index).append($currentImg);
					}
					// 去掉img的width/height属性,防止IE8 图片拉变形
					$currentImg.removeAttr('width').removeAttr('height');
					if (currentIndex == index) {
						var size = getNaturalSize($currentImg);
						$currentImg.addClass("normal").attr("loaded", true);
						$currentImg.parents(".galleryOverlay").find(".viewScale").html(($currentImg.width() / size.width * 100).toFixed(0) + "%");
					} else {
						$currentImg.addClass("normal").attr("loaded", true);
					}
				}).on("error", function() {
					// 失败回调
					$images.eq(index).removeClass("bgloading").addClass("nobg");
					if ($images.eq(index).find("div").length == 0) {
						$images.eq(index).find("img").remove();
						$images.eq(index).append('<img src="' + _ctxPath + '/common/image/img/404.png"/><div class="loadfailure">' + loadfailure + '</div>');
					}
				}).appendTo($images.eq(index)).attr("title",data.title).attr('src', src);//src必须放在最后，避免IE9-浏览器不触发load事件 
			}
		}

		/** 改变size */
		function changeSize($currentImg, resize) {
			var oldHeigt = $currentImg.height(), oldWidth = $currentImg.width();//没改变前的高宽
			if(v3x.isMSIE8 || v3x.isMSIE7 || v3x.isMSIE6){
                var oldDeg = $currentImg[0].style.filter.substring(54, 55);
                var deg = 1;
                if(oldDeg != "" && !isNaN(oldDeg)){
                    deg = parseInt(oldDeg) + 1 < 4 ? parseInt(oldDeg) + 1 : 0;
                }
                if( deg == 0 ||deg ==2 ){
                	var t = oldHeigt;
                	oldHeigt = oldWidth;
                	oldWidth = t;
                }
			}
			var towidth = oldWidth * resize, toHeight = oldHeigt * resize;//目标高宽
			var oldLeft = getNumCss($currentImg,"left") ,oldTop = getNumCss($currentImg,"top");//原有的top/left
			var left = 0, top = 0;//目标高宽top/left
			if (oldLeft == 0 && oldTop == 0) {//居中
				top = (windowsHeight - toHeight) / 2.0;
				left = (windowsWidth - towidth) / 2.0;
			}else{
				top = oldTop - ( toHeight - oldHeigt ) / 2.0;
				left = oldLeft - ( towidth  - oldWidth ) / 2.0;
			}
			resizeImage($currentImg, toHeight,towidth,top,left);
		}
		
		/** 将图片缩放到对应尺寸 */
		function resizeImage($currentImg, height, width, top, left) {
			if($currentImg.hasClass("normal")){
				$currentImg.removeClass("normal").addClass("scaling");
			}
			//该表图片的css
			$currentImg.css({
				height : height + "px",
				width : width + "px",
				top : top + "px",
				left : left + "px"
			});
			//重新绑定拖拽,绑定拖拽  要放在 css设置完成后
			drag(options, $currentImg,left,top);
			//改变现实百分比
			var naturalSize = getNaturalSize($currentImg);
			$currentImg.parents(".galleryOverlay").find(".viewScale").html((width / naturalSize.width * 100).toFixed(0) + "%");
		}

	} // $.fn.touch end

	// ================================== 工具方法 start =============================//
	/** 获取数字类型的css */
	function getNumCss($dom,css){
		var css = $dom.css(css);
		if (/(\\-)*\d+(\\.\d+)*px/gi.test(css)) {
			return parseInt(css);
		}
		return 0;
	}
	
	/** 获取图片的原始尺寸 */
	function getNaturalSize($currentImg) {
		var width = $currentImg.attr("nwidth"), height = $currentImg.attr("nheight");
		if (!width) {
			//naturalWidth/naturalHeight | width | height
			var img = new Image();
		    if(img.naturalHeight && img.naturalWidth){
		    	width = $currentImg[0].naturalWidth;
		    	height = $currentImg[0].naturalHeight;
		    }else{
		    	img.src = $currentImg[0].src;
		    	height = img.height;
		    	width = img.width;
		    }
		    $currentImg.attr("nwidth", width);
		    $currentImg.attr("nheight", height);
		}
		return { width : width , height : height };
	}
	
	/** 处理数据 */
	function processData($items, options) {
		var imgaes = "";
		if (options.datas) {
			// 第一种方式：从外部传入的图片对象预加载
			var size = options.datas.length;
			for (var z = 0; z < size; z++) {
				imgaes += '<div class="placeholder hide_img bgloading" ></div>';
			}
		} else {
			// 第二种方式：当前页面绑定了多少对象则预加载多少个图层
			var datas = [];
			$items.each(function() {
				imgaes += '<div class="placeholder hide_img bgloading" ></div>';
				datas.push({
					src 		: $(this).attr('_src') ? $(this).attr('_src') : '',					// 图片的src
					originalsrc : $(this).attr('_originalsrc') ? $(this).attr('_originalsrc') : '',	// 原图src
					title 		: $(this).attr('title') ? $(this).attr('title') : '',				// 图片的title
					text 		: $(this).attr('_text') ? $(this).attr('_text') : '',				// 文字
					textUrl 	: $(this).attr('_textUrl') ? $(this).attr('_textUrl') : '',			// 秀的文字URL
					userPic 	: $(this).attr('_userPic') ? $(this).attr('_userPic') : '',			// 秀用户头像
					userName 	: $(this).attr('_userName') ? $(this).attr('_userName') : '',		// 秀用户名称
					userId 		: $(this).attr('_userId') ? $(this).attr('_userId') : '',			// 秀回复使用
					dataId 		: $(this).attr('_dataId') ? $(this).attr('_dataId') : ''			// 秀回复使用
				});
			});
			options.datas = datas;
		}
		return imgaes;
	}
	
	/** 显示dom */
	function showDom($bgIframe, $html, options) {
		// 对应的body
		options.targetWindow.$("html").css("overflow", "hidden");
		options.targetWindow.focus();
		
		$bgIframe.show();
		$html.show();
		setTimeout(function() {
			// Trigger the opacity CSS transition
			$html.addClass('visible');
		}, 100);
	}
	
	/** 隐藏dom */
	function hideDom($bgIframe, $html, options) {
		options.targetWindow.$("html").css("overflow", "");
		$bgIframe.hide();
		$html.hide().removeClass('visible');
		$(options.targetWindow.document).off('keydown keyup');
	}
	
	/** 删除大图查看的dom */
	function removeDom(options) {
		var $galleryOverlay = options.targetWindow.$("#galleryOverlay" + options.id);
		if ($galleryOverlay.length > 0) {
			try {
				$galleryOverlay.remove();
			} catch (e) {
			}
		}
		var $galleryOverlayIframe = options.targetWindow.$("#galleryOverlayIframe" + options.id);
		if ($galleryOverlayIframe.length > 0) {
			try {
				$galleryOverlayIframe.remove();
			} catch (e) {
			}
		}
	}
	
	/** 转义内容的特殊字符 */
	var escape = {
		"&" : "&amp;",
		"<" : "&lt;",
		">" : "&gt;",
		'"' : "&quot;",
		"'" : "&#x27;",
		"`" : "&#x60;"
	};
	
	function escapeHtml(chr) {
		return escape[chr] || "&amp;";
	}
	
	/** 默认参数 */
	var defaultParmas = {
		/** 唯一Id */
		id : new Date().getTime() + "",
		/** 目标window */
		targetWindow : window,
		/** 是否启用放大缩小 */
		zoomer : true,
		/** 是否需要显示内容 */
		showContent : false,
		/** 是否启用秀的回复功能 */
		reply : false,
		/** 是否显示秀圈内容 */
		showpostContent : false,
		/** 打开之前回调 */
		onShow:function(){ /*console.log("onShow");*/ },
		/** 隐藏之后回调 */
		onHide:function(){ /*console.log("onHide");*/ }
	}
	
	/** 拖拽的实现 */
	function drag(options,$action,left,top) {
		var params = {
			left : left,
			top : top,
			currentX : 0,
			currentY : 0,
			flag : false
		};
		if ($action.css("left") !== "auto") {
			params.left = getNumCss($action,"left");
		}
		if ($action.css("top") !== "auto") {
			params.top = getNumCss($action,"top");
		}
		$action.off("mousedown").on("mousedown", function(event) {
			var e = event ? event : window.event;
			e.preventDefault && e.preventDefault();
			e.stopPropagation && e.stopPropagation();
			e.cancelBubble = true;
			params.flag = true;
			$(this).off("selectstart").on("selectstart", function() {
				return false;
			});
			params.currentX = event.originalEvent.clientX;
			params.currentY = event.originalEvent.clientY;

		});
		/*$(options.targetWindow.document)*/
		$action.off("mouseup").on("mouseup", function(event) {
			var e = event ? event : window.event;
			e.preventDefault && e.preventDefault();
			e.stopPropagation && e.stopPropagation();
			e.cancelBubble = true;
			params.flag = false;
			if ($(this).css("left") !== "auto") {
				params.left = $(this).css("left");
			}
			if ($(this).css("top") !== "auto") {
				params.top = $(this).css("top");
			}
		});
		/*$(options.targetWindow.document)*/
		$action.off("mousemove").on("mousemove", function(event) {
			var e = event ? event : window.event;
			e.preventDefault && e.preventDefault();
			e.stopPropagation && e.stopPropagation();
			e.cancelBubble = true;
			if (params.flag) {
				var nowX = event.originalEvent.clientX, nowY = event.originalEvent.clientY;
				var disX = nowX - params.currentX, disY = nowY - params.currentY;
				$(this).css({
					left : parseInt(params.left) + disX + "px",
					top : parseInt(params.top) + disY + "px"
				});
			}
		});

	};
	// ================================== 工具方法 end =============================//

})(jQuery);