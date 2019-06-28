
// [获取DOM的属性和方法]
//     [获取元素或者元素集合]
//         -getElementById 
//             ->上下文只能是document(只有document这个实例的原型链上才能找到这个方法，其他实例都找不到)
//             -> ID重复了获取第一个
//             -> ie6~7中会把表单元素的name当做id使用
//         -getElementsByTagName
//             ->获取当前上下文中所有子子孙孙中标签名叫xxx的元素
//         -getElementsByClassName
//             -> ie678不兼容
//         -getElementsByName
//             -> ie浏览器中只对表单元素的name起作用
//             -> 上下文也只能是document
//         -querySelector
//         -querySelectorAll
//             -> 不兼容ie6~8
//             -> 没有DOM映射
//         -document.documentElement
//         -document.body
//         -document.head
//         ...

// [描述节点和节点之间关系的属性]
//         nodeType nodeName nodeValue
//     -元素节点 1   大写标签名 null
//     -文本节点 3   #text    文本内容
//     -注释节点 8   #comment 注释内容
//     -文档节点 9   #document null

//     childNodes:所有子节点
//     children:所有元素子节点（ie6~8中会把注释当做元素节点)
//     parentNode
//     previousSibling 上一个节点
//     previousElementSibling
//     nextSibling
//     firstSibling
//     firstChild
//     lastChild

//     [动态操作DOM]
//         createElement
//         createDocumentFragment
//         appendChild
//         insertBefore
//         cloneNode(true/false) 深克隆/浅克隆
//         removeChild
//         set/get/removeAttribute
//     [散]
//         xxx.style.xxx = xxx 设置行内样式
//         xxx.style.xxx 获取行内样式

//         xxx.className = 'xxx'

//         xxx.onclick = function ...

/**
 * JS盒子模型属性
 *  => 在JS中通过相关的属性可以获取（设置）元素的样式信息，这些属性就是盒子模型属性（基本上都是有关于样式的）
 *  [client]
 *      top
 *      left
 *      width
 *      height
 *  [offset]
 *      top
 *      left
 *      width
 *      height
 *      parent
 *  [scroll]
 *      top
 *      left
 *      width
 *      height
 */

[html结构]
/**
<style>
    #outer{
        margin:50px auto;
        width:260px;
        height:260px;
        padding:20px;
        内容宽高，不含padding\border 
        设置box-sizing:border-box;代指的是这个那个盒子的宽高(内容+padding+border)
        border:10px solid red;
    }
    #inner{
        width:200px;
        height:200px;
        padding:20px;
        border:10px solid green;
    }
    #center{
        width:180px;
        height:180px;
        border:10px solid blue;
    }
</style>
<div id='outer'>
    <div id='inner'>
        <div id = 'center'>
        </div>
    </div>
</div>
clientTop/Left/Width/Height
1.clientWidth & clientHeight：获取当前元素可视区域的宽高(内容的宽高+上下padding)
    outer.clientWidth 300 
    out.clientHeight 300
    和内容是否有溢出无关，和是否设置了overflow:hidden也无关，就是我们自己设定的内容宽高+padding
    获取当前页面一屏幕（可视区域的宽高）
            // 最好使用这种方式
            document.documentElement.clientWidth;
            document.documentElement.clientHeight;
        或者
            需要设置html,body{height:100%}
            document.body.clientWidth;
            document.body.clientHeight;
2. clientTop & clientLeft 获取上/左边框的宽度

3. offsetWidth &offsetHeight 在client基础上加上border(和内容是否溢出也没有关系)


4. scrollWidth & scrollHeight ：真实内容的宽高（不一定是自己设定的值，因为可能会存在内容溢出，有内容溢出的情况下，需要
    把溢出的内容也算上）+左/上padding,而且是一个约等于的值。（没有内容溢出和client值一样）
    =》 在不同浏览器中，或者是否设置了overflow:hidden都会对最后的结果产生影响，所以这个值仅做参考，属于约等于的值

    获取当前页面的真实宽高（包含溢出的部分）
        document.documentElement.scrollWidth
        document.documentElement.scrollHeight
 */