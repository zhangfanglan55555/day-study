
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


let wrapper = document.querySelector('.wrapper');
wrapper.innerHTML += wrapper.innerHTML;
utils.css(wrapper, 'height', utils.css(wrapper, 'height'));

setInterval(()=>{
    let curTop = utils.css(wrapper,'top');
    if(Math.abs(wrapper.offsetTop)>= utils.css(wrapper,'height')/2){
        utils.css(wrapper,{
            'top':0
        })
        return
    }
    utils.css(wrapper, {
        'top': --curTop
    })
},10)

    var value =1;
    var foo = {
        value:2,
        bar:function(){
            console.log(this)
            return this.value;
        }
    }
    console.log(foo.bar());
    console.log((foo.bar)());
    console.log((foo.bar = foo.bar)());
    console.log((false||foo.bar)());
    console.log((foo.bar,foo.bar)())
