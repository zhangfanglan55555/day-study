
// 关闭弹层
export default {
    close(container) {
        container.removeChild(this.$el);
        this.$destroy();
    }
}