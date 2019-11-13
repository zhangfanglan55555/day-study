<template>
  <div>
    <scroller :next="next" ref="scroller">
      <div class="swiper-box swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
            <img :src="item.picture" @click="swiperClick(item.url)" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <!-- /轮播图-->
      <div class="yi-flex center module signIn">
        <div class="flex1">
          <h3 class="h3tit">每天学习，坚持打卡</h3>
          <div class="grayer">连续打卡有惊喜</div>
        </div>
        <a v-show="signFlag" :class="[signStatus ? 'active' : 'white', 'sin-btn']" href="javascript:;" :disabled="signStatus" @click="sign">{{signStatus ? '今日已打卡' : '学习打卡'}}</a>
      </div>
      <div class="module lately" v-show="userId && inLearningCourseList.length > 0">
        <h1 class="h1tit">
          <a class="yi-fr more" href="javascript:;" @click="toCourseList">全部</a> 最近在学课程</h1>
        <div :class="['yi-listbox', inLearningCourseList.length > 1 ? 'scroll' : '']">
          <div class="list-ul">
            <div class="yi-flex lst-item" v-for="item in inLearningCourseList" :key="item.lesson.lessonId" @click="toCourseDetails(item.lesson.lessonId, 'inLearningCourse')">
              <div :class="['img-box', inLearningCourseList.length > 1 ? 'mp4' : 'mp4']">
                <img :src="item.lesson.coverVUrl" />
              </div>
              <div class="flex1">
                <h3 class="h3tit" v-text="item.lesson.lessonName"></h3>
                <div class="name" v-text="item.lecturer.lecturerName + '/' + item.lecturer.positionName"></div>
                <study-status-info :studyStatus="item.userStatistics.studyStatus" :studiedPercent="item.userStatistics.studiedPercent"></study-status-info>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="module recommend">
        <h1 class="h1tit">
          推荐课程
        </h1>
        <div class="yi-listbox">
          <ul class="list-ul">
            <li class="yi-flex lst-item" v-for="item in recommendCourseList" :key="item.lesson.lessonId" @click="toCourseDetails(item.lesson.lessonId, 'recommendCourse')">
              <div class="img-box mp4">
                <img :src="item.lesson.coverVUrl" />
                <span class="dct" v-if="item.userStatistics.isBuy === 1">已兑</span>
                <span class="dct" v-else-if="item.lesson.lessonPrice < item.lesson.lessonCost">优惠</span>
              </div>
              <div class="flex1">
                <h3 class="h3tit" v-text="item.lesson.lessonName"></h3>
                <div class="name" v-text="item.lecturer.lecturerName + '/' + item.lecturer.positionName"></div>
                <div class="r-txt" v-text="item.lesson.recommendedReason"></div>
                <div class="pos-b ycbbox">
                  <p class="yi-fr info" v-text="(item.lesson.studiedUserNum || 0) + '人学过'"></p>
                  <price-info :lessonPrice="item.lesson.lessonPrice" :lessonCost="item.lesson.lessonCost"></price-info>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="link rec-more" @click="initRecommendCourseList" v-if="recommendCourseListAll.length > 3">换一批</div>
      </div>
      <div class="classify tabsBox" style="">
        <div class="navT" style="height:0;"></div>
        <div class="tab-nav swiper-container3">
          <div class="swiper-wrapper nav-ul">
            <div :class="['swiper-slide', 'tab-tit', classid === item.lessonCategoryId ? 'active' : '']" v-for="item in courseType" :key="item.lessonCategoryId" v-text="item.lessonCategoryName" @click="courseTypeChange(item.lessonCategoryId)"></div>
          </div>
        </div>
        <div class="navH" style="height:.88rem; display:none;"></div>
        <div class="tab-panel">
          <div class="panel-item yi-listbox">
            <ul class="list-ul">
              <!--  -->
              <li class="yi-flex lst-item" v-for="item in classifyCourseList" :key="item.lesson.lessonId" @click="toCourseDetails(item.lesson.lessonId, 'classifyCourse')">
                <div class="img-box mp4">
                  <img :src="item.lesson.coverVUrl" />
                  <span class="dct" v-if="item.userStatistics.isBuy === 1">已兑</span>
                  <span class="dct" v-else-if="item.lesson.lessonPrice < item.lesson.lessonCost">优惠</span>
                </div>
                <div class="flex1">
                  <h3 class="h3tit" v-text="item.lesson.lessonName"></h3>
                  <div class="name" v-text="item.lecturer.lecturerName + '/' + item.lecturer.positionName"></div>
                  <div class="grayer desc" v-text="item.lesson.recommendedReason"></div>
                  <div class="pos-b ycbbox">
                    <p class="yi-fr info" v-text="(item.lesson.studiedUserNum || 0) + '人学过'"></p>
                    <price-info :lessonPrice="item.lesson.lessonPrice" :lessonCost="item.lesson.lessonCost"></price-info>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </scroller>
    <a class="yi-gotop" href="#"></a>
  </div>
</template>

<script>
import { post } from "_lib/ajax";
import { lesson, focuspicture, learn } from "_api";
import { home, sys } from "_sysConf/config";
import { setCookie, getCookie } from "@/libs/cookie";
import { dateFormat } from "_lib/common";
import priceInfo from "_c/coursePriceInfo";
import studyStatusInfo from "_c/studyStatusInfo";
import prefix from "_conf/prefix";

export default {
  name: "home",
  data() {
    return {
      // 轮播图列表
      carouselList: [],
      // 签到状态
      signStatus: false,
      // 签到按钮标记
      signFlag: false,
      // 在学课程列表
      inLearningCourseList: [],
      // 推荐课程列表(显示)
      recommendCourseList: [],
      // 推荐课程列表(全量)
      recommendCourseListAll: [],
      // 课程分类
      courseType: [],
      // 分类课程列表缓存数据
      classifyCourseListArr: {},
      // 分类课程列表
      classifyCourseList: [],
      // 分类课程当前页数
      pageIndex: 0,
      // 当前课程分类
      classid: 0,
      // 推荐课程分批标识
      index: 0
    };
  },
  computed: {
    userId() {
      return this.$store.state.user.userId;
    },
    height() {
      return this.classifyCourseList.length;
    }
    // userInfo() {
    //   return this.$store.state.user.userInfo;
    // }
  },
  components: {
    priceInfo,
    studyStatusInfo
  },
  created() {
    // 加载 js
    this.$nextTick(() => {
      this.getScript("/assets/js/conf/index.min.js");
      this.getScript(sys.swiper, () => {
        // 轮播图
        new Swiper(".swiper-container", {
          autoplay: {
            delay: 3000
          },
          pagination: {
            el: ".swiper-pagination"
          },
          observer: true
        });
        // 课程分类
        new Swiper(".swiper-container3", {
          freeMode: true,
          freeModeMomentumRatio: 0.5,
          freeModeMomentumBounce: false,
          slidesPerView: "auto",
          observer: true
        });
      });
      // jQuery实现动画滚动
      $(".yi-gotop").on("click", function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 300);
      });
      // 滚动监听
      $(document).on("touchmove", () => {
        var h = $(document.body).height();
        var c = $(document).scrollTop();
        var wh = $(window).height();
        if (Math.ceil(wh + c) >= h) {
          $(".tab-nav")
            .removeClass("sticky")
            .addClass("topFixed");
          $(".navH").show();
        } else {
          this._scroll();
        }
      });
    });
  },
  activated() {
    this.index = 0;
    this.signFlag = false;
    // 轮播图
    this.initCarousel();
    // 签到
    this.initSign();
    // 在学课程
    this.initInLearningCourse();
    // 推荐课程
    this.initRecommendCourse();
    // 课程分类
    this.initCourseType();
  },
  methods: {
    // 初始化轮播图
    initCarousel() {
      post(focuspicture.list, {}).then(value => {
        this.carouselList = value;
      });
    },
    // 初始化签到
    initSign() {
      let cookieName = home.signCookieName;
      let date = dateFormat(new Date(), "yyyy-MM-dd");
      let cookies = getCookie(cookieName);
      let userId = this.userId;
      if (cookies != null && cookies != "") {
        let jsonCookies = JSON.parse(cookies);
        let data = jsonCookies.value;
        let uid = jsonCookies.uid;
        let _value = jsonCookies.date;
        if (data == 1 && _value == date && uid == userId) {
          this.signFlag = true;
          this.signStatus = true;
          return;
        }
      }
      post(learn.userstatisticsinfo, {}).then(value => {
        this.signFlag = true;
        this.signStatus = value.todaySignStatus === 1;
        let signStatus = value.todaySignStatus;
        setCookie(cookieName, { uid: userId, date, value: signStatus }, 1);
      });
    },
    // 签到
    sign() {
      if (this.signStatus == 1) {
        window.location.href = prefix + "signIn/detail";
      } else {
        window.location.href = prefix + "signIn/index";
      }
    },
    // 初始化最近在学课程
    initInLearningCourse() {
      let param = {
        type: 1,
        classid: 0,
        order: 0,
        pageIndex: 1,
        pageSize: home.inLearningCoursePageSize
      };
      post(lesson.list, param).then(value => {
        this.inLearningCourseList = value.lessons;
      });
    },
    // 初始化推荐课程
    initRecommendCourse() {
      let param = {
        type: 2,
        classid: 0,
        order: 0,
        pageIndex: 1,
        pageSize: home.recommendCourseCount
      };
      post(lesson.list, param).then(value => {
        this.recommendCourseListAll = value.lessons;
        this.initRecommendCourseList();
      });
    },
    // 随机抽取集合中X条数据
    randomExtractionList() {
      let count = home.recommendCoursePageSize;
      let list = this.recommendCourseListAll.slice(0);
      if (list.length <= count) {
        return list;
      }
      let arr = [];
      for (let i = 0; i < count; i++) {
        let len = list.length > 10 ? 10 : list.length;
        let num = Math.floor(Math.random() * len);
        arr.push(list.splice(num, 1)[0]);
      }
      this.recommendCourseList = arr;
    },
    // 按顺序抽取集合中的X条数据
    initRecommendCourseList() {
      let count = home.recommendCoursePageSize;
      this.recommendCourseList = this.recommendCourseListAll.slice(
        this.index * count,
        (this.index + 1) * count
      );
      let pageCount = Math.ceil(this.recommendCourseListAll.length / count);
      if (this.index++ >= pageCount - 1) {
        this.index = 0;
      }
    },
    // 初始化课程分类
    initCourseType() {
      post(lesson.classlist, {}).then(value => {
        this.courseType = value;
        if (this.courseType && this.courseType.length > 0) {
          this.classid = this.courseType[0].lessonCategoryId;
        }
      });
    },
    // 上拉加载
    next() {
      this.pageIndex++;
      this.$refs.scroller.start();
      this.initClassifyCourse(len => {
        if (!len || len < home.coursePageSize) {
          this.pageIndex--;
          this.$refs.scroller.finish();
          return;
        }
        this.$refs.scroller.stop();
      });
    },
    // 下拉刷新
    refresh() {
      this.$router.go(0);
      done();
    },
    // 初始化分类课程列表
    initClassifyCourse(func) {
      let param = {
        type: 3,
        classId: this.classid,
        order: 0,
        pageIndex: this.pageIndex,
        pageSize: home.coursePageSize
      };
      post(lesson.list, param)
        .then(value => {
          for (let i = 0, len = value.lessons.length; i < len; i++) {
            this.classifyCourseList.push(value.lessons[i]);
          }
          func && func(value.lessons.length);
          if (this.classifyCourseList.length === 0) {
            $(".loading-layer").hide();
          } else {
            $(".loading-layer").show();
          }
        })
        .catch(() => {
          func && func(0);
        });
    },
    // 页签点击事件
    courseTypeChange(classid) {
      this.classid = classid;
    },
    // 课程列表跳转
    toCourseList() {
      window.location.href = prefix + "course";
    },
    // 课程查看
    toCourseDetails(lessonId, flag) {
      window.location.href = `${prefix}lesson?id=${lessonId}&flag=${flag}`;
    },
    _scroll() {
      let tabNav = $(".navT").offset().top;
      var stickyEl = document.querySelector(".tab-nav");
      function fixed(num) {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
          document.body.onscroll = function(e) {
            var scrollT = $(window).scrollTop();
            if (scrollT >= num) {
              $(stickyEl).addClass("topFixed");
              $(".navH").show();
            } else {
              $(stickyEl).removeClass("topFixed");
              $(".navH").hide();
            }
          };
        } else if (isiOS) {
          $(stickyEl)
            .removeClass("topFixed")
            .addClass("sticky");
          $(".navH").hide();
        }
      }
      fixed(tabNav);
    },
    // 轮播图跳转
    swiperClick(url) {
      window.location.href = `${url}?flag=swiperCarouse`;
    }
  },
  watch: {
    classid: function() {
      this.pageIndex = 0;
      this.classifyCourseList.splice(0);
      this.$refs.scroller.refresh();
      this.next();
    },
    height: function() {
      this.$nextTick(() => {
        this._scroll();
        // 最小高度
        $(".tab-panel").css(
          "min-height",
          $(window).outerHeight() -
            $(".tab-nav").outerHeight() -
            $(".dropload-noData").outerHeight()
        );
      });
    }
  }
};
</script>

<style>
body {
  background-color: #fff;
}
</style>

<style scoped>
@import "~@/assets/css/modules/index.min.css";
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>