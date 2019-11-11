### 1.写出你所熟知的 ES6 新语法，说出它们和 ES5 的区别？

- let /const - 和 Es5 中的 var 的区别
  - let 不存在变量提升机制（变量不允许在声明之前使用）
  - 2）let 不允许重复声明 const 声明必须赋值
  - 3）在全局作用域中基于 let 声明的变量不是 window 的一个属性
  - 4）typeof 未被声明的变量 =》不是 undefined 而是报错（暂时性死区）
  - 5）let 会形成块级作用域（类似于私有作用域，大部分大括号都会形成块作用域）
- 解构赋值（解构赋值：按照一个数据值的结构，快速解析获取到其中的内容）
- 拓展、剩余、展开运算符  
	- 拓展运算符 
		- 复制数组和复制对象（深拷贝)[...ary, 100]{ ...obj, sex: 0 }; 相当于Object.assign({},a,b)
		- 合并数组和合并对象([...a,...b])
		- 类数组对象数组化(...arg)
		- 代替 apply 方法(展开运算符) fn(...ary);
	- 剩余操作符
		- 剩余操作符将多个值收集为一个变量[a,...b] = [1,2,3];b=>[2,3]
		 
- 箭头函数和普通函数的区别： - 没有 arguments，但是可以基于...arg 获取实参集合（结果是一个数组）
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
if(num === NaN){
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

### 5.用户昵称规定只能是”数字、大小写字母“组成，而且不能少于 2 位，也不能超过 20 位，写个正则匹配这个需求

```
	let reg = /^(\d[a-zA-Z]){2,20}$/i;
```

### 6.谈谈你对面向对象的理解

> JS 本身就是基于面向对象（OOP）编程思想开发出来的语言，我们学习 JS 就是在学习 JS 中的类和实例，例如：  
> 数组是 Array 的实例、对象是 Object 的实例，函数是 Function 的实例...在这些内置类的原型上有很多公共的属性和方法，这些方法可以被实例调用。我们学习 JS 就是学习这些方法...    
> 面向对象真实项目的应用  
> 平时的业务逻辑开发，我没有刻意使用类的方式来做，只有一些组件或者插件封装的时候才会基于构造函数和原型链使用类和实例完成，例如：我之前封装过一些 TAB 页卡、轮播图、模态框、表单验证等插件，就是这样处理的（我之前看了一些类库和插件的源码）  
> 面向对象中的一些语法和特点  
> 所谓面向对象就是基于 class 或者 function 创建一个类，执行的时候 new 执行创建一个实例，这样实例就可以调取类上提供的方法，想要基于面向对象进行插件封装，必须掌握关于类的继承、封装和多态，封装就是提取公共的方法、JS 中没有严格意义的多态，不能进行方法的重写，常用的继承方式有很多，例如：原型继承、call 继承、寄生组合继承、es6 中的继承等，有些方式会存在一些问题，我项目中后来都是基于 class 中的 extend 实现继承的

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

> JS 中的 this 汇总
> THIS：当前方法执行的主体（谁执行的这个方法，那么 this 就是谁,所以 this 和当前方法创建的或者在哪儿执行的都没有必然关系） 1.给当前元素的某个事件绑定方法，方法中的 this 都是当前操作的元素本身

```
	document.body.onclick = function(){
		<!--this:body-->
	}
```

> 2.函数执行，看函数是否有点，有的话，点前面是谁 this 就是谁，没有点，this 是 window，在 JS 的严格模式下没有点 this 是 undefined。

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

> 3.构造函数执行，方法中的 this 一般都是当前类的实例

```
	let Fn = function(){
		this.x = 100;
	}
	let f = new Fn(); //f.x ->100
```

> 4.箭头函数中没有自己的 this，this 是上下文中的 this

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

> 5.在小括号表达式中，会影响 this 的指向

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

> 6.使用 call/apply/bind 可以改变 this 指向

```
	fn.call(obj);//this:obj
	fn.call(12);//this:12
	fn.call();
	//this:window 非严格模式下，第一个参数别写或者写null和
	undefined，this都是window，严格模式下写谁this就是谁，不写是undefined。
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

- 作用域链 - 函数执行会形成一个私有的作用域，形参和在当前私有作用域中声明的变量都是私有变量，当前的私有作用域有自我保护机制，私有变量和外界是没有关系的，但是如果私有作用域中遇到一个非私有的变量，则向它的上级作用域找，如果还不是上级作用域私有的，则继续向上查找，一直找到 window 为止。这种变量一层层向上查找的机制就是“作用域链机制”。
- 原型链 - 它也是一种查找机制，实例首先在自己的私有属性中进行属性的查找，如果不是私有属性，基于 \_\_proto\_\_ 向所属类的原型上去查找，如果再找不到，则继续基于所属类的原型上的 \_\_proto\_\_向上查找,一直找到 Object.prototype 为止，例如：
  obj.hasOwnProperty()这里调取的 hasOwnProperty 这个属性就是找到 Object.prototype 才找到的   


> 作用域链是找到 window 为止，原型链是找到 Object.prototype 为止

### 11.实现一个\$attr(domId,name,value)遍历 id 是 domId 的，内部属性为 name 且值为 value 的元素

>     传统标签获取里面的内容不是基于value属性，而是基于innerHTML/innerText属性完成的

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
		return tagList.filter((item)=>{
		//item.name:只有表单元素才可以获取到值，普通元素需要基于getAttribute获取值
			return item.id === domId && item. getAttribute(name) === name && (item.value === value || item.innerText === value);
		})	}
	$attr('hobbyBox','hobby','music')
```

> filter 使用
> 返回的结果是 true 或者 false,true 会把这一项存放到新数组中，（基于 filter 不会修改原有数组，会把遍历后符合条件的放到新数组汇总

```
	let ary = [12,34,23,45,44],
	newAry = ary.filter((item,index)=>{
		return item>20&&item<40;
	})
```

### 12 数组去重都有哪些方法（不改变原有数组）

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

### 3.indexOf:获取当前项在数组中第一次出现位置的索引，也能判断是否存在（不存在获取的索引是-1），这个方法是不兼容 ie6~8 的

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
			next = ary[i+1];
			if(item !== next){
				_this.push(item);
			}
	}
	return _this;
}
```
### 5.利用filter过滤返回新数组
```
	Array.prototype.myUnique = function(){
		let obj ={};
		return this.filter((val)=>{
			if(obj.hasOwnProperty(val)){
				return null;
			}
			obj[val] = true;
			return val;
		})	
		 
	}
```
## 13.说出你所掌握的算法

- 常用的算法 - 递归 - 去重 - 冒泡排序 - 插入排序 - 快速排序 - 二叉树/三叉树 - 时间复杂度 - 空间复杂度 - KMP - ...

递归：函数自己调自己执行就是递归（递归是基于条件判断的，因为我们不能形成死递归，在某个条件下我们需要结束递归操作）

```
 function fn(){
 	fn(); //死递归会报错
 }
 fn();
```

需求：在 1-100 之间获取既是 3 也是 5 的倍数(15 的倍数)的和

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

## 14.写出你掌握的 JS 继承方式，项目中什么时候你用到了继承？

- 面向对象：类的继承封装和多态 
	- 封装 - 把实现一个功能的 JS 代码进行封装，主要目的：“低耦合高内聚”（减少代码重复提高利用率） 
	- 多态（当前类的多种形态） 
		- 重载：方法名相同，参数的个数或者类型不一样，此时名字相同的方法叫做方法重载（后台语言中的重载）JS 当中不存在重载的(根据传递参数的不同执行不同的方法) 
		- 重写：子类重写父类的方法 
	- 继承 
		- 子类继承父类的属性和方法 
		- 原型继承 
		- call 继承 
		- 寄生组合继承 
		- Es6 中 Class 类实现继承 - ... -

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
	- B.prototype = new A();A的实例本身就具有父类A的私有属性和公有方法，子类B的原型指向它  
		那么子类B的实例就可以找到这些属性方法了。
	- 和传统后台语言的继承不一样，子类继承父类，并不是把父类的属性方法克隆一份给子类  
		这样处理子类和父类就没有直接关系了），    
	  JS中的原型继承是让子类和父类建立**原型链接的机制**，子类的实例调取父类原型上的方法都是基于原型链机制完成的。  
	  **存在问题：子类可以重写父类原型上的方法（重写），子类和父类还有关系的 。** B.prototype.__proto__.getX = null;把父类A的原型上的getX重写为null,A的其他实例也会受到影响
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
		B.prototype = A.prototype;
		//一般都不这样处理，因为这种模式可以轻易修改父类A的原型属性和方
		法（重写太"方便“了），这样会导致A的其他实例也受到影响
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
		newEle:新插入的元素，originEle 指定的老元素
		插入到原有元素的后面，其实就是插入到原有元素弟弟的前面
		let next = originEle.nextElementSibling,
		par = origin.parentNode;
		if(next){
			par.insertBefore(newEle,next)
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
	let str = 'zhufeng张三,javascript高级程序设计，good good study!",
	reg = /[a-zA-Z]+[\u4e00-\u9fa5]+/g;
	str.match(reg);//["zhufeng张三","javascript高级程序设计"]
	reg = /([a-zA-Z]+)([\u4e00-\u9fa5]+)/g;
		reg 和 str 匹配几次，函数就会被执行几次
		str = str.replace(reg,(...arg)=>{	
			//reg 和 str 匹配几次，函数就会被执行几次
			reg:["zhufeng张三",'zhufeng','张三',index:0,...]
			//arg 存储是个数组，存储了每一次匹配捕获到的结果（包含分组捕获的结果）
		let [,oneVal,twoVal] = arg;
		return ` ${oneVal} ${twoVal}`;//return 是啥就会把本次大正则匹配的字符替换成啥
		})
	如果 str= '珠峰zhangsan,zhufeng张三'
	let reg = /(?:(?:([a-zA-Z)+)([\u4e00-\u9fa5]+))|(?:([\u4e00-\u9fa5]+)（[a-zA-Z)+)))/g;
	str = str.replace(reg,(...arg)=>{
	let [,oneVal,twoVal,threeVal,fourVal] = arg;
	if(oneVal && twoVal){
		return ` ${oneVal} ${twoVal}`;
	}
	return `${threeVal} ${fourVal} `
	})
	简单办法：str = '珠峰培训zhufeng哈哈，javascript高级程序设计，good good study'
	\b边界 \s空白字符 .代表除了\n以外的任何字符
	$1,$2...是表示的小括号里的内容 
	$1是第一个小括号里的 ,$2是第2个小括号里的 
	reg = /.?([a-zA-Z]+).?/g;
	str = str.replace(reg,(..arg)=>{
		每一次捕获的时候我们都把单词左右两边的一位捕获到，这样我们
		只需要判断捕获的内容当中是否有汉字即可，有汉字加空格；
		let reg = /[\u4e00-\u9fa5]/g,
		[val,oneVal] = arg;
		if(reg.test(val)){
			val= val.replace(/([a-zA-Z]+)/g,' $1 ');
			return ` ${oneVal} `
		}
		return val;
	})
```
扩展:把一个英文段落中，每一个单词首字母大写
toUpperCase()
substr(start,[end]) 从指定位置开始截取字符串

```
	let str = '
This is a way of life for a man of virture: to cultivate his character by keeping a peaceful mind, and nourish his morality by a frugal living. Only freedom from vanity can show one's lofty goal of life; and only peace of mind can help him to achieve something lasting. To be talented, one must learn; and to learn, one must have a peaceful mind. One cannot develop his talent without learning, and one cannot accomplish his learning without peace of mind.',
reg = /\b([a-zA-Z]+)\b/g;
str = str.replace(reg,(...arg)=>{
	//arg[0]当前找到的单词
	let val = arg[0]
	return val.substr(0,1).toUpperCase()+val.substr(1);
})
如果 a way 变为 a-way \b就不好用了，会把-左右两边当做两个单词算作边界
但是我们想让它作为一个单词；
reg = /(?:^| )([$\s]+)(?: |$)/g;
先把一个空格替换成俩空格
str = str.replace(/ /g,'  ').replace(reg,(...arg)=>{
	let val = arg[1];
	return val.substr(0,1).toUpperCase()+val.substr(1)+' ';
}) 

```

## 17.jQuery的原理，怎么扩展插件
jq是一个js类库，里面提供了很多的常用方法，有助于我们快速开发，而且这些方法是兼容所有浏览器的(v2,v3是不兼容低版本浏览器）  
我之前在学习原生js的时候，或多或少的看了一部分jq源码，刚毕业的时候jq用的
比较多，但是最近两年一直都在用框架开发，jq中常用的方法忘得差不多了，之前看源码的时候，发现jq就是一个类，而\$()就是创建这个类的一个实例，这个实例是基于内置方法makeArray创造的类数组
jq提供的方法有两部分，一部分是放到原型上的，供实例调取使用，一部分是放到对象上的，直接\$.xxx调取使用，想要后续自己扩展方法(包括基于jq写插件）,都可以基于extend这个方法向jq中扩展  
jq中提供了动画、事件、ajax等常用的方法，我学习jq源码的时候比较注重里面的一些封装和编程的思想，例如发布订阅这种设计模式就是基于jq.Callbacks学习研究的，所以学习jq给我带来了很多的好处...
## 18.看代码回答问题

```
for(var i =0;i<5i++){
	setTimeout(function(){
		console.log(i)
	},500)
}

```
 
这段代码输出什么？怎么才能输出01234？
5555

定时器是异步编程，等待循环结束后，才会执行定时器中设定的方法，方法执行遇到的i
已经是循环结束后的全局i; 

- 基于es6中的let解决：let在每一次循环的时候都形成一个块级作用域，在这个作用域中把当前本次循环的i的值保存下来了，后期用到的i就找自己保存的值

```	
    for(let i =0;i<5;i++){
    	setTimeout(((i)=>{
    		console.log(i)
    	}),1000)
    }

```
- 不用let我们可以自己搞一个闭包，然后实现i的保存

```
 for(var i =0;i<5;i++){
    	setTimeout(((i)=>{
    		console.log(i)
    	})(i),1000)
    }

```

- 基于bind预先处理一下函数中的this和参数

```
for(var i = 0;i<5;i++){

	setTimeout(function(i){
		console.log(i)
	}.bind(null,i),1000)
}

```

## 19 分析代码写结果

``` 
	var a = {n:4};
	var b = a;
	b.x = a = {n:10};
	console.log(a.x)
	console.log(b.x)
```
> undefined
> {n:10}

## 20 你了解过闭包吗

- 闭包是Js中非常重要的机制，我们很多编程思想、业务逻辑、设计模式都是基于闭包完成的，先说一下我对闭包的理解：闭包就是函数执行产生一个私有的作用域（不销毁），在这个作用域中的私有变量和外界互不干扰，而且作用域（栈)不销毁，这些私有变量存储的值也都保存下来了，所以整体来说闭包就是为了保护和保存变量的。
- 实际项目开发中，很多地方使用了闭包，例如：
	- 循环事件绑定，由于事件绑定是异步编程的，我们此时在循环的时候把索引存储起来（可以基于自定义属性存储，也可以基于闭包存储），后期需要使用的时候，向上级作用域查找即可
	- 平时做业务逻辑的时候，一般都是基于单例模式来管理代码的，这种单例模式的构建就应用到了闭包
	- 
	```
		let xxxRender = (function(){
			return {
				init:function(){};
			}
		})()
	``` 
	- 在学习资料上了解了柯理化函数思想，它其实也是基于闭包完成的
	
	```
		Function.prototype.bind = function bind(context,...arg){
			return ()=>{
				fn.call(context,...arg)
			}
		}
		fn.bind(obj,10,20)
	```
 还有很多地方也应用了闭包，但是闭包比较占内存，我会尽量减少对它的使用，但是有些需求必须要用
 
## 21 看代码分析结果
```
	var fullName = 'language';
	var obj = {
		fullName:'javascript',
		prop:{
			getFullName:function(){
				return this.fullName;
			}
		}
	}
	console.log(obj.prop.getFullName());
	var test = obj.prop.getFullName;
	console.log(test());
	
```
> undefined
> language

## 22 看代码写结果
```
	let a = 3,b=4;
	function A(a){
		A = function(b){
			alert(a+(--b));
		};
		alert(++a);
	}
	A(5)
	A(6)
```
6
11

## 23 看代码写结果
```
	window.val = 1;
	let json = {
		val:10,
		dbl:function(){
			this.val *= 2;
		}
	};
	json.dbl();
	let dbl = json.dbl;
	dbl();
	json.dbl.call(window);
	alert(window.val+json.val)
```
24
## 24看代码写结果
```
	(function(){
		let val = 1;
		let json = {
			val:10,
			dbl:function(){
				val *= 2;
			}
		};
		json.dbl();
		alert(json.val+val)
	})()
```
12  
函数执行，形成私有作用域  
对象不会产生作用域，就是个堆内存而已

## 25 
```
  let test = (function(i){
  	return function (){
  		alert(i *= 2);
  	}
  })(2);
  test(5);
```
4
## 26
```
	let n = 2,
		fn = ()=>{
			this.n *= 3;
			n++;
			return m => console.log((++n)+m);
		};
	let f = fn(4);
	f(5);
	fn(4)(5);
	f(6);
	console.log(n);
```
9  
11  
13  
7  
let 声明的变量跟window没有关系  
undefined * 3 = NaN

## 27
```
	let Fn = function(x=0,y=0){
		this.x = x;
		this.y = y;
		this.getY = function(){
			console.log(this.x);
		}
	};
	Fn.prototype.getX = function(){
		console.log(this.x);
	}
	let f1 = new Fn;
	Fn.prototype = {
		getY:function(){
			console.log(this.y);
		}
	};
	let f2 = new Fn(1,2);
	console.log(f1.constructor === f2.constructor);
	f1.getX();
	f1.getY();
	f1.__proto__.getX();
	f1.__proto__.getY();
	f2.getX();
	f2.getY();
	f2.__proto__.getX();
	f2.__proto__.getY();
```
f1：false  0 0 undefined getY is not a function  
f2：getX is not a function; 1 getX is not a function;undefined

## 28 
```
	let fn1 = function(){alert(1)},
		fn2 = function(){alert(2)};
		fn1.call(fn2);
		fn1.call.call(fn2);

```
1  
2
一个call执行前面的
两个及两个以上的call是执行后面的
## 29 如下一个字符串“54389”，要求将字符串中的阿拉伯数字替换成我们的中文大写字母“伍肆叁扒玖”，请使用正则的方式进行处理
```
	var str = '54389',ary =['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'],
	reg = /\d/g;
	str.replace(reg,item=>{
		 //正则每一次捕获的内容
		 //把捕获的数字作为索引，到ary中找到对应的汉字，用找到的结果替换当前捕获的内容
		 return arg[item]
	})
```
## 30 在javascript对象上定义一个repeatify函数，这个函数接受一个整数参数，来明确子字符串需要重复几次，这个函数要求字符串重复指定的次数，比如：'abc'.repeatify(3);//‘abcabcabc'
```
	String.prototype.repeatify = function(n = 1){
		//this:需要处理的字符串
		let result ='';
		for(let i = 0;i<n;i++}(
			result += this;
		)
		return result;
	}
```
## 31 var str = "hello \<img src='haha.png' alt='哈哈'/> world";正确匹配输出'hello[哈哈]world'
```
	let str = "hello <img src='haha.png' alt='哈哈'/> world",
	reg = /<img.+alt=(?:"|'）(.*)(?:"|')\/>/g;
	
```
.代表除了\n以外的任意字符  
+出现1到多次  
* 出现0到多次
?:只匹配不捕获
## 32 一个url后面好多key-value如localhost?key=val&key2=val2&key3=val3封装一个函数getParam('key')通过key获得相应等号后面的值
```
	let getParam = function(attr){
		//先把URL问号后面的值获取到
		let str = window.location.search,
		obj ={},
		reg = /([^?&=#]+)=([^?&=#]+)/g;
		str.replace(reg,(...arg)=>{
			let [,key,value] = arg;
			obj[key] = value;
		})	
		return obj[attr]
	}
	getParam('name')
```
解析url，把所有部分都获取到

```
	let str = 'http://www.zhufengpeixun.cn:80/stu/index.html?name=xxx&age=9#teacher';
	let link = document.createElement('a');
	link.href = str;
	// hash,hostname,pathname,protocol,search,port(80会被省略)
	let {hash,hostname,pathname,protocol,search,port} = link;
	//端口号:如果没有值，则使用默认端口（http:80 https:443 ftp:21)
	if(!port){
		switch(protocol){
			case 'https:':
				port = 443;
				break;
			case 'ftp:':
				port = 443
				break;
			default:
				port = '80';
				break;		
			
		}
	}
	let query = {};
	if(search){
		search.replace(/([^?#=&]+)=([^?#=&]+)/g,(...arg)=>{
			let [,key,value] = arg;
			query[key] = value;
		})
	}
	let result = {
		protocol,
		hostname,
		port,
		pathname,
		search,
		hash,
		query
	}
```
## 33call、apply、bind的区别
- call和apply的作用  
- 可以改变函数中的this，并且让函数执行
- 可以基于call让类数组借用数组原型上的方法（例如：借用slice实现把类数组转换为数组）
- 可以基于call实现继承
- 可以基于apply获取数组中的最大值和最小值
## 34 有两个升序数组，然后将他们合为一个数组并进行升序排列？
```
	let ary1 = [1,2,3,4,5],
		ary2 = [2,3,4,5,6];
	let ary = ary1.concat(ary2).sort((a,b)=>a-b)
	
	let ary = [...ary1,...ary2].sort()
```
## 35 瀑布流的实现原理
- 并排排列三列，三列没有具体的高度，靠内容撑开
- 通过API接口地址，基于ajax从服务端获取数据，拿出数据的前三项，依次插入到三列中（数据绑定）
- 计算目前三列的高度，按照高度有小到大进行排序把三列进行排序，再次拿出获取数据中的三条。按照排好序的li依次插入...一直基于这个规律插入完成即可
- 当用户下拉到页面底部的时候，加载更多的数据即可
## 36 图片延迟加载怎么实现
- 图片延迟加载就是图片懒加载
- 前端性能优化的重要手段之一，开始加载页面的时候，并没有加载真实的图片，当页面结构和数据都呈现完成后再加载真实图片
- 在结构上，我们把img图片放到一个div盒子中，开始的时候图片的src（src中有地址就按照地址加载图片）为空，我们把图片的地址存放到自定义属性data-src中（此位置不展示真实的图片），我们给图片所在的盒子设置一个默认的背景图站位（要求这张图片越小越好）
- 在js中，当监听到页面中的结构和数据都加载完成后（或者设置一个间隔时间），开始把data-src自定义属性中存储的真实图片地址复制给img的src属性（浏览器此时开始加载真实的图片=》为了防止图片地址不存在导致的404错误，我们在复制给图片的src属性值往往都会验证一下图片是否存在）
## 37 写出完整的验证函数
    - 长度不能小于6位
    - 首字母必须是字母
    - 合法字符只能是数字、字母、下划线
    
```
	reg=/^[a-zA-Z]\w{5,}$/g 
```
## 38使用jq实现点击按钮弹出一个对话框（对话框在整个页面真中间，并且最初页面中没有任何的html标签）
```
<style>
	.center{
		position:fixed;
		top:50%;
		left:50%;
		margin:-150px 0 0 -150px;
		width:300px;
		height:300px;
		background:red;	
		
	}
	$('#link').on('click',function(){
		$('<div class="center"></div>').appendTo(document.body)
	})
</style>
```
## 39怎么避免全局变量污染
闭包、单例模式
## 40
```
	function Foo(){
		getName = function(){
			console.log(1)
		}
		return this;
	}
	Foo.getName = function(){
		console.log(2);
	}//给Foo设置属性(Foo.xx)
	Foo.prototype.getName = function(){
		console.log(3)
	}//给Foo的原型设置公有属性方法(new Foo().xxx)
	var getName = function(){
		console.log(4)
	}
	function getName(){
		console.log(5);
	}   
```

函数的角色：  
1.函数
2.对象
## 41 在函数式编程当中有一个很重要的概念就是函数组合，实际上就是把处理数据的函数像管道一样连接起来，然后让数据穿过管道得到最终的结果。例如： 
```
	const add1 = (x) => x+1;
	const mul3 = (x) => x*3;
	const div2 = (x) => x/2;
	div2(mul3(add1(add1(0)))) => 3
```
而这样的写法可读性明显太差了，我们可以构建一个compose函数，它几首任意多个函数作为参数（这些函数都只接受一个参数），然后compose返回的也是一个函数，达到以下的效果：
```
	const operate = compose(div2,mul3,add1,add1)
	operate(0)相当于
	div2(mul3(add1(add0)))
	operate(2)相当于
	div2(mul3(add1(add1(2)))
```
简而言之，compose可以把类似f(g(h(x))) 这样
```
 const compose  = (...arg) => {//不销毁的栈
 	//arg:[div2,mul3,add1,add1]
 	return val=>{
 		//fn(0):执行的是小函数，val=0
 		let str = '';
 		arg.forEach(item=>{
 			str+=item.name+','
 		})
 		str=str.replace(/,/g,('(');
 		str+=val;
 		arg.forEach(item=>(str+=')'));
 		return eval(str);
 	}
 	
 }
 let fn = compose(div2,mul3,add1,add1)
 fn(0);//"div2(mul3(add1(add1(0)))"
 把数组拼成字符串，把字符串eval
 [div2,mul3,add1,add1]
 "div2(mul3(add1(add1(0)))"
 
 //柯理化函数编程思想：1.执行一个方法，传递一些参数进去，首先形成一个不销毁的栈，把传递的这些值存储起来（没有立即使用，属于预先存储一下）；2.返回一个小函数给栈外面；3.当执行返回的小函数时候，把之前第一步预先存储的信息拿过来使用（作用域链、闭包等机制完成的  ）
 我们把js中基于闭包实现的预先存储的思想称为“柯理化函数思想”
 const compose = (...arg)=>{
 	arg = arg.reverse();
 	return val=>{
 		arg.forEach(item=>{
 			val = item(val)
 		})
 		return val;
 	}
 }
 let fn = compose(div2,mul3,add1,add1)
 fn(0);//"div2(mul3(add1(add1(0)))"
```
## 42
```
<!--html-->
	<ul id = 'nav'>
		<li><a href='http://xxx'>xxx</a></li>
		<li><a href='http://sss'>sss</a></li>
	</ul>
<!--end-->
<!--js-->
$('#nav>li>a').on('click',function(e){
	//=> this:当前点击的a
	//=> $(this)当前点击的a（jq对象）
	//=>e 事件对象
	//阻止点击a标签页面跳转的行为
	e.preventDefault();
	//准备数据\
	let $this = $(this),//减少创建jq实例
		$p = $(this).parent;
	let obj = {
		index:$p.index+1,
		name:$this.text(),
		link:$this.attr('href')
	}
})
```
## 43分析此函数的作用，不全1/2处的代码
```
	function fn(str){
		this.str = str;
	}
	fn.prototype.format = function(){
		var arg = ___1____;
		// [].slice.call(arguments)
		return this.str.replace(___2___,function(a,b){
		// /\{\(d+)\}/g
			return arg[b] || '';
		});
	};
	window.fn = fn;
	})(window);
	
	
	//use
	(function(){
		var t = new fn('<p><a href="{0}">{1}</a><span>{2}</span></p>);
		console.log(t.format('http://www.alibaba.com','Alibaba','Welcome'))
	})
```
## 44获取数组中的最大值
1.数组先排序，然后获取第一个和最后一个就是最大最小值  
```
	let ary = [12,23,24,45,12]
	let newAry =	ary.sort((a,b)=>b-a);
```
2.假设法：假设第一个是最大的，让其和后面每一项进行比较，如果当前项大于假设的值，修改假设的值；
```
	let max = arg[0];
	arg.slice(1).forEach(item=>{
		item > max?max = item :null;
	})
	conosle.log(max)
```
3.基于apply
```
	Math.max.apply(null,ary);
```
4.基于es6的展开运算符
```
	Math.max(...ary);
```
## 46.编写一个函数实现数组扁平化

数组扁平化就是（多维数组=》一位数组）
第一种方式(数组项不可以是对象Object格式)

```

    let ary = [1,[2,[3,[4,5]]],6];=>[1,2,3,4,5,6]
    let str = JSON.stringify(ary);
    str = str.replace(/(\[|\])/g,'');
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

## 49 获取字符串中出现次数最多的字符及出现次数

	let str = 'zhufengpeixunzhouxiaotian';
```
	思路一：获取字符串中的每一个字母，然后以对象键值对的方式存储起来（属性名是字符，属性值是出现的次数）
	1.获取每一个字符出现的次数，以及出现的最大次数
	let obj = {},max = 0,result = [];
	str.replace(/./g,char=>{
		if(obj.hasOwnProperty(char)){
			obj[char]++;
			if(obj[char]>max){
				max = obj[char]
			}
			return;
		}
		obj[char] = 1
	})
	2.获取和max相匹配次数的字符
	for(char in obj){
		if(obj.hasOwnProperty(char)){
			//防止in循环里循环到原型上的方法或者属性
			if(obj[char] === max){
				result.push(char)
			}
		}
	}
	console.log(`最多出现的次数是:${max}次，对应的字符有${result}`)
	思路二：先把字符串中的每一个字符变为数组中的每一项，给数组排序，在变为字符串（相同的字符挨着），再基于正则捕获替换
	let max = 1;
	str = str.split('').sort().join('');
	str = str.replace(/(.)\1*/g,(...arg)=>{
		let [value,char] =arg,len = value.length;
		len>max?max=len:null
		return `${char}{${len}}`
		
		// a${2}e${2}f{1}g{1}
	})
	let reg = /([^\d{}]+)\{"+max+"\}/g;  =》字面创建正则的方式，正则中的每一个字符都是元字符，不能实现把一个变量的值作为正则一部分的需求
	let reg = new RegExp('([^\\d{}])\\{"+max+"\\}','g');
	str.replace(reg,(...arg)=>{
		console.log(arg[1));
	})
```
## JD面试题

输入（“2018Q2”，  “2019Q3”）字符串两个
输出[“2018Q2”，“2018Q3”，“2018Q4”， “2019Q1”,“2019Q2”，“2019Q3”]

```
function getQNumber(a,b){
	var reg = /\d+/g,arr = [],
	Year = a.match(reg)[0],
	que = a.match(reg)[1],
	start = a;
	while(start !== b){
		arr.push(start);
		if(++que > 4){
			que = 1;
			++Year;
		}
		start = `${Year}q${que}`
	}
	arr.push(b)
	return arr;
	}
console.log(getQNumber('2018q1','2019q3'))
``` 

## 打开一个浏览器，在地址栏输入一个网址，按下ENTER键，到看到整个页面，中间都经历了哪些事情?
【HTTP请求阶段：向服务器发送请求】  
    1.浏览器首先向DNS域名解析服务器发送请求  
    2.DNS反解析：根据浏览器请求地址中的域名，到DNS服务器中找到对应的服务器外网IP地址  
    3.通过找到的外网IP，向对应的服务器发送请求（首先访问的是服务器的WEB站点管理工具:准确来说是我们先基于工具在服务器上创建很多服务，当有客户端访问的时候，服务器会匹配出具体是请求哪个服务）  
    4.通过URL地址中携带的端口号，找到服务器上对应的服务，以及服务所管理的项目源文件  

【HTTP响应阶段：服务器把客户端需要的内容准备好，并且返回给客户端】  
    5.服务器端根据请求地址中的路径名称、问号传参或者哈希值，把客户端需要的内容进行准备和处理  
    6.把准备的内容响应给客户端（如果请求的是HTML或者CSS等这样的资源文件，服务器返回的是资源文件中的源代码[不是文件本身]）  

【浏览器渲染阶段】  
    7.客户端浏览器接受到服务器返回的源代码，基于自己内部的渲染引擎（内核）开始进行页面的绘制和渲染  
      ->首先计算DOM结构，生成DOM TREE  
      ->自上而下运行代码，加载CSS等资源内容  
      ->根据获取的CSS生成带样式的RENDER TREE  
      ->开始渲染和绘制  
      2.我们把一次完整的 请求+响应 称之为 “HTTP事务”
  事务就是完整的一次操作，请求和响应缺一不可

3.一个页面完全加载完成，需要向服务器发起很多次HTTP事务操作
  一般来说：首先把HTML源代码拿回来，加载HTML的时候，遇到link/script/img[src]/iframe/video和audio[没有设置preload='none']...都会重新和服务器端建立HTTP事务交互

  特殊情况：如果我们做了资源缓存处理(304)，而且即将加载的资源在之前已经加载过了，这样的操作和传统的HTTP事务有所不一样，他们是从服务器和浏览器的缓存中读取数据，比传统的读取快很多

4.在客户端向服务器发送请求，以及服务器把内容响应给客户端的时候，中间相互传递了很多内容(客户端把一些内容传递服务器，服务器把一些内容响应给客户端)，我们把传递的内容统称为“HTTP报文”


//===============前端性能优化
一：减少HTTP请求的次数及请求内容的大小



//======= 一个完整URL的组成
1. URL/URN/URI
 URI=URL+URN
 URI：统一资源标识符
 URL：统一资源定位符
 URN：统一资源名称

2. http://www.zhufengpeixun.cn:80/stu/index.html?name=xxx&age=25#teacher

  [传输协议]
    用来传输客户端和服务器端交互的信息的（类似于快递小哥）
      HTTP：超文本传输协议（除了传递普通的文本，还可以传递文件流或者进制编码等信息），是目前最常用的WEB传输协议
      HTTPS：基于SSL（Secure Sockets Layer 安全套接层）加密的HTTP传输协议，比HTTP更加的安全（涉及支付的网站一般都是基于HTTPS完成的）
      FTP：文件传输协议，一般用来实现资源文件在服务器上的上传下载

  [域名] Domain Name  
    一级域名（顶级域名）  www.qq.com  
    二级域名   sports.qq.com  
    三级域名   kbs.sports.qq.com  

    .com 供商用的国际域名  
    .cn 供商用的中文域名  
    .net 用于网络供应服务商（系统类的经常使用NET域名）  
    .org 用于官方组织  
    .edu 用于教育院校  
    .gov 用于政府机构  

  [端口号]  
    用来区分同一台服务器上不同服务的标识（基于WEB服务管理器创建服务的时候可以指定），不同服务之间一般是不能使用相同的端口号的

    HTTP =>默认端口号80  
    HTTPS =>默认端口号443  
    FTP =>默认端口号21  
    如果当前网站服务，采用的是协议对应的默认端口管理，那么当用户输入网址的时候可以不指定端口号，浏览器会默认把用户把默认的端口传递给服务器

    一台服务器上的端口号范围：0~65535之间

    WEBSTORM预览页面：WS把自己的电脑当做服务器，在服务器上创建一个服务，端口号是63342，自己电脑上的浏览器预览自己电脑上的服务，属于本机服务请求，用localhost(127.0.0.1)本地域名即可
    http://localhost:63342/201802LESSON/WEEK7/0522DAY1/1.html

    服务器上安装一款应用都可能会作为一个服务，占用一个端口号

  [请求路径名称]
    path
    pathname
    例如：/stu/index.html 一般都是请求当前服务对应的项目目录中，STU文件夹中的INDEX.HTML页面。但是也有特情况，就是当前的URL是被“伪URL重写”的，我们看到的URL请求其实不是真实的请求（例如 https://item.jd.com/4679424.html 这个URL就是被重写的，它的真实URL地址很可能是 https://item.jd.com/detail.jsp?id=4679424，其实就是跳转到详情页，通过问号传递不同的产品编号，展示不同的产品详情信息，但是.jsp这种服务器渲染的动态页面不能被搜索引擎收录，不利于页面的SEO，所以我们会把动态页面静态化，这也就用到了URL重写技术）

    例如：/stu/info 这种没有任何后缀信息，一般都不是用来请求资源文件的，而是用于AJAX数据请求的接口地址（如果后缀是.json类的，也是同理），但是有一种除外 /stu/info/ 这种的很可能不是接口地址，而是没有指定请求的资源名称，服务器会请求默认的资源文件，一般都是index.html/default.html...

    DHTML：动态页面，泛指当前页面中的内容不是写死的而是动态绑定的，例如.jsp/.php/.aspx...这些页面中的数据都是基于AJAX或者是后台编程语言处理，由服务器端渲染，最后把渲染后的结果返回给客户端呈现的

  [问号传参及哈希值]
    ?xxx=xxx&...#xxx

    在HTTP事务中，问号传参是客户端把信息传递给服务器的一种方式(也有可能是跳转到某一个页面，把参数值传递给页面用来标识的)

    哈希值一般都跟客户端服务器交互没啥关系，主要用于页面中的锚点定位和HASH路由切换

//========HTTP报文
起始行：请求起始行、响应起始行
首部（头）：请求头、响应头、通用头
主体：请求主体、响应主体

General 通用头

```
Request URL: http://www.zhufengpeixun.cn/  请求地址  
Request Method: GET  请求方式:GET/POST/DELETE/PUT/HEAD/OPTION...
Status Code: 304 Not Modified   响应的HTTP状态码
Remote Address: 125.39.174.137:80  主机地址(服务器外网IP地址)
Referrer Policy: no-referrer-when-downgrade
```

Request Headers 请求头 [客户端设置，服务器接收]  

```
GET / HTTP/1.1  =>起始行(描述当前请求的一些基本信息：用的是1.1版本传输协议进行内容传输的)  
Host: www.zhufengpeixun.cn
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: ... =>cookie信息一般都是放到头文件中实现和服务器端的数据通信的
If-Modified-Since: Sun, 06 May 2018 10:02:42 GMT
```

Response Headers 响应头 [服务器端设置，客户端获取]

```
HTTP/1.1 304 Not Modified  =>响应起始行（HTTP状态码）
Date: Tue, 22 May 2018 09:18:56 GMT  =>服务器响应内容时候的“服务器端时间”（客户端获取这个时间的时候已经和真实的时间产生误差了，因为服务器返回内容到客户端接收到，也是需要时间的），并且这个时间是格林尼治时间（比北京时间慢8小时，北京时间是GMT+0800）
Connection: keep-alive
ETag: "700a6f-17f43-56b86a77513d3"
Vary: Accept-Encoding,User-Agent
Server: yunjiasu-nginx  //=>管理WEB服务的工具
CF-RAY: 41ee32c192db66b8-TSN
```

Response [响应主体]

```
  服务器返回的是啥就是啥
```

Request Payload / Form Data  [请求主体]

```
  客户端传递给服务器的内容
```

2. 大家了解HTTP报文以及如何查看对未来工作开发和BUG调试至关重要
 以后涉及到交互功能（前端<=>后台）出现问题，都按照如下方式查找问题原因
   A:打开控制台，在NET-WORK中找到当前交互的请求地址，点击进去看详情
   B:如果是传递给服务器的参数或者方式错误 [前端问题]
   C:如果服务器返回的信息有错误或者和API接口文档规定的内容不一样 [后台问题]
   D:如果返回数据是对的，但是展示有问题 [前端问题]

   确定是自己前端的问题后，基于断点(或者代码中的debugger)或者控制台输出等方式，开始逐步调试即可

3. 客户端和服务器端信息交互的方式
  [客户端传递给服务器]
     A:问号传参
      请求的URL地址末尾通过问号传参方式，把一些信息传递给服务器
      /stu/info?id=12&lx=man

     B:设置请求头
      客户端把需要传递给服务器的内容设置到请求头信息中（自定义请求头）,服务器可以通过接收请求头信息把内容得到

     C:设置请求主体
      xhr.send([AJAX SEND中传递的内容，就是客户端设置的请求主体内容，服务器端可以接收到这些信息的]);

  [服务器返回给客户端]
     A:设置响应头信息
      例如把服务时间通过响应头返回给客户端，客户端通过获取响应头信息得到这个时间（响应头返回的速度是优先于响应主体的）

     B:设置响应主体
      主要的返回信息都在响应主体中












 