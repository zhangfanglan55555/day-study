var btnBox = document.getElementById('btnBox'),
    inputs = btnBox.getElementsByTagName('input');
for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = function () {
        alert(i)
    }
}
/**
* 1.为啥不行？
*  时间绑定是异步编程，当出发点击行为，绑定的方法执行的时候，外层循环已经结束；方法
* 执行产生私有作用域，用到变量i，不是私有变量，按照[作用域链]的查找机制，找到的
* 是全局下的i,(此时全局的i已经是循环最后一次的结果3)
* 2.如何解决？
* ->自定义属性
* ->闭包
* ->Es6
*/
// Es6和闭包的机制类似，es6中使用let创建变量，会形成块级作用域，当前案例中
// 每一轮循环都会有一个自己的块级作用域，把后续需要用到的索引值i
// 实现存储到自己的作用域中
for (let i = 0; i < inputs.length; i++) {
    inputs[i].onclick = function () {
        alert(i)
    }
}