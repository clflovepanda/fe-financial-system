let CookieUtil = {
    existCookie: function(key) {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            let kv = cookie.split("=");
            if (kv && kv.length && kv.length > 1) {
                if (kv[0] == key) {
                    return true;
                }
            }
        }
        return false;
    },
    getCookie: function(key) {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            let kv = cookie.split("=");
            if (kv && kv.length && kv.length > 1) {
                if (kv[0] == key) {
                    return kv[1];
                }
            }
        }
        return "";
    },
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
}
export default CookieUtil;