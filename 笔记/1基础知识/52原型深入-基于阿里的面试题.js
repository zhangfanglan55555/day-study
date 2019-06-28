function Foo(){
    getName = function(){
        console.log(1)
    }
    return this;
}
Foo.getName = function(){
    console.log(2)
}
Foo.prototype.getName = function(){
    console.log(3)
}
var getName = function(){
    console.log(4)
}
function getName(){
    console.log(5)
}
Foo.getName(); 
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();


/**
 * 2
 * 4  执行全局下的getName
 * 1  先把foo当作普通函数执行，执行返回的结果再调取getName，返回的this是window
 * 1  执行的依然是全局下的getName
 * 
 * 2  把foo.getName()做为一个整体 c:(foo.getName) a:new c 
 * 3  先执行new Foo()再执行.getName C:new Foo()=> A:C.getName();
 * 3  先执行new Foo()再执行.getName C:new Foo()=> B: C.getName() => A:new B();
 */

 /**
  * js运算符优先级：高->低
  * 成员访问  foo.getName()
  * new 带参数列表 new foo()
  * new 无参数列表 new
  */