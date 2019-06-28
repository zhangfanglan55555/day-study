// 5.
let n = 10,
    obj = { n: 20 };
let fn = obj.fn = (function () {
    this.n++;
    n++;
    return function (m) {
        n += 10 + (++m);
        this.n += n;
        console.log(n)
    }
})(obj.n)
fn(10);
obj.fn(10);
console.log(n, obj.n)

/**
 * 32
 * 53
 * 53 73
 */


// 8
let n = 1;
let x = {
    n: 2,
    y: (function (n) {
        n = n || 3;
        return function (m) {
            m = m || 4;
            this.n += m++;
            n += ++m;
            console.log(n)
        }
    })(window.n)
};
let z = x.y;
x.y(5);
z(6);
console.log(n, x.n)

/**
 * let 声明的变量和window属性没有关系
 * window.n 是undefined
 * 
 * 10
 * 18
 * 1,7
 */


let n = 1,
    obj = { n: 2 };
let fn = obj.fn = (function () {
    this.n += n;
    n *= 2;
    return function (m) {
        n -= 5 + (++m);
        this.n += n--;
        console.log(n)
    }
})(obj.n)
fn(3);
obj.fn(4)
console.log(n, obj.n, window.n)
