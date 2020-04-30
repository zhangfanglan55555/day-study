// var reverseWords = function (str) {
//     return str.split(' ').map((val) => {
//         return val.split('').reverse().join('')
//     }).join(' ')
// };
// let str = "my name's zhang";
// reverseWords(str)
// setTimeout(function () {
//     console.log(3)
// }, 2000)
// setTimeout(function () {
//     console.log(1)
//     setTimeout(function () {
//         console.log(2)
//     }, 1000)
// }, 1000)
// let buf4 = Buffer.alloc(4);
// console.log(buf4)
// buf4.fill(3,1,3);//[0,3,3,3,0]
// console.log(buf4)
let buf5 = Buffer.alloc(6)
//向指定的索引写入一个8位的整数,也就是占用一个字节的整数
buf5.writeInt8(0,0)
buf5.writeInt8(16,1)
buf5.writeInt8(32,2)
console.log(buf5)//<Buffer 00 10 20 00 00 00>