<template>
  <div>
    <!-- <remote-js src="https://js.bitauto.com/dealer/webtrends/dcs_tag.js" /> -->
    <remote-js src="https://image.bitautoimg.com/das/fe/yi-oph5/gloryPartner5/bridgejs/yiframesjsbridge.js" />

    <div class="count-wrap hide">
      <router-link :to="{name:'signInDetail'}" id="signInDetailLink" class="link">打卡详情</router-link>
      <div class="cut-box"><img class="face" :src="userInfo.userLogo" />
        <h1 class="name">{{userInfo.userName}}</h1>
        <div class="grayer desc">{{userInfo.userTitle}}</div>
        <h1 class="h1tit">我在易车学院</h1>
        <div class="excd-box">已成功击败
          <span class="primary big">{{userStatisticsInfo.beatPercent== null ? 0 : userStatisticsInfo.beatPercent}}%</span>的伙伴星人</div>
        <ul class="cut-lst">
          <li class="flex1">
            <p class="ptop">已
              <span class="big primary">连续</span>
              打卡</p>
            <p class="pbot primary">{{userStatisticsInfo.continueSignDays == null ? 0 : userStatisticsInfo.continueSignDays}}
              <small class="small">天</small>
            </p>
          </li>
          <li class="flex1">
            <p class="ptop">累计学习课程</p>
            <p class="pbot primary">{{userStatisticsInfo.totalStudyCount == null ? 0 : userStatisticsInfo.totalStudyCount}}
              <small class="small">节</small>
            </p>
          </li>
          <li class="flex1">
            <p class="ptop">累计学习时间</p>
            <p class="pbot primary">{{learnedHour}}
              <small class="small primary">{{learnedMinute}}</small>
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div class="count-wrap hide">
      <router-link :to="{name:'signInDetail'}" id="signInDetailLink" class="link">打卡详情</router-link>
      <div class="cut-box"><img class="face" :src="userInfo.userLogo" />
        <h1 class="name">{{userInfo.userName}}</h1>
        <div class="grayer desc">{{userInfo.dealerName}} {{userInfo.userTitle}}</div>
        <div class="text">
          <p>我在易车伙伴里</p>
          <p>发现了一个知识库</p>
          <p class="hr">易车学院</p>
        </div>
        <h1 class="h1tit">我已经加入并开始学习啦！</h1>
      </div>
    </div>
    <div class="bottomFixed btn-fixed" @click="printScreen">
      <a id="toShareWithFriends" class="btn-a" href="javascript:;">分享到朋友圈打卡</a>
    </div>
    <!--margin-top:500px;-->
    <div id="toShareHtml" class="count-wrap share-wrap" :style="backgroundDiv">
      <div class="cut-box"><img class="face" :src="userInfo.userLogo">
        <h1 class="name">{{userInfo.userName}}</h1>
        <div class="grayer desc">{{userInfo.dealerName}} {{userInfo.userTitle}}</div>
        <div class="text">
          <p>我在易车伙伴里</p>
          <p>发现了一个知识库</p>
          <p class="hr">易车学院</p>
        </div>
        <h1 class="h1tit">我已经加入并开始学习啦！</h1>
      </div>
      <div class="cut-bot">
        <div class="hd"><img class="logo" src="@/assets/images/ycxy-logo.png"></div>
          <div class="flex1 yi-tc">知识从未如此有趣</div>
        </div>
      </div>
      <!-- position:fixed;top:9000px; -->
      <div id="toShareHtml1" class="count-wrap share-wrap" :style="backgroundDiv">
        <div class="cut-box"><img class="face" :src="userInfo.userLogo" />
          <h1 class="name">{{userInfo.userName}}</h1>
          <div class="grayer desc">{{userInfo.userTitle}}</div>
          <h1 class="h1tit">我在易车学院</h1>
          <div class="excd-box">已成功击败
            <span class="primary big">{{userStatisticsInfo.beatPercent== null ? 0 : userStatisticsInfo.beatPercent}}%</span>的伙伴星人
          </div>
          <ul class="cut-lst">
            <li class="flex1">
              <p class="ptop">已
                <span class="big primary">连续</span>
                打卡</p>
              <p class="pbot primary">{{userStatisticsInfo.continueSignDays == null ? 0 : userStatisticsInfo.continueSignDays}}
                <small class="small">天</small>
              </p>
            </li>
            <li class="flex1">
              <p class="ptop">累计学习课程</p>
              <p class="pbot primary">{{userStatisticsInfo.totalStudyCount == null ? 0 : userStatisticsInfo.totalStudyCount}}
                <small class="small">节</small>
              </p>
            </li>
            <li class="flex1">
              <p class="ptop">累计学习时间</p>
              <p class="pbot primary">{{learnedHour}}
                <small class="small primary">{{learnedMinute}}</small>
              </p>
            </li>
          </ul>
        </div>
        <div class="cut-bot">
          <div class="hd"><img class="logo" src="@/assets/images/ycxy-logo.png"></div>
            <div class="flex1 yi-tc">知识从未如此有趣</div>
          </div>
        </div>
      </div>
</template>

<script>
import { post } from "@/libs/ajax";
import { learn, signin } from "_api";
import html2canvas from "html2canvas";
import { home, sys } from "_sysConf/config";
import { dateFormat } from "@/libs/common";
import { setCookie, getCookie } from "@/libs/cookie";
import { tip } from "_c/common/dialog";

export default {
  name: "signIn",
  data() {
    return {
      backgroundDiv: {
        position: "fixed",
        top: "6000px",
        background:
          "url(" +
          require("@/assets/images/share-bg__375-2.jpg") +
          ") no-repeat left top !important",
        "background-size": "100% 100% !important"
      },
      userInfo: {
        dealerId: 0,
        dealerName: "",
        userId: 0,
        userLogo: "",
        userName: "",
        userTitle: ""
      },
      userStatisticsInfo: {
        beatPercent: 0,
        continueSignDays: 0,
        lastSignTime: 0,
        studyRank: 0,
        todaySignStatus: 0,
        totalStudyCount: 0,
        totalStudyDuration: 0,
        userId: 0,
        totalSignDays: 0
      },
      learnedHour: 0,
      learnedMinute: 0,
      toShareImageKey: "toShareImage",
      isPushPage: true
    };
  },
  created() {
    this.$nextTick(() => {
      this.getScript("/assets/js/conf/signInCenter.min.js");

      let source = this.$route.params.source;
      if (source == 1) {
        $("#signInDetailLink").hide();
        $("#toShareWithFriends").text("分享到朋友圈");
        this.isPushPage = false;

        $($(".count-wrap")[0]).css("background", "none");
        $($(".count-wrap")[1]).css("background", "none");
      }
    });
  },
  activated() {
    this.init();
    this.postUserInfo();
    this.postUserStatisticsInfo();
  },
  methods: {
    init() {
      // var _this = this;
      // // 上线需要删除
      // let cookieName = home.signCookieName;
      // let date = dateFormat(new Date(), "yyyy-MM-dd");
      // setCookie(cookieName, { uid: userInfo.userId, date, value: 0 }, 1);
    },
    postUserInfo() {
      // post(learn.userinfo, {}).then(value => {
      this.userInfo = this.$store.state.user.userInfo;
      // });
    },
    postUserStatisticsInfo() {
      let _this = this;
      post(learn.userstatisticsinfo, {})
        .then(value => {
          _this.userStatisticsInfo = value;

          let second =
            _this.userStatisticsInfo.totalStudyDuration == null
              ? 0
              : _this.userStatisticsInfo.totalStudyDuration; //秒
          let minute = second > 60 || second == 0 ? parseInt(second / 60) : 1; //总共的分钟   大于60秒，转为分钟，否则算作1分钟
          let remainder_minute = minute > 60 ? minute % 60 : minute; //余数 分   规则同上
          let hour = minute > 60 ? parseInt(minute / 60) : 0; //小时 整数部分   规则同上，否则算0小时

          _this.learnedHour = hour;
          _this.learnedMinute = remainder_minute;

          if (_this.learnedHour == 0) {
            _this.learnedHour = _this.learnedMinute;
            _this.learnedMinute = "分钟";
          } else {
            _this.learnedMinute = "小时" + _this.learnedMinute + "分";
          }

          // if (
          //   _this.userStatisticsInfo == null ||
          //   _this.userStatisticsInfo.totalSignDays == null ||
          //   _this.userStatisticsInfo.totalSignDays == 0
          // ) {
          //   $($(".count-wrap")[1]).show();
          // } else {
          //   $($(".count-wrap")[0]).show();
          // }

          if (
            _this.userStatisticsInfo != null &&
            ((_this.userStatisticsInfo.totalSignDays != null &&
              _this.userStatisticsInfo.totalSignDays > 0) ||
              (_this.userStatisticsInfo.totalStudyCount != null &&
                _this.userStatisticsInfo.totalStudyCount > 0) ||
              (_this.userStatisticsInfo.totalStudyDuration != null &&
                _this.userStatisticsInfo.totalStudyDuration > 0))
          ) {
            $($(".count-wrap")[0]).show();
          } else {
            $($(".count-wrap")[1]).show();
          }
        })
        .catch(msg => {
          $(".count-wrap:eq(1)").show();
        });
    },
    postSignIn() {
      let _this = this;
      if (_this.isPushPage) {
        post(signin.signin, {})
          .then(value => {
            let cookieName = home.signCookieName;
            let date = dateFormat(new Date(), "yyyy-MM-dd");
            let _userId = _this.userInfo.userId;
            setCookie(cookieName, { uid: _userId, date, value: 1 }, 1);

            _this.$router.push({ name: "home", params: {} });
          })
          .catch(message => {
            _this.$router.push({ name: "home", params: {} });
          });
      }
    },
    //生成截图
    printScreen() {
      // $("#toShareHtml").show();
      let toShareHtmlSelectorName = "#toShareHtml";

      if (
        this.userStatisticsInfo != null &&
        ((this.userStatisticsInfo.totalSignDays != null &&
          this.userStatisticsInfo.totalSignDays > 0) ||
          (this.userStatisticsInfo.totalStudyCount != null &&
            this.userStatisticsInfo.totalStudyCount > 0) ||
          (this.userStatisticsInfo.totalStudyDuration != null &&
            this.userStatisticsInfo.totalStudyDuration > 0))
      ) {
        toShareHtmlSelectorName = "#toShareHtml1";
      }

      var canvas2 = document.createElement("canvas");
      let _canvas = document.querySelector(toShareHtmlSelectorName);

      var w = parseInt(window.getComputedStyle(_canvas).width);
      var h = parseInt(window.getComputedStyle(_canvas).height);

      // 将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
      canvas2.width = w * 2;
      canvas2.height = h * 2;
      canvas2.style.width = w + "px";
      canvas2.style.height = h + "px";

      var _oldImageUrl = sessionStorage.getItem(this.toShareImageKey);

      if (_oldImageUrl != "" && _oldImageUrl != null) {
        this.toShareImage(_oldImageUrl);

        return;
      }

      let canavasScale = 2;
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isiOS) {
        // tip.show("IOS");
        canavasScale = 0.6;
      }
      if (isAndroid) {
        // tip.show("Android");
        canavasScale = 2;
      }

      html2canvas(document.querySelector(toShareHtmlSelectorName), {
        canvas: canvas2,
        useCORS: true,
        scale: canavasScale
      }).then(canvas => {
        var imageUrl = canvas.toDataURL("image/png", 0.01);
        sessionStorage.setItem(this.toShareImageKey, imageUrl);
        // console.log(imageUrl);
        // $("#toShareHtml").hide();

        this.toShareImage(imageUrl);
      });
    },
    // 分享到微信
    toShareImage(url) {
      var _this = this;
      yiframesjsbridge.call(
        "/tool/layer",
        {
          typeId: "shareLayer",
          data: {
            //object
            isMiniApp: "0", //是否小程序分享。1=>是，0=>不是
            miniAppUrl: "", //小程序页面路径
            miniAppNewI: "", //小程序高清大图
            miniAppOldI: "", //小程序旧版节点图片
            shareid: "13",
            miniID: "",
            ShareSourceType: "7",
            sharetype: "img",
            title: "易车学院打卡", //string
            shareDesc: "易车学院打卡", //string
            shareImageUrl: url, //string
            shareUrl: window.location.href, //string
            platform: ["WechatMoments"] //array          "WeiBo", "QQ", "QZone", "Wechat",
          }
        },
        function(result) {
          let jsonResult = JSON.parse(result);

          if (jsonResult.data.value == 3000) {
            //访问接口，新增打卡记录，并返回首页
            _this.postSignIn();
          } else if (jsonResult.data.value == 3001) {
            // tip.show("分享取消");
          } else {
            // tip.show("分享失败");
          }
        }
      );
    }
  }
};
</script>


<style scoped>
@import "~@/assets/css/modules/signInCenter.min.css";

.count-wrap {
  min-height: 100vh;
  background: url(~@/assets/images/share-bg__375-2.jpg) no-repeat left top;
  background-size: 100% 100%;
}

.share-wrap {
  padding-top: 1.2rem;
  padding-bottom: 0.8rem;
  min-height: inherit;
}
</style>