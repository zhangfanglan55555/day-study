/***
 * 定时器：设定一个定时器，并且设定了等到的时间，当到达指定的时间，浏览器会把
 * 对应的方法执行。
 * [常用定时器]
 *  setTimeout([function],[interval])
 *  setInterval([function],[interval])
 *  
 *   [function]：到大时间后执行的方法（设置定时器的时候方法没有执行，
 * 到时间浏览器帮我们执行）
 *   [interval]：时间因子（需要等待的时间，单位ms）
 *   setTimeout 是执行一次的定时器，setInterval是可执行多次的定时器
 */
// 执行一次
let count = 0;
setTimeout(()=>{
    count++;
    console.log(count);//1
},1000)

// 轮训定时器：每间隔interval这么长的时间，都会把设定的方法重新执行一次
// 直到定时器被清除
let count = 0;
setInterval(()=>{
    count++;
    console.log(count);//1，2，3，4，5.....
},1000)

// 清除定时器
// clearTimeout/clearInterval:这两个方法中的任何一个都可以清除任何
// 方法创建的定时器
// 1.设置定时器会有一个返回值，这个值是一个数字，属于定时器的编号，代表当前
// 是第几个定时器（不管是基于setTimeout 还是setInterval创建的定时器，这个编号都会累加）
// 2.clearTimeout([timer序号])/clearInterval([timer序号]):根据序号清除浏览器中
// 设定的定时器
let count = 0;
let timer = setInterval(()=>{
    count++;
    if(count === 10){
        // 清除定时器
        clearInterval(timer)
        // 或者clearTimeout(timer)
    }
    // console.log(count);//1，2，3，4，5.....
},1000)
let timer2 = setTimeout(()=>{},1000);
