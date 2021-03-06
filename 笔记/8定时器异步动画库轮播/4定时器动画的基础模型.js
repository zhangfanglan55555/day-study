/**
 * 动画
 * 1.CSS3动画
 *   +transition过度动画
 *   +animation帧动画   
 *   +transform是变形不是动画(经常依托某一种动画让元素在一定时间内实现变形效果)
 * 
 *  2.JS动画
 *  + 定时器
 *  + requestAnimationFrame(JS中的帧动画)
 *  + 所谓的canvas动画就是JS基于定时器完成（canvas是一个HTML标签，可以理解为是一个画布
 *      我们可以基于JS在画布上绘制出图像和效果）
 * 3.FLASH动画（ActionScript)
 */

//需求：让box盒子从左边运动到最右边（结束）[修改box的left值即可]
let minL = 0,
    maxL = document.documentElement.clientWidth - document.getElementById('box').offsetWidth;

//[固定步长的匀速运动]
let step = 5,
    autoTimer = setInterval(() => {
        let curL = box.offsetLft;//我们用左偏移临时代替一下left值
        curL += step;
        if (curL >= maxL) {
            // 固定步长的情况下做边界判断：都是先加上步长再做判断，验证我如果走这一步会不会超，如果超了，
            // 我们直接运动到末尾即可，没超才走
            box.style.left = maxL + 'px';
            clearInterval(autoTimer);
            return;
        }
        box.style.left = curL + 'px'
    }, 17);//17 或者13 Ms都是比较好的动画执行时间(浏览器不会出现卡顿)


// [固定时间的匀速运动]
let duration = 1000,//总时间
    interval = 17,//频率：多长时间迈一步
    begin = 0,//起始位置
    target = maxL,//目标位置
    change = maxL - 0,//总距离：目标值target-起始值begin
    time = 0 //已经运动的时间
let autoTimer = setInterval(() => {
    time += interval;
    if (time >= duration) {
        box.style.left = target + 'px';
        clearInterval(autoTimer);
        return;
    }
    let curL = time / duration * change + begin;
    box.style.left = curL + 'px'
}, interval)
// 1.第一种思路：步长= 总距离/总时间*频率，剩下变为固定步长的匀速运动了
// 2.在JS中基于定时器完成动画，不论是固定步长还是固定时间，只要算出当前盒子应该运动的
// 位置即可（新的位置信息）
// t:TIME当前运动的时间
// d:DURATION总时间
// b:BEGIN起始位置
// c:CHANGE总距离（TARGET-BEGIN）

// t/d:当前已经运动的时间/总时间 =》 当前动画完成的百分比
// t/d*c:当前动画完成的百分比*总距离 =》 当前已经走得距离
// t/d*c+b ：当前走得距离+盒子的起始位置=》当前盒子应该有的位置