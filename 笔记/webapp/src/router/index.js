import Vue from "vue"
import Router from "vue-router"
import routes from './routes'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { alert } from '_c/common/dialog'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

const HOME_PAGE_NAME = 'home';
router.beforeEach((to, from, next) => {
    NProgress.start();
    // 记录pv
    _hmt.push(['_trackPageview', to.path]);
    if (to.meta.title) {
        // 设置浏览器title
        document.title = to.meta.title;
        // 设置 app title
        let params = {
            typeId: 'setHeadBar',
            data: {
                title: to.meta.title,
                menus: {}
            }
        };
        yiframesjsbridge.call(`/common/headBar`, params, () => { });
    }
    if (store.state.user.userId) {
        next();
        return;
    }
    // store.dispatch('getUserInfo').then((value) => {
    //     store.commit('setUserId', value.userId);
    //     store.commit('setUserInfo', value);
    //     next();
    // }).catch(() => {
    //     alert.show('系统异常，请联系管理员');
    // });
})
router.afterEach(t => {
    NProgress.done();
})

export default router