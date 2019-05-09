let f = (function () {
    var n = 20;
    function fn() {
        return n += 10
    }
    function sum() {
        return n += 2;
    }
    return {
        fn: fn,
        sum: sum
    }
})();
f.fn();
f.sum();