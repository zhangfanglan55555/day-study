import axios from 'axios'
import Promise from 'promise'

// axios.defaults.timeout = 5000
// axios.interceptors.request.use(config => {
//     config.data = JSON.stringify(config.data);
//     config.headers = {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     };
//     // 标记添加身份信息
//     return config;
// })

// 请求回调
let callback = (resolve, reject, retValue) => {
    let data = retValue.data;
    if (data.result === 1) {
        resolve(data.retValue);
    } else {
        console.log(`接口请求异常：${data.description}`);
        reject(data.description);
    }
}

// 异常回调
let catchback = (reject, url, error) => {
    console.log(`接口请求异常：${url}-`, error);
    reject(error);
}

// post 请求
export const post = (url, param) => {
    return new Promise((resolve, reject) => {
        axios.post(url, param).then((retValue) => { callback(resolve, reject, retValue) }).catch((error) => { catchback(reject, url, error) });
    });
}

// get 请求
export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, { params }).then((retValue) => { callback(resolve, reject, retValue) }).catch((error) => { catchback(reject, error) });
    });
}