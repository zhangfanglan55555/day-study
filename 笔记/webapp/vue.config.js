const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const resolve = dir => {
  return path.join(__dirname, dir)
}

fs.writeFileSync(path.join(__dirname, './config/env.js'), `export default {'NODE_ENV':'${process.env.NODE_ENV}','BASE_URL':'${process.env.BASE_URL}'}`)

const BASE_URL = process.env.BASE_URL
module.exports = {
  baseUrl: BASE_URL,
  devServer: {
    port: 8899,
    proxy: {
      '/api': {
        target: 'http://192.168.15.19:9092/college-m',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
      .set('_api', resolve('src/config/api'))
      .set('_lib', resolve('src/libs'))
      .set('_sysConf', resolve('src/config'))
      .set('vue$', 'vue/dist/vue');
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery'
      })
    ]
  },
  // 打包时不生成.map文件
  productionSourceMap: false
}
