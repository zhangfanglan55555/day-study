function Promise(executor) {
    let self = this;
    self.status = 'pending';
    self.value = null;
    self.reason = null;
    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = []
    function resolve(value) {
        if (self.status === 'pending') {
            self.value = value;
            self.status = 'resolved';
            // 发布
            self.onFulfilledCallbacks.forEach(fn => fn());
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            self.reason = reason;
            self.status = 'rejected'
            // 发布
            self.onRejectedCallbacks.forEach(fn => fn())
        }
    }
    executor(resolve, reject);
}
Promise.prototype.then = function (onFulfilled, onRejected) {
    let self = this;
    if (self.status === 'resolved') {
        onFulfilled(self.value)
    }
    if (self.status === 'rejected') {
        onRejected(self.reason)
    }
    if (self.status === 'pending') {
        // 订阅
        self.onFulfilledCallbacks.push(function () {
            onFulfilled(self.value)
        })
        self.onRejectedCallbacks.push(function () {
            onRejected(self.reason)
        })
    }
}
module.exports = Promise