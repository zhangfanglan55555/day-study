// 引入外部文件
export default {
    name: 'remote-js',
    props: {
        src: { type: String, required: true }
    },
    render(createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src } });
    }
}