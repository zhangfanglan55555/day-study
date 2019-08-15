/**
 * 在es6中使用let\const等方式创建的变量或者函数，不存在变量提升机制
 * 切断了全局变量和window的映射
 * 
 * 在相同作用域中，基于let不能声明相同名字的变量（不管使用什么方式在当前作用域下声明了变量，再次使用let创建都会报错）
 * 虽然没有变量提升，但是在当前作用域自上而下执行之前，浏览器会做重复性检测（自上而下查找当前作用域下所有变量，一旦发现有重复的
 * 直接抛出异常，代码不会再执行。也叫做语法检测.虽然没有把变量提前声明定义，但是浏览器已经记住了，当前作用域有哪些变量）
 */
console.log(a);//Cannot access 'a' before initialization 初始化前无法访问'a'
let a = 12;
console.log(window.a);//undefined



let a =10,b=10;
let fn = function(){
    console.log(a,b);//Cannot access 'a' before initialization 初始化前无法访问'a'  10
    let a = b =20;
    console.log(a,b);//20,20
}
fn();
console.log(a,b);//10,20

/**
 * 
 */