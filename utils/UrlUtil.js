let UrlUtil = {
    getUrlParam: function(name) {
        // 取得url中?后面的字符
        var query = window.location.search.substring(1);
        // 把参数按&拆分成数组
        var param_arr = query.split("&");
        for (var i = 0; i < param_arr.length; i++) {
            var pair = param_arr[i].split("=");
            if (pair[0] == name) {
                return pair[1];
            }
        }
    }
}

export default UrlUtil;