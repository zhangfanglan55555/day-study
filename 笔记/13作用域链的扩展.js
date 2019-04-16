function fn(){
    console.log(b);//报错
    b = 13;
    console.log(b);//13
    // console.log('b' in window);//true/
    // 作用域链的过程中，如果找到win没有这个变量，相当于给win加了个名字叫b的属性

}
fn();
console.log(b);//13