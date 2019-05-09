/**
 * 箭头函数：
 */

let fn = (x, y) => {

}
fn(10, 20)


// 只有一个形参，可以省略小括号
let fn = x => {
    console.log(x);//10
}
fn(10)


let fn = function (x, y) {
    return x + y;
}
// 如果当前函数体当中只有一句操作，并且是return，那么可以省略
// 大括号和return
let fn = (x, y) => x + y;
let fn = (x = 0, y = 0) => x + y;//给形参设置默认值


let fn = x => y => x + y;


let fn = function fn(x) {
    return function (y) {
        return x + y;
    }
}
/**
 * 1.箭头函数中没有arguments，可以使用剩余运算符代替，而且arg
 * 是一个数组
 * 
 */
let fn = (...arg) => {
    console.log(arguments);//arguments is not defined
    console.log(arg);//10,20,30,40
}
fn(10, 20, 30, 40)

/**
 * 2.箭头函数没有自己的执行主体（this）它的this都是继承上下文中的this
 */
let obj = {
    fn: (function () {
        //this:window
        return function () {
            console.log(this);
        }
    })()
}

obj.fn();//obj
let fn = obj.fn;
fn();//window

// 问题：obj.fn(); this=>obj,如果想让obj.fn执行，this也是window该如何处理？
// 方法一：
obj.fn.call(window);//
// 方法二：
let obj1 = {
    fn: (() => () => {
        console.log(this)
    })()
}
let obj = {
    fn: (function () {
        return () => {
            console.log(this)
        }
    })
}
obj.fn();//this:window 箭头函数执行和是否有点，点前面是谁都没关系了，因为它没有自己的执行主体
//在箭头函数中使用到的this都是直接找上下文中的this来使用（上下文===上级作用域）