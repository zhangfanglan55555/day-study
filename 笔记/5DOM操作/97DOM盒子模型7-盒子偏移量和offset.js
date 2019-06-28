/**
 * [offsetParent]：当前盒子的父级参照物
 *
 * [offsetTop/offsetLeft]:获取当前盒子距离其父级参照物的偏移量（上偏移/左偏移）当前盒子的外边框开始~父级参照物的内边框
 *
 * "参照物"：同一个平面中，元素的父级参照物和结构没有必然联系，默认他们的父级参照物都是body(当前平面最外层的盒子)
 *  body的父级参照物是null
 * "参照物可以改变"：构建出不同的平面即可(使用z-index,但是这个属性只对定位有作用)，所以改变元素的定位（position:relative/absolute/fixed)可以
 * 改变其父级参照物
 */
center.offsetParent  //===>body
inner.offsetParent   //===>body
outer.offsetParent  //===>body

utils.css(outer, {
    position: 'relative'//把outer脱离原有的平面，独立出一个新的平面，后代元素的父级参照物都会以它为参考
})

center.offsetParent  //===>outer
inner.offsetParent   //===>outer
outer.offsetParent  //===>body


utils.css(innder, {
    position: 'absolute'
})
center.offsetParent  //===>inner
inner.offsetParent   //===>outer
outer.offsetParent  //===>body


// 需求：不管元素父级参照物是谁，我都要获取当前元素距离body的偏移量（左偏移和上偏移）
// 1.不能修改既定样式(不能基于position方式改它的参照物了)
let  getOffset = function(){
    let offset = function (curEle) {
        // 1.先获取当前元素本身的左/上偏移
        let curLeft = curEle.offsetLeft, curTop = curEle.offsetTop,
            p = curEle.offsetParent;
        // 2.累加父级参照物的边框和偏移（一直向上找，找到body为止，每当找到一个父级参照物
        // 都把它的边框和偏移累加起来，根据元素不一样，具体找几次也不知道
        while (p.tagName != 'BODY') {
            // 当找到的父级参照物是body，结束查找和累加操作
            // 3.把找到的父参照物的边框和偏移值累加起来
            curLeft += p.clientLeft;
            curLeft += p.offsetLeft;

            curTop += p.clientTop;
            curTop += p.offsetTop;
            p = p.offsetParent;
        }
        return {
            top: curTop,
            left: curLeft
        }
    }
    return {
        offset
    }
}()
