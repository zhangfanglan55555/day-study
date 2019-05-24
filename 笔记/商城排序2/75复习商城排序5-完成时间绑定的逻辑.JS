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
                    return (aInn - bInn)*this.flag;
                });
                //2.按照最新顺序依次添加到容器中
                [].forEach.call(productList, curLi => {
                    productBox.appendChild(curLi)
                })
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
 */