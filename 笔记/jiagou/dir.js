let fs = require('fs')
let path = require('path')
// 当创建目录的时候必须要求父目录是存在的
// fs.mkdir('jiagou/b',function(err){

// })
// 判断一个文件或目录是否存在
// fs.access('a',fs.constants.R_OK,function(err){
//     console.log(err)
// })
// 递归异步创建目录
function mkdirp(dirname, callback) {
    fs.access(dirname, function (err) {
        if (err) {
            // 递归调用 mkdirp
            mkdirp(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback)
            })
        }
        else {
            // 是个目录则执行callback方法
            callback();
        }
    })
}
mkdirp('a/b/c', () => {
    console.log('over')
})