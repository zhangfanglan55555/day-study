function read() {
    console.log(1);
    setTimeout(function () {
        console.log(2)
    })
    console.log(3)
}
read();//1 3 2

function read() {
    console.log(1);
    setTimeout(function () {
        console.log(2)
        setTimeout(function () {
            console.log(4)
        })
    })
    setTimeout(function () {
        console.log(5)
    })
    console.log(3)
}
read();//1 3 2 5 4

//事件是什么时候加入队列的？比如ajax，是发送ajax的时候就加入队列了还是ajax返回数据的时候加入队列？

function read() {
    console.log(1)
    ajax();//需要3秒才会返回4
    setTimeout(function () {
        console.log(3)
    }, 1000)
}
read();//134