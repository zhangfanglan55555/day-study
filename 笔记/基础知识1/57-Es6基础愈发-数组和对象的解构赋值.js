// 基于es6中的展开运算符完成
// 求最大值：最优写法
let max = Math.max(...ary);


/**
 * 解构赋值：按照一个数据值的结构，快速解析获取到其中的内容。
 * 1.真实项目中一般都是针对数组或者对象进行解构赋值
 */

let ary = [12, 23, 34];
let [a, b, c] = ary;//=>让等号左边出现和右边相同的数据结构，左边可以创建一些变量快速获取到右侧对应位置的值（解构赋值）
// a:12 b:23 c:34

let [a] = ary;;//a=>12


let [, , c] = ary; //c =>34

let [a, , c] = ary; //a=>12,c=>34

let [a, ...newAry] = ary;
/**
 * ...在此处称之为剩余运算符：除了前面以外的项，都放在一个数组中
 * newAry = [23,34]
 */

let [a, ...b, c] = ary;//Uncaught SyntaxError:Rest element must be last element
//  剩余运算符处于解构中最后的位置


let ary = [12];
let [a, b = 0] = ary;//在解构的时候可以给变量设置默认值：如果当前变量对应
//结构中的这一项没有值，变量用默认值
console.log(a, b);
// a:12,b:0



// a&b交换位置
let a = 12, b = 13;
let c = a;
a = b;
b = c;


a = a + b;
b = a - b;
a = a - b;


[a, b] = [b, a];


// ====数组的解构赋值====



// ====对象的解构赋值====
let obj = { name: 'xxx', age: 25, sex: 0 };

let { name, age } = obj;//对象解构赋值默认情况下要求：左侧变量名和对象中的属性名一致才可以。

console.log(name, age);//xxx 25


let { sex } = obj;
console.log(sex);//0


// 给解构的属性名取别名作为使用的变量
let { name: nameAA } = obj
console.log(nameAA);//xxx


let { friend: friendAA } = obj;

console.log(friendAA);//undefined

let { friend = 0 } = obj;//给不存在的属性设置默认值



let fn = function ({
    name = '珠峰',
    age = 0
} = {}) {//把传递的对象解构了（不传递值，默认赋值为空对象：现在传递对象或者
    // 不传递，形参接收到的都是对象）,解构的时候，可以把传递进来的对象中，如果某个属性
    // 不存在，我们赋值默认值
    console.log(name, age)

}
fn({
    name: "xxx",
    age: 25
})

// 题目
let value = { name: 'xxx', age: 25, score: [12, 23, 34, 45] };
// a = 'xxx'
// b = 12
// c = [23, 34, 45]

// let { name: a } = value
// let [b, ...c] = value.score

let { name: a, score: [b, ...c] } = value