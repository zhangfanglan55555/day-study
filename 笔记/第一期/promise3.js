function Promise(executor) {
    let self = this;
    self.status = 'pending';
    self.value = undefined;
    self.reason = undefined;
    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = [];
    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.value = value;
            self.onFulfilledCallbacks.forEach(fn => fn())
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.reason = reason;
            self.onRejectedCallbacks.forEach(fn => fn())
        }
    }
    try {
        executor(resolve, reject)//用户会调用resolve /reject
    } catch (e) {
        reject(e);//说明失败了
    }
}
// 这个规范是通用的 我们的promise可能胡子爱别的promise中使用
function resolvePromise(p2, x, resolve, reject) {
    if (p2 === x) {//防止自己调自己，死循环
        return reject(new TypeError('循环引用了'))
    }
    // 保证当前x是一个引用类型
    let called;//表示当前有没有被调用过
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        // 很有可能是一个promise
        try {
            let then = x.then;
            if (typeof then === 'function') {//默认为promise对象
                then.call(x, y => {
                    // y有可能是一个promise
                    if (called) return; //给别人的promise增加的逻辑
                    called = true;
                    resolvePromise(p2, y, resolve, reject)
                    // resolve(y);//成功拿到成功的结果，让p2状态变成成功态
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r)
                });//要把x作为this的指向来调用
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e)
        }
    } else {
        resolve(x);//普通值 直接成功即可
    }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
    let self = this;
    // 调用then后需要返回一个全新的promise
    let p2 = new Promise(function (resolve, reject) {
        if (self.status === 'resolved') {
            setTimeout(() => {//这里要使用p2 所以需要增加异步保证可以获取到p2
                try {
                    let x = onFulfilled(self.value)
                    resolvePromise(p2, x, resolve, reject)
                } catch (e) {
                    reject(e)//如果执行函数时抛出失败，那么会走向下一个then的失败态
                }
            }, 0)
        }
        if (self.status === 'rejected') {
            setTimeout(() => {
                let x = onRejected(self.reason)
                resolvePromise(p2, x, resolve, reject)
            }, 0)
        }
        if (self.status === 'pending') {
            self.onFulfilledCallbacks.push(function () {
                onFulfilled(self.value)
            })
            self.onRejectedCallbacks.push(function () {
                onRejected(self.value)
            })
        }
    })
    return p2;
}
