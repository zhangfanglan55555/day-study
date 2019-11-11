/**
 * JQ中的事件绑定             
 *   on / off ： 基于DOM2事件绑定实现事件的绑定和移除（兼容了所有的浏览器）
 *   one : 只绑定一次，第一次执行完成后，会把绑定的方法移除
 * click / mouseover / mouseout ... ：JQ提供快捷绑定方法，但是这些方法最后都是基于on/off完成的
 * dekegate：事件委托方法（1.7版本以前用的是live方法）
 *  bind / unbind : 正常绑定
 */
let fn = function(ev){}
$(document).on('click',fn);
$(document).off('click',fn);
$(document).delegate("#box",click,fn);//把点击行为委托给document,不管点击文档中的哪一个元素，都会触发文档
// 的点击行为，第一个参数代指事件源是#box我们执行fn这件事；只有事件源是#box的时候才执行fn