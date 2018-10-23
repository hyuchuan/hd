function Dialog(s, a) {
    this.id = s.id, this.uid = s.uid, this.cardbgId = s.cardbgId, this.acid = s.acid, this.awardid = s.awardid, this.title = s.title, this.ticket = s.ticket, this.btntext = s.btntext, this.awardlink = s.awardlink, this.qrcode = s.qrcode, this.account = s.account, this.isclick = !0, this.param = {_:(+new Date())}, this.ele = a.ele, this.cardbg = "", this.clicked = !1, this.callback = a.callback, this.rqy = s.rqy, this.dialog_init()
}
Dialog.prototype = {
    constructor: Dialog,
    dialog_init: function() {
        this.detailbg = "/dist/dialogModel/images/redbag.png";
        this.isweixin = this.is_weixin();
        switch (this.cardbgId) {
            case 0:
                this.cardbg = "/dist/dialogModel/images/cardbg_turntable.png";
                break;
            case 1:
                this.cardbg = "/dist/dialogModel/images/cardbg_goldegg.png";
                break;
            case 2:
                this.cardbg = "/dist/dialogModel/images/cardbg_universal.png";
                break;
            case 3:
                this.cardbg = "/dist/dialogModel/images/cardbg_pickchest.png";
                break;
            case 4:
                this.cardbg = "/dist/dialogModel/images/cardbg_pickchest.png";
                break;
        }
        switch (this.id) {
            case 5:
                this.dialog_5();
                break;
            case 6:
                //this.openWxBtnDisplay = 'display:none';
                if(this.isweixin){
                    this.wxdesc = '请长按左边二维码识别后关注领取';
                }else{
                    this.wxdesc = '请长按左边二维码保存图片后在微信识别';
                }
                this.detailbg = "/dist/dialogModel/images/redbaq.png";
                this.dialog_6();
                break;
            default:
                this.dialog_5()
        }
        this.dialog_close()
    },
    is_weixin: function () {
        var ua = navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == "micromessenger" ? true : false
    },
    dialog_close: function() {
        $(document).off("click", ".modal-body").on("click", ".modal-body", function() {
			if(!this.awardlink) return;
            if ($(".goto").html("页面正在加载~"), this.isclick) {
                this.isclick = !1;
                this.param.tag = 1, MtaH5.clickStat("receive",{'acid':this.acid+'','awardid':this.awardid+''});
                baseJs._ajax(this.rqy, this.param, "GET", !0, function(s) {}), $(".popShowPrize").remove(), window.open(this.awardlink);
            }
        }.bind(this)), $(document).on("click", this.ele, function(s) {
            if (this.ele && (s.stopPropagation(), this.callback && "function" == typeof this.callback)) {
                this.callback();
                var a = $(".showPrize-dialog").offset(),
                    i = a.left + a.width / 2 + "px",
                    n = a.top + a.height / 2 + "px";
                $(document).find(".showPrize-dialog,.card-sunshine").animate({
                    transform: "translate3d(" + i + ",-" + n + ",0) scale(0.1)",
                    "-webkit-transform": "translate3d(" + i + ",-" + n + ",0) scale(0.1)"
                }, 300, "linear", function() {
                    $(".popShowPrize").remove()
                })
            }
        }.bind(this))
    },
    dialog_5: function() {
        var s = '<div class="popShowPrize" id="dialog5"><div class="card-sunshine"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="card-bg" style="background-image: url(' + this.cardbg + ')"><img src="' + this.ticket + '" alt=""/></div><div class="red-bg"></div><div class="detail" style="background-image: url(' + this.detailbg + ')"><div class="topic">' + this.title + '</div><div class="goto">' + this.btntext + '</div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div><span class="close-btn closetc iconfont">&#xe616;</span></div>';
        $("body").append(s)
    },
    dialog_6: function() {
        var t = this, s = '<div class="popShowPrize" id="dialog5"><div class="card-sunshine"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="card-bg" style="background-image: url(' + this.cardbg + ')"><img src="' + this.ticket + '" alt=""/></div><div class="red-bg"></div><div class="detail" style="background-image: url(' + this.detailbg + ')"><div class="qrcode"><div class="qrcode-left"><img id="qrcode" src="'+this.qrcode+'" class="" alt=""></div><div class="qrcode-right">' + this.wxdesc + '</div></div><div class="qrcode-bottom flex-b flex-v"><span>微信号：' + this.account + '</span><div><button type="button" id="copyBtn" text="'+this.account+'">复制</button><button id="openWxBtn" type="button">打开微信</button></div></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div><span class="close-btn closetc iconfont">&#xe616;</span></div>';
        $("body").append(s);
        (function () {
            var qrcode = document.querySelector('#qrcode');
            if(!qrcode) {
                setTimeout(arguments.callee,50);
                return;
            }
            baseJs.longpress(qrcode, function () {
                t.param.tag = 2;
                !t.isPress && (t.isPress = !0, MtaH5.clickStat("press", {'acid': t.acid+'','awardid': t.awardid+''}), baseJs._ajax(t.rqy, t.param, "GET", !0, function(s) {}));
            });
        })();
        (function () {
            var copyBtn = document.querySelector('#copyBtn');
            if(!copyBtn) {
                setTimeout(arguments.callee,50);
                return;
            }
            var clcupv = new window.clcupv();
            clcupv.init(copyBtn,function (a) {
                t.param.tag = 3;
                !t.isCopy && (t.isCopy = !0, MtaH5.clickStat("copy", {'acid': t.acid+'','awardid': t.awardid+''}), baseJs._ajax(t.rqy, t.param, "GET", !0, function(s) {}));
                if(a == '1'){
                    baseJs.myAlert('复制成功!', 1000);
                }else{
                    baseJs.myAlert('复制失败,请手动复制!', 1000);
                }
            });
        })();
        (function () {
            var openWxBtn = document.querySelector('#openWxBtn');
            if(!openWxBtn) {
                setTimeout(arguments.callee,50);
                return;
            }
            $(document).on("click", '#openWxBtn', function(s) {
                t.param.tag = 4;
                !t.isWake && (t.isWake = !0, MtaH5.clickStat("wakeup", {'acid': t.acid+'','awardid': t.awardid+''}), baseJs._ajax(t.rqy, t.param, "GET", !0, function(s) {}));
                setTimeout(function () {
                    window.location.href = 'weixin://';
                }, 300);
            });
        })();
    },
};