// let fs = require('fs');
// // 一个汉字两个字节，一个字节8个位
// let iconv = require('iconv-lite')
// fs.readFile('1.txt', function (err, data) {
//     // 实现转码操作，把一个gbk编码的buffer转成ut8f字符串，默认情况下node不支持gbk
//     let str = iconv.decode(data, 'gbk')
// })
let str = '珠峰';
let fs = require('fs');
// 0o666意思是可读可写不执行，但是这个位置设置文件的操作权限，一般不传,
fs.open('./jiagou/2.txt', 'w', 0o666, (err, fd) => {
    // console.log(fd);//0-标准输入 1-标准输出  2-错误输出
    let buffer = Buffer.from(str)
    // 当我们调用write方法写入文件的时候，，并不会写入物理文件，而是会先写入缓存区，再批量写入物理文件
    fs.write(fd, buffer, 0, 3, null, (err, bytesWritten) => {
        console.log(err, bytesWritten)
        fs.write(fd,buffer,3,3,null,(err)=>{
            // 迫使操作系统马上把缓存区的内容写入物理文件
            fs.fsync(fd,()=>{
                fs.close(fd,()=>{
                    console.log('over')
                })
            })
        })
    })
})