import Vue from 'vue'
import common from './common'
import _alert from './alert'
import _confirm from './confirm'
import _tip from './tip'

let dialogContainer = document.body;

let _ok = function () {
    common.close.call(this, dialogContainer);
    this.ok && this.ok();
}

let _close = function (vm) {
    common.close.call(vm || this, dialogContainer);
    this.close && this.close();
}

// 确认框
export const confirm = {
    vm: null,
    show(text, ok, close) {
        let options = {
            data: function () {
                return {
                    text, ok, close
                }
            },
            methods: {
                _ok, _close
            },
            template: '<confirm :text="this.text" @ok="_ok" @close="_close"></confirm>',
            components: { confirm: _confirm }
        }
        let creator = Vue.extend(options);
        this.vm = new creator().$mount();
        dialogContainer.appendChild(this.vm.$el);
        return this;
    },
    hide() {
        this.vm._close(this.vm);
    }
}

// 提示框
export const alert = {
    vm: null,
    show(text, ok) {
        let options = {
            data: function () {
                return {
                    text, ok
                }
            },
            methods: {
                _ok
            },
            template: '<alert :text="this.text" @ok="_ok"></alert>',
            components: { alert: _alert }
        }
        let creator = Vue.extend(options);
        this.vm = new creator().$mount();
        dialogContainer.appendChild(this.vm.$el);
        return this;
    },
    hide() {
        this.vm._close(this.vm);
    }
}

// tip 提示层
export const tip = {
    vm: null,
    show(text, callback) {
        let options = {
            data() {
                return { text, ok: callback }
            },
            methods: {
                _ok
            },
            template: '<tip :text="this.text" :close="_ok"></tip>',
            components: { tip: _tip }
        }
        let creator = Vue.extend(options);
        this.vm = new creator().$mount();
        dialogContainer.appendChild(this.vm.$el);
        return this;
    }
}