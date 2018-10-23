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

function eventUp(e) {
    e.preventDefault();
    for (var i = ctx.getImageData(0, 0, c1.width, c1.height), t = 0, a = 3; a < i.data.length; a += 4) 0 == i.data[a] && t++;
    var s = .01 * i.data.length;
    if (t >= s) {
        if (ctx.clearRect(0, 0, c1.clientWidth, c1.clientHeight), isOk = 1, $(".page").scrollTop("0"), $(".page").addClass("fixed"), $(".ggk_ok").show(), 1 == flag && null != awd) {
            $(".ggk_hb").show();
            var n = setTimeout(function () {
                $(".ggk_hb").hide(), $(".popShowPrize").show(), clearTimeout(n)
            }, 1100)
        } else $(".ggk_hb").hide(), $(".ggk_quan").show();
        var o = "/award/subtracttimes", d = sessionStorage.getItem("inputId");
        $.ajax({
            type: "post",
            url: urlHead + o,
            async: !0,
            data: {awardorderid: d, uid: uid, appkey: appkey, business: business, activityid: activityid},
            success: function (e) {
                var i = e.data, t = sessionStorage.getItem("awardtype"), a = sessionStorage.getItem("awardid"),
                    s = sessionStorage.getItem("appkey");
                i <= 0 ? ($(".ggk_start").off("click"), $(".ggk_start").hide(), $("#counts").html("今日刮奖次数已完,请明天再来!")) : $("#time").html(i), null != awd && $.ajax({
                    type: "post",
                    url: urlHead + "/award/countInfo",
                    async: !0,
                    data: {
                        preid: a,
                        awardtype: t,
                        activityid: activityid,
                        appos: appos,
                        appkey: s,
                        business: business,
                        i: devicei,
                        f: devicef,
                        ua: ua,
                        uid: uid,
                        modelname: "券曝光",
                        modeltype: 6
                    },
                    success: function (e) {
                        console.log("券曝光")
                    }
                })
            }
        })
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

var w, h, c1, ctx, ismousedown, isOk = 0, awardtimes, urlHead = "https://buy.bianxianmao.com", start, init, award,
    activityid, islink = !0, isclick = !0, appos, appkey, acid, business, uid, flag = !0, awd, count = 0, borderColor,
    devicei, devicef, awardfontcolor, urllink, ua = isweixin(),
    fontem = parseInt(window.getComputedStyle(document.documentElement, null)["font-size"]);
window.onload = function () {
    init = function () {
        function e() {
            $.ajax({
                type: "post",
                url: urlHead + "/award/activityTimesInfo",
                data: {activityid: activityid, appkey: appkey, uid: uid, business: business},
                async: !0,
                success: function (e) {
                    var i = e.data;
                    return $("#time").html(i), i <= 0 ? ($(".ggk_start").off("click"), $(".ggk_start").hide(), void $(".ggk_inner").html("<span>今日刮奖次数已完,请明天再来！</span>")) : void(parseInt(i) <= 5 && $(".moreAct").addClass("moreFadein"))
                }
            }), $(".awdlist").swiper({
                slidesPerView: 3.5,
                spaceBetween: 24,
                observer: !0,
                observeParents: !0,
                scrollbar: ".swiper-scrollbar",
                scrollbarHide: !1
            })
        }

        browser(), $(".ggk_bottom").hide(), appkey = getQueryString("appkey"), business = getQueryString("business"), activityid = getQueryString("activityid"), devicei = getQueryString("i") || "__IMEI__", devicef = getQueryString("f") || "__IDFA__", sessionStorage.setItem("firstInid", activityid);
        var i = document.referrer;
        if ((i.indexOf("home") > -1 || i.indexOf("room") > -1) && $(".moreAct").hide(), "d402b74aa1b741329991a4998b25c6e0" != appkey && 1 != appos || $(".bottomTip").hide(), "73d2262538d94a43a949ed8bdd255e7d" == appkey && ($(".myPrize ").hide(), $(".moreAct").hide()), acid = getQueryString("activityid"), uid = getQueryString("uid"), sessionStorage.setItem("appkey", appkey), sessionStorage.setItem("business", business), "7eeef308b87646c5a65ce81506bb0c08" == appkey || "aae233964f7d4f589d6a74f430fba620" == appkey && ("money-35" == business || "money-24" == business || "money-34" == business || "money-6" == business || "money-7" == business)) {
            var t = '<div class="addTip" style="font-size:12px;color: #ffffff;text-align: center;padding-bottom: 0.5rem">本活动与平安好医生无关，客服电话 400-630-5185</div>';
            $(t).insertAfter("section")
        }
        if ("6798cf57eac1408994cb55ec11ffe785" == appkey && "12278" == activityid && ("money-13" == business || "money-14" == business || "money-15" == business || "money-16" == business)) {
            var t = '<div class="addTip" style="font-size:12px;color: #ffffff;text-align: center;padding-bottom: 0.5rem">杭州微财网络科技有限公司   浙ICP备1603822</div>';
            $(t).insertAfter("section")
        }
        if ("1d37d224127f4f1a836e221606dea4ff" == appkey) {
            var t = '<div class="addTip" style="font-size:12px;color: #ffffff;text-align: center;padding-bottom: 0.5rem">奖品与活动均与wifi伴侣无关</div>';
            $(t).insertAfter("section")
        }
        if ("aae233964f7d4f589d6a74f430fba620" == appkey && ("money-64" == business || "money-65" == business || "money-66" == business || "money-67" == business)) {
            var t = '<div class="addTip" style="font-size:12px;color: #ffffff;text-align: center;padding-bottom: 0.5rem">杭州微财网络科技有限公司        浙ICP备 16038222</div>';
            $("#ggk_award").append(t)
        }
        "12278" != activityid && "12283" != activityid && "12291" != activityid && "12290" != activityid && "12292" != activityid && "12216" != activityid && "12306" != activityid || $(".ggk_start").addClass("start-btn"), "73d2262538d94a43a949ed8bdd255e7d" != appkey && "1" != ua || $("#drawImg").attr("src", ""), e(), $(document).on("click", ".ggk_start", function () {
            if (!islink) return void $(this).off("click");
            $(".pop-guide").hide(), islink = !1;
            var e = $(this);
            e.children("span").hide(), e.children(".ball-spin-fade-loader").show();
            var i = sessionStorage.getItem("appkey");
            $.ajax({
                type: "post",
                url: urlHead + "/award/countInfo",
                async: !0,
                data: {
                    activityid: activityid,
                    appos: appos,
                    appkey: i,
                    uid: uid,
                    i: devicei,
                    f: devicef,
                    ua: ua,
                    modelname: "活动参与",
                    business: business,
                    modeltype: 4
                },
                success: function (e) {
                    console.log("活动参与")
                }
            });
            var t = $("#time").html();
            return t <= 0 ? ($(".ggk_start").off("click"), $(".ggk_start").hide(), void $("#counts").html("今日刮奖次数已完,请明天再来!")) : void start()
        }), $.ajax({
            type: "post",
            url: urlHead + "/award/countInfo",
            data: {
                activityid: activityid,
                appos: appos,
                appkey: appkey,
                business: business,
                i: devicei,
                f: devicef,
                uid: uid,
                ua: ua,
                modelname: "首页",
                modeltype: 3
            },
            async: !0,
            success: function (e) {
                console.log("首页曝光")
            }
        }), "73d2262538d94a43a949ed8bdd255e7d" == appkey && "9" == acid && $(".myPrize").hide(), $(document).on("click", ".myPrize", function () {
            $(".myPrize").off("click"), $(".myPrize").attr("href", "https://buy.bianxianmao.com/common/prizeModel/prize.html?appkey=" + appkey + "&activityid=" + acid + "&business=" + business + "&uid=" + uid + "&i=" + devicei + "&f=" + devicef + "&ua=" + ua)
        }), "07cb9bb454114f5498655543632fe7d7" == appkey && $(".moreAct").hide(), $(document).on("click", ".moreAct", function () {
            var e = $(this).find("a").data("url") || "https://buyimg.bianxianmao.com/dist/roomModel/fun-house/funHouse.html";
            $(this).children("a").attr("href", e.replace(/(^\s*)|(\s*$)/g, "").replace("https://buyimg.bianxianmao.com", baseJs.config.yuming) + "?business=" + business + "&appkey=" + appkey + "&activityid=" + acid + "&uid=" + uid + "&i=" + devicei + "&f=" + devicef + "&ua=" + ua + "&skip=skip"), $.ajax({
                type: "post",
                url: urlHead + "/award/countInfo",
                data: {
                    activityid: activityid,
                    appos: appos,
                    appkey: appkey,
                    business: business,
                    i: devicei,
                    f: devicef,
                    uid: uid,
                    ua: ua,
                    modelname: "更多活动点击",
                    modeltype: 11
                },
                async: !0,
                success: function (e) {
                    console.log("更多活动点击")
                }
            })
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
            if (isclick = !0, $(".guideTitle").hide(), $(".titles").show(), null != awd && ("73d2262538d94a43a949ed8bdd255e7d" != appkey || "9" != acid)) {
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
            if ("今日刮奖次数已完,请明天再来!" == r) {
                var c = {
                    name: "time",
                    acid: activityid,
                    appos: appos,
                    appkey: appkey,
                    business: business,
                    uid: uid,
                    ua: ua,
                    di: devicei,
                    df: devicef
                };
                new Layer(c)
            }
            var l = $("#time").html();
            parseInt(l) <= 5 && $(".moreAct").addClass("moreFadein")
        })
    }, start = function () {
        function e(e) {
            var i = e.data.awardimg, t = e.data.awardname, a = e.data.awardmsg, s = e.data.buttontext;
            e.data.validitytime;
            urllink = e.data.awardlink;
            var n = e.data.awardid, o = e.data.awardtype,
                d = "?x-oss-process=image/resize,m_fill,w_532,h_266,limit_0/auto-orient,0/quality,q_90", r = "";
            r += '<div class="ggk_open">', r += '<img src="' + i + d + '" alt="" />', r += "</div>", r += "<span>" + t + "</span>", $(".ggk_end").append(r), $(".ct").html(t), $(".prize_img img").attr("src", i + d), $(".prizecontent").html(t), $(".coupon-image img").attr("src", i + d), $(".coupon-detail").html(a), $(".coupon-date").html(""), $(".goto").html(s), $(".quan_wd").attr("data-id", n), $(".quan_wd").attr("data-type", o)
        }

        var i = "/award/awardInfo", t = sessionStorage.getItem("firstInid");
        $(".ggk_end").html(""), $(".prize_img img").attr("src", ""), $.ajax({
            type: "post",
            url: urlHead + i,
            async: !0,
            data: {
                appos: appos,
                appkey: appkey,
                business: business,
                activityid: t,
                i: devicei,
                f: devicef,
                ua: ua,
                uid: uid
            },
            success: function (i) {
                function t(e) {
                    var i = e % 4;
                    $(".word").removeClass("up"), $(".word").eq(i).addClass("up"), c = setTimeout(function () {
                        e++, e > 3 && (e = 0), t(e)
                    }, 400)
                }

                if (flag = i.success) {
                    var a = i.data.iscontinue;
                    if (!a) return $(".popShowPrize").hide(), $(".ggk_bottom").hide(), $(".canvas").hide(), $(".ggk_start").hide(), void $(".ggk_inner").find("span").eq(1).html("今日刮奖次数已完,请明天再来!");
                    var s = i.data.awardorderid;
                    sessionStorage.setItem("inputId", s);
                    var n = i.data.awardid, o = i.data.awardtype;
                    sessionStorage.setItem("awardid", n), sessionStorage.setItem("awardtype", o), awd = n;
                    var d = document.getElementsByClassName("guideTitle")[0];
                    if (d.addEventListener("touchstart", function () {
                            $(".titles").hide()
                        }, !1), null == n) {
                        var r = "";
                        r += '<div class="ggk_open">', r += '<img src="./images/cry.png" alt="" />', r += "</div>", r += '<span style="font-size:0.7rem;margin-top:0.2rem;color:#999999">很抱歉，您没中奖哦~</span>', $(".ggk_end").html(""), $(".ggk_end").append(r), $(".title").html("很抱歉，您没中奖哦~"), $(".quan_main img").attr("src", "https://buyimg.bianxianmao.com/dist/awardModel/images/cry.png");
                        var c, l = 0;
                        return t(l), $(".guideTitle").show(), $(".canvas").show(), initCanvas(), $(".ggk_top").hide(), $(".ggk_bottom").show(), $(".ball-spin-fade-loader").hide(), $(".ggk_start span").show(), islink = !0, $(".again").html("再刮一次试试~"), void $(document).on("click", ".again,.pull-right", function () {
                            $(".ggk_quan").hide(), $(".ggk_top").show(), $(".ggk_bottom").hide(), $(".canvas").hide(), $(".page").removeClass("fixed"), $(".ggk_ok").hide()
                        })
                    }
                    e(i);
                    var c, l = 0;
                    t(l), $(".guideTitle").show(), $(".canvas").show(), initCanvas(), $(".ggk_top").hide(), $(".ggk_bottom").show(), $(".ball-spin-fade-loader").hide(), $(".ggk_start span").show(), islink = !0, $.ajax({
                        type: "post",
                        url: urlHead + "/award/countInfo",
                        async: !0,
                        data: {
                            activityid: activityid,
                            preid: n,
                            awardtype: o,
                            appos: appos,
                            business: business,
                            appkey: appkey,
                            i: devicei,
                            f: devicef,
                            uid: uid,
                            ua: ua,
                            modelname: " 活动发券",
                            modeltype: 5
                        },
                        success: function (e) {
                            console.log("活动发券")
                        }
                    })
                } else {
                    var r = "";
                    r += '<div class="ggk_open">', r += '<img src="https://buyimg.bianxianmao.com/dist/awardModel/images/cry.png" alt="" />', r += "</div>", r += '<span style="font-size:0.7rem;margin-top:0.2rem;color:#999999">很抱歉，您没中奖哦~</span>', $(".ggk_end").html(""), $(".ggk_end").append(r), $(".title").html("很抱歉，您没中奖哦~"), $(".quan_main img").attr("src", "https://buyimg.bianxianmao.com/dist/awardModel/images/cry.png"), $(".again").html("再刮一次试试~"), $(".canvas").show(), initCanvas(), $(".ggk_top").hide(), $(".ggk_bottom").show(), $(".ball-spin-fade-loader").hide(), $(".ggk_start span").show(), islink = !0, $(document).on("click", ".again,.pull-right", function () {
                        $(".ggk_quan").hide(), $(".ggk_top").show(), $(".ggk_bottom").hide(), $(".canvas").hide(), $(".page").removeClass("fixed"), $(".ggk_ok").hide()
                    })
                }
            }
        }), isclick = !0, $(document).off("click", ".modal-body").on("click", ".modal-body", function () {
            if (isclick) {
                $(".goto").html("页面加载中~"), isclick = !1;
                var e = sessionStorage.getItem("awardid"), i = sessionStorage.getItem("awardtype");
                try {
                    $.ajax({
                        type: "post",
                        url: urlHead + "/award/countInfo",
                        async: !0,
                        data: {
                            preid: e,
                            awardtype: i,
                            activityid: activityid,
                            appos: appos,
                            appkey: appkey,
                            business: business,
                            i: devicei,
                            f: devicef,
                            uid: uid,
                            ua: ua,
                            modelname: "广告点击",
                            modeltype: 7
                        },
                        success: function (e) {
                            console.log("广告点击");
                            var i = e.data;
                            setTimeout(function () {
                                isclick = !0, $(".guideTitle").hide(), $(".titles").show(), $(".popShowPrize").hide(), $(".ggk_top").show(), $(".ggk_bottom").hide(), $(".canvas").hide(), $(".page").removeClass("fixed"), $(".ggk_ok").hide()
                            }, 800), urllink.indexOf("?") == -1 ? window.location.href = urllink + "?bxm_id=" + i : window.location.href = urllink + "&bxm_id=" + i
                        }
                    })
                } catch (e) {
                    $(".goto a").attr("href", urllink)
                }
            }
        })
    }, init()
}, $(".page").scroll(function () {
    window.scrollLeft = $(".page").scrollLeft(), window.scrollTop = $(".page").scrollTop()
});