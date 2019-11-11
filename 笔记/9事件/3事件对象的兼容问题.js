//ie6~8
box.onclick = function (ev) {
    // 在ie低版本浏览器中，浏览器执行绑定的方法，并没有事件对象传递进来，
    // 此时ev=== undefined,需要基于window.event来获取(由于是全局属性，鼠标每次操作都会把上一次
    // 操作的值替换掉)
    if (!ev) {
        ev = window.event;
        ev.srcElement;//获得事件源,IE6-8
        // pageX低版本浏览器的事件对象中不存在pageX|pageY
        ev.pageX = ev.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        ev.pageY = ev.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        ev.which = ev.keyCode;
        ev.target = ev.srcElement;
        // ev.preventDefault & ev.stopPropagation 这些在低版本下都没有
        ev.preventDefault = function () {
            ev.returnValue = false;//低版本中阻止默认行为
        }
        ev.stopPropagation = function () {
            ev.cancelBubble = true;//低版本中阻止冒泡
        }
    }
    // 直接按照高版本的规则来使用即可
    console.log(ev.target, ev.which);
    ev.preventDefault();
    ev.stopPropagation();
}
// 另一种兼容处理方式
box.onclick = function (ev) {
    // 用到谁给谁处理兼容
    ev = ev || window.event;
    var target = ev.target || ev.scrElement;
    ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
    ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
}