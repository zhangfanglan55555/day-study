function Foo() {
    getName = function () {
        console.log(1)
    }
    return this;
}
Foo.getName = function () {
    console.log(2)
}
Foo.prototype.getName = function () {
    console.log(3)
}
var getName = function(){
    console.log(4)
}
function getName(){
    console.log(5)
}
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new  Foo().getName();
new new Foo().getName();


/***
 * 2 //把Foo当作一个对象，找Foo的私有属性
 * 4 // 执行全局下的getName
 * 1 // 先把Foo当作普通函数执行，执行返回的结果再调取getName执行。返回结果this是window
 * 1  
 * 2  // 把Foo.getName()作为一个整体，.的优先级比new优先级高
 * 3  //先new Foo()作为一个整体；
 * 3 // 
 */
/**
 * 运算符优先级：
 * 
 */

/**
 * 函数有三种角色
 *  1.普通函数
 *      堆栈内存释放
 *      作用域链
 *
 *  2.类
 *     prototype原型
 *     __proto__原型链
 *     实例
 *  3.普通对象
 *      和普通的一个对象没啥区别，就是对键值对的增删改查
 *
 * 三种角色间没有什么必然关系
 */

function Fn() {
    var n = 10;
    this.m = 100;
}
Fn.prototype.aa = function () {
    console.log('aa')
}
Fn.bb = function () {
    console.log('bb')
}
//普通函数
Fn();// this:window,有一个私有变量n,和原型以及私有属性bb没有关系
// 构造函数
var f = new Fn();//this:f,
f.n;//undefined,n是私有变量和实例没有关系
f.m;//100 实例的私有属性
f.aa();//'aa'  实例通过__proto__找到Fn.prototype上的方法
f.bb();//bb is not a function



