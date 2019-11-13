<template>
  <div class="crse-exch" v-cloak>
    <div class="yi-listbox crse-top">
      <ul class="list-ul">
        <li class="yi-flex lst-item">
          <img class="img-box" :src="lessonInfo.lesson.coverVUrl" />
          <div class="flex1">
            <h5 class="h5tit" v-text="lessonInfo.lesson.lessonName || ''"></h5>
            <p class="name" v-text="lessonInfo.lecturer.lecturerName + '/' + lessonInfo.lecturer.positionName"></p>
            <p class="grayer desc" v-text="'共' + lessonInfo.lesson.videoCount + '节课'"></p>
            <div class="pos-b ycbbox">
              <price-info :lessonPrice="lessonInfo.lesson.lessonPrice" :lessonCost="lessonInfo.lesson.lessonCost"></price-info>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="crse-ycb">
      <span class="bt">易车币余额：</span>
      <span class="num" v-text="coin"></span>
      <span class="cn">易车币</span>
    </div>
    <div class="grayer crse-desc">
      <p>您将兑换的商品为虚拟内容服务，兑换后不支持退订、转让、退换，请斟酌确认。</p>
      <p>兑换后可在“已兑课程”“最近在学课程”查看和使用。</p>
      <p :class="{'hide':!btnDis}">
        <router-link class="link" to="/share/ycb">如何赚取易车币</router-link>
      </p>
    </div>
    <div class="bottomFixed btn-fixed">
      <a v-if="!btnDis" class="btn-a" href="javascript:;" @click="exchange">马上兑换</a>
      <a v-else class="btn-a disabled" href="javascript:;" disabled="disabled">易车币不足,无法兑换</a>
    </div>
    <div id="ddd"></div>
  </div>
</template>

<script>
import { post } from "_lib/ajax";
import { lesson, learn } from "_api";
import priceInfo from "_c/coursePriceInfo";
import { alert, confirm, tip } from "_c/common/dialog";

export default {
  name: "exchange",
  data() {
    return {
      lessonId: null,
      lessonInfo: {
        lesson: {},
        lecturer: {}
      },
      coin: null
    };
  },
  computed: {
    btnDis() {
      // if (!this.lessonInfo.lesson.lessonPrice || !this.coin) {
      //   return true;
      // }
      return this.lessonInfo.lesson.lessonPrice > this.coin || 0;
    }
  },
  components: {
    priceInfo
  },
  created() {
    this.lessonId = this.$route.params.id;
    // 课程信息
    this.initLessonInfo();
    // 易车币
    this.initCoinInfo();
  },
  methods: {
    // 初始化课程信息
    initLessonInfo() {
      post(lesson.detail, { lessonId: this.lessonId }).then(value => {
        this.lessonInfo = value;
      });
    },
    // 初始化易车币信息
    initCoinInfo() {
      post(learn.coin, {}).then(value => {
        this.coin = value;
      });
    },
    // 兑换事件
    exchange() {
      confirm.show("确定兑换课程吗？", () => {
        post(lesson.buy, { lessonId: this.lessonId })
          .then(value => {
            alert.show("兑换成功！", () => {
              this.$router.replace({
                name: "lesson",
                query: { id: this.lessonId }
              });
            });
          })
          .catch(msg => {
            tip.show(msg);
          });
      });
    }
  }
};
</script>

<style scoped>
@import "~@/assets/css/modules/course.min.css";
</style>
