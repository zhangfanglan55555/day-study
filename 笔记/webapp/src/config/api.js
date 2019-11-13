import url from '_conf/url'
// let url = 'https://xue.yichehuoban.cn/'

// 课程列表
export const lesson = {
    list: `${url}/lesson/list`,
    // 课程分类
    classlist: `${url}/lesson/classlist`,
    // 课程详情
    detail: `${url}/lesson/detail`,
    // 视频列表
    videolist: `${url}/lesson/videolist`,
    // 视频详情
    video: `${url}/lesson/video`,
    // 上传观看信息
    upstudyinfo: `${url}/lesson/upstudyinfo`,
    // 兑换
    buy: `${url}/lesson/buy`
}

// 轮播广告位
export const focuspicture = {
    list: `${url}/focuspicture/list`
}

// 评论
export const comment = {
    //  评论列表
    list: `${url}/comment/list`,
    //  评论添加
    add: `${url}/comment/add`,
    // 点赞列表 
    thumuplist: `${url}/comment/thumuplist`,
    // 点赞或取消点赞 
    thumbsup: `${url}/comment/thumbsup`
}
// 通用模块 - 个人信息
export const learn = {
    // 获取我的个人信息
    userinfo: `${url}/learn/userinfo`,
    // 个人签到信息和个人统计信息
    userstatisticsinfo: `${url}/learn/userstatisticsinfo`,
    // 是否收藏
    isfavorite: `${url}/learn/isfavorite`,
    // 收藏操作
    favorite: `${url}/learn/favorite`,
    // 易车币查询
    coin: `${url}/learn/coin`
}
// 签到
export const signin = {
    // 获取本月签到日期列表
    getSignInList: `${url}/sign/list`,
    // 签到
    signin: `${url}/sign/signin`
}