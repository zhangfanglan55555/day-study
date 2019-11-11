/**
 * DOM0事件绑定和DOM2事件绑定的区别
 * 1.机制不一样
 *  DOM0采用的是给私有属性赋值，所以只能绑定一个方法
 *  DOM2采用的是事件池机制，所以能绑定多个不同方法
 * 2.移除的操作
 */
box.onclick = function(){}
box.onclick = null;//赋值为null就移除了（所以不需要考虑绑定的是谁）

box.addEventListener('click',function(){
    console.log(1)
})
box.removeEventListener('click',function(){
    // DOM2在移除的时候，必须清楚要移除哪一个方法，才能在事件池当中移除掉，所以基于DOM2做事件
    // 绑定，我们要有”瞻前顾后“的思路，也就是绑定的时候考虑一下如何移除（技巧：不要绑定匿名函数，都绑定
    // 实名函数）
    console.log(1)
})
/**
 * 3.DOM2事件绑定中增加了一些DOM0无法操作的事件行为，例如：DOMContentLoaded事件（当页面中的HTML结构加载完成就会
 * 触发执行）
 */
let fn = function(){

}
box.addEventListener('DOMContentLoaded',fn);//可以
box.onDOMContentLoaded = fn;//不可以，box没有这个属性

window.onload = function(){
    // 当页面中的资源都加在完成（HTML结构加载完、css和JS等资源加载完成）才会触发执行
}
window.addEventListener('load',function(){});//这样处理也可以执行多次了
$(document).ready(function(){});
//原理：基于DOMContentLoaded完成的(IE中用的是onreadystatechange监听的，在document.readyState === 'complete'时候
// 执行函数)
$(function(){
    // 当页面中的html结构加载完成就会执行
})
$(function(){
    // 基于DOM2事件绑定的，所有在同一个页面中可以执行多次(绑定多个不同的方法)，挡结构加载完成，会依次执行这些方法
})
// window.load和$(document).ready() 区别：

box.addEventListener('click',function(){
    console.log(2)
})
box.onclick = function(){
    console.log(1)
}
box.addEventListener('click',function(){
    console.log(3)
})
// 输出顺序213
// 可以共存，执行顺序和编写顺序有关系