/**
 * 编写一个方法fn,实现任意数求平均数（去除数字中的最大和最小，然后再算平均数，保留小数点后面两位）
 * es6的方式：
 */
let fn1 = function (...ary) {
    console.log(ary)
    // ary = [...arguments];
    // let ary = Array.from(arguments);
    ary.sort(function (a, b) {
        return b - a;
    }).pop();
    ary.shift();
    // return ary;
    let total = eval(`${ary.join('+')}`);
    return (total/ary.length).toFixed(2)
}

console.log(fn1(12, 32, 1, 2, 99))
console.log(fn1([12, 32, 1, 2, 99]));//如果是数组就没必要转数组了，fn接收参数的时候直接functon(ary)就可以了
