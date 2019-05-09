// var n = 2;
// var obj = {
//     n: 3,
//     fn: (function (n) {
//         n *= 2;
//         this.n += 2;
//         var n = 5;
//         return function (m) {
//             this.n *= 2
//             console.log(m + (++n))
//         }
//     })(n)

// }
// var fn = obj.fn;
// fn(3);
// obj.fn(3);
// console.log(n, obj.n)    


// function test(){
//     setTimeout(function(){
//         console.log(1)
//     },0)
//     new Promise(function(resolve,reject){
//         console.log(2);
//         for(var i = 0;i<10000;i++){
//             if(i===10){
//                 console.log(10)
//             }
//             i == 9999 && resolve();
//         }
//         console.log(3)
//     }).then(function(){
//         console.log(4)
//     })
//     console.log(5)
//     return 'done';
// }
// console.log(test())


// function Fn() {
//     this.m = '20'
// }
// var f = new Fn();

// function hasPubPrototype(obj, attr) {
//     if (attr in obj && !obj.hasOwnProperty(attr)) {
//         return true
//     } else {
//         return false
//     }
// }
// console.log(hasPubPrototype(f, 'm'))
// console.log(hasPubPrototype(f, 'valueOf'))
// if(!("a" in window)){
//     var a = 1;
// }
// console.log(a);

// function Person(name) {
//     console.log(`hi this is ${name}`);
// }
// Person.prototype.sleep = function (time) {
//     console.log(`等待${time}秒`);
//     setTimeout(function () {
//         console.log(`wake up after ${time}`)
//     }, time * 1000)
// }

var Person = function (name) {
    console.log(`hi this is ${name}`);
    return this;
}
var sleepFirst = function (time) {
    console.log(`等待${time}秒`);
    return this;
}
var sleep = function (time) {
    var lock = true;
    console.log(`等待${time}秒...`)
    await function a {
        setTimeout(function () {
            console.log('wake up after' + time);
            lock = false
        }, time * 100)
    }
    a();
    return this;
}
var eat = function (food) {
    console.log(`eat ${food}~`)
    return this;
}

// Person('dan');
Person('dan').sleep(10).eat('dinner')