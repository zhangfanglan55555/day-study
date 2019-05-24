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
    return {
        init: function () {
            getData();
            bindHTML();
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