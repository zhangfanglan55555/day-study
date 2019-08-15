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


// 拓展运算符  
// 1.复制数组和复制对象（深拷贝）
//把当前对象克隆一份
let obj = { name: 'xxx', age: 20 };
let newObj = { ...obj, sex: 0 };
//newObj:{name:'xxx',age:20,sex:0}

let ary = [12, 23, 34]
let newAry = [...ary, 100];//[12,23,100]
// 2合并数组和合并对象
const a = [1, 2, 3]
const b = [4, 5]
console.log([...a, ...b])

// 3.类数组对象数组化
// [...arg]
// 4.代替 apply 方法(展开运算符)
let fn = function (a, b, c) {
    console.log(a, b, c);//a:12,b:23,c:34
}
fn(...ary);


// 剩余操作符
// 剩余操作符将多个值收集为一个变量，而扩展操作符是将一个数组扩展成多个值。
const [a, ...b] = [1, 2, 3]

console.log(a) // 1
console.log(b)