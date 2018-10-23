function FloatModel(param, callback) {
	this.element = param.el;
	this.floatlink = param.floatlink;
	this.business = param.business;
	this.appkey = param.appkey;
	this.acid = param.acid;
	this.appos = param.appos;
	this.uid = param.uid;
	this.di = param.di;
	this.df = param.df;
	this.ua = param.ua;
	this.floatId = param.floatId;
	this.urlHead = "https://buy.bianxianmao.com";
	this.cont = "/award/countInfo";
	this.render(callback);
};
FloatModel.prototype = {
	constructor: FloatModel,
	render: function(callback) {
        var self = this;
        var reUrl = document.referrer;
        if(reUrl) {
            if(reUrl.indexOf("home") > -1 || reUrl.indexOf("room") > -1) {
                return;
            };
        };
		switch(self.floatId) {
			case "float-1":
				self.floatCat();
				break;
			case "float-2":
				self.floatHb();
				break;
			case "float-3":
				self.floatHorse();
				break;
            case "float-4":
                self.floatRedRain();
                break;
            case "float-5":
                self.floatSuperMarket();
                break;
			default:
				self.floatHb();
				break;
		};
		self.bindEvent(callback);
	},
	bindEvent: function(callback) {
		var self = this;
		$(document).on("click", ".floatclick", function() {
			if(typeof(callback) == 'function') {
				callback();
			};
			/******更多活动参与*****/
			var URL = self.urlHead + self.cont;
			var data = {
				"activityid": self.acid,
				"appos": self.appos,
				"appkey": self.appkey,
				"business": self.business,
				"uid": self.uid,
				"i": self.di,
				"f": self.df,
				"ua": self.ua,
				"modelname": "更多活动点击",
				"modeltype": 11
			}
			baseJs._ajax(URL, data, "POST", true, function(res) {
				console.log("更多活动点击成功");
			});
			window.location.href = self.floatlink + '?business=' + self.business + '&activityid=' + self.acid + '&appkey=' + self.appkey + '&uid=' + self.uid + '&ua=' + self.ua + '&i=' + self.di + '&f=' + self.df + '&skip=skip';
		});
	},
	//天猫浮标
	floatCat: function() {
		var float = '',self = this;
		float += '<div id="floatModel">'
		float += '<div class="flycoins">'
		float += '<div class="coin flycoin1"></div>';
		float += '<div class="coin flycoin2"></div>';
		float += '<div class="coin flycoin3"></div>';
		float += '<div class="coin flycoin4"></div>';
		float += '<div class="coin flycoin5"></div>';
		float += '<div class="coin flycoin6"></div>';
		float += '<div class="coin flycoin7"></div>';
		float += '<div class="coin flycoin8"></div>';
		float += '</div>';
		float += '<div class="float floatclick">';
		float += '<a href="javascript:;">';
		float += '<div class="coins">';
		float += '<div class="coin coin1"></div>';
		float += '<div class="coin coin2"></div>';
		float += '</div>';
		float += '<div class="eyes eyesl">';
		float += '<div class="eyes-close"></div>';
		float += '<div class="eyes-inner"></div>';
		float += '</div>';
		float += '<div class="eyes eyesr">';
		float += '<div class="eyes-close"></div>';
		float += '<div class="eyes-inner"></div>';
		float += '</div>';
		float += '<div class="cathb"></div>';
		float += '<div class="catfigure"></div>';
		float += "</a>";
		float += ' </div>';
		float += '</div>';
		$(this.element).append(float);
		var coinTimer1, coinTimer2, coinTimer3;
		cionMove();
		function cionMove() {
			$(".coin1").addClass("coinMove");
			$(".coin2").removeClass("coinMove");
			$(".cathb").removeClass("skip-in-out");
			$(".cathb").addClass("skip-in-out");
			$(".eyes-close").addClass("closeeyes");
			coinTimer1 = setTimeout(function() {
				clearTimeout(coinTimer2);
				$(".eyes-close").removeClass("closeeyes");
				$(".cathb").removeClass("skip-in-out");
				$(".cathb").addClass("skip-in-out");
				$(".coin1").removeClass("coinMove");
				$(".coin2").addClass("coinMove");
				coinTimer2 = setTimeout(function() {
					clearTimeout(coinTimer1);
					cionMove();
				}, 800);
			}, 400);
		};
	},
	//从天而降红包
	floatHb: function() {
		var float = '',self = this;
		float += '<div class="floatPacket-main floatclick">';
		float += '<a href="javascript:;">';
		float += '<div class="ren"></div>';
		float += '<div class="qi"></div>';
		float += '<div class="fu"></div>';
		float += '<div class="li"></div>';
		float += '<div class="gold1"></div>';
		float += '<div class="gold2"></div>';
		float += '<div class="gold3"></div>';
		float += '<div class="gold4"></div>';
		float += "</a>";
		float += '</div>';
		$(this.element).html(float);
	},
	//旋转木马
	floatHorse: function() {
		var float = '',self = this;
		float += '<div class="horse floatclick a1"><a href="javascript:;"></a></div>';
		$(this.element).append(float);
		$('.horse').show();
		setTimeout(function() {
			$('.horse').css({
				"background-image": "url(/dist/floatModel/float/images/floatleft.gif)"
			})
			$('.horse').removeClass('a1').addClass('a2');
		}, 1000)
	},
	//双11红包雨
	floatRedRain:function (){
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r != null) return unescape(r[2]);
            return null;
        }
        var body = document.getElementsByTagName('body')[0];//document.getElementsByTagName('body')[0]
        var timer = null;
        var redPack;
        function addCssByStyle(cssString){
            var style = document.createElement("style");
            style.setAttribute("type", "text/css");

            var cssText = document.createTextNode(cssString);
            style.appendChild(cssText);

            var heads = document.getElementsByTagName("head");
            if(heads.length)
                heads[0].appendChild(style);
            else{
                document.documentElement.appendChild(style);
            }
        }
        addCssByStyle('* {margin: 0;padding: 0;}html, body {position: relative;width: 100%;height: 100%;}' +
            '.redPack{position: absolute;top:0rem;z-index: 2000;animation:redPackMove 3s ease-in forwards; -webkit-animation:redPackMove 3s ease-in forwards;}'+
            '        @keyframes redPackMove {0% {top:3rem;}100% {top:23rem;}}@-webkit-keyframes redPackMove {0% {top:3rem;}100% {top:23rem;}}'+
            '.planes {width:100%;height:25rem;position: absolute;left:0;top:4rem;clear: both;}'+
            '.airplane {position: fixed; left:0;top:0;width:12.1rem;height:2.8rem;background-repeat: no-repeat;background-size: 100% 100%;transform:translate3d(100%,0,0);-webkit-transform:translate3d(100%,0,0); z-index:2000}'+
            '.airplane > img {height:100%;display: block;}.air {width:5.45rem;}.flag{width:6.65rem;}'+'.flag {position: absolute;right: 7px;top: 0;}')
        $(function (){
            var html = '',self = this;
            html += '<div class="airplane floatclick">' +
				'<img src="https://buyimg.bianxianmao.com/dist/floatModel/float/images/airplane1.gif" alt="双11抢红包" class="air"/>' +
				'<img src="https://buyimg.bianxianmao.com/dist/floatModel/float/images/flag.gif" alt="双11抢红包" class="flag"/></div>' +
				'<div class="planes"></div>';
            console.log('times')
            $('.box').html(html)
            $('.airplane').animate({
                "transform":"translate3d("+3.25+"rem,0,0)",
                "-webkit-transform":"translate3d("+3.25+"rem,0,0)",
            },2000,'linear',function (){
                function randomFN(min, max) {
                    return parseInt(Math.random() * (max - min) + min);
                }
                function Pack() {
                    redPack = document.createElement('img');
                    redPack.setAttribute("class", "redPack");
                    redPack.src="https://buyimg.bianxianmao.com/dist/floatModel/float/images/pack.png";
                    redPack.style.width = randomFN(40, 100)/40 + 'rem';
                    redPack.style.height = redPack.style.width;
                    redPack.style.left = randomFN(40, 400)/40 + 'rem';
                    redPack.style.transform = "rotate(" + randomFN(-30, 90) + "deg) translate("+randomFN(0, 375)/40+"rem,0)";
                    body.appendChild(redPack)
                    timer = setTimeout(function () {
                        Pack()
                    },200)
                }
                Pack()
                // $('.planes').on('click',function (){
                //     window.location.href = "https://buyimg.bianxianmao.com/dist/roomModel/shopday/shoppingday.html?business="+
					// 	self.business + '&activityid=' + self.acid + '&appkey=' + self.appkey + '&uid=' + self.uid + '&ua=' + self.ua + '&i=' + self.di + '&f=' + self.df + '&skip=skip';
                //
                // })
            })
        })
        setTimeout(function (){
            clearTimeout(timer)
            $(".airplane > img,.redPack,.planes").remove()
            if(!($(".redPack,.planes").length)) {
                $('.airplane').css({
                    'width':3+'rem',
                    'height':3+'rem',
                    'background-image':'url(https://buyimg.bianxianmao.com/dist/floatModel/float/images/float1.gif)'
                })
                var i = 15 + "rem",n = 20 + "rem";
                $('.airplane').animate({
                    transform: "translate3d(" + i + "," + n + ",0)",
                    "-webkit-transform": "translate3d(" + i + "," + n + ",0)"
                }, 2000, "linear", function() {
                    $(this).on('click',function (){
                        window.location.href = "https://buyimg.bianxianmao.com/dist/roomModel/shopday/shoppingday.html?business=" +
							self.business + '&activityid=' +
							self.acid + '&appkey=' +
							self.appkey + '&uid=' +
							self.uid + '&ua=' +
							self.ua + '&i=' +
							self.di + '&f=' +
							self.df + '&skip=skip';
                    })
                })
            }

        },5000)
	},
	//超市购物浮标
	floatSuperMarket:function (){
        var body = document.getElementsByTagName('body')[0];//document.getElementsByTagName('body')[0]
        function addCssByStyle(cssString){
            var style = document.createElement("style");
            style.setAttribute("type", "text/css");

            var cssText = document.createTextNode(cssString);
            style.appendChild(cssText);

            var heads = document.getElementsByTagName("head");
            if(heads.length)
                heads[0].appendChild(style);
            else{
                document.documentElement.appendChild(style);
            }
        }
		addCssByStyle('.market {position:absolute;width:4.825rem;height:4rem;background-image:url(https://buyimg.bianxianmao.com/dist/floatModel/float/images/3.gif);background-repeat: no-repeat;background-size: 100% 100%;' +
			'transform:translate3d(18.75rem,0,0);-webkit-transform:translate3d(18.75rem,0,0);z-index:20000000;}'+'.market > img{height:100%;display: block;}.shopping{width:6.025rem;position: absolute;' +
		'right: 0;top: 18rem;display: none; z-index:2001;}.person{width:2.025rem;height: 4rem;background-image:url(https://buyimg.bianxianmao.com/dist/floatModel/float/images/person.gif);background-repeat: no-repeat;background-size: 100% 100%;}'+
		'.car {width:4rem;height: 4rem;top:4rem;background-image:url(https://buyimg.bianxianmao.com/dist/floatModel/float/images/car.gif);background-repeat: no-repeat;background-size: 100% 100%;position: absolute;right: 1rem;}')
		$(function (){
				var html = '',self = this;
				html += '<div class="market floatclick"></div>' +
					'<div class="shopping floatclick">' +
					'<div class="person floatclick"></div>' +
					'<div class="car floatclick"></div></div>';
				$('.box').html(html)
				$('.market').animate({
					"transform":"translate3d("+3.25+"rem,0,0)",
					"-webkit-transform":"translate3d("+3.25+"rem,0,0)",
				},2000,'linear',function (){
					$('.market').css({
						'background-image':'url(https://buyimg.bianxianmao.com/dist/floatModel/float/images/2.gif)'
					})
					var i = 13.6 + "rem",n = 18 + "rem";
					$('.market').animate({
						transform: "translate3d(" + i + "," + n + ",0)",
						"-webkit-transform": "translate3d(" + i + "," + n + ",0)"
					}, 2000, "linear", function() {
						$('.market').hide();
						$('.shopping').show();
						$('.car').animate({
							'transform': 'translate(0,2rem)',
							'-webkit-transform': 'translate(0,2rem)'
						},'2000','ease-in',function (){
							$('.person').animate({
								'transform': 'translate(6rem,0)',
								'-webkit-transform': 'translate(6rem,0)'
							},2000,'ease-in',function (){
                                $(this).remove();
							})
						})
					})
				})
			})
	}
};

function requireFloat(param, callback) {
	if(callback) {
		return new FloatModel(param, callback);
	} else {
		return new FloatModel(param)
	}
};
