let productData = null;
let xhr = new XMLHttpRequest;
xhr.open('get', '接口地址', fasle)
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        productData = xhr.responseText;
    }
}
xhr.send(null)
//获取的结果是一个字符串：“JSON格式的字符串”
/**
 * json格式：json不是一种数据类型，而是一种数据格式，只要把对象的属性名用双引号扩起来，
 * 此时的对象就不再称之为普通对象，而是叫做JSON格式的对象；
 * 从服务器端获取的数据格式一般都是json格式的（大部分是json格式的字符串）
 *  window.JSON
 *  1.parse:把json格式的字符串转换为对象
 *  2.stringify：把对象转换为json格式的字符串
 */
let obj = {
    'name': 'xxx'
}//obj 是json格式对象（操作起来和普通对象没啥太大区别）

let str = '{"name":"xxx"}';//JSON格式的字符串
console.log(productData)


// json字符串转对象
JSON.parse(productData)
