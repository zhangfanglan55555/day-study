import VueScroller from 'vue-scroller'
import scroller from './scroller'

export default {
    install: function (Vue) {
        Vue.use(VueScroller)
        Vue.component('scroller', scroller)
    }
}