let obj = {
    name: 'zfl',
    age: {
        age: 1
    }
}
function observer(obj) {
    if (typeof obj == 'object') {
        for (key in obj) {
            defineReactive(obj, key, obj[key])
        }
    }
}
function defineReactive(obj, key, value) {
    observer(value)
    Object.defineProperty(obj, key, {
        get() {
            return value
        },
        set(val) {
            observer(val);//如果设置的值是新对象 需要再进行这个对象的监控
            console.log('数据更新')
            value = val;
        }
    })
}
observer(obj)
// obj.name = 'lll'
// console.log(obj.name)
// obj.age.age = 20
// obj.age = {name:333}
// console.log(obj.age.name)
// 如果属性不存在 默认后增加的内容 并不会刷新视图
// 数组调用push 是无效的  Object.defineProperty 不支持数组
obj.age = [1, 2, 3, 4]
obj.age.push(5)

// vue把这个数组上的所有方法都重写了
obj.age = [1, 2, 3, 4]
let oldPush = Array.prototype.push;
Array.prototype.push = function (value) {
    oldPush.call(this, value)
}
obj.age.push(5)


let arr = ['push','shift']
arr.forEach(method => {
    let oldPush = Array.prototype[method];
    Array.prototype[method] = function (value) {
        oldPush.call(this, value)
    }
})

obj.age.length--; //数组不能通过长度修改  也不能通过数组的索引进行更改