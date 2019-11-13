<template v-for="item in commentList.comments">
    <div class="cmt-item"  :key="item.comment.commentId">
        <div class="yi-flex cmt-hd center"><img class="face" :src="item.userInfo.userLogo" />
            <div class="flex1">
                <p class="name">{{item.userInfo.userName}}</p>
                <p class="info">{{item.userInfo.dealerName}}</p>
            </div>
        </div>
        <div class="cmt-bd">
            <p>{{item.comment.content}}</p>
        </div>
        <div class="cmt-ft">
            <span class="icon cmt-like" v-if="item.comment.thumNum > 0" v-bind:class="{'active':thumupList.indexOf(item.comment.commentId) >= 0}" @click="thumbsup(item.comment.commentId)">{{item.comment.thumNum}}</span>
            <span class="icon cmt-like" v-else @click="thumbsup(item.comment.commentId)">赞</span>
            <span class="grayer">{{commentTimeFormat(item.comment.createTime)}}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: "commentList",
  props: {
    // 评论列表
    commentList: {}
  }
};
</script>