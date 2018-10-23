function initCanvas() {
    c1 = document.getElementById("c1"), w = parseInt($(".ggk_inner").width()), h = parseInt($(".ggk_inner").height()), $("#drawImg").width(w), $("#drawImg").height(h), c1.width = w, c1.height = h, ctx = c1.getContext("2d"), c1.addEventListener("mousemove", eventMove, !1), c1.addEventListener("mousedown", eventDown, !1), c1.addEventListener("mouseup", eventUp, !1), c1.addEventListener("touchstart", eventDown, !1), c1.addEventListener("touchend", eventUp, !1), c1.addEventListener("touchmove", eventMove, !1), ctx.globalCompositeOperation = "source-over", ctx.fillStyle = "#888888", ctx.fillRect(0, 0, c1.clientWidth, c1.clientHeight), ctx.fill(), ctx.font = "Bold 20px Arial", ctx.textAlign = "center";
    var e = document.getElementById("drawImg");
    ctx.drawImage(e, 0, 0), ctx.globalCompositeOperation = "destination-out"
}

function getLeft(e) {
    var i = e.offsetLeft;
    return null != e.offsetParent && (i += getLeft(e.offsetParent)), i
}

function getTop(e) {
    var i = e.offsetTop;
    return null != e.offsetParent && (i += getTop(e.offsetParent)), i
}

function eventDown(e) {
    e.preventDefault(), ismousedown = !0
}

function showNoTimesPanel (t) {
    var a = window;
    var i = {
        name: "more",
        acid: a.acid,
        la: a.la,
        uid:a.uid,
        model: 'awardModel',
        param : a.backParams,
        turn : t || !1,
        curday: a.curday,
    };
    new Layer(i)
}

function eventUp(e) {
    e.preventDefault();
    for (var i = ctx.getImageData(0, 0, c1.width, c1.height), t = 0, a = 3; a < i.data.length; a += 4) 0 == i.data[a] && t++;
    var s = .01 * i.data.length;
    if (t >= s) {
        if (ctx.clearRect(0, 0, c1.clientWidth, c1.clientHeight), isOk = 1, $(".page").scrollTop("0"), $(".page").addClass("fixed"), $(".ggk_ok").show(), console.log(flag,1==flag, awd, null != awd), 1 == flag && null != awd) {
            $(".ggk_hb").show();
            var timer = setTimeout(function () {
                $(".ggk_hb").hide(), $(".popShowPrize").show(), clearTimeout(timer)
            }, 1100)
        } else $(".ggk_hb").hide(), $(".ggk_quan").show();
        var i = window.n;
        i <= 0 ? ($(".ggk_start").off("click"), $(document).on("click", ".ggk_inner", function () {//更多精彩
            showNoTimesPanel();
        }), $(".ggk_start").hide(), $("#counts").html("今日刮奖次数已完,请明天再来!")) : $("#time").html(i)
    }
    ismousedown = !1
}

function eventMove(e) {
    if (e.preventDefault(), ismousedown) {
        e.changedTouches && (e = e.changedTouches[e.changedTouches.length - 1]);
        var i = document.getElementById("c1"), t = getLeft(i), a = getTop(i),
            s = (e.clientX + window.scrollLeft || e.pageX) - t || 0,
            n = (e.clientY + window.scrollTop || e.pageY) - a || 0;
        ctx.beginPath(), ctx.arc(s, n, 1.6 * fontem, 0, 2 * Math.PI, !0), i.style.display = "none", i.offsetHeight, i.style.display = "inherit", ctx.fill()
    }
}

function isweixin() {
    var e = window.navigator.userAgent.toLowerCase();
    return "micromessenger" == e.match(/MicroMessenger/i) ? 1 : 0
}

function browser() {
    var e = {
        versions: function () {
            var e = navigator.userAgent;
            navigator.appVersion;
            return {
                trident: e.indexOf("Trident") > -1,
                presto: e.indexOf("Presto") > -1,
                webKit: e.indexOf("AppleWebKit") > -1,
                gecko: e.indexOf("Gecko") > -1 && e.indexOf("KHTML") == -1,
                mobile: !!e.match(/AppleWebKit.*Mobile.*/),
                ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: e.indexOf("Android") > -1 || e.indexOf("Linux") > -1,
                iPhone: e.indexOf("iPhone") > -1,
                iPad: e.indexOf("iPad") > -1,
                Safari: e.indexOf("Safari") > 0,
                QQ: !!e.match(/(?:MQQBrowser|QQ)/),
                UC: !!e.match(/(?:UCWEB|UCBrowser)/)
            }
        }(), language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    appos = e.versions.ios | e.versions.iPhone | e.versions.iPad ? 2 : e.versions.android ? 1 : 3
}

function getQueryString(e) {
    var i = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"), t = window.location.search.substr(1).match(i);
    return null != t ? unescape(t[2]) : null
}
var w, h, c1, ctx, ismousedown, isOk = 0, backParams = baseJs._getQueryString("back"), re = (JSON.parse(decodeURIComponent(backParams))).rqy, la = baseJs._getQueryString("la"), awardtimes, urlHead = "//n.35kds.com",cont = "/clickad/cjTest/", model = 5, pi = 0, start, init, award, myPrize, curday = ((new Date()).getMonth() + 1) + '' + (new Date()).getDate(),
    islink = !0, isclick = !0, appos, appkey, acid = baseJs._getQueryString("tpid"),  business, uid = baseJs.getWebGl(), flag = !0, awd, count = 0, borderColor, rqy,
    devicei, devicef, awardfontcolor, urllink, ua = isweixin(),
    fontem = parseInt(window.getComputedStyle(document.documentElement, null)["font-size"]);
window.onload = function () {
    _statistics = function() {
        var a = window,
            e = a.urlHead + a.cont,
            i = {
                yxviewid: a.backParams,
                m: a.model,
                _: (+new Date()),
            };
        baseJs._ajax(e, i, "GET", !0, function(a) {})
    }
    init = function () {
        function e() {
            (function (e) {
                var b, r, a = window, z = 8;
                try {
                    b = localStorage.getItem("guagua" + a.acid)
                    r = localStorage.getItem("myPrize")
                } catch (e) {
                    b = baseJs.getCookie("wawa" + a.acid)
                    r = baseJs.getCookie("myPrize")
                }
                b && (b = JSON.parse(b)),(a.myPrize = r ? JSON.parse(r) : {});
                if (b && b[a.curday]) {
                    a.pi = b[a.curday], a.n = z-a.pi;
                }else{
                    a.n = z;
                }
                var i = a.n;
                return $("#time").html(i), i <= 0 ? ($(".ggk_start").off("click"), $(".ggk_start").hide(), void $(".ggk_inner").html("<span>今日刮奖次数已完,请明天再来！</span>"), showNoTimesPanel(1)) : void(parseInt(i) <= 5 && $(".moreAct").addClass("moreFadein"))
            })(), $(".awdlist").swiper({
                slidesPerView: 3.5,
                spaceBetween: 24,
                observer: !0,
                observeParents: !0,
                scrollbar: ".swiper-scrollbar",
                scrollbarHide: !1
            })
        }
        baseJs._setuid(window), la && baseJs.cnzz(la), _statistics(), browser(), $(".ggk_bottom").hide()/*, 1 != appos && $(".bottomTip").hide()*/;

        $(".ggk_start").addClass("start-btn"), $("#drawImg").attr("src", ""), e(), $(document).on("click", ".ggk_start", function () {
            if (!islink) return void $(this).off("click");
            $(".pop-guide").hide(), islink = !1;
            var e = $(this);
            e.children("span").hide(), e.children(".ball-spin-fade-loader").show();
            var t = $("#time").html();
            return t <= 0 ? ($(".ggk_start").off("click"), $(".ggk_start").hide(), void $("#counts").html("今日刮奖次数已完,请明天再来!")) : void start()
        }),$(document).on("click", ".myPrize", function () {//我的奖品
            var a = window, r = {
                name: "time",
                acid: a.acid,
                uid: a.uid,
                re: a.re,
                m: a.model,
                urlHead: a.urlHead,
                cont: '/Clickad/zpClick/?',
                data: a.myPrize
            };
            new Layer(r)
        }), $(document).on("click", "#way", function () {
            $(".page").addClass("fixed"), $(".page-group").addClass("fixed"), $(".activity").show(), $(".rule").show()
        }), $(document).on("click", ".more_header", function () {
            $(".more_main").hasClass("off") ? ($(".more_main").removeClass("off"), $(".collapse").html("&#xe623;")) : ($(".more_main").addClass("off"), $(".collapse").html("&#xe61a;"))
        }), $(document).on("click", ".close", function () {
            $(".page").removeClass("fixed"), $(".page-group").removeClass("fixed"), $(".activity").hide(), $(".rule").hide()
        }), $(".activity").bind("click", function (e) {
            var i = $(e.target);
            0 == i.closest(".rule").length && ($(".page").removeClass("fixed"), $(".page-group").removeClass("fixed"), $(".activity").hide(), $(".rule").hide())
        });
        var a = $(".myPrize").offset(), s = $(".myPrize").width() / 2, n = $(".myPrize").height() / 2, o = a.left + s,
            d = a.top + n;
        $(window).scroll(function () {
            d = a.top + n - $("body").scrollTop()
        }), $(document).off("click", ".closetc").on("click", ".closetc", function (e) {
            if (isclick = !0, $(".guideTitle").hide(), $(".titles").show(), null != awd) {
                var i = $(".coupon-image").children("img"), t = $('<img class="u-flyer" src="' + i.attr("src") + '">'),
                    a = i.offset(), s = a.left + i.width() / 2, n = a.top + i.height() / 2;
                t.fly({
                    start: {left: s, top: n}, end: {left: o, top: d, width: 0, height: 0}, onEnd: function () {
                        this.destory()
                    }
                })
            }
            $(".popShowPrize").hide(), $(".ggk_top").show(), $(".ggk_bottom").hide(), $(".canvas").hide(), $(".page").removeClass("fixed"), $(".ggk_ok").hide();
            var r = $("#counts").html();
            var l = $("#time").html();
            parseInt(l) <= 5 && $(".moreAct").addClass("moreFadein")
        })
    }, start = function () {
        function e(e) {
            //我的奖品
            var a = window, k = baseJs.genHash(e.data.url);
            var prize = {};
            prize.img = e.data.img, prize.title = e.data.title, prize.url = e.data.url, prize.rqm = e.data.rqm;
            a.myPrize[k] = prize;
            try {
                localStorage.setItem("myPrize", JSON.stringify(a.myPrize))
            } catch (a) {
                baseJs.setCookie("myPrize", JSON.stringify(a.myPrize))
            }

            var i = e.data.img, t = e.data.title, a = e.data.awardmsg, s = '立即领取';
            urllink = e.data.url, rqy = urlHead + '/Clickad/zpClick/?' + re + e.data.rqm + '&userckid=' + uid;
            var n = e.data.awardid, o = e.data.awardtype,
                d = "?x-oss-process=image/resize,m_fill,w_532,h_266,limit_0/auto-orient,0/quality,q_90", r = "";
            r += '<div class="ggk_open">', r += '<img src="' + i + d + '" alt="" />', r += "</div>", r += "<span>" + t + "</span>", $(".ggk_end").append(r), $(".ct").html(t), $(".prize_img img").attr("src", i + d), $(".prizecontent").html(t), $(".coupon-image img").attr("src", i + d), $(".coupon-detail").html(a), $(".coupon-date").html(""), $(".goto").html(s), $(".quan_wd").attr("data-id", n), $(".quan_wd").attr("data-type", o)
        }
        var a = window,
            o = a.urlHead + "/clickad/zp";
        a.pi++;
        a.n--;
        var pi = {}, i = {
            yxviewid: a.backParams,
            pi: a.pi,
            userckid: a.uid,
            keyindex: '',
            m: a.model,
        };
        pi[this.curday] = a.pi;
        try {
            localStorage.setItem("guagua" + a.acid, JSON.stringify(pi))
        } catch (e) {
            baseJs.setCookie("guagua" + a.acid, JSON.stringify(pi))
        }
        $(".ggk_end").html(""), $(".prize_img img").attr("src", ""),
        baseJs._ajax(o, i, "GET", !0, function(i) {
            function t(e) {
                var i = e % 4;
                $(".word").removeClass("up"), $(".word").eq(i).addClass("up"), c = setTimeout(function () {
                    e++, e > 3 && (e = 0), t(e)
                }, 400)
            }
            //i = {status_code:'1',data:{jid:1156}};
            flag = i.status_code;
            if (flag == '1') {
                var n = i.data.jid != 1156 ? i.data.jid : null;
                awd = n;
                var d = document.getElementsByClassName("guideTitle")[0];
                if (d.addEventListener("touchstart", function () {
                    $(".titles").hide()
                }, !1), null == n) {
                    var r = "";
                    r += '<div class="ggk_open">', r += '<img src="./images/cry.png" alt="" />', r += "</div>", r += '<span style="font-size:0.7rem;margin-top:0.2rem;color:#999999">很抱歉，您没中奖哦~</span>', $(".ggk_end").html(""), $(".ggk_end").append(r), $(".title").html("很抱歉，您没中奖哦~"), $(".quan_main img").attr("src", "./images/cry.png");
                    var c, l = 0;
                    return isclick = !0, t(l), $(".guideTitle").show(), $(".canvas").show(), initCanvas(), $(".ggk_top").hide(), $(".ggk_bottom").show(), $(".ball-spin-fade-loader").hide(), $(".ggk_start span").show(), islink = !0, $(".again").html("再刮一次试试~"), void $(document).on("click", ".again,.pull-right", function () {
                        $(".guideTitle").hide(), $(".titles").show(), $(".ggk_quan").hide(), $(".ggk_top").show(), $(".ggk_bottom").hide(), $(".canvas").hide(), $(".page").removeClass("fixed"), $(".ggk_ok").hide()
                    })
                }
                e(i);
                var c, l = 0;
                t(l), $(".guideTitle").show(), $(".canvas").show(), initCanvas(), $(".ggk_top").hide(), $(".ggk_bottom").show(), $(".ball-spin-fade-loader").hide(), $(".ggk_start span").show(), islink = !0
            }/* else {
                var r = "";
                r += '<div class="ggk_open">', r += '<img src="https://buyimg.bianxianmao.com/dist/awardModel/images/cry.png" alt="" />', r += "</div>", r += '<span style="font-size:0.7rem;margin-top:0.2rem;color:#999999">很抱歉，您没中奖哦~</span>', $(".ggk_end").html(""), $(".ggk_end").append(r), $(".title").html("很抱歉，您没中奖哦~"), $(".quan_main img").attr("src", "https://buyimg.bianxianmao.com/dist/awardModel/images/cry.png"), $(".again").html("再刮一次试试~"), $(".canvas").show(), initCanvas(), $(".ggk_top").hide(), $(".ggk_bottom").show(), $(".ball-spin-fade-loader").hide(), $(".ggk_start span").show(), islink = !0, $(document).on("click", ".again,.pull-right", function () {
                    $(".ggk_quan").hide(), $(".ggk_top").show(), $(".ggk_bottom").hide(), $(".canvas").hide(), $(".page").removeClass("fixed"), $(".ggk_ok").hide()
                })
            }*/
        }, 'jsonp'), isclick = !0, $(document).off("click", ".modal-body").on("click", ".modal-body", function () {
            if (isclick) {
                $(".goto").html("页面加载中~"), isclick = !1;
                try {
                    var a = window;
                    setTimeout(function () {
                        isclick = !0, $(".guideTitle").hide(), $(".titles").show(), $(".popShowPrize").hide(), $(".ggk_top").show(), $(".ggk_bottom").hide(), $(".canvas").hide(), $(".page").removeClass("fixed"), $(".ggk_ok").hide()
                    }, 800), baseJs._ajax(a.rqy, {m: a.model, _:(+new Date())}, "GET", !0, function(s) {}), window.open(a.urllink);
                } catch (e) {
                    $(".goto a").attr("href", urllink)
                }
            }
        })
    }, init()
}, $(".page").scroll(function () {
    window.scrollLeft = $(".page").scrollLeft(), window.scrollTop = $(".page").scrollTop()
});