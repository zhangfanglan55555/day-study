function Observer() {
    this.state = 'A'
    this.arr = [];
}
Observer.prototype.attach = function (s) {
    this.arr.push(s)
}
Observer.prototype.setState = function (newState) {
    this.state = newState;
    this.arr.forEach(fn => fn.update(newState))
}
function Subject(name, target) {
    this.name = name;
    this.target = target
}
Subject.prototype.update = function (newState) {
    console.log(this.name + '检测到变化' + newState)
}
let o = new Observer();
let s1 = new Subject('lili', o)
let s2 = new Subject('luckly', o)
o.attach(s1)
o.attach(s2)
o.setState('B')
o.setState('C')