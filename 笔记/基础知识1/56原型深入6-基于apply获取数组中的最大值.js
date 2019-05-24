/**
 * 需求一：获取数组中的最大值（最小值）
 *  1.给数组先排序（由大到小排序），第一项就是最大值
 */

let ary = [12, 13, 14, 23, 24, 13, 15, 12];
let max = ary.sort(function (a, b) {
    return b - a
})
max[0];

/**
 * 2.假设法：假设第一个值是最大值，依次遍历数组中后面的每一项，和假设的值进行比较
 *          如果比假设的值要大，把当前项赋值给MAX，
 */

let max = ary[0];
for (var i = 1; i < ary.length; i++) {
    // if (max < ary[i]) {
    //     max = ary[i]
    // }
    let item = ary[i];
    item > max ? max = item : null;
}
console.log(max)

    /**
     * 3.基于Math.max完成
     *  console.log(Math.max(ary)) ;// NaN  =》 Math.max是获取一堆数中的最大值，需要我们把比较的数，一个个的
     *  传递给这个方法 =》 Math.max(12,13,14...)=》 Math.max([12,13,14...])这样只是传递一个值
     */

    //  [12,13,14].toString() =》 "12,13,14"
    // eval("12,13,14") => 14
    // 12，13，14

    /**
     * 1.[eval]：把字符串转换为JS表达式
     *      eval("1+2");//3
     * 
     * 2.括号表达式(小括号的应用)
     * （1，2，3） =》3
     * （1，3，2） =》2
     *  用小括号包起来，里面有很多项（每一项用逗号分隔，最后只获取最后一项的内容(但是会把其它的项也都过一遍，并不是执行)
     */
    (function () { console.log(1) }, function () { console.log(2) })();//=>2

(function aa() { console.log('aa') }, function bb() { console.log('bb') })();
//=> bb;
// aa();  aa is not defined
// 不建议大家过多使用括号表达式，因为会改变THIS

let fn = function () { console.log(this); }
let obj = { fn: fn };
(fn, obj.fn)();//window ,执行的是第二个OBJ.FN，但是方法中的this是window而不是obj
(obj.fn)();//=> this:obj


var ary = [12, 32, 33, 2]
var aStr = ary.toString();
eval(`Math.max(${aStr})`);//34


//利用了apply的一个特征：虽然放的是一个数组，但是执行方法的时候，也是把数组中的每一项一个个的传递给函数
Math.max.apply(null,ary)