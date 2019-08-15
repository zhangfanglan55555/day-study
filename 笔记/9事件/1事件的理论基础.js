/**
 * 1.[什么是事件]
 *    事件就是一件事情或者一个行为（对于元素来说，它的很多事件都是天生自带的），
 * 只要我们去操作这个元素，就会触发这些行为；
 *   “事件就是元素天生自带的行为，我们操作元素就会触发相关的事件行为”
 * 2.[事件绑定]:给元素天生自带的事件行为绑定方法，当事件触发，会把对应的方法执行
 *  oBox.onclick = function(){}
 * 3.元素天生自带的事件？
 *  [鼠标事件]：
 *      click:点击（pc端是点击，移动端的click代表单击[移动端使用click会有300ms延迟的问题]）
 *      dblclick:双击
 *      mouseover:鼠标经过
 *      mouseout:鼠标移出
 *      mouseenter:鼠标进入
 *      mouseleave:鼠标离开
 *      mousemove:鼠标移动
 *      mousedown:鼠标按下（鼠标左右键都起作用，它是按下即触发，click是抬起才会触发）
 *                 ，而且是先把down和up触发，才会触发click
 *      mouseup:鼠标弹起
 *      mousewheel:鼠标滚轮滚动
 *      ...
 * [键盘事件]
 *      keydown:键盘按下
 *      keyup:键盘弹起
 *      keypress:和keydown类似，只不过keydown返回的是键盘码，keypress返回的是ASCII吗值
 *      input:由于pc端有物理键盘，可以监听到键盘的按下和弹起，但是移动端是虚拟的键盘。所以keydown
 *          和keyup在大部分手机上都没有，我们使用input事件统一代替他们(内容改变事件)
 * [表单元素常用的事件]
 *  focus:获得焦点
 *  blur:失去焦点
 *  change：内容改变
 *  ...
 * [其他常用事件]
 *  load:加载完成
 *  unload：window.unload页面关闭
 *  beforeunload:页面关闭之前
 *  scroll:滚动条滚动事件
 *  resize:大小改变事件 window.onresize = function(){} 当浏览器窗口大小发生改变，会触发这个事件，执行对应的事情
 *  ...
 *  [移动端手指事件]
 *      touchstart:手指按下
 *      touchmove:手指一动
 *      touchend:手指离开
 *      touchcancel:因为意外情况导致手指操作取消
 *  [getsture:多手指操作] 
 *      getsturestart:手指按下
 *      getsturechange:手指改变
 *      getstureend:手指离开
 * 
 *  [H5中的autido/video]
 *  canplay:可以播放（播放过程中可能出现由于资源没有加载完成导致的卡顿)
 *  canplaythrough:资源加载完成，可以正常无障碍播放
 *  ...
 */