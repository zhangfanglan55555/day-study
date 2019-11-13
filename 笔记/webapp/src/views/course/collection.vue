<template>
  <div class="panel-item yi-listbox">
    <scroller :next="next" ref="scroller">
      <ul class="list-ul">
        <!--  -->
        <li class="yi-flex lst-item" :class="{invalid: item.lesson.lessonStatus === 4}" v-for="item in courseList" :key="item.lesson.lessonId" @click="toCourseDetails(item.lesson.lessonId, item.lesson.lessonStatus)">
          <div class="img-box">
            <img :src="item.lesson.coverVUrl" />
            <span class="dct" v-if="item.lesson.lessonPrice < item.lesson.lessonCost && item.lesson.lessonStatus !== 4">优惠</span>
          </div>
          <div class="flex1">
            <h3 class="h3tit" v-text="item.lesson.lessonName"></h3>
            <div class="name" v-text="item.lecturer.lecturerName + '/' + item.lecturer.positionName"></div>
            <div class="grayer desc" v-text="item.lesson.recommendedReason"></div>
            <div class="pos-b ycbbox">
              <p class="yi-fr grayer coll-no" @click="cancelCollection(item.lesson.lessonId)">取消收藏</p>
              <price-info :lessonPrice="item.lesson.lessonPrice" :lessonCost="item.lesson.lessonCost"></price-info>
            </div>
          </div>
        </li>
      </ul>
      <div class="sort-mask"></div>
    </scroller>
    <div :class="['nodata', nodata ? '' : 'hide']">
      <img class="img" :src="nodataImg" />
      <div class="txt">还没有收藏课程哦</div>
      <router-link class="btn-a" to="/">去看看</router-link>
    </div>
  </div>
</template>

<script>
import nodataImg from "@/assets/images/nodata.png";
import priceInfo from "_c/coursePriceInfo";
import { post } from "@/libs/ajax";
import { lesson, learn } from "_api";
import { course } from "_sysConf/config";
import { tip, confirm } from "_c/common/dialog";
import prefix from "_conf/prefix";

export default {
  name: "collection",
  data() {
    return {
      // 暂无数据
      nodata: false,
      // 暂无数据图片
      nodataImg,
      // 当前页数
      pageIndex: 0,
      // 课程列表
      courseList: []
    };
  },
  components: {
    priceInfo
  },
  activated() {
    this.nodata = false;
    // 重置加载状态
    this.$refs.scroller.refresh();
    // 清空列表
    this.pageIndex = 0;
    this.courseList.splice(0);
    // 课程列表
    this.next();
  },
  methods: {
    // 初始化课程列表
    initCourseList(func) {
      let param = {
        type: 5,
        classid: 0,
        order: 0,
        pageIndex: this.pageIndex,
        pageSize: course.coursePageSize
      };
      post(lesson.list, param)
        .then(value => {
          if (
            this.courseList.length === 0 &&
            (!value.lessons || value.lessons.length === 0)
          ) {
            this.$nextTick(() => {
              this.nodata = true;
            });
          } else {
            for (let i = 0, len = value.lessons.length; i < len; i++) {
              this.courseList.push(value.lessons[i]);
            }
            this.nodata = false;
          }
          func && func(value.lessons.length);
          if (this.courseList.length === 0) {
            $(".loading-layer").hide();
          } else {
            $(".loading-layer").show();
          }
        })
        .catch(() => {
          func && func(0);
        });
    },
    // 取消收藏
    cancelCollection(lessonId) {
      event.stopPropagation();
      confirm.show("确认取消收藏吗", () => {
        let param = {
          lessonId,
          isFavorite: 2
        };
        post(learn.favorite, param).then(value => {
          tip.show("取消收藏成功", () => {
            this.$router.go(0);
          });
        });
      });
    },
    // 上拉加载
    next() {
      this.pageIndex++;
      this.$refs.scroller.start();
      this.initCourseList(len => {
        if (!len || len < course.coursePageSize) {
          this.pageIndex--;
          this.$nextTick(() => {
            if (this.courseList.length === 0) {
              $(".dropload-noData").hide();
              this.$refs.scroller.noData();
              return;
            }
            if (this.pageIndex === 0) {
              // 如果没有滚动条，啥都不显示
              $(window).scrollTop(1);
              if ($(window).scrollTop() === 0) {
                this.$refs.scroller.noData();
                return;
              }
              $(window).scrollTop(0);
            }
            this.$refs.scroller.finish();
          });
          return;
        }
        this.$refs.scroller.stop();
      });
    },
    // 下拉刷新
    refresh(done) {
      this.$router.go(0);
      done();
    },
    // 课程查看
    toCourseDetails(lessonId, lessonStatus) {
      if (lessonStatus == 4) {
        return;
      }
      window.location.href = `${prefix}lesson?id=${lessonId}&flag=collection`;
    }
  }
};
</script>

<style scoped>
@import "~@/assets/css/modules/myStudy.min.css";
</style>
