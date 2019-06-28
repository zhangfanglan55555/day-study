### 1.写出你所熟知的 ES6 新语法，说出它们和 ES5 的区别？

- let /const - 和 Es5 中的 var 的区别  
   - let 不存在变量提升机制（变量不允许在声明之前使用）  
   - 2）let 不允许重复声明 const 声明必须赋值 
   - 3）在全局作用域中基于 let 声明的变量不是 window 的一个属性  
   - 4）typeof 未被声明的变量 =》不是 undefined 而是报错（暂时性死区）  
   - 5）let 会形成块级作用域（类似于私有作用域，大部分大括号都会形成块作用域）
- 解构赋值
- ... 拓展、剩余、展开运算符
- 箭头函数和普通函数的区别： 
	- 没有 arguments，但是可以基于...arg 获取实参集合（结果是一个数组）  
   - 没有自己的 this，箭头函数中的 this 是上下文中的 this
- 模板字符串
- Promise（async/await)
- class(es6 中创建类的)
- interator(for...of 循环)
- Map/Set

### 2.请说出你对“重排和重绘读写分离”的理解

- 重排（回流）
- 思路：
 - 首先说出什么是重排和重绘 
 - 突出他们耗性能 
 - 突出自己写项目的时候重点注意了这些事情，以及自己的解决方法（说一下解决原理）  
- 浏览器渲染一个页面的时候是按照“先创建 DOM 树->再加载 CSS->生成渲染树 Render Tree-> 把渲染树交给浏览器（GPU）进行绘制-> 如果后期修改了元素的样式但是没有改变大小和位置），浏览器会把当前元素重新生成渲染树，然后重新渲染，这个机制是**重绘**，但是一旦元素的位置或者大小等发生改变，浏览器就从 DOM 树重新计算渲染，这个机制是**回流（重排）**，无论是重排还是重绘都非常消耗性能  
   在我的以前项目中，我特意的重视了这个问题，尽量减少操作 DOM 引发的回流和重绘问题，常用的解决方法： 
   - 需要动态向页面追加元素的时候，基于文档碎片（createDocumentFragment()因为文档片段存在于内存中，并不在 DOM 中，所以将子元素插入到文档片段中时不会引起页面回流（对元素位置和几何上的计算），因此使用 DocumentFragment 可以起到性能优化的作用。）或者先把需要增加的所有元素拼接成字符串，最后统一进行增加; 
   - 读写分离：把统一修改样式都放到一起执行，新版浏览器都有一个自己检测的机制，如果发现下面紧挨着的操作也是修改元素的样式，会把所有修改的事先存起来，直到遇到非修改样式的操作，会把之前存储的统一执行，引发依次回流和重绘。
  当然还有一些其他的方法，这些事最常注意的，我认为减少 DOM 的回流重绘是非常重要的性能优化手段之一

### 3.写出下面代码运行的结果：

```
var str = 'abc123',num = parseFloat(str);
if(str === NaN){
	console.log('NaN')
}else if(num === 123){
	console.log('123)
}else if(typeof num === 'number'){
	console.log('number')
}else{
	console.log('str)
}
num:NaN  typeof NaN 返回结果是number
结果：number
```

### 4.写出代码执行的结果

```
	var a = 'abc'+123+456;
	console.log(a);
	var b = '456'-'123';
	console.log(b);
	var c =1,d = '1';
	var f = c>d?(c<d?c:d) : (c==d?c:d);
	<!--c===d是false-->
	console.log(f);

	结果： abc123456
		  333
		  1
== 转换规律：
	NaN 和NaN是不相等的
	null == undefined true
	null === undefined false
	string == number string转number
	
```
### 5.用户昵称规定只能是”数字、大小写字母“组成，而且不能少于2位，也不能超过20位，写个正则匹配这个需求
```
	let reg = /^(\d[a-zA-Z]){2,20}$/i;
```
### 6.谈谈你对面向对象的理解
> JS本身就是基于面向对象（OOP）编程思想开发出来的语言，我们学习JS就是在学习JS中的类和实例，例如：
> 数组是Array的实例、对象是Object的实例，函数是Function的实例...在这些内置类的原型上有很多公共的属性和方法，这些方法可以被实例调用。我们学习JS就是学习这些方法...  
> 面向对象真实项目的应用
> 平时的业务逻辑开发，我没有刻意使用类的方式来做，只有一些组件或者插件封装的时候才会基于构造函数和原型链使用类和实例完成，例如：我之前封装过一些TAB页卡、轮播图、模态框、表单验证等插件，就是这样处理的（我之前看了一些类库和插件的源码）
> 面向对象中的一些语法和特点
> 所谓面向对象就是基于class或者function创建一个类，执行的时候new执行创建一个实例，这样实例就可以调取类上提供的方法，想要基于面向对象进行插件封装，必须掌握关于类的继承、封装和多态，封装就是提取公共的方法、JS中没有严格意义的多态，不能进行方法的重写，常用的继承方式有很多，例如：原型继承、call继承、寄生组合继承、es6中的继承等，有些方式会存在一些问题，我项目中后来都是基于class中的extend实现继承的

### 7.下面代码结果是什么
```
var point={
	x:10,
	y:20,
	moveTo:function(x,y){
		var moveX = function(x){
			this.x = x;
		}
		var moveY = function(y){
			this.y = y;
		}
		moveX(x)
		moveY(y)
		<!--moveX.call(this,x);
		moveY.call(this,y);-->
	}
};
point.moveTo(100,200);
console.log(point.x,point.y)
10,20
window.x ->100
```
> JS中的this汇总
> THIS：当前方法执行的主体（谁执行的这个方法，那么this就是谁,所以this和当前方法创建的或者在哪儿执行的都没有必然关系）
> 1.给当前元素的某个事件绑定方法，方法中的this都是当前操作的元素本身

```
	document.body.onclick = function(){
		<!--this:body-->
	}
```
> 2.函数执行，看函数是否有点，有的话，点前面是谁this就是谁，没有点，this是window，在JS的严格模式下没有点this是undefined。

```
	let fn = function(){
		console.log(this.name)
	};
	let obj = {
		name:'哈哈哈',
		fn:fn
	}
	fn();//=>this:window 
	obj.fn();//this:obj
```
> 3.构造函数执行，方法中的this一般都是当前类的实例

```
	let Fn = function(){
		this.x = 100;
	}
	let f = new Fn(); //f.x ->100
```
> 4.箭头函数中没有自己的this，this是上下文中的this

```
	let obj = {
		fn:function(){
			<!--this:obj-->
			setTimeout(()=>{
			<!--
				this:obj
			-->
			},1000)
		}
	}
```
> 5.在小括号表达式中，会影响this的指向

```
	let obj = {
		fn:function(){
			
		}
	}
	obj.fn();//this:obj
	(12,obj.fn)();//this:window
	(a,b,c)返回最后一个表达式的值
	点号运算符的作用就是在当前对象上调用方法,逗号运算符导致点号运算符失效了
```
> 6.使用call/apply/bind可以改变this指向
> 
```
	fn.call(obj);//this:obj
	fn.call(12);//this:12
	fn.call();
	//this:window 非严格模式下，第一个参数别写或者写null和undefined，this都是window，严格模式下写谁this就是谁，不谢是undefined。	
```

### 8.分析代码写结果
```
	function fun(){
		this.a = 10;
		this.b = function(){
			alert(this.a)
		}
	}
	fun.prototype = {
		b:function(){
			this.a = 20;
			alert(this.a)
		}
		c:function(){
			this.a = 30;
			alert(this.a)
		}
	}
	var my_fun = new fun();
	my_fun.b();
	my_fun.c();
	
	
	10
	30	
	
```

### 9.分析代码写结果
```
	var n = 2;
	function a(){
		var n = 3;
		function b(m){
			alert(++n+m);
		}
		b(4);
		return b;
	}
	var c = a(5);
	c(6);
	alert(n);
	
	8
	11
	2
	
```
### 10.谈一下你对作用域链和原型链的理解
- 作用域链
	- 函数执行会形成一个私有的作用域，形参和在当前私有作用域中声明的变量都是私有变量，当前的私有作用域有自我保护机制，私有变量和外界是没有关系的，但是如果私有作用域中遇到一个非私有的变量，则向它的上级作用域找，如果还不是上级作用域私有的，则继续向上查找，一直找到window为止。这种变量一层层向上查找的机制就是“作用域链机制”。
- 原型链
	- 它也是一种查找机制，实例首先在自己的私有属性中进行属性的查找，如果不是私有属性，基于 \___proto__向所属类的原型上去查找，如果再找不到，则继续基于 \__proto__向上查找,一直找到Object.prototype为止，例如：
		obj.hasOwnProperty()这里调取的hasOwnProperty这个属性就是找到Object.prototype才找到的	
> 作用域链是找到window为止，原型链是找到Object.prototype为止

### 11.实现一个$attr(domId,name,value)遍历id是domId的，内部属性为name且值为value的元素
> 	传统标签获取里面的内容不是基于value属性，而是基于innerHTML/innerText属性完成的
			innerHTML会获得当前元素所有的属性操作（div的所有）  "<div>ddd</div>"
			innderText只会获得div和a标签里面的类容 "ddd"
			
```
	let $attr = (domId,name,value)=>{
		<!-- 先获取当前页面中所有的标签-->
		let tagList = document.getElementsByTagName('*');
		<!-- 在获取的所有标签中按照id/name/value进行筛选(数组内置方法filter)-->
		tagList = [].slice.call(tagList);
		<!--类数组转换为数组
			es6写法：
			tagList = [...tagList];
		-->
		tagList.filter((item)=>{
		//item.name:只有表单元素才可以获取到值，普通元素需要基于getAttribute获取值
			return item.id === domId && item. getAttribute(name) === name && (item.value === value || item.innerText === value);
		})	}
	$attr('hobbyBox','hobby','music')
```
> filter使用
> <!--返回的结果是true或者false,true会把这一项存放到新数组中，（基于filter不会修改原有数组，会把遍历后符合条件的放到新数组汇总）-->
```
	let ary = [12,34,23,45,44];  	
	ary = ary.filter((item,index)=>{
		return item>20&&item<40;		
	})
```

### 12数组去重都有哪些方法（不改变原有数组）
### 1.对象键值对处理（推荐）
```
	Array.prototype.myUnique = function(){
		//this:ary 我们需要操作的数组，
		//如果不想改变原有的数组，我们需要把操作的数组克隆一份一模一样的处理，处理的都是克隆的这个数组
		let _this = this.slice(0),
			obj = {};
			
			for(let i = 0;i<_this.length;i++){
				let item = _this[i];
				if(obj.hasOwnProperty(item)) {
						//_this.splice(i,1);//后面项移位消耗性能，不用这个
						_this[i] = _this[_this.length];
						_this.length--;
						i--;
						continue;
				}
				obj[item] = true;			
			}
		
		return _this;
	}	
	let ary = [11,2,3,2,10,2,33,44,3];
	let uniqueAry = ary.myUnique();
	console.log(uniqueAry);
```
### 2.双层循环
```
	Array.prototype.myUnique = function(){
		let _this = [...this];
		for(let i = 0;i<_this.length;i++){
			let item = _this[i];
			<!--
				每一次迭代到item后，都拿其后面的内容和它进行比较（出现和当前项相同的，我们就在数组中把其干掉）
			-->
			for(let j = i+1;j<_this.length;j++){
				if(item === _this[j]){
					//删除索引J这一项；
					_this[j] = _this[_this.length-1];
					_this.length--;
					j--;
				}
			}
		}
		return _this;
	}
```

### 3.indexOf:获取当前项在数组中第一次出现位置的索引，也能判断是否存在（不存在获取的索引是-1），这个方法是不兼容ie6~8的
字符串中这个方法没有兼容问题

```
	Array.prototype.myUnique = function(){
		let _this = [...this];
		//依次迭代数组中的每一项，验证当前项在数组中是否存在（不是和整个数组比较是否存在，而是和当前项的后面项比较是否存在=》类似于双For循环）
		for(let i = 0;i< _this.length;i++){
			let item = _this[i],
			nextAry = _this.slice(i+1);
			if(nextAry.indexOf(item) > -1){
				_this[i] = _this[_this.length-1];
				_this.length--;
				i--;
			}
		}
	}
```
### 4.排序后相邻去除法
- 先把数组进行排序，验证当前项和后一项是否相同，如果不相同，说明没有重复，

```
Array.prototype.myUnique = function(){
	let _this = [];
	let ary = this.slice(0).sort((a,b)=> a-b);
	for(let i = 0;i<ary.length;i++){
		let item = ary[i],
			next = aey[i+1];
			if(item !== next){
				_this.push(item);
			}
	}
	return _this;
}
```


## 13.说出你所掌握的算法
- 常用的算法
	- 递归
	- 去重
	- 冒泡排序
	- 插入排序
	- 快速排序
	- 二叉树/三叉树
	- 时间复杂度
	- 空间复杂度
	- KMP
	- ...  

递归：函数自己调自己执行就是递归（递归是基于条件判断的，因为我们不能形成死递归，在某个条件下我们需要结束递归操作）

```
 function fn(){
 	fn(); //死递归会报错
 }
 fn(); 
```
需求：在1-100之间获取既是3也是5的倍数(15的倍数)的和

```
	10以内2的整数倍的和
	function fn(n){
		if(n===0)return 0;
		if(n%2 === 0){
			return n + fn(n-1);
		}
		return fn(n-1)
	}
	fn(10)；
	在1-100之间获取既是3也是5的倍数(15的倍数)的和
	function fn(n){
		if(n>100)return 0;
		if(n%15===0){
			return n+fn(n+1)
		}
		return fn(n+1);
	}
	fn(1);
```
## 14.写出你掌握的JS继承方式，项目中什么时候你用到了继承？
- 面向对象：类的继承封装和多态
	- 封装
		- 把实现一个功能的JS代码进行封装，主要目的：“低耦合高内聚”（减少代码重复提高利用率）
	- 多态（当前类的多种形态）
		- 重载：方法名相同，参数的个数或者类型不一样，此时名字相同的方法叫做方法重载（后台语言中的重载）JS当中不存在重载的(根据传递参数的不同执行不同的方法)
		- 重写：子类重写父类的方法
	- 继承
		- 子类继承父类的属性和方法
			- 原型继承
			- call继承
			- 寄生组合继承
			- Es6中Class类实现继承
			- ...
			- 

	原型继承：让子类的原型指向父类的实例
	
	```
	function A(){
		this.x = 100;
	}
	A.prototype = {
		constructor:A,
		getX:function(){
			console.log(this.x);
		}
	}
	function B(){
		this.y = 200;
	}
	B.prototype = new A;
	let f = new B();
	f.getX();//100
```

- 原型继承：
	- B.prototype = new A();A的实例本身就具有父类A的私有属性和公有方法，子类B的原型指向它，那么子类B的实例就可以找到这些属性方法了。
	- 和传统后台语言的继承不一样，子类继承父类，并不是把父类的属性方法克隆一份给子类（这样处理子类和父类就没有直接关系了），  JS中的原型继承是让子类和父类建立**原型链接的机制**，子类的实例调取父类原型上的方法都是基于原型链机制完成的。**存在问题：子类可以重写父类原型上的方法（重写），子类和父类还有关系的。** B.prototype.__proto__.getX = null;把父类A的原型上的getX重写为null,A的其他实例也会受到影响
- 原型继承存在的问题：
	- 父类实例私有的属性以及公有的属性都变为子类实例的公有属性
	- 如果子类B的原型上之前有属性方法，重新指向A的实例后，之前的方法都没用了
- call继承：把父类A作为普通函数执行，让A中的this变为B的实例，相当于给B的实例增加一些属性和方法
	- new A() 把A作为类创建它的实例，this：实例
	  A(); 把A作为普通函数执行， this：window
	  
	  ```
	  	function A(){
	  		this.x = 100;
	  	}
	  	A.prototype = {"constructor":A...}
	  	function B(){
	  		//this:f
	  		A.call(this);//call 继承，把A执行，让A中的this变为f
	  		this.y = 200;
	  	}
	  	let f = new B();
	  ```
- 弊端：把父类A当做普通函数执行，和父类原型没关系了，仅仅是把A中的私有属性变为子类B实例的私有属性，A原型上的公有属性和方法和B及它的实例没有关系
- 寄生组合继承:A的私有变为B的私有，A的公有变为B的公有
	
	```
		//寄生式继承
		function A(){
			this.x = 100;
		}
		A.prototype = {
			constructor:A,
			getX:function(){}
		}
		function B(){
			A.call(this);//基于CALL把A的私有变为B的私有,f.x = 100;
			this.y = 200;
		}
		B.prototype = A.prototype;//一般都不这样处理，因为这种模式可以轻易修改父类A的原型属性和方法（重写太"方便“了），这样会导致A的其他实例也受到影响
		B.prototype.constructor = B;
		let f = new B();
	```
	- Object.create(null):内置Object类天生自带的方法
	 - 创建一个空对象
	 - 让新创建的空对象的__proto__指向第一个传递进来的对象（obj作为新创建对象的原型）
	
	```
		let obj = {
			name:'哈哈'
		}
		Object.create(obj);	
		//寄生组合式继承
		function A(){
			this.x = 100;
		}
		A.prototype = {
			constructor:A,
			getX:function(){}
		}	
		function B(){
			A.call(this);
			this.y = 200;
		}
		B.prototype = Object.create(A.prototype);
		B.prototype.constructor = B;
		let f = new B();
	```
- 寄生组合式继承和原型继承的唯一区别：
	- B.prototype = new A();//创建的A的实例虽然指向了A的原型，但是实例中不是空的，存放了A的私有属性，这些属性变为B的公有属性
	- B.prototype = Object.create(A.prototype);好处在于我们是创建了一个没有任何私有属性的空对象，指向A的原型，这样B的原型（公有）中就不会存在Ade私有属性
- ES6中的类和继承
	- es6中创建类是有自己标准语法的（这种语法创建出来的类只能new执行，不能当做普通函数执行）
	
		```
			class Fn{//Fn是类名，没有小括号
				constrcutor(n,m){
					//等价于传统es5中类的构造体
					// n = 10,m = 20
					this.x = n;
					this.y = m;
				}
				//给Fn的原型上设置方法(只能设置方法不能设置属性)
				getX(){					
					console.log(this.x);
				}
				//把Fn当做一个普通对象设置的私有方法（和实例没有关系，同样也只能设置方法不能写属性）
				static AA(){
				
				}	
					
			}
			let f = new Fn(10,20);
			
			class A{
				constructor(){
					this.x = 100;
				}
				getX(){
					console.log(this.x)
				}
			}
			class B extends A {
				constructor(){
					super();//类似于Call继承：在这里super相当于把A的constructor给执行了，并且让方法中的this是B的实例，super当中传递的实参都是在给A的constructor传递
					this.y = 200;
				}
				getY(){
					conosle.log(this.y)
				}
			}
			let f = new B();
		``` 	
	
## 15.js中有一个insertBefore方法，目的是实现把新元素插入到指定元素之前，现在你实现一个insertAfter方法，把新元素插入到指定元素之后

```
function insertAfter(newEle,originEle){
	newEle:新插入的元素，originEle指定的老元素
	插入到原有元素的后面，其实就是插入到原有元素弟弟的前面
	let next = originEle.nextElementSibling,
	par = origin.parentNode;
	if(next){			 	 par.insertBefore(newEle,next)
	}
	}else{
		//没有弟弟
		par.appendChild(newEle)
	}
	JQ:prepend 把新元素插入到指定容器的开头
	
	function prepend(newEle,originEle){
		
	}
```

## 16.英文字母汉字组成的字符串，用正则给英文单词加前后空格

```
let str = 'zhufeng张三,javascript高级程序设计，good good study!"

```

## 17.jQuery的原理，怎么扩展插件
## 18.看代码回答问题

```
	for(var i =0;i<5;i++){
 	 setTimeout(function(){console.log(i)}
 	 ,1000)
	}
```
这段代码输出什么？怎么才能输出01234？
5555
```
	for(var i =0;i<5;i++){
		setTimeout(((i)=>{
			console.log(i)
		})(i),1000)
	}
```

## 46.编写一个函数实现数组扁平化
数组扁平化就是（多维数组=》一位数组）
第一种方式(数组项不可以是对象Object格式)

```
	let ary = [1,[2,[3,[4,5]]],6];=>[1,2,3,4,5,6]
	let str = JSON.stringify(ary);
	str = str.replace(/(\[|\})/g,'');
	str = '['+str+']';
	ary = JSON.parse(str);
	//[1,2,3,4,5,6]	
```

第二种方式用递归

```
	let ary = [1,[2,[3,[4,5]]],6];=>[1,2,3,4,5,6]
	let result = [],
	fn = function(ary){
		if(ary.length === 0) return;
		for(let i = 0;i<ary.length;i++){
			let item = ary[i];
			if(typeof item === 'object'){
				fn(item);
			}else{
				result.push(item);
			}
		}
	}
```