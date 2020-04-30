// 基于node 的  node不支持import 语法
// 自己补充的webpack打包设置
/**
 * 默认环境变量  NODE_ENV production development 本地开发环境
 */
let path = require('path');
module.exports = {
  //  是否是线上环境
  publicPath: process.env.NODE_ENV === 'production' ? "http://shangxian" : "/",
  // 把js和css打包出来的文件单独放到指定文件夹
  assetsDir: "assets",
  // 输出的目录,默认是dist
  outputDir: "./dist",
  // true-使用模板方式  一般不使用 使用的话文件体积会变大
  runtimeCompiler: false,
  // 打包不再使用 sourcemap
  productionSourceMap: false,
  // 可以获取到webpack的配置，再增加一些自己的逻辑
  chainWebpack: config => {
    // 设置快捷引用方式
    config.resolve.alias.set("@", path.resolve(__dirname, 'src'))
    config.resolve.alias.set('@c', path.resolve(__dirname, 'src/components'))
    config.resolve.alias.set('@v', path.resolve(__dirname, 'src/views'))
    config.resolve.alias.set('@r', path.resolve(__dirname, 'src/router'))
  },
  configureWebpack: { //webpack-merge
    plugins: [],
    module: {}
  },
  devServer: {//开发服务时代理接口
    proxy: {
      '/api/getUser': {
        target: " http://localhost:3000",
        pathRewrite: { '/api': "" },
        changeOrigin: true
      }
    }
  },
  // 全局自动注入公共样式
  pluginOptions:{
    'style-resources-loader':{
      preProcessor:'less',
      patterns:[
        '/Users/zhangfanglan/a/学习视频/day-study/笔记/第一期/vue-router/src/assets/common.less'
      ]
    }
  }
}
// vue ui 安装插件
// vue add style-resources-loader 安装插件
//  npm i @vue/cli-style-resources-loader 
