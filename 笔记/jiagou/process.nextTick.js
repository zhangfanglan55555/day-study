function next() {
    console.log(1)
    setTimeout(function () {
        console.log(2)
    })
    // nextTick 是把这个回调函数放在当前执行栈的尾部
    process.nextTick(function () {
        console.lg(3)
        process.nextTick(function () {
            console.lg(4)
            process.nextTick(function () {
                console.lg(5)
            })
        })
    })
}
next();//1 3 4 5 2