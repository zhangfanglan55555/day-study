// es5实现
/**
 * 思路：
 * 创建一个空对象，
 * 数组遍历，检测对象中是否存在这个item，存在就用末尾项替换当前项，末尾项删除，i--,进入下一次循环
 * 不存在就存入对象obj[item] = item;
 * 循环完毕释放obj堆内存，obj=null;
 * 返回ary对象
 * 
 */
function unique(ary) {
    var obj = {};
    for (var i = 0; i < ary.length; i++) {
        var item = ary[i];
        if (obj.hasOwnProperty(item)) {
            ary[i] = ary[ary.length - 1];
            ary.pop();
            i--;
            continue;
        }
        obj[item] = item;
    }
    obj = null;
    return ary;
}

//es6数组去重，引用Set方法
function unique(ary) {
    var x = new Set(ary);
    // Array.from(x);//也可以将Set结构数据转为数组，Set结构数据具有唯一性
    return [...x];
}

// 数组排序
var ary = [1, 2, 0, 4];
ary.sort((a, b) => {
    return a - b;//升序（默认）
})
ary.sort((a, b) => {
    return b - a;//降序
})
//  思考题：
var n = 5;
var res = n.plus(3).minius(2);
console.log(res);//6

// 取最大值
var ary = [1, 23, 4, 2]
ary.sort((a, b) => {
    return b - a;
})
ary[0]

let max = ary[0]
function maxAry(ary) {
    for (var i = 0; i < ary.length; i++) {
        let item = ary[i];
        item > max ? max = item : null;
        // max = item > max ? item : max;
    }
    return max;
}

eval(`Math.max(${aStr})`);//34
eval(`Math.max(${ary})`)

// es6最优解法
let newAry = Math.max(...ary);



// 去除最大最小值后求平均值
function fn() {
    var ary = [].slice.call(arguments);
    ary.sort((a, b) => {
        return b - a;
    }).pop();
    ary.shift();
    var avg = eval(ary.join("+")) / ary.length;
}
fn(10,20,30,0);




