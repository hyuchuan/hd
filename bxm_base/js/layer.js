function Layer(a) {
    this.name = a.name, this.isclick = !0, this.acid = a.acid, this.uid = a.uid, this.data = a.data, this.model = a.model || 'rotateModel', this.m = a.m, this.param = a.param, this.turn = a.turn, this.la = a.la, this.curday = a.curday, this.moreLayer = [{
        'name': 'rotateModel',
        'title': 'iPhoneX开抢，真机率先体验',
        'img': '/dist/bxm_base/images/model/rotate.png',
        'buttontxt': '立即参与'
    }, {
        'name': 'eggModel',
        'title': '冬日送温暖',
        'img': '/dist/bxm_base/images/model/egg.png',
        'buttontxt': '立即参与'
    }, {
        'name': 'dollModel',
        'title': '百元购物卡免费送',
        'img': '/dist/bxm_base/images/model/doll.png',
        'buttontxt': '立即参与'
    }, {
        'name': 'pickchestModel',
        'title': '赢现金抢话费',
        'img': '/dist/bxm_base/images/model/pickchest.png',
        'buttontxt': '立即参与'
    }, {
        'name': 'awardModel',
        'title': '微信拼手气红包',
        'img': '/dist/bxm_base/images/model/award.png',
        'buttontxt': '立即参与'
    }], this.layerInit(this.name)
}

Layer.prototype = {
    constructor: Layer, layerInit: function (a) {
        var i = this;
        switch (a) {
            case"time":
                i.layerRest();
                break;
            case'more':
                i.layerMore();
                break
        }
        i.bindEvent()
    }, bindEvent: function () {
        $(document).on("click", ".closedialog", function () {
            $("#pop").remove(), $(".show-award").remove()
        })
    }, layerRest: function () {
        var a = this, t, s = "", c, isWeiXin = baseJs.isWeiXin(), wxDesc = isWeiXin ? '请长按左边二维码识别关注后领取' : '请长按左边二维码保存后识别';
        s += '<div id="pop" class="show-award">', s += '<div class="pop-content">', s += '<div class="pophead"></div>', s += '<div class="popbody">', s += '<div class="list"></div>', s += '<div class="circle">', s += '<div class="circle1"></div>', s += '<div class="circle2"></div>', s += '<div class="circle3"></div>', s += "</div>", s += "</div>", s += "</div>", s += '<span class="closedialog iconfont">&#xe649;</span>', s += "</div>", $("body").append(s), c = $("#pop").find(".list");
        $.each(a.data, function (n, v) {
            t = document.createElement('a');
            t.innerHTML = '<div class="list-pic"><img src="' + v.img + '" alt=""></div>';
            if(v.awardtype == '1'){
                var cpbtn = document.createElement('button'), openbtn = document.createElement('button'), div = document.createElement('div'), span = document.createElement('span');
                cpbtn.type = 'button',cpbtn.className = 'qrbtn', openbtn.className = 'qrbtn',openbtn.type = 'button', span.innerHTML = '<div>'+wxDesc+'</div><div>微信号：'+v.account+'</div>';
                cpbtn.setAttribute('text', v.account),cpbtn.innerHTML = '复制', openbtn.innerHTML = '打开微信', span.appendChild(div);
                div.appendChild(cpbtn),div.appendChild(openbtn);
                var listtitle = document.createElement('div'), img = document.createElement('img');
                img.src = v.qrcode, listtitle.appendChild(img), listtitle.className = 'list-title flex flex-v', listtitle.appendChild(span), t.appendChild(listtitle);
                baseJs.longpress(img, function () {
                    MtaH5.clickStat("press", {'acid': a.acid+'','awardid': v.awardid+''}), baseJs._ajax(v.rqy, {tag:2,_:(+new Date())}, "GET", !0, function(s) {});
                });
                var clcupv = new window.clcupv();
                clcupv.init(cpbtn,function (a) {
                    MtaH5.clickStat("copy", {'acid': a.acid+'','awardid': v.awardid+''}), baseJs._ajax(v.rqy, {tag:3,_:(+new Date())}, "GET", !0, function(s) {});
                    if(a == '1'){
                        baseJs.myAlert('复制成功!', 2000);
                    }else{
                        baseJs.myAlert('复制失败,请手动复制!', 2000);
                    }
                });
                baseJs.addEvent(openbtn, 'click', function () {
                    MtaH5.clickStat("wakeup", {'acid': a.acid+'','awardid': v.awardid+''}), baseJs._ajax(v.rqy, {tag:4,_:(+new Date())}, "GET", !0, function(s) {});
                    setTimeout(function () {
                        window.location.href = 'weixin://';
                    }, 300);
                }.bind(this))
            }else{
                t.innerHTML += '<div class="list-title flex flex-b flex-v"><span>' + v.title + '</span><button>立即领取</button></div>';
                v.url && baseJs.addEvent(t, 'click', function () {
                    MtaH5.clickStat("receive", {'acid': a.acid+'','awardid': v.awardid+''}), baseJs._ajax(v.rqy, {tag:1,_:(+new Date())}, "GET", !0, function(s) {});
                    window.open(v.url)
                });
            }
            c.append(t)
        })
    }, layerMore: function () {
        var a = this, d = this.moreLayer, t, s = "", c, url, n, notime = {};
        notime[a.curday] = {};
        try {
            n = localStorage.getItem("notime" + a.acid)
        } catch (e) {
            n = baseJs.getCookie("notime" + a.acid)
        }
        n && (n = JSON.parse(n)), n && n[a.curday] && (notime[a.curday] = n[a.curday]);
        notime[a.curday][a.model] = 1;
        try {
            localStorage.setItem("notime" + a.acid, JSON.stringify(notime))
        } catch (e) {
            baseJs.setCookie("notime" + a.acid, JSON.stringify(notime))
        }
        s += '<div id="pop" class="show-award">', s += '<div class="pop-more-content">', s += '<div class="pophead"></div>', s += '<div class="popbody">', s += '<div class="list"></div>', s += '<div class="circle">', s += '<div class="circle1"></div>', s += '<div class="circle2"></div>', s += '<div class="circle3"></div>', s += "</div>", s += "</div>", s += "</div>", s += '<span class="closedialog iconfont">&#xe649;</span>', s += "</div>", $("body").append(s), c = $("#pop").find(".list"), $.each(d, function (n, v) {
            if (a.model == v.name || notime[a.curday].hasOwnProperty(v.name)) {
                return true
            }
            t = document.createElement('a');
            t.innerHTML = '<div class="list-pic"><img src="' + v.img + '" alt=""></div><div class="list-title flex flex-b flex-v"><span>' + v.title + '</span><button>' + v.buttontxt + '</button></div>';
            url = ['/dist/' + v.name + '/index.html?tpid=' + a.acid, 'la=' + (a.la || ''), 'back=' + encodeURIComponent(a.param)].join('&');
            if (a.turn) {
                $("#pop").remove(), $(".show-award").remove();
                window.location.href = url;
                return false
            }
            (function (t, r) {
                baseJs.addEvent(t, 'click', function () {
                    window.open(r)
                })
            })(t, url);
            c.append(t)
        });
        if (!t) {
            $("#pop").remove(), $(".show-award").remove()
        }
    }
};