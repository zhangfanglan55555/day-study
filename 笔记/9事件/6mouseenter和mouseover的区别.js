/**
 * [mouseenter]  [mouseleave]
 *  
 * [mouseover]  [mouseout]
 * 
 * 
 * mouseenter 和 mouseover 的区别：
 * 1.over属于滑过(覆盖)事件，从父元素进入到子元素，属于离开了父元素，会触发父元素
 *  的out，触发子元素的over
 *   enter属于进入，从父元素进入子元素，并不算离开父元素，不会触发父元素的leave，
 *   触发子元素的enter
 * 2.enter 和 leave阻止了事件的冒泡传播，而over和out还存在冒泡传播
 * 
 * 所以对于父元素嵌套子元素这种情况，使用over会发生很多不愿意操作的事情，此时我们使用enter
 * 会更加简单，操作方便，所以真实项目中enter的使用会比over多。
 */