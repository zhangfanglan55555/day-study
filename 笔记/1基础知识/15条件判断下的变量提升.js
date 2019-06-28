
/**
 * 在当前作用域下，不管条件是否成立都要进行变量提升；
 * 带var的还是只声明
 * 带function的在老版本的浏览器渲染机制下，声明+定义都处理，但是为了迎合es6中的块级作用域，新版本浏览器
 * 对条件判断中的函数不管条件是否成立都只是先声明没有定义，类似于var
 */
if(1==2){
    var a = 13;
}
console.log(a);//undefined
// 在全局作用域下声明的变量相当于给window.b = undefined;
console.log(b);//undefined
if('b' in window){
    var b = 100;
}
console.log(b);//100


console.log(fn);//undefined
if(1===1){
    console.log(fn);//fn(){console.log('ok')}
    function fn(){
        console.log('ok')
    }
}
console.log(fn);//fn(){console.log('ok')}