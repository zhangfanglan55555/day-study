// 11
var ary = [11, 12, 13];
function fn(ary) {
    ary[0] = 0;
    ary = [0];
    ary[0] = 100;
    return ary;
}
var res = fn(ary);
console.log(ary);
console.log(res);


/**
 * [0,12,13]
 * [100]
 */


//  12
function fn(i) {
    return function (n) {
        console.log(n + (i++));
    }
}
var f = fn(10);
f(20);
fn(20)(40);
fn(30)(50);
f(30);

/**
 * 21
 * 60
 * 80
 * 41
 */