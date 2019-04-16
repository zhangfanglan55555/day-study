var i = 1;
function fn(i){
    return function (n){
        console.log(n+(++i));
        
    }
}
var f = fn(2);
f(3)
fn(5)(6)
fn(7)(8)
f(4)


/**
 * 全局变量提升：var i ,fn,f
 * 执行：
 * f = fn(2)
 * f = function(){console.log(3+3)}  6
 * 12
 * 16
 * 8   4+4
 */

var k  = 1 ;
console.log(5+(++k)+(k++)+4+(k--)+(++k)+3+(--k)+(k++),k)
/**
 * k = 2 5+2
 * k = 2 7+2 k=3
 * k = 3 9 + 4 + 3 k = 2
 * k = 3 16+3+3
 * k=2  22+2 k=2
 * k = 2 26 k = 3
 * 
 * 
 */