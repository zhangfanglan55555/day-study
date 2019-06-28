// 1.
if ('m' in window) {
    var m = m && 12;
}
console.log(m);

let n = 10;
if (!('n' in window)) {
    let n = n + 30
}
console.log(n)


/**
 * undefined  undefined&&12 取undefined
 * 过程：
 *      变量提升
 *      var m; 基于var声明全局变量，也相当于给window设置了一个属性 window.m = undefined(
 *  Es6中基于let声明的全局变量和window没啥关系)
 *     运行： 'm' in window =》 true
 *            undefined&&12 => undefined m = undefined
 *
 * 第二题答案：报错
 * 词法分析：所有的js代码执行之前，浏览器都会进行词法检测和分析，其中有一件事情就是查看当前变量
 * 是基于哪种规范声明的
 * let n = 10;//window.n => window下没有n这个属性
 * 'n' in window -> false !-> true
 * if(!('n'inwindow)){
 *  词法分析（不是提前声明）
 *      let n 
 *          1) 当前变量n是块级作用域的私有变量
 *          2） n是基于es6规范创建的（不会提前进行变量提升）
 *  
 *  1.let会产生块级私有作用域
 *  let n = n + 3;=> let n = 13;赋值操作是先准备值，然后再声明变量，再给变量赋值。（
 *     n是基于es6规范创建的，在当前操作中，先处理n+30,然后再声明n,然后再赋值，但是n+30的时候
 *     此时块级作用域中的n还没有声明，所以直接报错 n is not defined）
 * ）
 * }
 * 
 * 
 */
let n = 10;
{
    let n = 20;
    {
        console.log(n);//n is not defined
        let n = 30;
    }
    console.log(n);//20
}


// 2.
let n = 10, m = 20;
~function (n, m) {
    let arg = arguments;
    arg[0] = n || 100;
    arg[1] = m || 200;
    console.log(n, m);
}(m);
console.log(n, m)


/**
 * 20 undefined
 * 10 20 
 */

//  3.
let ary = [12, 23, 34, 45];
(function(ary){
    ary.pop();
    ary = ary.slice(0);
    ary.shift(); 
    console.log(ary);
})(ary)
console.log(ary)

/**
 * [23,34]
 * [12,23,34]
 */
// slice从哪开始截取返回新数组