// 9、
var foo = 'hello';
(function (foo) {
    console.log(foo);
    var foo = foo || 'world';
    console.log(foo);
})(foo);
console.log(foo);


/**
 * hello
 * hello
 * hello
 */
/**
 * 变量提升：var foo
 * 代码执行：
 * ()(foo);把全局下的foo作为实参传递给函数的形参=》‘hello'
 * (function(foo){
 *      形参赋值：var foo = 'hello'
 *      变量提升：var foo(这一步省略，因为私有作用域中已经有foo这个变量，浏览器不会重新声明重复变量)
 *      console.log(foo);//hello
 *      foo = foo || 'world' 
 *      
 * })
 * 
 * [逻辑与&&] 和[逻辑或||]
 * 1.条件判断中
 */
if (1 == 1 && 2 == 2) {
    //条件中的&&：两个条件都成立，整体判断才成立
    //条件中的||：只要有一个条件成立，整理判断就成立
}
/**
 * 2.在赋值操作中有时，也会用到
 */
var a = 1 || 2;//'A||B'先验证A的真假，为真结果是A,为假结果是B
var b = 1 && 2;//'A&&B'先验证A的真假，为真结果是B,为假结果是A




function fn(x = 0, y = 0) {
    /**给形参赋默认值：验证传递的参数值，如果没有传递实参，让其默认值为0 */
    console.log(x);
    console.log(y)
}
fn(10)

function fn(x) {
    /**
     * 如果不传实参，x默认为0；
     */
    if (x === undefined) { x = 0 };
    if (typeof x === 'undefined') { x = 0 }
    x = x || 0;//=>如果x没传值，x = undefined,x = undefined || 0,x = 0;

}
fn()


function fn(callback) {
    /** **/
    callback && callback();
}
fn(function () { })

/**
 * 3.逻辑与和逻辑或的混合应用模式
 * 逻辑与的优先级高于逻辑或
 */
0 || 1 && 2 || 0 || 3 && 2 || 1;//2

/**
 * 4.逻辑或的实战应用：形参赋值默认值（初始化形参）
 * 在es6新语法规范中，可以直接给形参赋默认值
 */
function fn(x = 0) {

}
fn()
fn(undefined);//传递undefined,浏览器也会按照没传值处理，x = 0