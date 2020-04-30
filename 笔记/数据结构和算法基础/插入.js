/*
 * @Author: zhangfanglan 
 * @Date: 2020-04-30 11:37:58 
 * @Last Modified by:   zhangfanglan 
 * @Last Modified time: 2020-04-30 11:37:58 
 */
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}
function insert(arr) {
  let handel = [];
  handel.push(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    let A = arr[i];
    for (let j = handel.length - 1; j >= 0; j--) {
      let B = handel[j];
      if (A > B) {
        handel.splice(j + 1, 0, A);
        break;
      }
      if (j == 0) {
        handel.unshift(A)
      }
    }
  }
  return handel;
}
console.log(insert([22, 1, 0, 38]))

function insert(arr) {
  let handel = [];
  handel.push(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    for (let j = handel.length - 1; j >= 1; j--) {
      if (arr[i] > handel[j]) {
        handel.splice(j + 1, 0, arr[i]);
        break;
      }
      if (j == 0) {
        handel.unshift(arr[i])
      }
    }
  }
  return arr;
}