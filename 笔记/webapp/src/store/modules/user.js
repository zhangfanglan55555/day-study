import { learn } from '_api'
import { post } from '_lib/ajax'
import Promise from 'promise'

export default {
    state: {
        userId: 919462,
        userInfo: "张芳兰"
    },
    mutations: {
        // 保存用户id
        setUserId(state, userId) {
            state.userId = userId;
        },
        // 保存用户全量信息
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        // 获取用户信息
        // getUserInfo({ state, commit }) {
        //     return new Promise((resolve, reject) => {
        //         post(learn.userinfo, {}).then(resolve).catch(reject);

        //     });
        // }
    }
}