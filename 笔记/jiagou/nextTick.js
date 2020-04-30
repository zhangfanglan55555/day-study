// function read() {
//     setImmediate(function () {
//         console.log(1);
//         process.nextTick(function () {
//             console.log(2);
//             process.nextTick(function () {
//                 console.log(3);
//             })
//             setImmediate(function () {
//                 console.log(5)
//             })
//         })
//     })


//     process.nextTick(function () {
//         console.log(0);
//     })
// }
// read();
// 0 1 2 3 5

// function read(params) {
//     setImmediate(function(){
//         console.log(1)
//         setImmediate(function(){
//             console.log(2)
//             process.nextTick(function(){
//                 console.log(0)
//             })
//             setImmediate(function(){
//                 console.log(3)
//             })
//         })
//     })
// }
// read()

function Clock() {
    this.listener;
    process.nextTick = (() => {
        this.listener();
    })
}
Clock.prototype.add = function (listener) {
    this.listener = listener
}
let c = new Clock;
c.add(() => { console.log('ok') })