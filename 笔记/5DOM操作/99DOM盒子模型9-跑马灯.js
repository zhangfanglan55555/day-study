
let utils = (function () {
    // 获取元素样式
    let getCss = function (curEle, attr) {
        if (typeof window.getComputedStyle === 'undefined') {
            return;
        }
        let val = window.getComputedStyle(curEle, null)[attr],
            reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
        reg.test(val) ? val = parseFloat(val) : null;
        return val;
    }
    // 设置元素样式
    let setCss = function (curEle, attr, value) {
        if (attr === 'opacity') {
            curEle['style'].opacity = value;
            curEle['style'].filter = `alpha(opacity=${value * 10})`;
        }
        if (!isNaN(value)) {
            let reg = /^(width|height|fontSize|((margin|padding)?(top|left|right|bottom)?))$/i;
            reg.test(attr) ? value += 'px' : null;
        }
        curEle['style'][attr] = value;
    }
    // 批量设置元素样式
    let setGroupCss = function (curEle, options = {}) {
        for (let key in options) {
            if (!options.hasOwnProperty(key)) continue;
            // options:传递进来的需要修改的样式对象（集合）
            // attr:每一次遍历到集合中的某一项（要操作的样式属性名）
            // options[attr]:传递的要操作的样式属性值
            setCss(curEle, key, options[key])
        }
    }
    // css操作汇总

    let css = function (...arg) {
        let len = arg.length,
            second = arg[1],
            fn = getCss;
        len >= 3 ? fn = setCss : null;
        len === 2 && second instanceof Object && second != null ? fn = setGroupCss : null;
        return fn(...arg);


    }
    return {
        css
    }
})()
// utils.css()
let wrapper = document.querySelector('.wrapper'), li = document.querySelector('li'),
    wrapWidth = utils.css(wrapper, 'width');
// 1.把wrapper中原有的li整体克隆一份，放到容器的末尾(无缝滚动)
wrapper.innerHTML += wrapper.innerHTML;
utils.css(wrapper,'width',utils.css(wrapper,'width'));//克隆完成后别忘记修改一下wrapper的宽度
// 让wrapper每间隔一段时间（最优动画时间是13~17ms)在原有的left值基础上减去步长（想让动画快一些，步长就大一点）
// 2.基于定时器实现动画
// js中的定时器：间隔1000ms执行一次这个方法,直到手动清除为止
setInterval(() => {
    // 获取当前wrapper的left值
    let curL = utils.css(wrapper, 'left');
    // 实现无缝：当我们ul距离marquee-box的左偏移已经是这个那个wrapper的一半宽度（第一组原始内容已经运动完成了，现在看到的是克隆后的）
    // ，此时我们让wrapper立即运动到left位0的位置即可
    if(Math.abs(wrapper.offsetLeft)>= utils.css(wrapper,'width')/2){
        utils.css(wrapper,{
            'left':0
        })
        return;
    }
    utils.css(wrapper, {
        'left': --curL
    })
}, 10)