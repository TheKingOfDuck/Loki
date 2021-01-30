/**
 * @author liaojl
 * @Description slide图片切换组件
 * @width 外层区域width 例如:300  默认 '100%'
 * @height 外层区域height 例如：120
 * @slidePage 是否显示上一张、下一张按钮 true/false
 * @slideNum 受否显示当前帧序号 true/false
 * @auto 是否自动切换 true/false
 * @delayTime 自动切换延迟时间  例如：3000
 * @triggerType 鼠标移到序号上切换图片的触发方式   例如：‘click’,'hover'
 * @tabIndex 默认显示对应索引值  默认第一张 0
 * @effect 切换效果  fade(渐隐 不传参数默认), horizontal(水平滚动),vertical(垂直滚动)
 */

// JavaScript Document
var slideInterval;
$.fn.slide = function(options) {
	var opts = $.extend({}, $.fn.slide.defaults, options),
	$element = $(this),
	isAuto = opts.auto,//是否自动
	effect = opts.effect,
	slidelength = $element.find(".slideImgs li").length;//图片的个数
	opts.width=='100%'?opts.width=$element.parent().width():opts.width;//如果是100%转换为px
	opts.height=='100%'?opts.height=$element.parent().height():opts.height;//如果是100%转换为px
	if($element.find(".slideNum")){
	    $element.find(".slideNum").remove();
	}
	if(opts.slideNum && slidelength>1){
		slideNumdiv = $('<div class="slideNum" />');
		for (i=0;i<slidelength;i++){
			var objdiv = $('<span />');
			objdiv.text(i+1);
			slideNumdiv.append(objdiv);
		} 
		$element.append(slideNumdiv);
		if(opts.triggerType == "click"){
			$element.find(".slideNum span").click(function() {
				showThis($(this).index());
			})
		}else if(opts.triggerType == "hover"){
			$element.find(".slideNum span").mouseover(function() {
				showThis($(this).index());
			})
		}
		
	}
	if(opts.slideTitle){
		$element.find('.slideTitles p').css("paddingRight",$element.find('.slideNum').width()+20);
		$element.find('.slideTitles').show();
		if(slidelength==1 && $element.find('.slideTitles p:first').is(":empty")){
			$element.find('.slideTitles').hide();
		}
	}


	$element.css({
		"width":opts.width,
		"height":opts.height,
		"overflow":"hidden",
		"position":"relative"
	});


	switch(effect){
		case 'horizontal'://水平
		$element.find(".slideImgs").css({
			"width":opts.width * slidelength,
			"height":opts.height
		});
		$element.find(".slideImgs li").css({
			"float":"left"
		});
		break;
		case 'vertical'://垂直
		$element.find(".slideImgs").css({
			"width":"100%",
			"height":opts.height * slidelength
		});
		break;
		default://默认
		//do nothing
		break;
	}

	$element.find(".slideImgs li").css({
		"width":opts.width,
		"height":opts.height
	});


	if(opts.slidePage && slidelength>1){
		$element.append('<span class="showPrev hidden">&lt;</span><span class="showNext hidden">&gt;</span>');
		$element.find(".showPrev").on('click', function() {
			showPrev();
		});
		$element.find(".showNext").on('click', function() {
			showNext();
		});
		$element.hover(function(){
			$(this).find(".showPrev,.showNext").show();
		},function(){
			$(this).find(".showPrev,.showNext").hide();
		})
	}



	var indexNum = true;
	function showPrev() {//上一个
		var thisIndexNum = $element.find(".slideImgs li.active").index();
		if( thisIndexNum == 0){
            indexNum = slidelength -1;
        }else{
            indexNum = thisIndexNum - 1
        }
        showThis(indexNum);
	}

	function showNext() {//下一个
		var thisIndexNum = $element.find(".slideImgs li.active").index();
		if( thisIndexNum == (slidelength -1)){
            indexNum = 0;
        }else{
            indexNum = thisIndexNum + 1
        }
        showThis(indexNum);
	}
		
	function autoPlay() {//自动播放
		if(isAuto == true){
			//进来先清除定时器
			if (slideInterval) {
			   clearInterval(slideInterval);
			}
		    slideInterval = setInterval(function () {
				showNext();
			}, opts.delayTime)
		}
	}
	
	function showThis(num) {//显示指定索引值的图片
		if( !$element.find(".slideImgs").is(':animated') && !$element.find(".slideImgs li").is(':animated')){//正在运动的时候点击无效，防止多次点击

			switch (effect){ 
				case 'horizontal' : //水平滚动
				var thisLeft = opts.width*num;
				$element.find(".slideImgs").animate({
					left:-thisLeft
				});
				$element.find(".slideImgs li").eq(num).addClass('active').siblings().removeClass('active');
				$element.find(".slideNum span").eq(num).addClass('active').siblings().removeClass('active');
				if($element.find(".slideTitles p").eq(num).is(":empty")){
					$element.find(".slideTitles").hide();
				}else{
					$element.find(".slideTitles").show();
					$element.find(".slideTitles p").eq(num).fadeIn().siblings().hide();
				}
				break; 

				case 'vertical' : //垂直滚动
				var thisTop = opts.height*num;
				$element.find(".slideImgs").animate({
					top:-thisTop
				});
				$element.find(".slideImgs li").eq(num).addClass('active').siblings().removeClass('active');
				$element.find(".slideNum span").eq(num).addClass('active').siblings().removeClass('active');
				if($element.find(".slideTitles p").eq(num).is(":empty")){
					$element.find(".slideTitles").hide();
				}else{
					$element.find(".slideTitles").show();
					$element.find(".slideTitles p").eq(num).fadeIn().siblings().hide();
				}
				break; 

				default ://默认 渐隐切换
			 	$element.find(".slideImgs li").eq(num).addClass('active').fadeIn().siblings().hide().removeClass('active');
				$element.find(".slideNum span").eq(num).addClass('active').siblings().removeClass('active');
				if($element.find(".slideTitles p").eq(num).is(":empty")){
					$element.find(".slideTitles").hide();
				}else{
					$element.find(".slideTitles").show();
					$element.find(".slideTitles p").eq(num).fadeIn().siblings().hide();
				}
				break; 
			}
		}
		
	}
	
	if (slideInterval) {
	    clearInterval(slideInterval);
	}
	autoPlay();

};   
              
$.fn.slide.defaults = {        
	width: '100%',        
	height: 200,
	slidePage:true,
	slideNum:true,
	auto:true,
	delayTime: 3000,
	triggerType:'click',
	tabIndex:0,
	effect:'fade'
}