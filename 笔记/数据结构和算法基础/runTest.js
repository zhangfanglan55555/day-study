/*
 * @Author: zhangfanglan 
 * @Date: 2020-04-30 13:55:32 
 * @Last Modified by: zhangfanglan
 * @Last Modified time: 2020-04-30 13:57:29
 */
let arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];
while (arr.some(item => Array.isArray(item))) {
  arr = [].concat([...arr])
}
console.log(1)
console.log(arr)