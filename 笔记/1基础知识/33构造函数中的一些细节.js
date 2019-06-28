/**
 * 构造函数执行，不写return，浏览器会默认返回创建的实例，但是如果我们自己写了return
 * 1.如果返回的是一个基本值，返回结果与依然是类的实例，没有收到影响
 * 2.如果返回的是引用值，则会把默认返回的实例覆盖，此时接收的结果就不再是实例了。
 * 
 * 构造函数实行的时候尽量减少return的使用，防止覆盖实例
 */
function Fn() {
    var n = 10;
    this.m = n;
    return;//这样RETURN是结束代码执行的作用，并且不会覆盖返回的实例。
    console.log(m)
}
var f = new Fn();   //在构造函数执行的时候如果Fn不需要传递实参，我们可以省略小括号，意思还是创建实例（和加小括号没有区别）
var f = new Fn;
console.log(f);

/**
 * instanceof:判断一个对象是否是另一个对象的实例
 */
f instanceof Fn;//true;
f instanceof Array;//false;
f instanceof Object;//true(万物皆对象：所有的对象，包含创建的实例都是Object的实例)

1 instanceof Number;//false
new Number(1) instanceof Number // true
/**
 *  instanceof判断一个对象是否是另一个对象的实例，而数字1是基本数据类型，不是对象，
    var a = new Number(1)；是通过包装类Number把数字1转换成对象
 */


// in 检测 当前对象是否存在某个属性，不管当前这个属性是对象的私有属性还是公有属性，只要有，结果就是true
'属性名' in 对象

//hasOwnProperty 检测当前属性是否为对象的私有属性(不仅要有这个属性，而且必须是私有的)
对象.hasOwnProperty('属性名')
/**思考：编写一个方法，hasPubPrototype,检测当前属性是否为对象的公有属性和hasOwnPrototype对应   */

function Fn() {
    this.m = '20'
}
var f = new Fn();

function hasPubProperty(obj, attr) {
    if (attr in obj && !obj.hasOwnProperty(attr)) {
        return true
    } else {
        return false
    }
}
console.log(hasPubProperty(f, 'm'))
console.log(hasPubProperty(f, 'valueOf'))