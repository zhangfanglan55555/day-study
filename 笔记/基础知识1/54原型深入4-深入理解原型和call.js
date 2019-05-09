/**
 * 用来改变某一个函数中this关键字指向的
 * call
 * apply
 * bind
 */
window.name = '珠峰'
let fn = function () {
    console.log(this.name)
};
let obj = {
    name: "OBJ",
    fn: fn
}
obj.fn();//OBJ  this=>obj
fn();//珠峰 this=> window

let oo = { name: 'OO' }

/**
 * call:
 *  1.[fn].call([this],[param])；
 *      fn.call:当前实例（函数FN）通过原型链的查找机制，找到Function.prototype上的
 *   call方法 =》 function call(){[native code]}
 *      fn.call():把找到的call方法执行
 *          当call方法执行的时候，内部处理了一些事情
 *             =》 首先把要操作函数中的this关键字变为call方法第一个传递的实参，
 *             =》 把call方法及第二个及第二个以后的实参获取到
 *             =》 把要操作的函数执行，并且把第二个以后传递进来的实参传给操作的函数
 */
fn.call(oo);//oo this=>oo
fn.call(obj);//OBJ this=> obj

ary.slice


Function.prototype.mycall = function () {
    let param1 = arguments[0];
    paramOther = [];//把arg中除了第一个以外的实参获取到
    // => this : fn 当前要操作的函数（函数类的一个实例）
    // 把FN中的this关键字修改为param1 => 把this(call中)的this关键字修改为param1

    // => 把fn执行，把paramOther分别传递给fn
    // this(paramOther) 

}
fn.mycall(obj, 12, 13, 14)


let sum = function (a, b) {
    console.log(this);
}
let opt = { n: 20 }
sum.call(opt, 20, 30)
/**
 * sum.call(opt,20,30);
 * call执行 call中的this是sum,把this(call中的)“this”关键字改为
 * opt,把this(call中的)执行，把20，30分别传给它
 * sum中的this:opt a=20,b=30
 */
sum.call.call(opt)
/**
 * 1.sum.call：找到Function.prototype.call方法（也是一个函数，也是函数类的一个实例，也可以继续调用call/apply等方法）=》A（也是一个函数）
 * 2.A.call(opt):继续找原型上的call方法，把call方法执行：把A中的this关键字修改为opt，然后把A执行
 */

// Function.prototype.call = function callAA(){
//     /**
//      * 1.把this(FN)中的"THIS关键字“修改为第一个参数值（OBJ）
//      * 2.把THIS（FN）执行，把第二个及以后接收的参数值传递给函数（10，20）
//      *  this(10,20)
//      */
// }
// fn.call(obj)


function fn1() { console.log(1)}
function fn2() { console.log(2)}

fn1.call(fn2);
fn1.call.call(fn2);
Function.prototype.call(fn1);
Function.prototype.call.call(fn1);

//一个call执行前面的，两个及两个以上的call让后面的执行
/**
 * 1
 * 2
 * 1
 * undefined
 */

