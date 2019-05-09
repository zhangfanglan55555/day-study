var ary = [12, 23];
function fn(ary) {
    console.log(ary);
    ary[0] = 100;
    ary = [100];
    ary[0] = 0;
    console.log(ary);
}
fn(ary);
console.log(ary);










/**
 * [12,23]
 * [0]
 * [100,23]
 */

 /**
  * 执行过程：
  * 全局变量ary指向内存地址AAAFFF001
  * fn(AAAFFF001)，将指针传给私有变量ary，
  * ary[0] 操作的是内存地址里面的值
  * ary = [100] 是重新赋值了个地址
  * 
  */