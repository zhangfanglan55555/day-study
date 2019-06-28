$(function () {
    //  当HTML结构加载完成才会执行这里的代码（闭包）
    // 1.获取需要的数据
    // 真实项目中，我们第一页加载完成，当用户下拉到底部，开始获取第二页的内容。服务器端会给我们提供一个API获取数据的
    // 地址，并要求客户端把获取的是第几页的内容传递给服务器，服务器依照这个元素把对应不同的数据返回“分页技术“
    let page = 0, imgData = null;
    let queryData = () => {
        page++;
        $.ajax({
            url: '接口地址',
            method: 'get',
            async: false,//同步请求（真实项目中使用的是异步）
            dataType: 'json',//把从服务器端获取的JSON字符串转化为对象（我们这样设置后，JQ内部会帮我们转换）
            success: result => {
                imgData = result;
            }
        })
    }
    queryData();
    // 2.数据绑定
    let bindHTML = ()=>{
        let $boxList = $('.flowBox > li');
        for (let i = 0; i < imgData.length; i += 3) {
            $boxList.sort((a, b) => {
                return $(a).outerHeight() - $(b).outerHeight();
            }).each((index, curLi) => {
                // 第一个Li索引是0， index=>imgData[i+0]
                // 第二个LI索引是1， index=>imgData[i+1]
                let item = imgData[i + index];
                if (!item) return;
                let {id,pic,link,title} = item;
                $(`
                <a href='${link}'>
                    <div>
                        <img src='${pic}' />
                    </div>
                    <span>${title}</span>
                </a>
                `).appendTo(curLi)
            })
        }
    }

})