


/**
 * 当前函数执行，形成一个私有作用域A，A的上级作用域是谁，和他在哪儿执行的没有关系，和他在哪儿创建的有关系，在哪儿
 * 创建的，他的上级作用域就是谁
 */
var a = 12;

function fn(){
    console.log(a)//12
    /**
     * arguments:实参集合
     * 严格模式不让用：callee\caller
     * arguments.callee:函数本身FN 
     * arguments.callee.caller:当前函数在哪儿执行的，如果是全局执行的就是null;caller记录的是他执行时候的宿主环境
     * 
     * 
     */
}
function sum(){
    var a = 120;
    fn();
}
sum()



var n = 10;
function fn(){
    var n = 20;
    function f(){
        n++;
        console.log(n)
    }
    f();
    return f;
}
var x = fn();

x();
x();
console.log(n);
/**
 * 21
 * 22
 * 23
 * 10
 */