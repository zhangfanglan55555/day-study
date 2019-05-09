/**
 * 变量提升：
 * var fn; 当作一个普通变量来处理，默认值为undefined
 * sum = AAAFFF111,声明加定义
 */
fn();//fn is not a function
sum();
// 匿名函数表达式
var fn = function(){
    console.log('1')
}

// 普通的函数
function sum(){
    console.log('2')
}