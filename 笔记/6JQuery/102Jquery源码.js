(function () {
    var version = '1.11.3',
        jQuery = function(selector,context){
            return new jQuery.fn.init(selector,context)
            //创建了init这个类的实例，也创建了jQuery的实例
        }
        // jQuery是个类，在它的原型上提供了很多属性和方法，供jQ的实例调取使用
        jQuery.fn = jQuery.prototype = {
            jquery:version,
            constructor:jQuery,//当前类的原型重定向后，自己开辟的堆内存中是没有constructor的，需要
            // 手动增加保证她的完整性
            // ...
        }
        // 给jQ原型上增加extend方法，同事把jQ当做一个普通对象，给这个对象设置了一个私有的方法。
        /**
         * jQuery是一个类（也是一个普通对象）：函数的两种角色，jQ是一个类库，提供了很多方法，其中这些
         * 方法有两部分：
         *  1.放到jq原型上的（jq.fn/jq.prototype),这里面的方法是供jq的实例调取使用的
         *  2.把jq当做一个普通的对象，在对象上设置一些私有的属性和方法，这类方法以后用的时候直接的
         *    jQuery.xxx() 执行即可
         */
        jQuery.extend = jQuery.fn.extend = function(){
            // extend是把一个对象中的属性和方法扩展到指定的对象上
        }
        jQuery.extend({
            isFunction:function(obj){

            },
            isArray:function(){}
            ...
        })
        // jQuery:{extend:...,isFunction:...,isArray:...}
        var init = jQuery.fn.init = function(selector,context){

        };
        init.prototype = jQuery.fn;//=> 把init当做一个类，但是让这个类的原型指向jq的原型
        // init这个类的实例最后找到的也是jQuery这个类原型上的方法 init的实例其实也可以理解为
        // jQuery的实例
        window.jQuery = window.$ = jQuery;
})()
$()
jQuery();
$.isFunction();//把jQ当做一个普通对象，直接使用对象上扩展的那些私有属性和方法，这些方法和实例没关系

// 不加new创建一个函数实例

let Fn = function(){
    return new init();//创建init的实例
}
let init = function(){

}
init.prototype = Fn.prototype;
let f = Fn();//目的：不加NEW也能创建FN的实例



let Fn = function(){
    //...
    return new Fn.prototype.init();
}
Fn.prototype = {
    aa:function(){}
}
Fn.prototype.init = function(){

}
Fn.prototype.init.prototype = Fn.prototype;
Fn().aa();