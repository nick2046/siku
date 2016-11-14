$(document).ready(function(){
	

	var li = $('.imgBox li');
	var list = $('.list li');
	var showIndex = 0;
	var timer = setInterval(function(){
		showIndex++;
		if (showIndex >= li.length) {
			showIndex = 0;
		}
		li.eq(showIndex).fadeIn().siblings().fadeOut();
		list.eq(showIndex).addClass('active').siblings().removeClass('active');
	},2000);

	list.hover(function(){
		clearInterval(timer);
		showIndex = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		li.eq(showIndex).fadeIn().siblings().fadeOut();
	},function(){
		timer = setInterval(function(){
		showIndex++;
		if (showIndex >= li.length) {
			showIndex = 0;
		}
		li.eq(showIndex).fadeIn().siblings().fadeOut();
		list.eq(showIndex).addClass('active').siblings().removeClass('active');
	},2000);
	})

	//日期定时器
	var time = $('.time');
	var eday = $('.day',time);
	var ehour = $('.hour',time);
	var eminute = $('.minute',time);
	var esecond = $('.second',time);

	// var date = +new Date("2016-11-09 10:00:00");
	var date = +new Date(time.attr('data-time'));
	var newDate = setInterval(function(){
		var newTime = +new Date();
		// 获取转换后的秒数
		var nTime = parseInt((date - newTime)/1000);
		
		//毫秒换算 1秒=1000毫秒
		var second = parseInt(nTime%60);
		var minutes = parseInt((nTime/60)%60);
		var hour = parseInt((nTime/3600)%24);
		var day = parseInt(nTime/3600/24);

		eday.text(formatString(day));
		ehour.text(formatString(hour));
		eminute.text(formatString(minutes));
		esecond.text(formatString(second));
	},1000);
	
	function formatString( inputStr ){
		if (parseInt(inputStr) < 10) {
			return '0' + inputStr;
		}
            return inputStr;
	};

	var slide = $('.slide');

	slide.slide({titCell:".hd div",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,vis:6,});

	// 地图动画
	var body = $('body');
	var service  = $('.service');
	
	$(window).scroll(function(){
		if($(document).scrollTop()>2800){
			service.css({backgroundPosition:'768px -7px'})
		}
		if($(document).scrollTop()>600){
			$('.seachFix').fadeIn();
		}
		else{
		service.css({backgroundPosition:'640px -7px'})
			$('.seachFix').fadeOut();
		}
	});
	
})