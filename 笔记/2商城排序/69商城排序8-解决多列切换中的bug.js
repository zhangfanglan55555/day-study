
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
            return aP - bP;//按照价格升序
            return bP - aP;//按照价格降序
        })
        // 3.按照排好序的数组，我们把LI重新增加到页面中
        for (let i = 0; i < productAry.length; i++) {
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
//Math.round() 取四舍五入整数。
// Math.random() 结果为0-1间的一个随机数(包括0,不包括1) 
//Math.random()*10-5 得到-5到5之间的随机数
//Math,random()*10-1 得到1到10之间的随机数
// 如果要2-10之间则将括号内1改为2 即可

// 取[最大值，最小值]区间内的随机数，包含最大值和最小值
Math.round(Math.random() * (最大值 - 最小值) + 最小值)


    /**
     * 第二种方法
     */
    (() => {

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

            let sortList = function () {
                let { index, flag } = this;
                //按照价格升序排列
                //1.基于GET-ELEMENTS_BY_TAG_NAME获取的元素集合是一个类数组，不能直接使用数中的sort方法
                // let productAry = Array.from(productList);
                let productAry = [].slice.call(productList);//ie678不兼容
                // 2.基于sort给所有的li按照其价格进行排序
                // this:当前操作A
                productAry.sort((a, b) => {
                    let ary = ['data-time', 'data-price', 'data-hot'],
                        aInn = a.getAttribute([index]),
                        bInn = b.getAttribute([index]);
                    if (index === 0) {
                        //将日期中的-替换为空串
                        aInn = aInn.replace(/-/g, '');
                        bInn = aInn.replace(/-/g, '');
                    }
                    return (aInn - bInn) * flag;//先升序后将序

                })
                // 3.按照排好序的数组，我们把LI重新增加到页面中
                for (let i = 0; i < productAry.length; i++) {
                    let curLi = productAry[i];
                    listBox.appendChild(curLi)
                    // appendChild具有移动节点的能力
                }
            }
            //linkList升降序按钮
            // 给每一个link都绑定点击切换
            for (let i = 0; i < linkList.length; i++) {
                let curLink = linkList[i]
                curLink.flag = -1;
                curLink.index = i;
                curLink.onclick = function () {
                    //点击当前的A标签，我们需要让其余的A标签的flag回归原始值-1，这样下一次再点击某一个A标签，还是
                    // 从-1开始乘，变为1，也就是从升序开始的。
                    //this是当前操作的A标签（价格）
                    for (let j = 0; j < linkList.length; j++) {
                        let item = linkList[i];
                        if (item != this) {
                            item.flag = -1
                        }
                    }
                    this.flag *= -1;//每一次点击可以让flag的值从1到-1来回切换（第一次为1，第二次为-1.。。）

                    sortList.call(this);
                    //执行SORT-LIST,让方法中的this关键字改为操作的a标签
                    //箭头函数虽然很强大，但是不可以乱用，尤其是需要改变函数中this的情况下，箭头函数中的this不受管控
                    //都是默认继承上下文中的，基于call也是改不了的
                }
            }

        }()
        // 面试题：把当前数组随机打乱
        let ary = [i2, 2, 3, 2, 99, 32];
        ary.sort((a, b) => {
            return Math.round(Math.random() * 10 - 5);
        })
        // Math.floor(n); 返回小于等于n的最大整数。
        //Math.round() 方法可把一个数字舍入为最接近的整数。
        // Math.random() 结果为0-1间的一个随机数(包括0,不包括1) 
        //Math.random()*10-5 得到-5到5之间的随机数
        //Math,random()*10-1 得到1到10之间的随机数
        // 如果要2-10之间则将括号内1改为2 即可

        // 取[最大值，最小值]区间内的随机数，包含最大值和最小值
        Math.round(Math.random() * (最大值 - 最小值) + 最小值)
    })()