define(function(require,exports,module){
	var section = require("../view/section.html");
	var _section = _.template(section);
	var home = {
		init:function(){
			this.runloop();
			this.setInterval();
			this.slide();
			this.events();
			this.ajax();
		},
		setInterval:function(){
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
		},
		runloop:function(){
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
			});
		},
		slide:function(){
			var slide = $('.slide');
			slide.slide({titCell:".hd div",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,vis:5,});
		},
		render:function(){
			var that = this;
			$('#section').html(_section({data:that.res.array}))
		},
		events:function(){
			var body = $('body');
			var service  = $('.service');
			
			$(window).scroll(function(){
				if($(document).scrollTop()>7000){
					console.log($(document).scrollTop());
					service.css({backgroundPosition:'780px -7px'});
				}
				if($(document).scrollTop()<7000){
					service.css({backgroundPosition:'640px -7px'})
				}
				if($(document).scrollTop()>600){
					$('.seachFix').fadeIn();
					$('.fix-up').fadeIn();
				}
				else{
					$('.seachFix').fadeOut();
					$('.fix-up').fadeOut();
				}
			});
		},
		ajax:function(){
			var that = this;
			$.ajax({
				url:"../section.json",
				type:'get',
				success:function(res){
					that.res = res;
					console.log(res);
					that.render();
				}
			})
		}
	};
	module.exports = home;
})