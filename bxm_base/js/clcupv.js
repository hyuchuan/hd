(function(h) {
    var g = function () {};
    g.prototype = {
        dd: document,
        ww: window,
        listener: [],
        listenerTouchend: [],
        listenerCopy: null,
        text: null,
        action: "copy",
        ua: window.navigator.userAgent,
        id: "default",
        token: "",
        closeqq: "no",
        init: function(elm,callback) {
            var a = this;
            a.elm = elm;
            a.callback = callback;
            a.text = a.elm.getAttribute('text') || null;
            if(!a.text) return;
            a.wxcp(a.text);
            "null" == a.text && (a.text = 0);
            a.dd.queryCommandSupported && a.dd.queryCommandSupported(a.action) ? a.text && (a.listenClick()/*, a.listenTouchend()*/) : 1 < a.ua.split("MQQBrowser").length && 1 < a.ua.split("Android").length && 2 > a.ua.split("MicroMessenger").length && 2 > a.ua.split("QQ/").length ? a.text && a.qqCopy() : (a.listenerCopy = a.listenNode(a.elm, "click", a.clipboardCopy.bind(a)));

        },
        wxcp: function(a) {
            if (/MicroMessenger/i.test(navigator.userAgent)) {
                var iframe = document.createElement("iframe");
                iframe.style.cssText = "display:none;width:0px;height:0px;";
                iframe.src = "weixin://webview/copy/" + a;
                document.body.appendChild(iframe);
            }
        },
        cp: function(a) {
            var b = this;
            b.callback && b.callback(a);
        },
        qqCopy: function() {
            var a = this,
                b = a.text,
                c = navigator.appVersion,
                e = 1 < c.split("MQQBrowser/").length ? 2 : 0;
            if (a.closeqq == "yes") {
                return true;
            }
            if (e) {
                var f = {
                    url: b,
                    to_app: "10",
                    us_txt: "23s"
                };
                b = c.split("MQQBrowser/")[1].split(".");
                b = parseFloat(b[0] + "." + b[1]);
                b = 5.4 > (e ? b : 0) ? "//3gimg.qq.com/html5/js/qb.js" : "//jsapi.qq.com/get?api=app.share";
                c = a.dd.createElement("script");
                var d = a.dd.getElementsByTagName("body")[0];
                c.setAttribute("src", b);
                c.onload = function() {
                    "undefined" != typeof a.ww.browser && "undefined" != typeof a.ww.browser.app && 2 == e ? (a.ww.browser.app.share(f), a.cp("1")) : "undefined" != typeof a.ww.qb && 1 == e && (a.ww.qb.share(f), a.cp("1"));
                };
                d.appendChild(c);
            }
        },
        clipboardCopy: function(a) {
            var _this = this;
            _this.ww.clipboardData && this.text && _this.ww.clipboardData.setData("Text", _this.text);
            //_this.listenerCopy.destroy();
        },
        listenClick: function() {
            var a = this;
            a.listener.push(a.listenNode(a.elm, "click", function(b) {
                return a.onClick(b, "click");
            }));
        },
        listenTouchend: function() {
            var a = this;
            a.listenerTouchend.push(a.listenNode(a.elm, "touchend", function(b) {
                return a.onClick(b, "touchend");
            }));
        },
        listenNode: function(a, b, c) {
            a.addEventListener(b, c, true);
            return {
                destroy: function() {
                    a.removeEventListener(b, c, true);
                }
            };
        },
        onClick: function(a, b) {
            var c = this;
            this.dd.body.hasAttribute("oncopy") && this.dd.body.setAttribute("oncopy", "return true");
            this.dd.body.hasAttribute("onpaste") && this.dd.body.setAttribute("onpaste", "return true");
            "INPUT" != a.target.nodeName && "TEXTAREA" != a.target.nodeName && ((new h(this.text, this.action, function(a) {
                a ? c.cp("1") : c.cp("2");
            })).start(), "click" == b ? (this.listenerD = true, this.listener.forEach(function(a, b) {
                //a.destroy();
            })) : "touchend" == b && this.listenerTouchend.forEach(function(a, b) {
                //a.destroy();
            }));
            this.dd.body.hasAttribute("oncopy") && this.dd.body.setAttribute("oncopy", "return false");
            this.dd.body.hasAttribute("onpaste") && this.dd.body.setAttribute("onpaste", "return false");
        },
        randomString: function() {
            var a = "";
            for (i = 0; 7 > i; i++) {
                a += "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(61 * Math.random()));
            }
            return a;
        },
        sGet: function(a) {
            try {
                if (!this.ww.localStorage[a] || this.ww.localStorage[a] == 'null') {
                    return null;
                }
                var b = JSON.parse(this.ww.localStorage[a]);
                return b.time < (new Date).getTime() ? (this.ww.localStorage[a] = null) : b.value;
            } catch (c) {
                return console.log(c,"not localStorage."), null;
            }
        },
        sSet: function(a, b, c) {
            try {
                var e = {
                    name: a,
                    value: b,
                    time: (new Date).getTime() + 1000 * c
                };
                this.ww.localStorage[a] = JSON.stringify(e);
            } catch (f) {
                console.log("not localStorage.");
            }
        },
        now: function() {
            return (new Date).getTime();
        },
        rand: function() {
            return Math.random().toString().substr(2);
        },
    };
    window.clcupv = g;
})(function(h, g, a) {
    return {
        fakeElem: null,
        text: h,
        action: g,
        selectedText: null,
        dd: document,
        ww: window,
        start: function() {
            this.text && (parent.window.location.href != window.location.href && (this.ww = top.window, this.dd = top.document), this.selectFake());
        },
        selectFake: function() {
            var a = "rtl" == this.dd.documentElement.getAttribute("dir");
            this.removeFake();
            this.fakeElem = this.dd.createElement("textarea");
            this.fakeElem.style.fontSize = "12pt";
            this.fakeElem.style.border = "0";
            this.fakeElem.style.padding = "0";
            this.fakeElem.style.margin = "0";
            this.fakeElem.style.position = "absolute";
            a ? (this.fakeElem.style.right = "-9999px") : (this.fakeElem.style.left = "-9999px");
            this.fakeElem.style.top = (this.ww.pageYOffset || this.dd.documentElement.scrollTop) + "px";
            this.fakeElem.setAttribute("readonly", "");
            this.fakeElem.value = this.text;
            this.dd.body.appendChild(this.fakeElem);
            this.selectedText = this.selectText(this.fakeElem);
            this.copyText();
        },
        removeFake: function() {
            this.fakeElem && (this.dd.body.removeChild(this.fakeElem), this.fakeElem = null);
        },
        copyText: function() {
            var b = void 0;
            try {
                b = this.dd.execCommand(this.action);
            } catch (c) {
                b = false;
            }
            this.removeFake();
            a.call(this, b);
        },
        selectText: function(a) {
            if ("SELECT" === a.nodeName) {
                a.focus(), a = a.value;
            } else if ("INPUT" === a.nodeName || "TEXTAREA" === a.nodeName) {
                var b = a.hasAttribute("readonly");
                b || a.setAttribute("readonly", "");
                a.select();
                a.setSelectionRange(0, a.value.length);
                b || a.removeAttribute("readonly");
                a = a.value;
            } else {
                a.hasAttribute("contenteditable") && a.focus();
                b = this.ww.getSelection();
                var e = this.dd.createRange();
                e.selectNodeContents(a);
                b.removeAllRanges();
                b.addRange(e);
                a = b.toString();
            }
            return a;
        }
    };
});