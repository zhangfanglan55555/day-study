

/**
 * for in 循环 遍历的时候有自己的顺序，先遍历数字属性名（按照从小到大的顺序），再遍历字符串属性名（a-z）
 *  遍历一个对象中的键值对的，有多少组键值对，我们就遍历多少次
 *  只遍历当前对象可枚举（遍历）的属性
 *      1.对象的私有属性是可枚举的
 *      2.浏览器内置的属性一般都是不可枚举的：__proto__
 *      3.自己在类的原型上设置的属性也是可枚举的，forin循环的时候也会被遍历出来（一般情况下我们是不想便利到原型上的
 *        公有属性的）,一般使用for in 在遍历对象的时候，我们加一个私有属性的验证，只有是私有的属性，我们才做操作
 *      if(obj.hasOwnProperty(key)){
 *          console.log(key)
 *      }
 */
let obj = { name: 'xxx', age: 28, sex: 0, score: 100 };

for (let key in obj) {
    // key 存储的是每一次循环获取的属性名
    // obj[key] 每一次循环基于key获取属性值
    if (key === 'age') {
        break;//也支持break和continue等关键词
    }
}
// obj.__proto__ === Object.prototype : obj是Object这个类的一个实例
// 大括号中的是obj的私有属性，Object.prototype上的是obj共有属性

let setCss = function (curEle, attr, value) {

}
// 给元素批量设置样式
let setGroupCss = function (curEle, options = {}) {
    //遍历传递的options，有多少键值对就循环多少次，每一次都调取setCss方法逐一设置即可
    for (let attr in options) {
        if (!options.hasOwnProperty(attr)) continue;
        // options:传递进来的需要修改的样式对象（集合）
        // attr:每一次遍历到集合中的某一项（要操作的样式属性名）
        // options[attr]:传递的要操作的样式属性值
        setCss(curEle, attr, options[attr])
    }


}
setGroupCss(outer, {
    width: 400,
    height: 400,
    padding: 30
})