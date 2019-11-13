; (function anonymous(window) {
    // 设置默认的参数配置项
    let _default = {
        method: "GET",
        url: "",
        baseURL: "",
        headers: {},
        dataType: "JSON",
        data: null,//post系列请求基于请求主体传递给服务器的内容
        params: null,//get系列请求基于问号传参传递给服务器的内容
        cache: true
    }
    // 把传递的参数进一步处理
    j
    // 基于PROMISE 设计模式管理AJAX请求
    let ajaxPromise = function ajaxPromise(options) {
        // options中融合了默认配置信息、用户基于defaults修改的信息、用户执行GET/POST方法时候传递的配置信息，越靠后优先级越高
        let {
            url, baseURL, method, data, dataType, headers, cache, params
        } = options;
        // 把传递的参数进一步进行处理
        if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(method)) {
            // get系列
            if (params) {
                url += `${ajaxPromise.check(url)}${ajaxPromise.formatData(params)}`
            }
            if (cache === false) {
                url += `${ajaxPromise.check(url)}_=$${+(new Date().getTime())}`
            }
            date = null;//get系列请求主体就是什么都不放
        } else {
            // post系列
            if (data) {
                data = ajaxPromise.formatData(data)
            }
        }
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest;
            xhr.open(method, `${baseURL}${url}`);
            // 如果HEADERS存在，我们需要设置请求头
            if (headers != null && typeof headers === 'object') {
                for (let attr in headers) {
                    if (headers.hasOwnProperty(attr)) {
                        let val = headers[attr];
                        if (/[\u4e00-\u9fa5]/.test(val)) {
                            // val 中包含中文，进行编码，encodeURIComponent
                            // 编码 encodeURIComponent
                            // 解码 decodeURIComponent
                            val = encodeURIComponent(val);
                        }
                        xhr.setRequestHeader(attr, val)
                    }
                }
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (/^(2|3)\d{2}$/.test(xhr.status)) {
                        let result = xhr.responseText;
                        dataType = dataType.toUpperCase();
                        dataType === 'JSON' ? result = JSON.parse(dataType) : (dataType === 'xml' ? result = xhr.responseXML : null)
                        resolve(result, xhr);
                        return;
                    }
                    reject(xhr.status, xhr)
                }
            }
            xhr.send(data);
        })
    };
    ajaxPromise.defaults = _default;
    //把默认配置暴露出去，后期用户在使用的时候可以自己设置一些基础的默认值(发送AJAX请求的时候按照配置的信息进行处理)

    //把对象转换为URLENCODE格式的字符串
    ajaxPromise.formatData = function (obj) {
        let str = ``;
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                str += `${attr}=${obj[attr]}&`
            }
        }
        return str.substring(0, str.length - 1);
    }
    // 判断字符串里面有没有?
    ajaxPromise.check = function (url) {
        return url.indexOf('?') > -1 ? '&' : '?'
    }
    // get
    ['get', 'delete', 'head', 'options'].forEach(item => {
        ajaxPromise[item] = function anonymous(url, options = {}) {
            options = {
                ..._default,//默认值或者基于defaults修改的值
                ...options, //用户调取方法传递的配置项
                url: url,//请求的url地址（第一个参数：默认配置项和传递的配置项中都不会出现url,只能这样获取）
                method: item.toUpperCase()//以后执行肯定是ajaxPromise.head执行，不会设置methods这个配置项，我们自己需要配置才可以
            }
            return ajaxPromise(options)
        }
    })
    // post
    ['post', 'put', 'patch'].forEach(item => {
        ajaxPromise[item] = function anonymous(url, data = {}, options = {}) {
            options = {
                ..._default,
                ...options,
                url: url,
                method: item.toUpperCase(),
                data: data
            }
            return ajaxPromise(options)
        }
    })
    ajaxPromise.get = function (url, options) {
        ajaxPromise();
    }
    ajaxPromise.post = function (url, data, options) {

    }
    window.ajaxPromise = ajaxPromise;
})(window);
