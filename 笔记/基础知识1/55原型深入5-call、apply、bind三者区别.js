let fn = function (a, b) {
    console.log(this, a, b);
}
let obj = { name: "OBJ" }

fn.call(obj, 10, 20)

//this:obj 10 20

fn.call(10, 20);

// this:{10}  20 undefined

fn.call()
fn.call(undefined)
fn.call(null)
//this:window undefined undefined

/**
 * call中的细节：
 * 1.非严格模式下，如果不传参或者传递的null、undefined,this指向window
 * 2.再严格模式下，第一个参数是谁，this就指向谁（包括null、undefined）不传，
 *   this是undefined
 */

/**
 * [apply]、[bind] 在细节上是一样的
 */
/**
 * apply:和call基本上一模一样，只有一个唯一的区别：传参方式；
 *     fn.call(obj,10,20)
 *     fn.apply(obj,[10,20])
 *      apply把需要传递给fn的参数放到一个数组或者类数组中传递进去，虽然写的是一个数组，
 *      但是也相当于是给fn一个一个的传
 */
/**
 * bind:语法和call一模一样，唯一的区别：立即执行还是等待执行
 *      fn.call(obj,10,20); 改变fn中的this并且把fn立即执行
 *      fn.bind(obj,10,20); 改变fn中的this,此时fn并没有执行（不兼容ie6~8)
 */


document.onclick = fn; //=>点击的时候执行fn,把fn绑定给点击事件
document.onclick = fn();//在绑定的时候，先把fn执行，把执行的返回值（Undefined）绑定给事件

document.onclick = fn.call(obj);//虽然this确实改为obj了，但是绑定的时候就把fn执行了(call是立即执行函数),点击
//  的时候执行的是fn的返回值

document.onclick = fn.bind(obj);//bind属于把fn中的this预处理为obj,此时fn没有执行，当点击的时候才会把fn执行
