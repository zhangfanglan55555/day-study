

//  6、
var a = 10, b = 11, c = 12;
function test(a) {
    a = 1;
    var b = 2;
    c = 3;
}
test(10);
console.log(a)
console.log(b);
console.log(c);

/**
 * 10
 * 11
 * 3
 */

// 7、
if(!("a" in window)){
    var a = 1;
}
console.log(a);
/**
 * 不管条件是否成立都要进行变量提升，在全局作用域下声明的变量
 * ，也相当于给window设置了一个对象的属性，两者建立了映射的机制《=》 window.a = undefined
 * in:检测某一个属性是否隶属于这个对象，不管是私有属性还是公有属性；只要有这个属性结果就是true
 * hasOwnProperty:检测某一个属性是否为对象的私有属性（只有这个属性是私有的才可以）
 *
 * undefined
 */

//  8、
var a = 4;
function b(x,y,a){
    console.log(a);
    arguments[2] = 10;
    console.log(a);
}
a = b(1,2,3);
console.log(a);

/**
 * 全局变量提升：var a , b = aaafff000;
 * 自上而下执行：
 *      a = 4;
 *      a = b(1,2,3)=>undefined;(b执行里面没有return，默认函数返回undefined)
 *  function b(){
 *      形参赋值：x = 1,y=2,a = 3
 *      变量提升：无
 *      >arguments是个类数组对象,是函数内置的实参集合，不管设不设置形参，传递的实参值都在这个集合中存在
 *         {
    *          0:1,
    *          1:2,
    *          2:3
    *          length:3,
    *          callee:函数本身
 *          }
 *       [在Js的非严格模式下，函数中的形参变量和arguments存在映射机制]
 *  }
 */

/**
 * 3
 * 10
 * undefined
 */

 function fn(x,y){
     var arg = arguments;
     arg[0] =  100;
    //  console.log(x);//100
     y = 200;
    //  console.log(arg[1]);//undefined;
    //  console.log(arguments);//0:100
     arg[1] = 300;
     /**
      * arg:
      *     0:100
      *     1:300
      *     length:2
      */
     console.log(y);//200
 }
 fn(10) 
 /**
  * argumengts与形参的映射机制建立在函数执行后形参赋值的一瞬间， 此时能建立映射机制的建立映射机制，以后不管
  * 怎么操作都无法建立映射了
  * 实参和形参一一对应，有一个没对应，那么那个映射就不存在
  */

/**
 * JS严格模式：
 *  在当前作用域的第一行加上：“use strict“即可，这样在当前作用域中就开启了JS的严格模式
 *  use strict
 */

 "use strict" //在第一行写，整个js都开启了严格模式，只对当前js文件中的代码生效，下一个JS文件需要开启模式，还需要再次编写

 function fn(){
     "use strict";//只在当前作用域使用严格模式
 }
 /**
  * 1.在严格模式下，不允许使用arguments.callee
  * 2.在严格模式下，arguments和形参没有映射机制
  * 3.在严格模式下，不允许给一个对象设置重复的属性名
  * 4.在严格模式下，函数执行，如果没有明确制定执行主体（函数前面没有点），不再像非严格模式下一样，
  * 而是让this指向undefined,代表没有执行主体
  */

  ~function fn(){
      function f(){
          console.log(this);//严格模式下是undefined,非严格模式下是window，而是让this指向undefined，代表没有
          //执行主体：“在严格模式下，有执行主体this就指向谁，没有执行主体this就指向undefined
      }
      f();
  }()