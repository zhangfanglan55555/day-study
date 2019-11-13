import cookie from 'js-cookie'
import { sys } from '_sysConf/config'
import * as storage from './storage'

// 设置cookie
export const setCookie = (name, value, options) => {
    if ($.isNumeric(options)) {
        options = { expires: options };
    }
    if (sys.useCookie) {
        cookie.set(name, value, options);
    } else {
        storage.setItem(name, value);
    }
}

// 获取cookie
export const getCookie = (name) => {
    let value;
    if (sys.useCookie) {
        value = cookie.get(name);
    } else {
        value = storage.getItem(name);
    }
    return value;
}