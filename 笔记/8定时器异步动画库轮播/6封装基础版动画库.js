/**ANIMATE动画库 */
~function () {
    // 准备操作css样式的方法  GET-CSS SET-CSS SET-GEOUP-CSS CSS
    let utils = (function () {
        // 获取样式
        let getCss = (ele, attr) => {
            let val = null, reg = null;
            if ('getComputedStyle' in window) {
                val = window.getComputedStyle(ele, null)[attr];
                reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/g;
                reg.test(val) ? val = parseFloat(val) : null;
            }
            return
        }
        // 设置样式
        let setCss = (ele, attr, value){
            if (!isNaN(value)) {
                if (!/^(opacity|zIndex)$/.test(attr)) {
                    value += 'px';
                }
            }
            ele['style'][attr] = value;
        }
        // 批量设置样式
        let setGroupCss = (ele, options) => {
            for (key in options) {
                if (options.hasOwnProperty(key)) {
                    setCss(ele, key, options[key])
                }
            }
        }
        let css = (...arg) => {
            let len = arg.length,
                fn = getCss;
            if (len >= 3) {
                fn = setCss
            }
            if (len === 2 && typeof arg[1] === 'object') {
                fn = setGroupCss;
            }
            return fn(...arg);//展开运算符
        }
        return { css }
    })();
    // effect:准备运动的公式
    let effect = {
        Linear: (t, b, c, d) => t / d * c + b
    };
    // 封装动画库
    window.animate = function (ele, target = {}, duration = 1000) {
        // 1.基于target计算出begin和change
        let begin = {}, change = {}, time = 0;
        for (let attr in target) {
            if (!target.hasOwnProperty(attr)) continue;
            begin[attr] = utils.css(ele, attr);
            change[attr] = target[attr] - begin[attr]
        }
        // 2.实现动画
        clearInterval(ele.animateTimer);//再给当前元素设置新的动画之前，先清空原有正在运行的动画，防止多动画
        // 共存，把动画的返回值赋值给当前元素的自定义属性，这样只要元素不变，我们不管啥时候在哪执行都可以清除元素的动画
        ele.animateTimer = setInterval(() => {
            time += 17;
            // 边界判断
            if (time >= duration) {
                clearInterval(ele.animateTimer);
                utils.css(ele, target);
                return
            }
            // 依托target计算出每个方向的当前位置
            let cur = {}
            for (let attr in target) {
                if (target.hasOwnProperty(attr)) {
                    cur[attr] = effect.Linear(time, begin[attr], change[attr], duration)
                }
            }
            utils.css(ele, cur)
        }, 17)
    }
}()

animate(box, {
    top: 500,
    left: 800,
    width: 200,
    height: 200,
    opacity: 0.2
})