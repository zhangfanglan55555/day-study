let str = 'zhufeng2018peixun2019';
let reg = /\d+/g;
reg.test(str);//true
reg.lastIndex;//11 基于test进行匹配的时候，如果设置了G，test匹配也相当于捕获
// 修改了LAST-INDEX的值
reg.exec(str);//['2019']



let str = 'zhufeng2018';
let reg = /\d+/g;

if (reg.test(str)) {
    reg.exec(str);//null
}

let str = 'zhufeng2018';
let reg = /\d+/;

if (reg.test(str)) {
    reg.exec(str);//['2018']
}

let str = 'zhufeng2018';
let reg = /\d+/g;

reg.exec(str);//['2018'] 把reg.lastIndex值修改了
reg.exec('zhufeng2018peixun2019');
//['2019'] 虽然捕获的不是同一个字符串，但是正则是同一个，上一次正则处理的时候
// 修改了他的lastIndex，也会对下一次匹配新的字符串产生影响


let str = 'xuexi2018';
let reg = /\d+/g;

console.log(reg.exec(str))
console.log(reg.exec('xuexi2018happy2019'));



let str = 'zhufeng2018peixun2019';
let reg = /(\d+)/g;
console.log(reg.test(str));//true
RegExp.$1;//‘2018’ 把上一次匹配（test/exec)到的结果获取到，获取的
// 是第一个小分组匹配的内容，大正则匹配的内容无法获取,它是一个全局的值，
// 浏览器中$1只有一个，其他的正则操作也会覆盖这个值，所以这种方式没啥用
console.log(reg.test(str));//true
RegExp.$1;//‘2019’
console.log(reg.test(str));//false
RegExp.$1;//‘2019’


/**
 * REPLACE：实现正则捕获的方法（本身是字符串替换）
 *   
 */
let str = 'zhufeng2018zhufeng2019';//=> 'zhufeng' => 'zhufengpeixun'
//真实项目中很多需求不基于正则是无法替换的
str = str.replace('zhufeng', 'zhufengpeixun');
//str => zhufengpeixun2018zhufeng2019
str = str.replace('zhufeng', 'zhufengpeixun');
//str => zhufengpeixunpeixun2018zhufeng2019


str = str.replace(/zhufeng/g, 'zhufengpeixun');
//str=> zhufengpeixun2018zhufengpeixun2019

// =======================REPLACE原理
let str = 'zhufeng{val:2018}zhufeng{val:2019}',
    reg = /\{val:\d+\}/g;
str = str.replace(reg, '@');//用reg正则和str字符串进行匹配，匹配几次就替换几次，
// 每一次替换都是把当前”大正则“匹配的结果用第二个传递的字符串替换掉了
console.log(str)//zhufeng@zhufeng@


reg = /\{val:(\d+)\}/g
str = str.replace(reg,'$1');//$1不是拿这个字符串替换掉大正则匹配的内容，此处的$1代表第一个
// 分组匹配的内容，等价于RegExp.$1.
console.log(str);//‘zhufeng2018zhufeng2019'


/**
 * 1.reg 和 str 匹配多少次，函数就被触发执行多少次，而且传递了一些参数信息值
 * 2.每一次arg中存储的信息，和执行exec捕获的信息相似（内置原理：每一次正则匹配到结果，都把
 * 函数执行，然后基于exec把本次匹配的信息捕获到，然后把捕获的信息传递给这个函数）
 * 3.每一次函数中返回的是啥，就把当前大正则匹配的结果替换成啥
 */
str = str.replace(reg,(...arg)=>{
    console.log(arg);
})