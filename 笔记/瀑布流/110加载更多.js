$(function () {
    //  当HTML结构加载完成才会执行这里的代码（闭包）
    // 1.获取需要的数据
    // 真实项目中，我们第一页加载完成，当用户下拉到底部，开始获取第二页的内容。服务器端会给我们提供一个API获取数据的
    // 地址，并要求客户端把获取的是第几页的内容传递给服务器，服务器依照这个元素把对应不同的数据返回“分页技术“
    let page = 0, imgData = null,isRun = false;
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
    let bindHTML = () => {
        let $boxList = $('.flowBox > li');
        for (let i = 0; i < imgData.length; i += 3) {
            $boxList.sort((a, b) => {
                return $(a).outerHeight() - $(b).outerHeight();
            }).each((index, curLi) => {
                // 第一个Li索引是0， index=>imgData[i+0]
                // 第二个LI索引是1， index=>imgData[i+1]
                let item = imgData[i + index];
                if (!item) return;
                let { id, pic, link, title } = item;
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
        isRun = false;
    }
    // 3.当滚动到页面底部的时候，加载下一页的更多数据
    
    $(window).on('scroll', () => {
        // let winH = document.documentElement.clientHeight,//一屏幕的高度
        // document.documentElement.scrollHeight || document.body.scrollHeight; 页面真实高度
        // doucment.documentElement.scrollTop 滚动条卷去的高度
        let winH = $(window).outerHeight(),
            pageH = document.documentElement.scrollHeight || document.body.scrollHeight,
            scrollT = $(window).scrollTop();
        // 卷去的高度  >  真实高度 - 一屏幕的高度
        if ((scrollT + 100) >= pageH - winH) {
            // 隐形问题：人为操作滚动，这个在同一个操作内会被出发N次，也就是同一个时间段，获取时间会被执行N次，此时我们
            // 需要做重复操作限定
            if (isRun) return
            isRun = true;

            if(page>5){
                alert('没有更多数据了');
                return;
            }
            queryData();
            bindHTML();
        }
    })
})