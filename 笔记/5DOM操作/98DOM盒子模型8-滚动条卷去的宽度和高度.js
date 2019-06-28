/**
 * scrollTop/scrollLeft:滚动条卷去的高度或者宽度
 *  最小卷去值：0
 *  最大卷去值：真实页面的高度 - 一屏幕的高度 
 *            document.documentElement.scrollHeight - document.documentElement.clientHeight
 *   在JS盒子模型13个属性中，只有scrollTop和scrollLeft是可读写属性，其他的都是只读的
 */
// 操作浏览器的盒子模型属性，我们一般都要写两套，用来兼容各种模式下的浏览器
let utils = function(){
    // 操作浏览器盒子模型属性的
    let winHandle = function(attr,value){
        if(typeof value != 'undefined'){
            // 设置盒子模型属性值
            document.documentElement[attr] = value;
            document.body[attr] = value;
            return;
        }
        return document.documentElement[attr] || document.body[attr]
    }
    return {
         winHandle
    }

}()

utils.winHandle('scrollTop');//

// 回到顶部
document.documentElement.scrollTop = 0;