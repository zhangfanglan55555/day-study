/**
 * 队列结构 - Queue
 * 1. 先进先出 FIFO(fist in frist out)
 *    进入队列：是添加到后面
 *    移除队列：移除最开始的这个
 * => 优先级队列
 */

class Queue {
  container = [];
  enter(element) {
    // 进入队列
    this.container.push(element)
  }
  leave() {
    // 弹出队列
    return this.container.shift();
  }
  size() {
    return this.container.length;
  } 
  value() {
    return this.container
  }
}

//面试题 ：击鼓传花 
// N个人一起玩游戏，围成一圈，从1开始数数，数到M的人自动淘汰；
// 最后剩下的人会取得胜利，问最后剩下的是原来的哪一位；
// n - 多少人来玩
// m - 数到m的人移除掉
function game(n, m) {
  let qe = new Queue;
  // 把人分别放到队列当中  [1,2,3,4...,n]
  for (let i = 0; i < n; i++) {
    qe.enter(i + 1)
  }
  // 直到队列中只有一项，就是剩下的一个人
  while(qe.size()>1){
    // 如果 m = 3;前两个都是移除队列并放到队列的末尾
    for(let i = 0;i<m-1;i++){
      qe.enter(qe.leave())
    }
    // 第三个移除出去
    qe.leave()
  }
  return qe.value().toString();
}
game(5,3)