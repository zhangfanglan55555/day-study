// 6.
let a = { n: 4 };
let b = a;
b.x = a = { n: 10 };
console.log(a.x)
console.log(b.x)


/**
 * undefined
 * {n:10}
 */

function C1(name) {
    if (name) this.name = name;//没有给实例this设置私有属性
}
function C2(name) {
    this.name = name;//给实例this设置私有属性name:undefined
}
function C3(name) {
    this.name = name || 'join';//undefined || 'join' => 'join'
}
C1.prototype.name = 'Tom';
C2.prototype.name = 'Tom';
C3.prototype.name = 'Tom';
console.log(new C1().name + new C2().name + new C3().name)

/**
 * new的时候没传参name默认值都是undefined
 * Tomundefined join
 */

//  undefined&&'join' => undefined


// 9.
let Fn = function (x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.getX = function () {
        console.log(this.x)
    }
}
Fn.prototype.getY = function () {
    console.log(this.y)
}
Fn.prototype = {
    setX: function (val) {
        this.x = val;
    },
    getX: function () {
        console.log(this.x)
    }
}
let f1 = new Fn;
let f2 = new Fn(1, 2)
console.log(f1.constructor);
f1.setX(3);
f1.getX();
f1.__proto__.getX();
f1.__proto__.setX(4);
f2.getX();
f2.__proto__.getx();
f2.getY();

/**
 *  Object
 *  undefined
 * 1
 * 4
 * f2.getY()不存在 undefined()报错
 * 
 */