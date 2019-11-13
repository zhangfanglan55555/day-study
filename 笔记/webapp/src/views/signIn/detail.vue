<template>
  <div>
    <!-- <remote-js src="" /> -->
    <div class="sin-wrap" :style="{backgroundImage:'url('+backgroundImageUrl+')'}">
      <div class="sin-head">
        <h1 id="sign-status" class="h1tit">{{userStatisticsInfo.todaySignStatus==1?"今日已打卡":"今日未打卡"}}</h1>
        <div class="tips">已连续打卡
          <span id="sign-count">{{userStatisticsInfo.continueSignDays == null || userStatisticsInfo.continueSignDays == undefined ? "0" : userStatisticsInfo.continueSignDays}}</span>天</div>
      </div>
      <div class="sin-data">
        <div class="pack-head" id="toyear">
          <div class="icon btn-pre" id="idCalendarPre"></div>
          <div class="year-month"></div>
          <span id="idCalendarYear" v-text="nowYear">{{nowYear}}</span>年
          <span id="idCalendarMonth" v-text="nowMonth">{{nowMonth}}</span>月
          <div class="icon btn-next" id="idCalendarNext"></div>
        </div>
        <table class="pack-body" border="0" cellpadding="0" cellspacing="0">
          <thead></thead>
          <tr class="tou grayer">
            <td>日</td>
            <td>一</td>
            <td>二</td>
            <td>三</td>
            <td>四</td>
            <td>五</td>
            <td>六</td>
          </tr>
          <tbody class="tbody" id="idCalendar"></tbody>
        </table>
      </div>
      <div class="sin-text">
        <h3 class="h3tit">学习打卡奖励规则</h3>
        <p>1. 易车学院打卡每天奖励1枚易车币；</p>
        <p>2. 连续打卡大于3天，每天奖励3枚易车币。连续打卡中断后开始重新计数。</p>
        <p class="yi-tr">
          <router-link :to="{ name:'shareYcb' }" class="link">如何获得更多易车币</router-link>
          <!-- <router-link :to="{ name:'signIn' }" class="link">打卡页面</router-link> -->
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import { post } from "@/libs/ajax";
import { signin } from "_api";
import { learn } from "_api";
import { home, sys } from "_sysConf/config";
import { setCookie, getCookie } from "@/libs/cookie";
import backgroundImageUrl from "@/assets/images/sin-bg.png";
import { dateFormat } from "@/libs/common";
import { alert } from "_c/common/dialog";
import { tip } from "_c/common/dialog";

export default {
  name: "signInDetail",
  data() {
    return {
      dateTableCale: {},
      signedDay: [], //Timestamp 时间戳 当前选择月份的已签到列表
      userStatisticsInfo: {},
      userInfo: {},
      learnedHour: 0,
      learnedMinute: 0,
      backgroundImageUrl,
      nowDate: new Date(),
      nowYear: 0,
      nowMonth: 0
      // isSignInToday: 0 //今天是否已签到
    };
  },
  created() {
    let _this = this;
    this.$nextTick(() => {
      this.getScript("/assets/js/conf/signInDetails.min.js");
      this.bindClickEvent();
      // this.getScript(
      //   "https://image.bitautoimg.com/das/fe/cdnJs/signIn.js?v=20180824",
      //   () => {
      //     // setTimeout(this.init);
      //     _this.userInfo = this.$store.state.user.userInfo;
      //     _this.drawDateTable();
      //     // 今天默认加上一圈红色背景
      //     _this.todayCss();
      //     // // 上线需要删除
      //     // let _uid = this.userInfo.userId;
      //     // let cookieName = home.signCookieName;
      //     // let date = dateFormat(new Date(), "yyyy-MM-dd");
      //     // setCookie(cookieName, { uid: _uid, date, value: 0 }, 1);
      //   }
      // );
    });
  },
  activated() {
    let _this = this;

    //获取用户签到报表
    post(learn.userstatisticsinfo, {}).then(value => {
      _this.userStatisticsInfo = value;
      // tip.show("_this.userStatisticsInfo：" + _this.userStatisticsInfo);
    });

    this.getScript(
      "https://image.bitautoimg.com/das/fe/cdnJs/signIn.js?v=20180824",
      () => {
        _this.userInfo = this.$store.state.user.userInfo;
        _this.init();
        // _this.drawDateTable();
        // // 今天默认加上一圈红色背景
        // _this.todayCss();
      }
    );
    // this.init();
  },
  methods: {
    init() {
      //每次重新进，刷新当前日期
      this.nowDate = new Date();
      //初始化年、月
      this.initDate();
      //请求当月打卡数据
      this.getSigninStatistics(this.nowYear, this.nowMonth, 1);
    },
    bindClickEvent() {
      let _this = this;
      $("#idCalendarPre").click(function() {
        _this.dateTableCale.PreMonth();
        _this.nowDate = new Date(_this.nowDate.setMonth(_this.nowMonth - 2));

        _this.getSigninStatistics(
          _this.nowDate.getFullYear(),
          _this.nowDate.getMonth(),
          0
        );
      });
      $("#idCalendarNext").click(function() {
        _this.dateTableCale.NextMonth();
        _this.nowDate = new Date(_this.nowDate.setMonth(_this.nowMonth));

        _this.getSigninStatistics(
          _this.nowDate.getFullYear(),
          _this.nowDate.getMonth(),
          0
        );

        // // 今天默认加上一圈红色背景
        // _this.todayCss();
      });
    },
    /**
     * 修改绑定的年、月
     */
    initDate() {
      this.nowYear = this.nowDate.getFullYear();
      this.nowMonth = this.nowDate.getMonth() + 1;
    },
    /**
     * 根据月份获取签到列表
     * 参数：obtainDate: '2018-01'
     *
     * isInit：是否需要初始化日期表格，如果需要，则为1，否则为0
     */
    getSigninStatistics(year, month, isInit) {
      this.initDate();
      let _this = this;
      post(signin.getSignInList, {
        obtainDate: year + "-" + month
      }).then(value => {
        // 回调

        for (let i = 0; i < value.length; i++) {
          let item = value[i].signDate;
          // tip.show(item.replace(/-/g, "/"));
          let _date = new Date(
            dateFormat(new Date(item.replace(/-/g, "/")), "yyyy/MM/dd")
          );
          // tip.show(_date.getTime() / 1000);
          _this.signedDay.push(_date.getTime() / 1000);
        }

        // 添加今天签到
        // _this.signInToday();

        if (isInit == 1) {
          // 绘制日期表格
          _this.drawDateTable();
        }

        // 今天默认加上一圈红色背景
        _this.todayCss();
      });
    },

    /**
     * 绘制日期列表
     */
    drawDateTable() {
      let _this = this;
      // $("#idCalendar").children().remove();
      this.dateTableCale = new Calendar("idCalendar", {
        qdDay: _this.signedDay,
        onToday: function(o) {
          o.className = "active";
        },
        onFinish: function() {}
      });
    },
    /**
     * 取cookie确认今天是否签到，如果已签到，则日期列表中选中今天
     * 暂时无用，直接取接口
     */
    signInToday() {
      // let cookieName = home.signCookieName;
      // let date = dateFormat(new Date(), "yyyy-MM-dd");
      // let cookies = getCookie(cookieName);
      // if (cookies != null && cookies != "") {
      //   let jsonCookies = JSON.parse(cookies);
      //   let data = jsonCookies.value;
      //   let uid = jsonCookies.uid;
      //   let value = jsonCookies.date;
      //   if (data == 1 && value == date && uid == this.userInfo.userId) {
      //     this.isSignInToday = 1;
      //   }
      // }
    },

    /**
     * 添加选中今天的样式
     */
    todayCss() {
      let thisDate = new Date();
      let thisMonth = thisDate.getMonth() + 1; //由于从0开始，当前日期月份+1
      let thisYear = thisDate.getFullYear();
      let thisDateNum = thisDate.getDate(); // 日期的日部分

      if (thisMonth == this.nowMonth && thisYear == this.nowYear) {
        let dayArray = $("#idCalendar").find("span");
        for (let i = 0; i < dayArray.length; i++) {
          const element = dayArray[i];
          if ($(element).text() == thisDateNum) {
            $(element).addClass("newToday");
          }
        }
      }
    }
  }
};
</script>

<style scoped>
@import "~@/assets/css/modules/signInDtl.min.css";
</style>
