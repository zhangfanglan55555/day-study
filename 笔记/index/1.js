var oTab = document.getElementById('tab'),
    oTabList = document.getElementsByTagName('li'),
    divList = oTab.getElementsByClassName('div');
function changeTab(curIndex) {


}
// 闭包
for (var i = 0; i < oTabList.length; i++) {
    oTabList[i].onclick = function (n) {
        /**
         * 自执行函数形成一个私有作用域（不释放：返回的函数对应的堆地址被外面的事件占用了）
         */
        var i = n;
        return function () {
            changeTab(i)
        }
    }(i)
}