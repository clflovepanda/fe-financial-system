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
    }
}
export default CookieUtil;