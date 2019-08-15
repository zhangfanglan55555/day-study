/**
 * 规定时间内的多方向匀速运动
 * TIME 当前运动时间
 * BEGIN 起始位置
 * TARGET 目标位置
 * CHANGE 总距离
 * DURATION 总时间
 *  [记录每一个方向的起始位置、目标值、总距离]
 *  BEGIN 起始位置
 *  TARGENT 目标位置
 *  CHANGE 总距离
 */

let time = 0,
    duration = 1000,
    begin = {},
    target = {
        left: document.documentElement.clientWidth - box.offsetWidth,
        top: document.documentElement.clientHeight - box.offsetHeight
    },
    // 根据目标值金算出当前元素每一个运动方向的总距离(前提：计算出每个方向的起始值)
    change = {};
for (let attr in target) {
    if (target.hasOwnProperty(attr)) {
        begin[attr] = parseFloat(window.getComputedStyle(box)[attr])
        change[attr] = target[attr]
    }
}
let animateTimer = setInterval(() => {
    time += 17;
    if(time>= duration){
        clearInterval(animateTimer);
        for(let key in target){
            if(targe.hasOwnProperty(key)){
                box.style[key] = target[key] + 'px'
            }
        }
        return;
    }
    // 根据目标值中的方向，基于公式计算出每一个方向的当前位置
    let cur = {}
    for(let attr in target){
        if(target.hasOwnProperty(attr)){
            cur[attr] = time/duration*change[attr]+begin[attr];
        }
    }
    for(let key in cur){
        if(cur.hasOwnProperty(key)){
            box.style[key] = cur[key] + 'px'
        }
    }
}, 17)