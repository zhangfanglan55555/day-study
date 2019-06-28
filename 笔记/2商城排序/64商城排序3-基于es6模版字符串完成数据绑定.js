// 数据绑定：依托获取的数据，把页面中需要展示的数据和结构都搞出来，然后把创建好的数据和结构放到
//页面指定容器中

/**
 * 1.字符串拼接
 *   -> 传统字符串拼接
 *   -> es6模版字符串拼接
 *   -> 模版引擎：原理也是字符串拼接
 * 2.动态创建DOM
 *  - createElement
 *  - appendChild
 *  弊端：操作起来太麻烦，而且性能消耗更大（DOM回流）
 */

let list = document.getElementById("list");
let str = ``;
for (let i = 0; i < productData.length; i++) {
    let {
        title,
        img = 'img/1.jpg',//默认图
        price
    } = productData[i];
    str += ` <li>
                <a href='javascript:;></a>
                <img src='${img} />
                <p>${title}</p>
                <span>¥${price}</span>
            </li>`
}
list.innerHTML = str;