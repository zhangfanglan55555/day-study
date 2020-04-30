function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}
function select(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    for (let j = min + 1; j < arr.length; j++) {
      if (ar[j] < arr[min]) {
        min = j;
      }
      swap(arr, min, j)
    }
  }
}
console.log(select([9, 2, 88, 0]))