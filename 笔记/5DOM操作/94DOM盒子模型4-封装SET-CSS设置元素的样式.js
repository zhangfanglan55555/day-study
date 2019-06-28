// 获取当前元素的某一个样式属性值
let getCss = function (curEle, attr) {
    if (window.getComputedStyle != undefined) {
        let val = window.getComputedStyle(curEle, null)[attr];
        let reg = /^-?\d+(\.\d+)?(px|rem|rem|pt)?$/i;
        reg.test(val) ? val = parseFloat(val) : null;
        return val;
    }

}

// 设置当前元素的某一个具体样式的属性值
// js中给元素设置样式只有两种
// 1.设置元素的样式类名（前提：样式类及对应的样式已经处理完成）
// 2.通过行内样式设置  xxx.style.xxx = xxx;
let setCss = function (curEle, attr, value) {
    /**
     * 细节处理：
     *  1.如果需要考虑IE6~8兼容，透明度这个样式在低版本浏览器中不是使用opacity,而是filter（我们两套都要设置）
     *  2.如果传递进来的value值没有带单位，我们根据情况设置px单位
     *      -> 某些样式属性才会加单位：width、height、padding、margin、font-size、top、left、bottom、right
     *      -> 用户自己传递的value值中是没有单位的
     */
    if (attr === 'opacity') {
        curEle['style'].opacity = value;//0.1
        curEle['style'].filter = `alpha(opacity = ${value * 100})`
        return;
    }
    if (!isNaN(value)) {
        //isNaN 检测的结果是false:说明value是纯数字没单位
        let reg = /^(width|height|fontSize|((margin|padding)?(top|left|right|bottom)?))$/i;
        reg.test(attr) ? value += 'px' : null;
    }
    curEle['style'][attr] = value;
}
setCss(outer, 'width', '300px');
setCss(outer, 'width', 600)
setCss(outer, 'opacity', 0.1)