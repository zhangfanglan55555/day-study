// css:集合get/set/setGroup 为一体的方法
let css = function (...arg) {
    // arg:传递的实参集合
    let len = arg.length;
    if (len >= 3) {
        // 单一设置 set-css
        // setCss.apply(null, arg); 
        setCss(...arg)
        return;
    }
    if (len === 2 && typeof arg[1] === 'object' && arg[1] != null) {
        // 传递两个参数，第二个参数是一个对象（不是null），说明想要操作的是批量设置
        setGroupCss(...arg);
        return;
    }
    // 剩下的代表获取样式
    return getCss(...arg);

}
css(outer, 'width', 500);
css(outer, {
    width: 600,
    height: 500,
    opacity: 0.5
});


let css = function (...arg) {
    let len = arg.length,
        second = arg[1],
        fn = getCss;
    len >= 3 ? fn = setCss : null;
    len === 2 && second instanceof Object && second != null ? fn = setGroupCss : null;
    return fn(...arg);
}

//utils.js

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
    let setGroupCss = function (curele, options = {}) {
        for (let key in options) {
            if (!options.hasOwnProperty(key)) continue;
            // options:传递进来的需要修改的样式对象（集合）
            // attr:每一次遍历到集合中的某一项（要操作的样式属性名）
            // options[attr]:传递的要操作的样式属性值
            setCss(curEle, attr, options[attr])
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
})

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