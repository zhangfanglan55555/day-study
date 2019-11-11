// 4.
let i = 0;
let fn = function (n) {
    i += 2;
    return function (m) {
        i += (++n) + (m--);
        console.log(i)
    }
};
let f = fn(2);
f(3);
fn(2)(3)
f(4)
console.log(i)


// 8
// 16
// 24
// 24
//  7.
var n = 0,
    fn = function () {
        this.n *= 2;
        n++;
        return function (m) {
            n += ++m;
            console.log(n)
        }
    };
var f = fn(2);
f(3);
fn(3)(4)
f(4); 
console.log(n);

/**
 * 
 * 5
 * 16
 * 21
 * 21
 */

let i = 2;
let fn = function (n) {
    i *= 2;
    return function (m) {
        i -= (n--) + (++m);
        console.log(i)
    }
};
let f = fn(1)
f(2);
fn(3)(4);
f(5)
console.log(i)

/**
 * 0
 * -8
 * -14
 * -14
 *
 * i-=(n--)+(++m) 展开后是：i = i - ((n--)+(++m))
 */