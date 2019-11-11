box.ontouchstart = function(ev){
    console.dir(ev);
    /**
     * TouchEvent:手指事件对象
     * changedTouches
     * touches
     * 手指操作的信息集合，集合中记录了每一根操作的手指的相关信息(包含触发点的坐标位置)，touches记录
     * 的信息只有手指在屏幕上才有，也就是手指离开屏幕的时候信息就消失了，changedTouches本意上记录的
     * 是改变的值，即使手指离开，信息值也在
     */
}