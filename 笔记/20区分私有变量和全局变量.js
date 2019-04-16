var a = 10, b = 10, c = 10;
function fn(a) {
    /**
     * 形参赋值
     *  a = 12;
     * 变量提升
     *  var b ;
     * =>在私有作用域下，只有以下两种情况是私有变量：
     *  A：声明过的变量（带var / function)
     *  B: 形参也是私有变量
     *  剩下的都不是自己的私有变量，要沿着作用域链进行查找
     */
    console.log(a, b, c);
    var b = c = a = 20;
    console.log(a, b, c);
}
fn(a)
console.log(a, b, c)
/**
 * //10 undefined 10;
 * //20 20 20
 * //10 10 20
 */