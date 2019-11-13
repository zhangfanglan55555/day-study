<template>
    <div>
    </div>
</template>
      

<script>
import { post } from "@/libs/ajax";
import { lesson, comment, learn } from "_api";
import priceInfo from "_c/coursePriceInfo";
import {
  durationFormat,
  commentTimeFormat,
  newGuid,
  formatNum
} from "@/libs/common";
import { setItemObj, getItemObj, removeItem } from "@/libs/storage";
import { alert } from "_c/common/dialog";
import { comment as commentConf } from "_sysConf/config";
import moment from "moment";
import { dropload } from "@/libs/dropload";

export default {
  name: "lessontest",
  data() {
    return {};
  },
  components: {},
  created() {
    this.$nextTick(() => {});
  },

  deactivated() {},
  activated() {
    this.commentTimeFormat("2018/09/26 11:07:21");
  },
  computed: {
    userInfo() {
      // return this.$store.state.user.userInfo;
    }
  },
  methods: {
    commentTimeFormat(time) {
      var now = new Date().getTime(),
        oldTime = new Date(time).getTime(),
        difference = now - oldTime,
        result = "",
        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        halfamonth = day * 15,
        month = day * 30,
        year = month * 12,
        _year = difference / year,
        _month = difference / month,
        _week = difference / (7 * day),
        _day = difference / day,
        _hour = difference / hour,
        _min = difference / minute;

        window.alert(now);
        window.alert(oldTime);window.alert(difference);
      if (_year >= 1) {
        result = ~~_year + " 年前";
      } else if (_month >= 1) {
        result = ~~_month + " 个月前";
      } else if (_week >= 1) {
        result = ~~_week + " 周前";
      } else if (_day >= 1) {
        result = ~~_day + " 天前";
      } else if (_hour >= 1) {
        result = ~~_hour + " 个小时前";
      } else if (_min >= 1) {
        result = ~~_min + " 分钟前";
      } else result = "刚刚";
      return result;
    }
  }
};
</script>