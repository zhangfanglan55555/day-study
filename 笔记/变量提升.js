f = function() {//window.f = ...
  return true;
};
g = function() {//window.g = ....
  return false;
};
~function() {
    /***
     * 变量提升：默认都是❤新浏览器对条件判断中的函数不管条件是否成立都只是先声明没有定义，g = undefined私有作用域
     * function g;//g是私有变量
     */
  if (g() && [] == ![]) {//typeError g is not a function
    f = function() {
      return false;
    };
    function g() {
      return true;
    };
  }
}();
console.log(f());
console.log(g());

// 变量提升阶段
/**
 * 变量提升：无
 *  匿名函数不进行变量提升
 */