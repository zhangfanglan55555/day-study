/**
 * 事件绑定：给当前元素的某个事件绑定方法
 *  [DOM0级事件绑定]
 *   [element].onxxx = function(){}
 *  [DOM2级事件绑定]
 *    [element].addEventListener('xxx事件',function(){},false)
 *    [element].attachEvent('onxxx',function(){})[ie6~8]
 * 
 * 
 * 事件绑定的目的：给当前元素的某个事件绑定方法（不管是基于DOM0还是DOM2）,都是为了触发元素的相关行为的时候
 * 能做点事情（也就是把绑定的方法执行）；“不仅把方法执行了，而且浏览器还给方法传递了一个实参信息值=》这个值就是事件对象”
 * 
 */
box.onclick = function (ev) {
    // 定义一个形参EV用来接收方法执行的时候，浏览器传递的信息值（事件对象：MouseEvent鼠标事件对象
    console.log(ev)
}
input.onkeydown = function(ev){
    // KeyboardEvent键盘事件对象）

}
window.onload = function(ev){
// ev:Event普通事件对象
}
// 目的:事件对象中记录了很多属性名和属性值，这些信息中心包含了当前操作的基础信息，例如：鼠标点击位置的x/y轴坐标，
// 鼠标点击的是谁（事件源）等信息
[MouseEvent鼠标事件对象]
    ev.target //=> 事件源(操作的是哪个元素)
    ev.clientX  
    ev.clientY //当前鼠标触发点距离当前窗口左上角的X|Y轴坐标
    ev.pageX
    ev.pageY  //当前鼠标触发点距离BODY(第一屏幕左上角的X/Y轴坐标)
    ev.preventDefault() ;//阻止默认行为
    ev.stopPropagation();//阻止事件的冒泡传播
[KeyboardEvent]
    ev.code //当前按键 'keyE'
    ev.key // 当前按键值'e'
    ev.keyCode/ev.which//当前按键的键盘码 69
    //ie用keyCode,其他浏览器用which；谷歌两种都可以用
    let code = ev.which||ev.keyCode;
    ev.type //当前事件类型
    //常用的键盘码
    /**
     * 左-上-右-下：37-38-39-40
     * BackSpace删除 : 8
     * Enter:13
     * Space:32
     * Del：46
     * 
     * Shift:16
     * Alt:18
     * Ctrl:17
     * Esc:27
     * F1~F12:112~123
     * 0~9:48~57
     * a-z:65-90
     * 
     */
input.onkeydown = function(ev){

}