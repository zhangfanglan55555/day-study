/**
 * 栈 Stack 
 * 1.后进先出 LIFO （last in first out)
 * 2.只能在一端操作
 * 
 */
// 模拟有限制的数组结构就是栈结构
class Stack {
  container = [];
  // constructor() {
  //   this.container = [];   es7中可以直接用 container = []
  // }
  // Stack.prototype 在原型上添加方法
  enter(element) {
    // 进栈 只能加到顶部
    this.container.unshift(element);
    // unshift 返回的是添加后数组的长度
  }
  leave() {
    // 出栈  只能删除顶部的
    return this.container.shift();
    // shift 方法返回的是删除的元素
  }
  size() {
    //  长度
    return this.container.length;
  }
  value() {
    // 内容
    return this.container;
  }
}
let sk = new Stack;


// 经典题
/**
 * 有6个元素，按照6 5 4 3 2 1的顺序进栈（中间可以随时出栈），问哪一个出栈不是合法的  C 
 * A: 5 4 3 6 1 2
 * B: 4 5 3 2 1 6
 * C: 3 4 6 5 2 1
 * D: 2 3 4 1 5 6
 */

//  把十进制数字转换为二进制
let num = 100;

console.log(num.toString(2));//把十进制数字转换为二进制

// 思路：把十进制数字和2整除（因为二进制是满2进1）
// 获取其余数 N % 2
// 获取其商数 N/2(整除后的结果)
// 用上一次的商数继续除以2，一直到商数为0为止；把所有的余数从尾部到顶部依次连接即可；

Number.prototype.decimal2binary = function decimal2binary() {
  let sk = new Stack,
    decimalNum = this.valueOf();
  if (decimalNum === 0) return '0';
  while (decimalNum > 0) {
    sk.enter(decimalNum % 2);
    decimalNum = Math.floor(decimalNum / 2);
    // Math.floor 只取整数部分
  }
  return sk.value().join('')
}
console.log((10).decimal2binary())
console.log((10).toString(2))