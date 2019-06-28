let productRender = (function () {
    let productData = null, listBox = document.getElementById('list'),
        headerBox = document.getElementById('headerBox'),
        linkList = headerBox.getElementsByTagName('a'),
        productList = listBox.getElementsByTagName('li');
    console.log(productList);
    //第一次执行是空，第二次有值。DOM之间的映射会自动更新。
    //基于querySelectorAll获取到的节点集合不存在DOM映射机制（绑定完成后需要重新的获取元素才可以）
    let getData = function () {
        let xhr = new XMLHttpRequest();
        xhr.open('get', '接口地址', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                productData = JSON.parse(xhr.responseText);
            }
        }
        xhr.send(null)
    }
    let bindHTML = function () {
        let str = '';
        productData.forEach((item, index) => {

            str += `
                <li data-price='${item.price}'
                data-time = '${item.time}'
                data-hot = '${item.hot}'>
                    <a href='javascript:;'>
                        <img src='${item.img}' />
                        <p>${item.title}</p>
                        <span>¥${item.price}</span>
                    </a>
                </li>
            `
        });
        listBox.innerHTML = str;
    }
    //BIND-CLICK:给三个排序标签绑定点击事件
    let bindClick = function () {
        [].forEach.call(linkList, (curLink, index) => {
            //循环三次，执行三次这个方法，每一次执行都会形成一个闭包，每一个闭包中保存
            //了当前这个A对应的索引INDEX
            curLink.flag = -1;
            curLink.onclick = function () {
                //1.给PRODUCT-LIST进行排序（依据点击列的不同）
                // =》点击的需要获取每一个LI的价格/热度等信息，此时我们可以在绑定的时候，把这些信息
                //存储到自定义属性上，点击的时候根据自定义属性获取即可
                this.flag *= -1;
                let ary = ['data-time', 'data-price', 'data-hot'];
                // A:根据点击LI的索引获取按照谁来排序
                productList = [].slice.call(productList);
                productList.sort((a, b) => {
                    let aInn = a.getAttribute(ary[index]),
                        bInn = b.getAttribute(ary[index]);
                    if (index === 0) {
                        aInn = aInn.replace(/-/g, '');//日期所有的-都去掉，才能实现数学相减
                        bInn = bInn.replace(/-/g, '');
                    }
                    return (aInn - bInn) * this.flag;
                });
                //基于文档碎片减少DOM回流
                let frg = document.createDocumentFragment()
                //2.按照最新顺序依次添加到容器中
                productList.forEach(curLi => {
                    frg.appendChild(curLi)
                })
                productBox.appendChild(frg);
                frg = null;
            }
        })
    }
    return {
        init: function () {
            getData();
            bindHTML();
            bindClick()
        }
    }
})()
productRender.init();


/**
 * forEach:数组中的方法，用来遍历数组中每一项内容的
 */
let ary = [12, 23, 34];
ary.forEach((item, index) => {
    console.log(item, index);
    /**
     * item:当前遍历数组中这一项的值
     * index：当前遍历数组中这一项的索引
     * 数组中有多少项，我们这个函数就被执行多少次，保证数组中的每一项都可以的到遍历
     */
})
/**
 * 12 0
 * 23 1
 * 34 2
 /**
  * 1.字符串拼接
  *     ->普通字符串拼接
  *     ->Es6模板字符串
  *     ->模板引擎
  * 2.DOM操作
  */
data.forEach((item, index) => {
    //->动态创建DOM得方式（外层容器基于CREATE-ELEMENT完成，容器中得具体内容可以基于创建DOM完成，
    // 也可以基于字符串拼接完成
    //之所以不建议使用这种方式，因为循环十次，每一次都改变了原有的
    // DOM结构，引发浏览器的10次回流
    let curLi = document.createElement('li');
    curLi.innerHTML = `<a>...</a>`
    document.querySelector('.productBox').appendChild(curLi)
})

/**
 * 基于文档碎片（虚拟内存中开辟的一个容器）可以解决这个问题：每当创建一个li，我们
 * 首先把它存放到文档碎片中（千万不要放到页面中，避免回流），当我们把需要的元素
 * 都创建完成，并且都添加到文档碎片中，再统一把文档碎片放到页面中（只会引发一次回流）
 * createDocumentFragment()方法，是用来创建一个虚拟的节点对象，或者说，
 * 是用来创建文档碎片节点。它可以包含各种类型的节点，在创建之初是空的。
 */

/**
 * DOM的[回流reflow]和[重绘repaint]
 * 1.计算DOM结构（DOM TREE）
 * 2.加载css
 * 3.生成渲染树（RENDER TREE），渲染树是和样式相关的
 * 4.浏览器基于GPU（显卡）开始按照RENDER TREE画页面
 * [重绘]：当某一个DOM元素样式更改（位置没变只是样式更改，例如：颜色变为红色）浏览器会重新渲染这个元素
 *      box.style.color = 'red';
 *       ...还有一些其他代码
 *      box.style.fontSize = '16px';
 *      上面的操作出发了两次重绘，性能上有所消耗，真是项目中为了优化这个性能，我们最好一次性把需要修改的样式搞定，例如：
 *      .xxx{
 *          color:'red';
 *          fontSize:'16px';
 *      }
 *      box.className = 'xxx';
 * [回流] ：当DOM元素的机构或者位置发生改变（删除、增加、改变位置position、改变大小）都会引发回流，所谓回流就是
 *          浏览器抛弃原有计算的结构和样式，重新进行DOM TREE 或者 RENDER TREE非常耗性能
 *
 */

/**
 * 分离读写：
 */
//[引发两次回流]
box.style.top = '100px';
console.log(box.style.top);//100px
box.style.left = '100px';

//[引发一次回流]
box.style.top = '100px';
box.style.left = '100px';
console.log(box.style.top);//100px