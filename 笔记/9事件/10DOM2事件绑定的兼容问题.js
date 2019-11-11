function fn1() { console.log(1) }
function fn2() { console.log(2) }
function fn3() { console.log(3) }
function fn4() { console.log(4) }
function fn5() { console.log(5) }
function fn6() { console.log(6) }
function fn7() { console.log(7) }
function fn8() { console.log(8) }
function fn9() { console.log(9) }
function fn10() { console.log(10) }
function fn11() { console.log(11) }
function fn12() { console.log(12) }

box.addEventListener('click', fn1);//默认是false
box.addEventListener('click', fn3);
box.addEventListener('click', fn5);
box.addEventListener('click', fn7);
box.addEventListener('click', fn9);
box.addEventListener('click', fn2);
box.addEventListener('click', fn2);
box.addEventListener('click', fn2);
box.addEventListener('mouseenter', fn2);
box.addEventListener('click', fn4);
box.addEventListener('click', fn8);
box.addEventListener('click', fn10);
box.addEventListener('click', fn11);
box.addEventListener('click', fn12);
/**
 * DOM2事件绑定的兼容
 * [谷歌 vs IE高版本]
 *      在移除事件绑定的时候，如果移除操作发生在正要执行的方法之前（例如：点击的时候，正要执行FN8，但是在执行FN4的
 * 时候，我们把FN8从事件池中移除了），谷歌下是立即移除生效，第一次也不再执行FN8了，而IE是当前本次不生效，下一次点击才
 * 生效，第一次点击还是要执行FN8的；
 * [标准 VS IE低版本]
 *   标准：addEventListener /  removeEventListener
 *   IE低版本： attachEvent / dettachEvent
 *   标准用的是行为名称“click",而IE低版本使用时前面要加on,"onclick"
 * 
 * 1.THIS问题
 *  标准浏览器下，行为触发方法执行，方法中的THIS是当前元素本身，IE低版本中THIS指向了WINDOW
 * 2.重复问题
 *  标准浏览器中的事件池是默认去重复的，同一个元素的同一个事件行为不能出现相同的绑定方法，但是IE低版本的
 *  事件池机制没有这么完善，不能默认去重，也就是可以给同个元素的同个事件绑定相同的方法了
 * 3.顺序问题
 *  标准浏览器按照向事件池中存放的顺序依次执行的，而IE低版本是乱序执行 ，没有规律
 *  IE低版本浏览器出现的所有问题都是由于本身自带的事件池机制不完整导致的
 * 
 */