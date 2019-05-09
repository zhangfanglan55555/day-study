/**
 * 原型(prototype)、原型链(__proto__)
 * [函数]
 *   普通函数、类(所有的类包含内置类、自己创建的类)
 * [对象]
 *   普通对象、数组、正则、Math、arguments...
 *   实例是对象类型（除了基本类型的字面量创建的值）
 *   prototype的值也是对象类型的
 *   函数也是对象类型的
 *   ...
 * 
 * 1.所有的函数数据类型都天生自带一个属性:prototype(原型)，这个属性的值是一个对象，浏览器会默认给它开辟一个堆内存；
 * 2.在浏览器给prototype开辟的堆内存当中有一个天生自带的属性constructor这个属性存储的值是当前函数本身；
 * 3.每一个对象都有一个__proto__的属性，这个属性指向当前实例所属的类的prototype(如果不能确定它是谁的实例，˜都是Object的实例)
 */

 Array.prototype.constructor === Array;//true
 /**
  * 每一个类都把供实例调取的公用属性方法存储到自己的原型上（原型prototype的作用就是存储一些公共的属性和方法，供它的实例调取使用）
  * 
  */

  ary.length;
  ary.pop;
  ary.__proto__pop;
  ary.hasOwnProperty;

  /**
   * 原型链：它是一个基于__proto__向上查找的机制，当我们操作实例的某个属性或者方法的时候，首先找自己空间中私有的
   * 属性或者方法：
   * 1.找到了，则结束查找，使用自己私有的即可
   * 2.没有找到，则基于__proto__找所属类的原型(prototype),如果找到就用这个公有的，如果没找到基于原型(prototype)上的
   * __proto__继续向上查找，一直找到Object为止，再没有那操作的属性或者方法不存在
   */
  function Fn(){
      var n = 100;
      this.AA = function(){
          console.log('AA[私]');          
      }
      this.BB = function(){
          console.log('BB[私]');
          
      }
  }
  Fn.prototype.AA = function(){
    console.log('AA[公]');    
  }

  var f1 = new Fn;
  var f2 = new Fn();

  f1.n;//undefined

  console.log(f1.AA  === f2.AA) ;// 
  console.log(f1.__proto__.AA === f2.AA);//
  console.log(f1.__proto__.AA ===  f2.__proto__.AA);//
  console.log(f1.__proto__.AA === Fn.prototype.AA);//
  console.log(f1.hasOwnProperty('AA') === Fn.prototype.hasOwnProperty('AA'));

  /**
   * false ,两个AA都变成了私有属性
   * false 
   * true
   * true
   * true
   */

   f1.name;//给自己设置私有属性
   f2.__proto__.name;//给原型上设置公有属性（每个实例都可以用这个属性）