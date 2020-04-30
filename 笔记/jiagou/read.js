// fs核心模块来读写文件
let fs = require('fs');
//flag你将要对这个文件进行何种操作
// fs.readFile('./jiagou/1.txt',{encoding:"utf8",flag:'r'}, function (err, data) {
//     if (err) { console.log(err) }
//     else{
//         console.log(data)
//     }
// })
// fs.writeFile('./jiagou/2.txt', 'aaaa', { encoding: "utf8", flag: "a", mode: 0o666 }, function (err, data) {
//     console.log(err)
// })

// fs.appendFile('./jiagou/2.txt', 'bbb', "utf8" ,function (err, data) {
//     console.log(err)
// })


// process.stdin.on('data', function (data) {
//     console.log(data)
// })
// fs.open('./jiagou/1.txt', 'r', 0o66, function (err, fd) {
//     console.log(fd)
//     let buff = Buffer.alloc(4)
//                  // buffer的写入索引，从文件中读取3个字节，文件的读取位置
//     fs.read(fd, buff, 0, 3, 1, function (err, bytesRead) {
//         // console.log(buff.toString())
//         // position 不穿当前位置传 null或者不传意味着当前位置
//         let buff2 = Buffer.alloc(4)
//         fs.read(fd, buff2, null,3, 3, function (err, bytesRead) {
//             console.log(buff2.toString())
//         })
//     })
// })
// w 清空并写入
// a 追加
// fs.open('./jiagou/1.txt', 'r+', 0o666, function (err, fd) {
//     console.log(err)
//     console.log(fd)
//     // offset length position
//     // offset - 读取Buffer偏移量
//     // length - 读三个字节
//     // position 写入索引
//     fs.write(fd, Buffer.from('珠峰'), 3, 6, 0, function (err, byteWrite) {
//         console.log(byteWrite)
//     })
// })
// 为了实现解决内存的拷贝，读一点写一点
// let fs = require('fs');
// let fs = require('fs');
const BUFFER_SIZE = 3;//定义缓存大小3个字节

function copy(src, target) {
    fs.open(`./jiagou/${src}`, 'r', 0o666, function (err, readFd) {
        fs.open(`./jiagou/${target}`, 'w', 0o666, function (err, writeFd) {
            let buff = Buffer.alloc(BUFFER_SIZE)
            !function next() {
                fs.read(readFd, buff, 0, BUFFER_SIZE, null, function (err, bytesRead, buffer) {
                    // bytesRead实际读到的字节数
                    // console.log(bytesRead)
                    if (bytesRead > 0) {
                        console.log(buffer.toString())
                        fs.write(writeFd, buff, 0, bytesRead, null, next)
                    }
                })
            }()
        })
    })
}
copy('1.txt', '2.txt')