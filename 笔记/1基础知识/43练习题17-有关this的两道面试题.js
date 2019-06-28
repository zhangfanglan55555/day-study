/**
 * 1.元素绑定事件，方法中的this是当前操作元素
 * 2.方法名前面是否有点，有点， 点前面是谁this就是谁，没有this是window(严格模式下
 * 是undefined)
 * 3.构造函数执行，方法体中的this是当前类的一个实例
 */
var fullName = 'language';
var obj = {
    fullName: 'javascript',
    prop: {
        getFullName: function () {
            return this.fullName;
        }
    }
};
console.log(obj.prop.getFullName());
var test = obj.prop.getFullName;
console.log(test());


/**
 * undefined;//this是obj.prop，obj.prop.fullName没有返回undefined
 * language;
 */


var name = 'window';
var Tom = {
    name: 'Tom',
    show: function () {
        console.log(this.name);
    },
    wait: function () {
        var fun = this.show;
        fun();

    }
}
Tom.wait();

/**
 * window,没有点，this是window
 */
