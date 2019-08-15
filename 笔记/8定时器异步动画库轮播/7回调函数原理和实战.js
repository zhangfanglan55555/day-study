/**
 * 回调函数:把一个函数A当做实参传递给另一个函数B，在B方法执行的时候，把A也执行了，我们把
 *         这种机制叫做“回调函数机制“
 * 1.根据需求回调函数可以执行n多次
 * 2.不仅可以把回调函数执行，还可以给传递的回调函数传递实参，这样在回调函数中设置形参（或者
 * 使用arg)接收即可
 * 3.还可以改变回调函数中的this指向
 * 4.可以在宿主函数（它在哪儿执行的，它的宿主函数就是谁）中接收回调函数执行的返回结果
 */
[].sort((a, b) => { });
''.replace(/\d/g, () => { });

let fn = (callback) => {
    // callback:传递进来的函数
    callback && callback(100, 200);
    // typeof callback === 'function'?callback():null;
}
fn((n, m) => {
    // console.log(n,m)；
    // this:window 回调函数中一般this都是window,除非宿主函数执行回调函数的时候把this特殊指向了
    // (箭头函数除外：箭头函数中的this是它上下文的)

})

// 和内置的for-each类似（但是for-each只能遍历数组），用来遍历数组（类数组、对象）中的每一项的

[12, 23, 34].forEach(function (item, index) {
    // 回调函数中的this:默认window
}, '指定this')
$.each();
$.each([12, 23, 34], function (index, item) {
    // this:当前遍历的这一项，this不可更改
})
// $.each()和forEach的接收参数item和index位置相反
// for-each的第二个参数，是用来改变回调函数中的this的

let each = function (obj, callback) {
    // 验证是数组（类数组）还是对象
    let flag = 'length' in obj;;//有length先简单验证是数组/类数组，没有就是对象
    if (flag) {
        for (let i = 0; i < obj.length; i++) {
            let item = obj[i];
            let res = callback && callback.call(item, i, item);//接收回调函数的返回值，如果返回的是false
            // 我们结束循环即可
            if (res === false) {
                break;
            }
        }
    } else {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let value = obj[key]
                let res = callback && callback.call(value, key, value);
                if (res === false) {
                    break
                }
            }
        }
    }
}
each([12, 23, 34], function (index, item) {
    if (index >= 1) {
        return false;//如果回调函数返回false,我们让其代表：结束当前迭代
    }
})

each({ name: 'xxx', age: 12, sex: 0 }, function (key, value) {
    console.log(key, value);
    if (key === 'age') {
        return false;
    }
})

// 实现replace
String.prototype.myReplace = function (reg, callback) {
    // this:str
    // 默认reg肯定加g了，callback肯定传递函数了
    let res = reg.exec(this),
        _this = this;
    while (res) {
        // res每一次exec捕获的结果（数组）
        let returnV = callback(...res);//捕获一次执行一次回调函数，并且
        // 把exec捕获的数组展开，每一项都依次传递给回调函数(returnV:当前回调函数执行
        // 的返回结果，我们要拿这个结果替换字符串中当前大正则匹配的内容)
        // exec捕获的第一项就是符合匹配结果的字符串
        let v = res[0], i = _this.indexOf(v)
        _this = _this.substring(0, i) + returnV + _this.substring(v.length + i)
        res = reg.exec(this);
    }
    return _this;
}
let str = 'my name is {0},i am {1} years old!',
    ary = ['周啸天', '28'];
str = str.replace(/\{(\d+)\}/g, function (...arg) {
    let index = arg[1];
    return arg[index]
})
// str