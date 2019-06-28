//如何实现数组去重
function unique(ary) {
    // distinct 区别
    // unique 唯一的
    var obj = {};
    // [12, 13, 12, 13, 14, 13, 14]//=>依次遍历数组中的每一项，让每一项的值作为对象的
    // 属性名和属性值（属性值存啥都可以）,每一次存储之前验证当前对象中是否已经存在
    // 这个属性（in/hasOwnProperty/属性值不是undefined...),如果有这个属性，说明当前
    // 项已经在数组中已经存在了，我们把当前想在原数组中一处即可，如果不存在存储到对象里
    // { 12 : 12,13:13,14:14}
    for (var i = 0; i < ary.length; i++) {
        var item = ary[i];
        if (obj.hasOwnProperty(item)) {
            // ary.splice(i, 1);
            /**
                优化方案一：
                    不使用splice删除（删除当前想，后面索引移动位置，如果、
                    后面有很多项，导致性能消耗较大）
                解决：把最后一项替换当前项，再把最后一项删除（会改变原有数组的顺序;
             *  */
            ary[i] = ary[ary.length - 1];
            ary.pop();
            i--;
            continue;
        }
        obj[item] = item
    }
    obj = null;//优化二：obj没用后我们手动释放一下，节约内存
    return ary;
}
// es6 数组去重：
function unique(ary) {
    var x = new Set(ary);
    return [...x];
}
/**
 * set 它类似于数组，但是成员的值都是唯一的，没有重复的值
 * Array.from方法可以将Set结构转为数组
 */

// 数组排序
var ary = [12, 1, 2, 34, 23, 4343, 2, 2, 0, 4];
ary.sort();//默认升序
ary.sort(function (a, b) {
    return b - a;//降序
    //比较函数两个参数a和b，返回a-b升序，返回b-a降序
})
/**
 * 基于内置类的原型扩展方法，供它的实例调取使用：
 *  1.我们增加的方法最好设置“my"前缀，防止把内置方法重写
 */
//  思考题：
var n = 5;
var res = n.plus(3).minius(2);
console.log(res);//6

// 答案
~function (pro) {
    pro.plus = function plus(val) {
        return this + Number(val)
    }
    pro.minius = function minius(val) {
        return this - Number(val);
    }

}(Number.prototype)