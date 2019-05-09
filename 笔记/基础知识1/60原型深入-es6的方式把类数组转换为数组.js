/**
 * 编写一个方法fn,实现任意数求平均数（去除数字中的最大和最小，然后再算平均数，保留小数点后面两位）
 * es6的方式：
 */
let fn = function (...ary) {
    // ary = [...arguments];
    // let ary = Array.from(arguments);
    ary.sort(function (a, b) {
        return b - a;
    }).pop();
    ary.shift();
    return ary;
}
console.log([12, 32, 1, 2, 99])