// 如果名字重复了，不会重新声明，但会重新定义（重新赋值）[不管是变量提升还是代码执行都如此]
fn();
function fn(){console.log('1')}
fn();
function fn(){console.log('2')}
fn();
var fn = 100;
fn();
function fn(){console.log('3')} 
fn()
function fn(){console.log('4')}
fn()

 /**
  * 4
  * 4
  * 4
  * fn is not a function
  */
 