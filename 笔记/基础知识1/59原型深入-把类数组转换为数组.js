/**
 * 编写一个方法fn,实现任意数求平均数（去除数字中的最大和最小，然后再算平均数，保留小数点后面两位）
 */
let fn = function () {
    // arguments ：类数组（不能直接调取数组原型上的方法）
    /**
     * 1.先给arguments排序（不能直接使用sort方法），把排序后的值去掉首尾（干掉最大值和最小值）
     * 2.把剩下的值求和，除以总长度，求出平均数即可
     */
    let arg = Array.prototype.slice.call(arguments);//类数组借用数组原型上的方法执行，
    //实现相关的操作（借用slice实现把类数组转换为数组）
    // 前提：类数组和数组类似，都有length和索引（字符串页也符合这个前提，所以也可以这样搞）

    /**
     * [].sort.call(arguments,function(a,b){
     *      return b-a;
     * })
     * 借用sort给arg排序，除此之外其他的很多数组的方法都可以被arg借用
     */
    arg.sort(function (a, b) {
        return b - a;
    }).pop();
    // arg.pop();//删除最后一项
    arg.shift();//删除第一项
    //数组求和
    let total = eval(arg.join('+'))
    return (total / total.length).toFixed(2)
}
fn(10, 9.8, 9.5, 8.7, 8.8, 8, 9.2)

// 数组求和简单方法：
total = eval(arg.join('+'))



//重写数组的slice方法，实现:ary.slice()相当于把ary克隆一份新数组
Array.prototype.mySlice = function () {
    //=>把操作的数组ary克隆一份
    // this:ary
    // var newAry = this.concat();
    // return newAry;
    // 内置的slice实现数组克隆的代码
    let newAry = [];
    for (let i = 0; i < this.length; i++) {
        newAry.push(this[i])
    }
}
let ary = [12, 23, 34];
ary.mySlice();


// 用es6实现
let fn = function (...arg) {

}
