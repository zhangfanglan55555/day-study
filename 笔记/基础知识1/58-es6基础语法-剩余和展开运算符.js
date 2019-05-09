/**
 * "..."在es6的语法中，有三种含义：
 *  1.剩余运算符
 *  2.拓展运算符
 *  3.展开运算符：把数组（对象/类数组）中的每一项展开
 */

let ary = [12, 23, 34];
let [...arg] = ary;//把数组中的每一项都赋值给arg,相当于ary.slice(0)


function fn(context, ...arg) {
    //获取传递值中的第一个和剩下的
    console.log(context);//obj
    console.log(arg);//[10,20,30,40]
    // arg是一个数组，arguments是类数组
}
fn(obj, 10, 20, 30, 40)

function sum(...arg) {
    console.log(arg);
    //此时arg和arguments是一样的，区别是arg是数组，arguments是一个类数组
}

//展开运算符：把数组（对象/类数组）中的每一项展开

let ary = [12, 23, 34];
Math.max(...ary);//相当于Math.max(12,23,34)


let fn = function (a, b, c) {
    console.log(a, b, c);//a:12,b:23,c:34
}
fn(...ary);//把数组中的每一项分别传递给一个函数，此时我们使用展开运算符把数组展开即可


//把当前对象克隆一份
let obj = { name: 'xxx', age: 20 };
let newObj = { ...obj, sex: 0 };
//newObj:{name:'xxx',age:20,sex:0}

let ary = [12, 23, 34]
let newAry = [...ary, 100];//[12,23,100]