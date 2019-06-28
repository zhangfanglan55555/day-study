// 函数的三种表现形式：普通函数、构造函数（类）、对象

function Fn(){
    this.n = 100;
}
//类
Fn.prototype.getN = function(){
    console.log(this.n)
}
Fn.AA = 200;//对象
Fn();//普通函数
// 构造函数
var f = new Fn();


/**
 * 图在有道笔记里面
 * 只要是函数永远都是内置Function这个类的一个实例
 */
Function.prototype === Function.__proto__ ;//true

Object.prototype.hasOwnProperty === Object.hasOwnProperty;//true
//                                  Object.__proto__.__proto__.hasOwnProperty
