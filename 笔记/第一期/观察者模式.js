function Observer() {
    this.state = '不开心'
    this.arr = [];
}
Observer.prototype.attach = function (obj) {
    this.arr.push(obj)
}
Observer.prototype.setState = function (newState) {
    this.state = newState;
    this.arr.forEach(fn => fn.update(this.state))
}
function Subject(name, target) {
    this.name = name;
    this.target = target
}
Subject.prototype.update = function (newState) {
    console.log(this.name + '监控到了变化:' + newState)
}
let o = new Observer();
let s1 = new Subject('我', o)
let s2 = new Subject('她', o)
o.attach(s1)
o.attach(s2)
o.setState('开心')