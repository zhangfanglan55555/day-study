/*
 * @Author: zhangfanglan 
 * @Date: 2020-04-29 18:08:28 
 * @Last Modified by: zhangfanglan
 * @Last Modified time: 2020-04-30 11:37:09
 */
function quick(ary) {
  if (ary.length <= 1) {
    return ary;
  }
  let middleIndex = Math.floor(ary.length / 2);
  let middleValue = ary.splice(middleIndex, 1)[0];//从原数组中中删除拿出来
  let aryLeft = [], aryRight = [];
  for (let i = 0; i < ary.length; i++) {
    if (ary[i] > middleValue) {
      aryRight.push(ary[i])
    } else {
      aryLeft.push(ary[i])
    }
  }
  return quick(aryLeft).concat(middleValue, quick(aryRight))
}
console.log(quick([9, 2, 20, 8]))


function quick(arr) {
  let middleIndex = Math.floor(arr.length / 2),
    middleValue = arr.splice(middleIndex, 1)[0]
  if (arr.length <= 1) {
    return ary;
  }
  let leftAry = [], rightAry = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < middleValue) {
      leftAry.push(arr[i])
    } else {
      rightAry.push(ary[i])
    }
  }
  return quick(leftAry).concat(middleValue, quick(rightAry))
}