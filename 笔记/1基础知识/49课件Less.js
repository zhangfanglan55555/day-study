/**
 * [less]
 * 是css预编译语言，和它类似的还有sass/stylus...
 *
 * css是标记语言，不是编程语言，没有类、实例、函数变量等东西;而less等预编译语言就是让css
 * 具备面向对象编程的思想；但是浏览器不能直接识别和熏染less代码，需要我们把less代码编译为正常
 * 的css后，再交给浏览器渲染解析；
 * [less的编译]:
 * - 在开发环境下编译（在产品没有开发完，正在开发中，是开发环境）
 * > 导入less.js即可
 * - 在生产环境下编译（产品开发完，需要部署到服务器上线）
 > 项目上线，不能把less部署，这样用户每一次打开页面都需要重新的编译，非常耗性能，
 我们部署到服务器上的是编译后的css
 1.在当前电脑的全局环境下安装less模块
    $npm install less -g 
 2.基于命令把我们的less编译成css
 */

//  有宽高的盒子水平垂直居中
.box {
  .centerPos(200, 200);
  width: 200px;
  height: 200px;
  background: red;
}

.centerPos(@w:100,@h:100) {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: unit(-(@h / 2), px);
  margin-left: unit(-(@w / 2), px);
}
