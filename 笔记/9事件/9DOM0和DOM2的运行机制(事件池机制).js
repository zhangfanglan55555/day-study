/**
 * 事件绑定：
 * [DOM0]
 *      box.onclick = function(){}
 *      每一个元素对象都是对应类的实例，浏览器天生为其设置了很多私有属性和公有的属性方法，而onclick就是
 *      其中的一个私有属性（事件类私有属性，还有很多其他的事件私有属性），这些属性默认值是null
 *      DOM0事件绑定的原理：就是给元素的某一个事件私有属性赋值（浏览器会建立监听机制，当我们触发元素的
 *      某个行为，浏览器会自己把属性中赋的值去执行）
 * [DOM2]
 *      box.addEventListener('click',function(){},false)  移除：removeEventListener
 *      在IE低版本浏览器中使用的是attachEvent来处理的
 *      box.attachEvent('onclick',function(){}) 移除使用的是 dettachEvent
 *      dom2基于addEventListener 完成事件绑定，是基于“事件池机制”完成的
 *      事件池是用来存储监听的方法的：
 *          如果事件池中已经存在某个要添加的方法，则不再重新增加
 *    box-click 事件池
 *      fn1
 *      fn2
 *      fn3
 *      fn4
 *      ...
 *   绑定：
 *     box.addEventListener('click',fn1,false)
 *     box.addEventListener('click',fn2,false)
 *     box.addEventListener('click',fn3,false)
 *     box.addEventListener('click',fn1,false)
 *     box.addEventListener('click',fn4,false)
 *      当我们触发box的click行为后，浏览器会到事件池中“按照顺序”依次把之前监听的方法执行
 *          1.每一个被执行的方法，浏览器都会把事件对象传递给他
 *          2.方法中的this是当前操作的元素
 *          3.执行的方法不会出现重复（在向事件池中增加的时候就去重了）
 * 浏览器只有一个事件池
 * 序号    元素    事件类型    方法    阶段    ....     box.addEventListener('click',fn1,false)
 *  1     box      click     fn1    冒泡           box.addEventListener('click',fn1,false)  会到事件池中筛选：按照元素、类型、方法阶段严格筛选，如果都一样属于重复，
 *  2     box    mouseover   fn1    冒泡           box.addEventListener('mouseover',fn1,false)             只要有一个不一样就不是重复，重复是不会向事件池中增加的
 * 
 * DOM2事件绑定可以给当前元素的某一个事件行为绑定“多个不同的方法”
 */
box.onclick = function(){
    console.log(1)
}
box.onclick = function(){
    console.log(2)
}
// 输出2，DOM0事件绑定：只允许给当前元素的某个事件行为绑定一个方法，多次绑定，后面绑定的内容会
// 替换前面绑定的，以最后一次绑定的方法为主；（一个属性只能赋一个值）