/**
 * 正则捕获：把一个字符串中和正则匹配的部分获取到
 *  [正则]
 *      exec
 *      test
 *  [字符串]
 *      replace
 *      split
 *      match
 */

 /**
  *基于EXEC可以实现正则的捕获
    1. 如果当前正则和字符串不匹配，捕获的结果是NULL
    2. 如果匹配，捕获的结果是一个数组
        0：大正则捕获的内容
        index：正则捕获的起始索引
        input:原始操作的字符串
    3. 执行一次EXEC只能捕获到第一个和正则匹配的内容，其余匹配的内容还没有捕获到，而且多次
        执行并不会继续向下捕获=>[正则的捕获有懒惰性]：只能捕获到第一个匹配的内容，剩余的
        默认捕获不到

  */
let str = 'zhufeng2018peixun2019';
let reg = /\d+/;
//  \d+ 出现多个1到多个0~9之间的数字

reg.test(str);//true
reg.exec('zhufengpeixun');//null
reg.exec(str);//["2018",index:7,input:'zhufeng2018peixun2019'，...]
//LAST-INDEX不变导致了正则捕获的懒惰性
reg.lastIndex;//正则捕获的时候，下一次在字符串中开始查找的索引

reg.exec(str);//[2018,index:7]
reg.lastIndex;//0 执行多次都是0

//即使我们手动修改了LAST-INDEX然而也没有用

reg.exec(str);//[2018]
reg.lastIndex = 11;
console.log(reg.lastIndex);//11
reg.exec(str);//[2018]


/**
 * 解决正则懒惰性，我们需要加全局修饰符g(这个是唯一的防范，而且不加g不管用什么办法捕获，也都
 * 不能把全部匹配的捕获到)
 */
let str = 'zhufeng2018peixun2019';
let reg = /\d+/g;
reg.lastIndex;//0
reg.exec(str);//[2018]
reg.lastIndex;//11
reg.exec(str);//[2019]
reg.lastIndex;//21
reg.exec(str);null
reg.lastIndex;//0


let str = 'zhufeng2018peixun2019yangfan2020qihang2021';
let reg = /\d+/g;

RegExp.prototype.myExecAll = function(str){
    // => this:实例 当前操作的正则
    // => str：我们要捕获的字符串
    //执行EXEC开始捕获，具体捕获多少次不定，但是一直到捕获不到内容（null）为止，期间把
    //捕获到的内容存储到数组中即可
    let result = [],valAry = this.exec(str);
    while (valAry){
    // while(this.lastIndex < str.length)
        result.push(valAry[0]);//把每一项正则捕获到的结果第一项（具体捕获的内容）存储到容器中
        valAry = this.exec(str)
    }
    return result;

}
reg.myExecAll();