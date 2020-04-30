/*
 * @Author: zhangfanglan 
 * @Date: 2020-04-30 13:30:24 
 * @Last Modified by: zhangfanglan
 * @Last Modified time: 2020-04-30 13:54:47
 */
/*
 * @Author: zhangfanglan 
 * @Date: 2020-04-29 18:08:12 
 * @Last Modified by: zhangfanglan
 * @Last Modified time: 2020-04-30 13:24:08
 */
let arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];
console.log(arr.flat(Infinity))
var repl = /(\[|\])/g;

console.log(JSON.stringify(arr).replace(repl, '').split(',').map(item => Number(item)));

// 方案一
ary.flat(Infinity)
/** 
 * flat里面可以指定转
 */
// 方案二 使用JSON.stringify+正则+split+map
JSON.stringify(arr).replace(/(\[|\])/g, '').split(',').map(item => Number(item))

// 方案三  直接toString+split+map

arr = arr.toString().split(',').map(item => Number(item))


// 方案四 while + some + Array.isArray + [].concat();
while (arr.some(item => Array.isArray(item))) {
  arr = [].concat(...arr)
}