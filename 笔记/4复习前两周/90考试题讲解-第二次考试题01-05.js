// 1.
var a = 0;
function fun() {
    /**
     * 形参赋值
     * 变量提升
     *    var a ;
     */
    alert(a);
    var a = 10
}
fun();
alert(a)

/**
 *  undefined
 *  0
 */


//  2.
let a = 0, b = 0;
function A(a) {
    A = function (b) {
        alert(a + b++)
    };
    alert(a++)
}
A(1);
A(2);

/**
 * 1
 * 4
 * 第一个A里面的a被占用，a不被销毁
 */

//  3.
window.val = 1;
let json = {
    val: 10,
    dbl: function () {
        this.val *= 2;
    }
};
json.dbl();
let dbl = json.dbl;
dbl();
json.dbl.call(window);
alert(window.val + json.val);

/**
 * 24
 */

//  4.
(function () {
    let val = 1;
    let json = {
        val: 10,
        dbl: function () {
            val *= 2;
        }
    };
    json.dbl();
    alert(json.val + val);
})()


/**
 * 12
 */


//  5.
let test = (function (i) {
    return function () {
        alert(i *= 2);
    }
})(2)
test(5);

/**
 * 4
 */