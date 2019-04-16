// 公共方法
var utils = (function () {
    return {
        aa: function () {

        }
    }
})()

// 第一个人：换肤
var skipRender = (function () {
    var fn = function () {

    }
    return {
        init: function () {
            utils.aa()
        },
        fn: fn
    }
})()
skipRender.init();

// 第二个人：天气
var weatherRender = (function () {
    var fn = function () { }
    return {
        init: function () {
            fn();//调取自己模块中的方法，直接调取使用即可
            skipRender.fn();//调取别人模块中的方法
        }
    }
})()
weatherRender.init();