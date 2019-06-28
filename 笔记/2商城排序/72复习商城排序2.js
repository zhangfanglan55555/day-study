//基于高级单例模式完成业务逻辑开发
let productRender = (function(){
    //自执行函数形成的私有作用域不销毁（‘闭包’）
    //1.里面的方法和变量等和外界不冲突
    //2.里面创建的值也不会销毁

    //GET-DATA:基于AJAX从服务器端获取数据
    let getData = function(){
        
    };

    //BIND-HTML:完成数据的绑定（基于ES6模版字符串）
    let bindHTML = function(){

    };
    return {
        init:function(){
            //=>init是当前模块的入口，想要实现完整业务逻辑，我们执行init即可，
            //在init中，我们根据具体的业务需求，规划哪些方法先，哪些方法后执行，init
            //相当于当前模块的指挥官（‘命令模式')
            getData();
            bindHTML();
        }
    }
})()
productRender.init();