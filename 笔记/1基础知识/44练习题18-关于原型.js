
/***
 * 1.函数（类）都有一个prototype属性，这个属性的值是一个对象,存储供实例使用的公有属性
 * 和方法
 * 2.浏览器默认开辟prototype对象里的堆内存中有一个默认属性constructor
 * 3.对象自带一个__proto__属性，指向所属类的prototype，不知道是谁的指向
 * Object.prototype)
 */


/**
 * 在实际项目基于面向对象开发的时候（构造原型设计模式），我们根据需要，很多时候会重向类的原型（让类的原型指向自己开辟的堆内存）
 * [存在的问题]
 * 1.自己开辟的堆内存中没有constructor属性，导致类的原型构造函数缺失（解决方案：自己手动在堆内存中增加constructor属性）
 * 2.当原型重定向后，浏览器默认开辟的那个原型堆内存会被释放，如果之前已经存储了一些方法或者属性，这些东西都会丢失（所以
 * 内置类的原型不允许重定向到自己开辟的堆内存，因为内置类原型上自带很多属性方法，重定向后都没了，这样是不被允许的）
 */
function Foo() {
    getName = function () {
        console.log(1)
    }
    return this;
}
Foo.getName = function () {
    console.log(2);
}
Foo.prototype.getName = function () {
    console.log(3)
}
function getName() {
    console.log(5)
}
Foo.getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();


/***
 * 
 * 2
 * 5
 * 2
 * 3
 * 3
 */



function fun() {
    this.a = 0;
    this.b = function () {
        alert(this.a);
    }
}
fun.prototype = {
    b: function () {
        this.a = 20;
        alert(this.a)
    },
    c: function () {
        this.a = 30;
        alert(this.a)
    }
}
var my_fun = new fun();
my_fun.b();
my_fun.c();


/***
 * 0
 * 30
 */


/**
 * [私有属性]:自己堆内存中存储的属性，相对自己来说是私有的
 * [共有属性]：自己基于__proto__找到的属性，相对自己来说是公有的
 */
