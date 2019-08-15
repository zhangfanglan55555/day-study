/**
 * Promise:它是ES6中新增加的类（new Promise）,目的是为了 管理JS中的异步编程的，所以
 *         我们也把它称为“Promise设计模式”
 */
// 三个状态：pedding(准备：初始化成功，开始执行异步的任务) fulfilled(成功) rejected(失败)
new Promise(()=>{
    // 执行一个异步任务(new Promise的时候，创建一个Promise的一个实例，立即会
    // 把当前函数体中执行的异步操作执行)=>"Promise是同步的，它可以管理异步操作“
    setTimeout(()=>{

    },1000)
    console.log(1);//先输出1
}).then();
console.log(2);//再输出2

//1 2 


new Promise((resolve,reject)=>{
    // resolve：当异步操作执行成功，我们执行resolve方法
    // reject: 当异步操作执行失败，我们执行reject方法
    setTimeout(()=>{
        resolve(100);
    },1000)
}).then((res)=>{
    // 第一个传递的函数是resolve
    console.log('ok')
    console.log(res);//100
},()=>{
    // 第二个传递的函数是reject
    console.log('no')
});


let pro = new Promise((resolve,reject)=>{
    let xhr = new XMLHttpRequest();
    xhr.open('get','接口地址',true);//true异步
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4 && xhr.status === 200){
            val = xhr.responseText;
            resolve(val);
        }else{
            reject()
        }
    }
});
pro.then((res)=>{
    console.log(res);//val
    // 数据绑定
    return 100;//它返回的结果传递个第二个then了
},()=>{
    console.log('no')
}).then((res)=>{
    console.log(res);//100
    // 当第一个then中的函数执行完，会执行第二个
}).then(()=>{
    // 当第二个then中的函数执行完，会执行第二个
})