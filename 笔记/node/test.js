function *go(){
    console.log(1);
    let b = yield 'a';//此处的b是用来供外界输入值进来的
    console.log(2);
    let c = yield b;
    console.log(3);
    return c;
}
// 生成器函数和普通函数不一样，调用它的话函数并不会立刻执行
// 它会返回此生成器的迭代器,迭代器是一个对象，每调用一次next就可以返回一个值对象
let it = go();
let r1 = it.next();  //{value:'a',done:false}
console.log(r1)
//第一次调用next会返回一个对象，此对象有2个属性，
//一个是value就是yield 后面那个值，一个是done表示是否迭代完
let r2 = it.next('B');
console.log(r2)
let r3 = it.next()
console.log(r3)