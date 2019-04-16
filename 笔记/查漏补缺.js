//1、 arguments等类数组转数组
Array.prototype.slice.call(arguments)
Array.from(arguments);//es6新增
// 2、判断数据类型
Object.prototype.toString.call(data).toLowerCase();//[object array]
// 3、[] 是true
[] == ![] ;// true [] == false=> [] == 0=> 0 == 0 ;true
{} == !{} ;// false
null == undefined;//true

/**
 * !的运算级高于==,先计算![],!可以将变量转为boolean型的，null、undefined、NaN以及空串("")取反都是true，其余为false
 * ![] 的结果是false,!{} fasle
 * [] == false,会自动进行类型转换，[] 为false转换为0,0==0;//true
 * {}.toString()//返回的是NaN, 如果有一个操作数是NaN，则相等操作符返回 false
 * 
 * 
 */
/**
 * == 先转换再比较
 * === 仅比较不转换
 * ==：
 *      ①、如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false转换为0，而true转换为1；

        ②、如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值

        ③、如果一个操作数是对象，另一个操作数不是，则调用对象的valueOf()方法，用得到的基本类型值按照前面的规则进行比较

        4、如果有一个操作数是NaN,则相等操作符参会false
{} 和 [] 都是存放在栈内存中开辟的堆内存的，在使用== 操作符的时候比较的是堆内存的地址而不是真实的值
 */
// 4、