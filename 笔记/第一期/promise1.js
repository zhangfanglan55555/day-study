function Promise(executor) {
    let self = this;
    self.status = 'pending';
    self.value = null;
    self.reason = null;
    function resolve(value) {
        if (self.status === 'pending') {
            self.value = value;
            self.status = 'resolved'
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            self.reason = reason;
            self.status = 'rejected'
        }
    }
    executor(resolve, reject);
}
Promise.prototype.then = function (onFulfilled, onRejected) {
    let self = this;
    if (self.status === 'resoved') {
        onFulfilled(self.value)
    }
    if (self.status === 'rejected') {
        onRejected(self.reason)
    }
}
module.exports = Promise