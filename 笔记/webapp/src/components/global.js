import remote_js from './common/remote-js';

export default {
    install: function (Vue) {
        Vue.component('remote-js', remote_js)
    }
};