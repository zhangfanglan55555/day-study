// jQ选择器：基于各种选择器创建一个jq实例（jq对象）
// 1.selector 选择器的类型（一般都是字符串，但是支持函数或者元素对象）
// 2.context 基于选择器获取元素时候指定的上下文（默认document)
// JQ对象：一个类数组结构（JQ实例），这个类数组集合中包含了获取到的元素
// $();
console.log($('.tabBox'))
/**
 * jQ对象（类数组）=》jQ实例
 * 0：div.tabBox
 * context:document，指定的上下文，默认document
 * selector:'.tabBox' 传进来的选择器
 * __proto__：JQuery.prototype
 *          add
 *          __proto__:Object.prototype
 *                  hasOwnProperty
 * ...  
 * 
 */
/**
 * 获取页面中的元素对象
 *  1.基于原生JS提供的属性和方法获取 =》 “原生JS对象”
 *      可以调取使用内置的JS属性和方法
 *        className
 *        onclick
 *        ...
 *  2.基于JQ选择器获取 =》 “JQ对象"
 *      可以调取JQ原型上提供的属性和方法
 *      add
 *      find
 * 把JQ对象和原生JS对象之间相互的转换
 *  [JQ->JS]
 *  JQ对象是一个类数组集合，集合中每个索引对应的都是原生JS对象，我们基于索引获取即可
 *   let $tabBox = $('.tabBox'); 变量名前面是以$开始的，一般代表基于JQ选择器获取的结果，约定俗成的习惯
 *   let tabBox = $tabBox[0]; 
 *      tabBox = $tabBox.get(0) : get是JQ原型上提供的方法，供JQ实例基于索引获取指定的JS对象
 *  $tabBox.eq(0) ： 它也是基于索引获取集合中的某一项，只不过get获取的是JS对象，eq会把获取的结果包裹成一个新的JQ对象（JQ实例返回）
 * 
 * [JS->JQ]
 *   $(tabBox) 直接使用选择器把原生JS对象包裹起来，就会把JS转换为JQ对象（因为$()就是创建JQ的一个实例）
 * 分析选择器源码，我们发现selector传递的值支持三种类型
 *  1.string:基于选择器获取元素
 *  2.元素对象 selctor.nodeType:把JS对象转换为JQ对象
 *  3.函数：把传递的函数执行，把JQ当做实参传递给函数 selector(jQuery)
 */

$(function ($) {
    //  $：传递进来的jQuery
});

$ = 'ddd'
jQuery(function ($) {
    $();
})


jQuery(() => {
    // 函数肯定会执行，但是会在当前页面中html结构都加载完成后再执行
    // 函数执行会形成一个闭包
})

$(function () {

})


/**
 * JQ选择器的selector可以使字符串，字符串这种格式也有两种
 * 1.选择器
 * 2.html字符串拼接的结构：把拼接好的html字符串转换为jq对象，然后可以基于appendTo等方法追加到页面中
 * $("<div id = 'AA'></div>").appendTo(document.body)
 */

/**
 * each:JQ中的each方法是用来进行遍历的（类似于数组中的forEach)
 *     [可遍历内容]
 *         1.数组
 *         2.对象
 *         3.类数组
 *         ...
 *     [三种each]
 *     1.给JQ设置的私有属性 $.each()
 *     2.给实例设置的公有属性 $([selector]).each()
 *     3.内置each
 * 
 */
$.each([12, 23, 34], (index, item) => {
    // 参数的顺序和内置的forEach相反
    console.log(index, item);
});
$.each({ name: 'xxx', age: 25, 0: 100 }, (key, value) => {
    console.log(key, value);//属性名  属性值
})


Object.prototype
$.each({ name: 'xxx', age: 25, 0: 100 }, (key, value) => {
    // 原理其实就是for-in 循环
    console.log(key, value);//属性名  属性值
})

$('.tabBox li').each(function (index, item) {
    // 非箭头函数：this === item 当前遍历的这一项
    console.log(index, item, this)
    // $(this)把当前遍历的这一项转换为jq对象
    $(this).on('click', function () {
        // 给每一个遍历的li都绑定一个点击事件
        // this:当前点击li(原生JS对象)
        $(this).css({
            color: 'red'
        })
    })
})


$('.tabBox li').click(function(){
    // 获取的JQ集合中有三个，我们此处相当于给三个LI都绑定了点击事件（JQ在调取CLICK的时候，会默认把集合进行EACH遍历，把每一项都
    // 给CLICK了）
})