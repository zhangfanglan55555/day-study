/**
 * 1.获取数据和实现数据绑定
 * =》真实项目中，页面中大部分数据都不是写死的，而是动态绑定的
 *  A：从服务端获取到数据（基于ajax/jsonp等技术，通过服务器端提供的
 * 数据API接口地址，把数据请求回来)
 *  B：把获取的数据进行解析
 *  C：把数据绑定在html页面中（数据绑定）：ES6中的模版字符串
 */

let productData = null;//数据存储
let xhr = new XMLHttpRequest;//创建ajax实例
xhr.open('GET', '接口地址', false);
//打开一个请求的地址，一般地址都是服务器提供好的，会给我们一个api接口文档），最后一个参数是
//设置同步还是异步（false:同步，true:异步 ），真实项目中最常使用的是异步，我们今天为了简单使用同步

xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        productData = xhr.responseText;//获取响应主体
    }
}
xhr.send(null);


let xhr = new XMLHttpRequest();//
xhr.open('GET', '接口地址', false);
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        productData = xhr.responseText;
    }
}
xhr.send(null)

let xhr = new XMLHttpRequest();
xhr.open('get','借口地址',false)
xhr.onreadystatechange = ()=>{
    if(xhr.readyState ===4 && xhr.status === 200){
        productData = xhr.responseText;
    }
}
xhr.send(null);