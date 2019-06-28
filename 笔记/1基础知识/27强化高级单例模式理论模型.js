var n = 2;
var obj = {
    n: 3,
    fn: (function (n) {
        n *= 2;
        this.n += 2;//自执行函数this是window
        var n = 5;
        console.log(this.n)
        console.log(window.n)
        return function (m) {
            this.n *= 2//谁调用this是谁
            console.log(m + (++n))
        }
    })(n)

}
var fn = obj.fn;
fn(3);
obj.fn(3);
console.log(n, obj.n)

/**
 *   9
 *   10
 *   8 6
 */

/**
 * 形成全局作用域：
 * 全局作用域
 *  1.变量提升：var n ,obj,fn
 *  2. n =2 ,obj = aaafff000
 * 
 */


/**
 * THIS:
 *  1.给当前元素的某个事件绑定方法，当事件出发方法执行的时候，方法中的this是当前操作的元素对象
 *  oBox.onclick = function(){
 *      //this:oBox 
 *  }
 *  2.普通函数执行，函数中的this取决于执行的主体，谁执行的this就是谁（执行主体：方法执行看方法名前面是否有'.'
 *    有的话，.前面是谁，this就是谁，没有，this就是window）
 */
function fn() {
    console.log(this)
}
var obj = {
    a: 1,
    fn: fn
}
obj.fn();
fn();

/**
 * obj
 * window
 */

~function () {
    //this:window 自执行函数执行，方法中的this是window
}()