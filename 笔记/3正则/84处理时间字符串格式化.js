//”2018/4/30 17:50:23“ -> ”04-30 17：50“

let str = "2018/4/30 17:50:23";
ary = str.split(/(\/| |:)/g);
console.log(ary);//["2018", "/", "4", "/", "30", " ", "17", ":", "50", ":", "23"]
// 不想要小分组内容
// 简单处理
ary = str.split(/(?:\/| |:)/g)//["2018", "4", "30", "17", "50", "23"];
let [, month, day, hours, minutes] = ary;
let result = `${month}-${day} ${hours}:${minutes}`;


let str = "2018/4/30 17:50:23";
// 1.获取时间字符串中的所有数字（split)
// let ary = str.match(/\d+/g);//["2018", "4", "30", "17", "50", "23"]

let ary = str.match(/\d+/g).map(item => {
    return item < 10 ? '0' + item : item;
})
//map 相对于for-earch来讲多了返回值，函数中return的是啥，就是把当前数组中迭代的这一项替换成啥
//ary => ["2018", "04", "30", "17", "50", "23"]

// 2.指定最后想要的时间格式，我们基于这个数组中的内容，帮你拼接好即可
let template = '{0}年{1}月{2}日 {3}时{4}分{5}秒';
/**
 * {0} = > 0 ’2018‘ ary[0]
 * {1} = > 1 04 ary[1]
 * ...
 */
let reg = /\{(\d+)\}/g;

template = template.replace(reg, (...arg) => {
    // ['{0}',0]
    // ['{1}',1]
    let [, index] = arg;//index是每一次正则匹配小分组捕获到的结果（也就是那个数字）
    return arg[index]
})

/**
 * 时间字符串格式化
 */
String.prototype.myFormatTime = function myFormatTime(template = '{0}年{1}月{2}日 {3}时{4}分{5}秒') {
    // this:str
    let ary = this.match(/\d+/g).map(item => item < 0 ? '0' + item : item);
    return template.replace(/\{(\d+)\}/g, (...[, index]) => {
        return ary[index] || '00'
    })

}

let str = '2018/4/30  17:50:23';
str.myFormatTime()