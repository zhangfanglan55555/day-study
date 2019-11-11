
/**
 *  html：
 * <div class='header' id ='header'>
 *      <span>排序:</span>
 *      <a href='javascript:;'>上架时间</a>
 *      <a href='javascript:;'>价格</a>
 *      <a href='javascript:;'>热度</a>
 * </div>
 * <ul class='list' id='list'>
 * 
 * </ul>
 */

let listBox = document.getElementById('list'),
    headerBox = document.getElementById('header'),
    linkList = headerBox.getElementsByTagName('a'),
    productList = listBox.getElementsByTagName('li');
~function () {
    let productData = null;
    let xhr = new XMLHttpRequest();
    xhr.open('get', '接口地址', false);
    xhr.onreadystatechange = () => {
        xhr.readyState === 4 && xhr.status === 200 ? productData = xhr.responseText : null;
        productData ? productData = JSON.parse(productData) : null;
        // json字符串转对象 JSON.parse
    }
    xhr.send(null);

    // BIND DATA
    let str = ``;
    for (let i = 0; i < productData.length; i++) {
        let {
            title,
            img = 'img/1.jpg',
            price,
            time,
            hot
        } = productData[i];
        str += `
            <li data-price='${price}'
                data-time = '${time}'
                data-hot = '${hot}'>
                <a href='javascript:;'>
                    <img src='${img}' />
                    <p>${title}</p>
                    <span>¥${price}</span>
                </a>
            </li>
        `
    }
    listBox.innerHTML = str;
}()

//=>完成操作
~function () {

    let sortList = () => {
        //按照价格升序排列
        //1.基于GET-ELEMENTS_BY_TAG_NAME获取的元素集合是一个类数组，不能直接使用数中的sort方法
        // let productAry = Array.from(productList);
        let productAry = [].slice.call(productList);//ie678不兼容
        // 2.基于sort给所有的li按照其价格进行排序
        productAry.sort((a, b) => {
            // a : 数组中的当前项
            // b : 数组中的下一项
            // return a-b; 用数组当前项减去下一项，如果结果是大于0，sort会将ab交换位置（将大的往后移）
            /**
             * 在这里a是一个li,b是一个li;应该让价格相减获得从而实现排序
             *  首先数据绑定的时候，可以把后面需要用到的价格、日期、销量等信息存储到li的自定义属性中，
             *   在结构中显示的 后期只能基于getAttribute这种模式获取
             *   后期需要用到这个值的时候，我们基于自定义属性获取到即可
             */
            let aP = a.getAttribute('price');
            let bP = b.getAttribute('price');
            return aP-bP;//按照价格升序
        })
        // 3.按照排好序的数组，我们把LI重新增加到页面中
        for(let i = 0;i<productAry.length;i++){
            let curLi = productAry[i];
            listBox.appendChild(curLi)
            // appendChild具有移动节点的能力
        }
    }
    sortList();
}()
// 面试题：把当前数组随机打乱
let ary = [12, 2, 3, 2, 99, 32];
ary.sort((a, b) => {
    return Math.round(Math.random() * 10 - 5);
})
// Math.floor(n); 返回小于等于n的最大整数。
//Math.round() 方法可把一个数字舍入为最接近的整数。
// Math.random() 结果为0-1间的一个随机数(包括0,不包括1) 
//Math.random()*10-5 得到-5到5之间的随机数
//Math,random()*10-1 得到-1到10之间的随机数，不包含10
// 如果要2-10之间则将括号内1改为2 即可

// 取[最大值，最小值]区间内的随机数，包含最大值和最小值
Math.round(Math.random() * (最大值 - 最小值) + 最小值)