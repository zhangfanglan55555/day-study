var a = 12;
if(true){
    console.log(a);//Cannot access 'a' before initialization 初始化前无法访问'a'
    let a = 13;//基于let声明，会把大部分{}当成一个块级私有作用域，在这里也会重新检测语法看是否基于新语法创建
}


console.log(typeof b);//'undefined' 在原有浏览器渲染机制下，基于typeof  等逻辑运算符检测一个未被声明过的变量，不会报错，
// 会返回'undefined'


console.log(typeof a );//Cannot access 'a' before initialization 初始化前无法访问'a'
let a ;//如果当前作用域下变量使用let声明，再声明之前使用typeof检测不会发生js暂时性死区，会直接报错


/**
 * 暂时性死区：只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响
 */