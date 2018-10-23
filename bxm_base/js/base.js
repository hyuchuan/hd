var baseJs = {
    _getQueryString: function (e) {
        var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"), n = window.location.search.substr(1).match(t);
        return null != n ? unescape(n[2]) : null
    }, _getDeviceInfo: function () {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 2 : 1
    }, _ajax: function (e, t, n, o, r, p, er) {
        return $.ajax({
            url: e,
            data: t || {},
            type: n || "POST",
            async: o || !0,
            success: r,
            dataType: p || 'json',
            timeout: 10000,
            error: er || function (e) {
                console.log("网络异常，请稍后重试！")
            }
        })
    }, _requereStyle: function (e) {
        ({
            init: function (e) {
                this.param = e, this.style = [], this.renderStyle()
            }, renderStyle: function () {
                var e = this;
                this.param.forEach(function (t) {
                    e.setConfig(t)
                }), this.style = this.style.join(""), $('<style type="text/css"></style>').text(this.style).appendTo($("head"))
            }, setConfig: function (e) {
                switch (e[1]) {
                    case"color":
                        this.style.push(e[0] + "{color:" + e[2] + "}");
                        break;
                    case"border-color":
                        this.style.push(e[0] + "{border-color:" + e[2] + "}");
                        break;
                    case"background-image":
                        this.style.push(e[0] + "{background:url(" + e[2] + ") no-repeat center;background-size: 100% 100%;}");
                        break;
                    case"background-color":
                        this.style.push(e[0] + "{background-color:" + e[2] + "}");
                        break;
                    case"img":
                        $(e[0]).find("img").attr("src", e[2]);
                        break;
                    case"href":
                        $(e[0]).find("a").attr("href", e[2])
                }
            }
        }).init(e)
    }, _setRem: function () {
        var e = document.documentElement, t = "orientationchange" in window ? "orientationchange" : "resize",
            n = function () {
                var t = e.clientWidth || 375;
                (t = t > 750 ? 750 : t) && (e.style.fontSize = t / 375 * 20 + "px", window.remscale = t / 375)
            };
        document.addEventListener && (window.addEventListener(t, n, !1), document.addEventListener("DOMContentLoaded", n, !1))
    }, isWeiXin: function () {
        return "micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ? 1 : 0
    }, getLoaded: function (e, t, n) {
        var o = parseInt(localStorage.getItem("settime")), r = parseInt(localStorage.getItem("beforeday"));
        if (!o || !r) return localStorage.setItem("settime", e), void localStorage.setItem("beforeday", t);
        if ((new Date).getTime() > o) {
            var a = parseInt((new Date).getDate());
            return !(a <= r) && (n(), localStorage.setItem("beforeday", a), !0)
        }
        return !0
    }, getSesionLoaded: function (e, t) {
        var n = sessionStorage.getItem("returnloaded"), o = sessionStorage.getItem("skiploaded");
        n || "return" != e || (t(), sessionStorage.setItem("returnloaded", "returnloaded")), o || "skip" != e || (t(), sessionStorage.setItem("skiploaded", "skiploaded"))
    }, setCookie: function (e, t) {
        var n = new Date;
        n.setTime(n.getTime() + 2592e6), document.cookie = e + "=" + escape(t) + ";expires=" + n.toGMTString()
    }, getCookie: function (e) {
        var t, n = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
        return (t = document.cookie.match(n)) ? unescape(t[2]) : null
    }, delCookie: function (e) {
        var t = this, n = new Date;
        n.setTime(n.getTime() - 1);
        var o = t.getCookie(e);
        null != o && (document.cookie = e + "=" + o + ";expires=" + n.toGMTString())
    }, callWithSchema: function (schema, id) {
        var frame = document.createElement('iframe');
        id && (frame.id = id);
        frame.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;visibility:hidden;';
        frame.frameBorder = '0';
        frame.src = schema;
        try {
            document.body.appendChild(frame)
        } catch (e) {
        }
    }, addEvent: function (elm, type, cb) {
        if (window.attachEvent) {
            elm.attachEvent('on' + type, cb)
        } else {
            elm.addEventListener(type, cb, false)
        }
    }, getWebGl: function () {
        var t = this, data = ['hysi'];
        try {
            data.push(navigator.userAgent, navigator.platform, navigator.language, screen.width + '*' + screen.height + '*' + screen.colorDepth, new Date().getTimezoneOffset() + '')
        } catch (exp) {
        }
        return t.genHash(data.join('#'))
    }, genHash: function (key, seed) {
        var remainder, bytes, h1, h1b, c1, c2, k1, i;
        remainder = key.length & 3;
        bytes = key.length - remainder;
        h1 = seed || 31;
        c1 = 0xcc9e2d51;
        c2 = 0x1b873593;
        i = 0;
        while (i < bytes) {
            k1 = ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(++i) & 0xff) << 8) | ((key.charCodeAt(++i) & 0xff) << 16) | ((key.charCodeAt(++i) & 0xff) << 24);
            ++i;
            k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;
            h1 ^= k1;
            h1 = (h1 << 13) | (h1 >>> 19);
            h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
            h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16))
        }
        k1 = 0;
        switch (remainder) {
            case 3:
                k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
            case 2:
                k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
            case 1:
                k1 ^= (key.charCodeAt(i) & 0xff);
                k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
                k1 = (k1 << 15) | (k1 >>> 17);
                k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
                h1 ^= k1
        }
        h1 ^= key.length;
        h1 ^= h1 >>> 16;
        h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
        h1 ^= h1 >>> 13;
        h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
        h1 ^= h1 >>> 16;
        return (h1 >>> 0).toString()
    }, cnzz: function (la) {
        if (!la) return;
        var head = $('#statistical');
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.language = "javascript";
        script.src = "//s22.cnzz.com/z_stat.php?id=" + la + "&web_id=" + la;
        try {
            head.append(script)
        } catch (exp) {
        }
    }, _setuid: function (t) {
        var webGL = this.getCookieStorage('webGlV2018'), s = this;
        if(!webGL){
            s.loadJS('/dist/bxm_base/js/fingerprint2.min.js',function () {
                if(typeof Fingerprint2 != 'undefined'){
                    new Fingerprint2().get(function (result, components) {
                        result && (webGL = s.genHash(result)), s.setCookieStorage('webGlV2018',webGL,24*365), t && (t.uid = webGL);
                    });
                }else{
                    webGL = 'su'+genHash(s.getWebGl() + Math.random()), s.setCookieStorage('webGlV2018',webGL,24*365), t && (t.uid = webGL);
                }
            });
        }
    }, myAlert: function(s, a) {
        if (!document.getElementById("alertBg")) {
            var i = a || 1e3,
                n = document.createElement("div");
            n.setAttribute("id", "alertBg");
            var t = document.createElement("p");
            t.setAttribute("class", "text");
            var o = document.createTextNode(s);
            t.appendChild(o), n.appendChild(t), document.body.appendChild(n), setTimeout(function() {
                document.body.removeChild(n)
            }, i)
        }
    }, longpress: function(elm, func) {
        var timeOutEvent;
        this.addEvent(elm, 'touchstart', function (e) {
            // 开启定时器前先清除定时器，防止重复触发
            clearTimeout(timeOutEvent);
            // 开启延时定时器
            timeOutEvent = setTimeout(function () {
                // 调用长按之后的逻辑函数func
                func();
            }, 800);  // 长按时间为300ms，可以自己设置
        });
        this.addEvent(elm, 'touchmove', function (e) {
            // 长按过程中，手指是不能移动的，若移动则清除定时器，中断长按逻辑
            clearTimeout(timeOutEvent);
            /* e.preventDefault() --> 若阻止默认事件，则在长按元素上滑动时，页面是不滚动的，按需求设置吧 */
        });
        this.addEvent(elm, 'touchend', function (e) {
            // 若手指离开屏幕时，时间小于我们设置的长按时间，则为点击事件，清除定时器，结束长按逻辑
            clearTimeout(timeOutEvent);
        });
    }, loadJS: function (url, callback) {
        var head = document.getElementsByTagName("head")[0];
        var script = window.document.createElement('script');
        script.onload = script.onreadystatechange = script.onerror = function() {
            if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState)) return;
            script.onload = script.onreadystatechange = script.onerror = null;
            script.src = '';
            script.parentNode.removeChild(script);
            script = null;
            callback && callback();
        };
        script.charset = "utf-8";
        script.async = true;
        script.src = url;
        try {
            head.appendChild(script);
        } catch (exp) {}
    }, setCookieStorage : function (name,value,hours) {
        this.setCookie(name,value,hours);
        if(window.localStorage){
            try {
                window.localStorage.setItem(name,value);
            }catch (e){
                if(e.name == 'QuotaExceededError'){
                    try {
                        window.localStorage.clear();
                        window.localStorage.setItem(name,value);
                    }catch (e){}
                }
            }
        }
    }, getCookieStorage : function (name) {
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)")),storage;
        if(arr != null) return unescape(arr[2]);
        window.localStorage && (storage = window.localStorage.getItem(name));
        if(storage) return storage;
        return null;
    }
};