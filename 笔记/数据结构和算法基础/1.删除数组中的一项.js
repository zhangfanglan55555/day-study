/***
 * js中的数组结构是浏览器进步一封装好的
 *  1.存储任意数据类型
 *  2.容量自动缩放（自动扩容）
 *  3.Array.prototype原型上提供很多数组实例操作的方法
 * 
 */

let arr = [1, 2, 3, 4, 5]
arr.splice(1, 0, 100);//在索引为1的位置前面删除0个插入一个
arr.shift();//头部弹出（删除）一个元素
// 1.后面每一项的索引都会改变（消耗性能的）
// 2.数组塌陷问题

// 删除指定某一项的优化
// 性能优化
arr.splice(1, 1);//
// 优化方式：在不考虑顺序的情况下，我们让最后一项替换当前项，再删除最后一项
arr[1] = arr[arr.length - 1];
arr.length--;

// 塌陷问题
let arr = [10,20,30,40,50]
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);//跳过了一个30
  if(i === 1){
    arr.splice(i,1);//=>[10,30,40,50]，索引变了，但是步长还是在累加
    i--;//改变的值就可以解决跳过30的问题
  }
}