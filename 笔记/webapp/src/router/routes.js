const home = r => require.ensure([], () => r(require('@/views/home')))
const courseIndex = r => require.ensure([], () => r(require('@/views/course')))
const alreadyAgainst = r => require.ensure([], () => r(require('@/views/course/alreadyAgainst')))
const collection = r => require.ensure([], () => r(require('@/views/course/collection')))
const signInDetail = r => require.ensure([], () => r(require('@/views/signIn/detail')))
const lessonExchange = r => require.ensure([], () => r(require('@/views/lesson/exchange')))
const signIn = r => require.ensure([], () => r(require('@/views/signIn/index')))
const shareYcb = r => require.ensure([], () => r(require('@/views/share/ycb')))
const lesson = r => require.ensure([], () => r(require('@/views/lesson/lesson')))
const lessontest = r => require.ensure([], () => r(require('@/views/lesson/test')))
const lessontesttest = r => require.ensure([], () => r(require('@/views/lesson/lessontest')))

export default [
    {
        path: '',
        redirect: 'home'
    },
    {
        path: "/lesson",
        name: "lesson",
        meta: { title: "课程详情" },
        component: lesson
    },
    {
        path: "/home",
        name: "home",
        meta: { title: "易车学院" },
        component: home
    },
    {
        path: "/lesson/testtest",
        name: "lessontesttest",
        meta: { title: "课程详情测试测试" },
        component: lessontesttest
    },
    {
        path: "/lesson/test",
        name: "lessonTest",
        meta: { title: "课程详情测试" },
        component: lessontest
    },
    {
        path: '/lesson/exchange/:id',
        name: 'lessonExchange',
        meta: { title: "课程兑换" },
        component: lessonExchange
    },
    //#region 签到、分享、签到详情
    {
        path: "/signIn/index",
        name: "signIn",
        meta: { title: "学习打卡" },
        component: signIn
    },
    {
        path: "/signIn/detail",
        name: "signInDetail",
        meta: { title: "打卡详情" },
        component: signInDetail
    },
    //#endregion
    {
        path: '/course',
        component: courseIndex,
        children: [
            {
                path: '',
                redirect: 'alreadyAgainst'
            },
            {
                path: 'alreadyAgainst',
                name: 'alreadyAgainst',
                meta: { title: "我的学习" },
                component: alreadyAgainst
            },
            {
                path: 'collection',
                name: 'collection',
                meta: { title: "我的学习" },
                component: collection
            },
            {
                path: 'learningStatistics/:source',
                name: 'learningStatistics',
                meta: { title: "我的学习" },
                component: signIn
            }
        ]
    },
    {
        path: "/share/ycb",
        name: "shareYcb",
        meta: { title: "如何赚取易车币" },
        component: shareYcb
    }
]