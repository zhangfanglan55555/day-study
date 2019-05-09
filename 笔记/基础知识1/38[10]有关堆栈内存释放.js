
var a = 9;
function fn() {
    a = 0;
    return function (b) {
        return b + a++;
    }
}
var f = fn();
console.log(f(5));
console.log(fn()(5));
console.log(f(5));
console.log(a)

/**
 * return的基本类型值，会销毁
 * 5
 * 5
 * 6
 * 2
 */