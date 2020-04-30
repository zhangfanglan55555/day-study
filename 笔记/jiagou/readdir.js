let fs = require('fs');
let path = require('path')
fs.readdir('./a', function (err, files) {
    // console.log(files)
    files.forEach(files => {
        let child = path.join('./a',files);//path.join(父路径，子路径);//拼成一个完整路径
        fs.stat(child,function(err,stat){
            console.log(stat)
        });//
    })
})