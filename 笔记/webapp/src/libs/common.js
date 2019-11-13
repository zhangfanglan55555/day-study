// 时间格式化
export const dateFormat = (date, fmt) => {
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 时间区间格式化
export const durationFormat = (duration) => {
    if (duration === undefined || isNaN(duration) || duration <= 0) {
        return "0分钟";
    }

    let duFormat = "";

    let isMod = duration % 60 === 0;

    if (duration >= 3600) {

        let minute = parseInt(duration % 3600 / 60);

        duFormat = parseInt(duration / 3600) + "小时" + (duration % 3600 === 0 ? "" : ((isMod ? minute : (minute + 1)) + "分钟"));
    } else if (duration >= 60) {

        duFormat = parseInt(duration / 60) + "分钟" + (isMod ? "" : ((duration % 60) + "秒"));

    } else {
        duFormat = duration + "秒";
    }

    return duFormat;
}

// 评论时间格式化
export const commentTimeFormat = (time) => {

    // 由于ios设备无法处理2018-09-26 11:07:21，但可以处理2018/09/26 11:07:21，进行一次替换
    time = time.replace(/-/g, "/");
    var nowDate = new Date(),
        now = nowDate.getTime(),
        oldDate = new Date(time),
        oldTime = oldDate.getTime(),
        difference = now - oldTime,
        result = '',
        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        halfamonth = day * 15,
        month = day * 30,
        year = month * 12,

        _year = difference / year,
        _month = difference / month,
        _week = difference / (7 * day),
        _day = difference / day,
        _hour = difference / hour,
        _min = difference / minute;

    if (_day >= 2 || (_day >= 1 && _day < 2 && oldDate.getHours() > nowDate.getHours())) {
        if (oldDate.getFullYear() == nowDate.getFullYear()) {
            result = (oldDate.getMonth() + 1) + "-" + oldDate.getDate();
        } else {
            result = oldDate.getFullYear() + "-" + (oldDate.getMonth() + 1) + "-" + oldDate.getDate();
        }
    }
    else if (_day >= 1) {
        result = oldDate.getHours() + ":" + oldDate.getMinutes();
    }
    else if (_hour >= 1) { result = ~~(_hour) + " 个小时前" }
    else if (_min >= 1) { result = ~~(_min) + " 分钟前" }
    else result = "刚刚";
    return result;


    // if (_year >= 1) { result = ~~(_year) + " 年前" }
    // else if (_month >= 1) { result = ~~(_month) + " 个月前" }
    // else if (_week >= 1) { result = ~~(_week) + " 周前" }
    // else if (_day >= 1) { result = ~~(_day) + " 天前" }
    // else if (_hour >= 1) { result = ~~(_hour) + " 个小时前" }
    // else if (_min >= 1) { result = ~~(_min) + " 分钟前" }
    // else result = "刚刚";
    // return result;

}

// 生成guid
export const newGuid = () => {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}


// 评论数量控制
export const formatNum = (num) => {
    return num >= 1000 ? "1.0K" : num;
}

// htmlEoncode
export const htmlEncode = (html) => {
    //1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement("div");
    //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
    (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
    //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
    var output = temp.innerHTML;
    temp = null;
    return output;
}



Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}

