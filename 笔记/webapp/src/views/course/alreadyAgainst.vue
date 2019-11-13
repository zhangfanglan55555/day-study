<template>
  <div class="panel-item yi-listbox">
    <scroller :next="next" ref="scroller">
      <div class="sort-box">
        <span class="grayer">排序</span>
        <span class="text icon">最近学习</span>
        <ul class="sort-lst">
          <li :class="getOrderClass(1)" @click="changeListOrder(1)">最近学习</li>
          <li :class="getOrderClass(2)" @click="changeListOrder(2)">兑换顺序</li>
        </ul>
      </div>
      <ul class="list-ul" v-if="courseList.length > 0">
        <!--  -->
        <li class="yi-flex lst-item" v-for="item in courseList" :key="item.lesson.lessonId" @click="toCourseDetails(item.lesson.lessonId)">
          <div class="img-box mp4"><img :src="item.lesson.coverVUrl" /></div>
          <div class="flex1">
            <h3 class="h3tit" v-text="item.lesson.lessonName"></h3>
            <div class="name" v-text="item.lecturer.lecturerName + '/' + item.lecturer.positionName"></div>
            <div class="grayer desc" v-text="item.lesson.recommendedReason"></div>
            <study-status-info :studyStatus="item.userStatistics.studyStatus" :studiedPercent="item.userStatistics.studiedPercent"></study-status-info>
          </div>
        </li>
      </ul>
      <div class="sort-mask"></div>
    </scroller>
    <div :class="['nodata', nodata ? '' : 'hide']">
      <img class="img" :src="nodataImg" />
      <div class="txt">还没有兑换课程哦</div>
      <router-link class="btn-a" to="/">去看看</router-link>
    </div>
  </div>
</template>

<script>
import nodataImg from "@/assets/images/nodata.png";
import { post } from "@/libs/ajax";
import { lesson } from "_api";
import { course } from "_sysConf/config";
import studyStatusInfo from "_c/studyStatusInfo";
import prefix from "_conf/prefix";

export default {
  name: "alreadyAgainst",
  data() {
    return {
      // 暂无数据
      nodata: false,
      // 暂无数据图片
      nodataImg,
      // 排序
      order: 1,
      // 当前页数
      pageIndex: 0,
      // 课程列表
      courseList: []
    };
  },
  components: {
    studyStatusInfo
  },
  created() {
    this.$nextTick(() => {
      this.getScript("/assets/js/conf/myStudy.min.js");
    });
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
        type: 4,
        classid: 0,
        order: this.order,
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
    // 获取当前排序项class
    getOrderClass(order) {
      let cls = ["icon"];
      if (this.order === order) {
        cls.push("active");
      }
      return cls;
    },
    // 排序改变事件
    changeListOrder(order) {
      this.order = order;
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
    toCourseDetails(lessonId) {
      window.location.href = `${prefix}lesson?id=${lessonId}&flag=alreadyAgainst`;
    }
  },
  watch: {
    order: function() {
      // 清空列表
      this.pageIndex = 0;
      this.courseList.splice(0);
      this.$refs.scroller.refresh();
      this.next();
    }
  }
};
</script>

<style scoped>
@import "~@/assets/css/modules/myStudy.min.css";
</style>