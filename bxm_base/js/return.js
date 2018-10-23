function _getQueryString(e) {
    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
        i = window.location.search.substr(1).match(t);
    return null != i ? unescape(i[2]) : null
}
function _hash() {
    var e = "?business=" + _getQueryString("business") + "&activityid=" + _getQueryString("activityid") + "&appkey=" + _getQueryString("appkey") + "&uid=" + _getQueryString("uid") + "&ua=" + _getQueryString("ua") + "&i=" + _getQueryString("i") + "&f=" + _getQueryString("f") + "&return=return",
        t = "&business=" + _getQueryString("business") + "&appkey=" + _getQueryString("appkey") + "&uid=" + _getQueryString("uid") + "&ua=" + _getQueryString("ua") + "&i=" + _getQueryString("i") + "&f=" + _getQueryString("f") + "&return=return";
    "" == window.location.hash && ("12402" == _getQueryString("activityid") ? window.location.replace("https://buyimg.bianxianmao.com/dist/eggModel/playjd.html?activityid=12406" + t) : "12307" == _getQueryString("activityid") ? window.location.replace("https://buyimg.bianxianmao.com/dist/newwheel/wheel.html?activityid=12415" + t) : window.location.replace("https://buyimg.bianxianmao.com/dist/activeCenter/home/homecenter.html" + e))
}