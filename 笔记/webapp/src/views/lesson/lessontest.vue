<template>
  <div v-bind:class="{'bodyImg':!isBuy&&!isLoaded}">
    <div class="video-box topFixed">
      <img class="vid" :src="lessonDetail.lesson.coverHUrl" :class="{'hide':isLoaded}" />
      <div class="vid-msg" :style="{'display':isHaveLastInfo?'block':'none'}">
        <div class="msg-txt">
          <p>上次学习到：
            <template v-if="!isBuy && video.video.isTry===1">[试听]</template>{{video.video.videoNum>9?video.video.videoNum:"0"+video.video.videoNum}}课时 {{video.video.videoName}}</p>
        </div>
        <a class="msg-btn" href="javascript:;" @click="playVideo">继续播放</a>
      </div>
      <video id="lessonvideo" ref="lessonvideo" controls="controls" controlsList="nodownload" class="vid">
        <source :src="video.video.videoUrl" type="video/mp4">
      </video>
        <a class="vid-btn" href="javascript:;" v-if="isBuy" @click="playVideo" :style="{'display':isLoaded||isHaveLastInfo?'none':''}"></a>
        <div class="vid-txt" :class="{'hide':isLoaded||isHaveLastInfo}">
          <p>
            <template v-if="!isBuy && video.video.isTry===1">[试听]</template>{{video.video.videoNum>9?video.video.videoNum:"0"+video.video.videoNum}}课时</p>
          <p>{{video.video.videoName}}</p>
        </div>
    </div>
    <div class="tabsBox crse-dtl-tab">
      <div class="topFixed tab-nav">
        <div class="nav-ul">
          <li class="tab-tit" v-bind:class="{active:isBuy}">课程介绍</li>
          <li class="tab-tit" v-bind:class="{active:!isBuy}">课程内容</li>
          <li class="tab-tit" ref="liComment">评论
            <span class="num">({{commentList.total}})</span>
          </li>
        </div>
      </div>
      <div class="tab-panel">
        <div class="panel-item" v-bind:class="{'hide':!isBuy}">
          <div class="crse-intro">
            <h3 class="crse-h3tit">{{lessonDetail.lesson.lessonName}}</h3>
            <div class="grayer txtbox">
              <p>{{~~lessonDetail.lesson.videoCount?lessonDetail.lesson.videoCount:0}}节课 | {{~~lessonDetail.lesson.favoriteUserNum?lessonDetail.lesson.favoriteUserNum:0}}人已收藏</p>
              <p>{{lessonDetail.lesson.recommendedReason}}</p>
            </div>
            <div class="ycbbox">
              <price-info :lessonPrice="lessonDetail.lesson.lessonPrice" :lessonCost="lessonDetail.lesson.lessonCost" :isShowSale="true"></price-info>
            </div>
          </div>
          <div class="crse-intro">
            <h3 class="crse-h3tit" @click="goTest">课程介绍</h3>
            <div class="txtbox">
              <p v-html="lessonDetail.lesson.lessonDescription"></p>
            </div>
            <h3 class="crse-h3tit">讲师介绍</h3>
            <div class="txtbox">
              <p>{{lessonDetail.lecturer.lecturerDes}}</p>
            </div>
            <template v-if="lessonDetail.lesson.suitable">
              <h3 class="crse-h3tit">适用人群</h3>
              <div class="txtbox">
                <p>{{lessonDetail.lesson.suitable}}</p>
              </div>
            </template>
            <template v-if="lessonDetail.lesson.lessonType">
              <h3 class="crse-h3tit">购买须知</h3>
              <div class="txtbox">
                <p v-if="lessonDetail.lesson.lessonType==1">此课程购买后永久有效，不限播放次数。</p>
                <p v-if="lessonDetail.lesson.lessonType==2">此课程自购买之日起有效期为1年，有效期内不限播放次数，课程到期后将无法播放。</p>
              </div>
            </template>
          </div>
        </div>
        <div class="panel-item crse-content" v-bind:class="{'hide':isBuy}">
          <h3 class="crse-h3tit">课程内容</h3>
          <template v-for="item in videoList">
            <div class="yi-flex cont-item" @click="changeVideo(item.video)" v-bind:class="{'active':item.video.videoId==vid && isLoaded,'cont-lock':!isBuy && !(item.video.isTry===1),'icon':!isBuy && !(item.video.isTry===1)}" :key="item.video.videoId">
              <div class="hd">
                <h3 class="h3tit">{{item.video.videoNum}}</h3>
              </div>
              <div class="flex1">
                <h3 class="h3tit">{{item.video.videoName}}</h3>
                <p class="time">
                  <span class="grayer">时长：{{durationFormat(item.video.videoDuration)}}</span>
                  <template v-if="item.userVideoStatistics">
                    <span v-if="item.userVideoStatistics.studyStatus === 1">播放完成</span>
                    <span v-else-if="item.userVideoStatistics.studyStatus === 2">已学习{{item.userVideoStatistics.palyPercent}}%</span>
                    <span v-else>未播放</span>
                  </template>
                </p>
              </div>
              <div class="primary state">{{!isBuy && item.video.isTry===1 ? "可试听":""}}</div>
            </div>
          </template>
        </div>
        <div class="panel-item yi-comment hide" ref="commentArea">
          <div class="cmt-tit">评论 {{commentList.total}}</div>
          <template v-if="hotCommentList.comments.length > 0">
            <div class="cmt-small-tit ">热门评论</div>
            <div class="cmt-list ">
              <div class="cmt-item " v-for="item in hotCommentList.comments " :key="item.comment.commentId ">
                <div class="yi-flex cmt-hd center "><img class="face " :src="item.userInfo.userLogo " />
                  <div class="flex1 ">
                    <p class="name ">{{item.userInfo.userName}}</p>
                    <p class="info ">{{item.userInfo.userTitle}}</p>
                  </div>
                </div>
                <div class="cmt-bd">
                  <p>{{item.comment.content}}</p>
                </div>
                <div class="cmt-ft ">
                  <span class="icon cmt-like " v-if="item.comment.thumNum> 0" v-bind:class="{'active':thumupList.indexOf(item.comment.commentId) >= 0}" @click="thumbsup(item.comment.commentId)">{{formatNum(item.comment.thumNum)}}</span>
                  <span class="icon cmt-like" v-else @click="thumbsup(item.comment.commentId)">赞</span>
                  <span class="grayer">{{commentTimeFormat(item.comment.createTime)}}</span>
                </div>
              </div>
            </div>
          </template>
          <div class="cmt-small-tit" id="titTop" v-if="commentList.total>0">全部评论</div>
          <div class="cmt-list">
            <div class="cmt-item" v-if="commentList.total<=0">
              暂无评论
            </div>
            <div class="cmt-item" v-else v-for="item in commentList.comments" :key="item.comment.commentId">
              <div class="yi-flex cmt-hd center"><img class="face" :src="item.userInfo.userLogo" />
                <div class="flex1">
                  <p class="name">{{item.userInfo.userName}}</p>
                  <p class="info">{{item.userInfo.userTitle}}</p>
                </div>
              </div>
              <div class="cmt-bd">
                <p>{{item.comment.content}}</p>
              </div>
              <div class="cmt-ft">
                <span class="icon cmt-like" v-if="item.comment.thumNum > 0" v-bind:class="{'active':thumupList.indexOf(item.comment.commentId) >= 0}" @click="thumbsup(item.comment.commentId)">{{formatNum(item.comment.thumNum)}}</span>
                <span class="icon cmt-like" v-else @click="thumbsup(item.comment.commentId)">赞</span>
                <span class="grayer">{{commentTimeFormat(item.comment.createTime)}}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="bottomFixed operation">
      <div class="icon ops-coll active" v-if="isFav" v-on:click="favorite(2)">已收藏</div>
      <div class="icon ops-coll" v-else v-on:click="favorite(1)">收藏</div>
      <div class="flex1 cmt-btn" :style="{'display':!isBuy?'none':'block'}" v-bind:class="{'hide':!isBuy}">我来说两句…</div>
      <a class="yi-btn bg-primary round flex1 ops-btn" href="javascript:;" v-if="!isBuy" @click="lessonBuy">
        <template v-if="lessonDetail.lesson.lessonPrice>0">马上兑换</template>
        <template v-else>免费学习</template>
      </a>
    </div>

    <div class="bottomFixed cmt-mask"></div>
    <div class="bottomFixed cmt-txta">
      <div class="txta-hd">
        <a class="yi-fr release" href="javascript:;" @click="addComment">发布</a>
        <span class="cancel">取消</span>
      </div>
      <div class="txta-bd">
        <textarea class="txta" id="txtaId" rows="8" cols="45" placeholder="我来说两句" maxlength="500" v-model="comment_content"></textarea>
        <div class="grayer txta-num">
          <span class="cur">0</span>/500</div>
      </div>
    </div>

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

// import func from "./vue-temp/vue-editor-bridge";

export default {
  name: "lessontesttest",
  data() {
    return {
      id: 0,
      queryvid: 0,
      vid: 0,
      lessonDetail: { lecturer: {}, lesson: {}, userStatistics: {} },
      videoList: [],
      video: { video: {}, userVideoStatistics: {} },
      isFav: true,
      hotCommentList: { comments: [], pageIndex: 1, pageSize: 5, total: 0 },
      commentList: { comments: [], pageIndex: 1, pageSize: 5, total: 0 },
      thumupList: [],
      isBuy: false,
      allCommentId: [],
      beginPlay: false,
      isLoaded: false,
      comment_content: "",
      //lessonVideo: document.getElementById("lessonvideo"),
      lessonVideo: null,
      guid: 0,
      storagePre: commentConf.videoStoragePre,
      lastHandleTime: new Date(),
      // 初始化时，是否上次观看过
      isHaveLastInfo: false,
      pageIndex: 0 //  评论的页码
    };
  },
  components: {
    priceInfo
  },
  created() {
    this.$nextTick(() => {
      this.getScript("/assets/js/conf/courseDetails.min.js");

      this.initVideoCallback();

      this.loadCommentPageSize();
    });
  },
  // mounted() {
  //   if (window.history && window.history.pushState) {
  //     //history.pushState(null, null, document.URL);
  //     window.addEventListener("popstate", this.goBack, false);
  //   }
  // },
  // destroyed() {
  //   window.removeEventListener("popstate", this.goBack, false);
  // },
  deactivated() {
    //window.removeEventListener("popstate", this.goBack, false);
    this.goBack();
  },
  activated() {
    Object.assign(this.$data, this.$options.data());
    this.lessonVideo = this.$refs.lessonvideo;
    this.$refs.liComment.className = this.$refs.liComment.className.replace(
      /active/,
      ""
    );
    this.id = this.$route.query.id || 0;
    this.queryvid = this.$route.query.vid || 0;

    // if (window.history && window.history.pushState) {
    //   //history.pushState(null, null, document.URL);
    //   window.addEventListener("popstate", this.goBack, false);
    // }

    if (this.id <= 0) {
      this.$router.push({ path: "/" });
    }

    this.initLessonInfo();
    this.initVideoList();
    // if (this.vid > 0) {
    //   this.initCurVideo();
    // }
    this.isfavorite();

    this.initCommentList(1, 1, commentConf.hotCommentCount);
    //this.initCommentList(0, this.pageIndex, commentConf.commentPageSize);

    // 清空无用的localStorage
    // 目前每2分钟定时上传，跳转和后退时都会主动上传进度信息
    // 如果仍然存在没有上传的信息，就是直接关闭APP造成的，这些遗留信息无法鉴别是否有效，因此下次进入页面时直接删除掉
    // 风险：非正常退出用户，会损失最长2分钟的观看信息
    this.clearBadStorage();
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    }
  },
  methods: {
    durationFormat,
    commentTimeFormat,
    formatNum,
    clearBadStorage() {
      if (localStorage.length > 0) {
        for (var localKey in localStorage) {
          if (localKey.startsWith(this.storagePre)) {
            removeItem(localKey);
          }
        }
      }
    },
    limitHandle() {
      if (new Date() - this.lastHandleTime < 600) {
        alert.show("操作太频繁了~~");
        return false;
      }
      this.lastHandleTime = new Date();
      return true;
    },
    goBack() {
      window.alert("goback");
      // 后退之前，上传一次本地记录
      this.upStudyInfo(this.vid, true);
    },
    goTest() {
      // this.$router.push({ name: "lessonTest" });
    },
    lessonBuy() {
      this.$router.push({ name: "lessonExchange", params: { id: this.id } });
    },
    // 初始化课程基本信息
    initLessonInfo() {
      post(lesson.detail, { lessonId: this.id })
        .then(value => {
          this.lessonDetail = value;

          this.isBuy = this.lessonDetail.userStatistics.isBuy === 1;

          this.initOrgVideo();
        })
        .catch(des => {
          window.alert(des);
        });
    },

    // 初始化首次加载视频信息
    initOrgVideo() {
      if (this.queryvid > 0) {
        this.vid = this.queryvid;
        this.getVideoById(this.vid);
      } else {
        if (this.isBuy) {
          if (
            this.lessonDetail.userStatistics &&
            this.lessonDetail.userStatistics.lastStudyVideoId
          ) {
            this.vid = this.lessonDetail.userStatistics.lastStudyVideoId;
            this.getVideoById(this.vid);
          } else {
            this.getFirstVideo();
          }
        } else {
          this.getFirstVideo();
        }
      }
    },
    // 获取指定ID的视频
    getVideoById(vid) {
      if (this.videoList && this.videoList.length > 0) {
        for (var i = 0; i < this.videoList.length; i++) {
          if (this.videoList[i].video.videoId == vid) {
            this.video = this.videoList[i];
            this.isHaveLastInfo = true;
            break;
          }
        }
      }
    },
    // 获取第一个视频
    getFirstVideo() {
      if (this.videoList && this.videoList.length > 0) {
        this.video = this.videoList[0];
        this.vid = this.video.video.videoId;
      }
    },
    // 初始化回调
    initVideoCallback() {
      let _this = this;

      this.lessonVideo.onerror = function() {
        window.alert("video error");
      };

      this.lessonVideo.onended = function() {
        _this.beginPlay = false;
        // 播放下一个视频
        _this.playNext();
      };
      this.lessonVideo.onpause = function() {
        _this.beginPlay = false;
      };

      this.lessonVideo.onplay = function() {
        _this.beginPlay = true;
      };

      this.lessonVideo.onloadedmetadata = function() {
        window.alert("loaded data");
      };
      this.lessonVideo.onloadeddata = function() {
        window.alert("loaded");
        _this.isLoaded = true;
        _this.isHaveLastInfo = false;
        // 生成guid
        _this.guid = newGuid();

        // 设置进度
        if (
          _this.video.userVideoStatistics &&
          _this.video.userVideoStatistics.videoLastProgress > 0
        ) {
          // if (
          //   _this.video.userVideoStatistics.videoLastProgress >=
          //   _this.video.userVideoStatistics.videoDuration - 2
          // ) {
          //   //  已经看完的，从头开始
          //   _this.lessonVideo.currentTime = 0;
          // } else {
          _this.lessonVideo.currentTime =
            _this.video.userVideoStatistics.videoLastProgress;
          // }
        } else {
          _this.lessonVideo.currentTime = 0;
        }
        _this.lessonVideo.play();
      };

      this.lessonVideo.ontimeupdate = function() {
        let curTime = parseInt(_this.lessonVideo.currentTime);
        console.log(curTime);
        let lastInfo = getItemObj(_this.storagePre + _this.vid);

        if (lastInfo) {
          let _progress = curTime - lastInfo.videoPlayProgress;
          // 如果进度是前进的，并且这个前进在2S内认为是正常播放，计算进停留时长
          // 同样暂停时，不会有进度触发，不算时间停留；如果拖动，后退从下一次再加进度；前进超出2S，也从下一次再加进度
          // 误差：手动拖动前进并且拖动的进度小于2S
          if (_progress > 0 && _progress < 2) {
            lastInfo.stayDuration += _progress;
          }

          lastInfo.videoPlayProgress = curTime;
          if (curTime > lastInfo.videoMaxProgress) {
            lastInfo.videoMaxProgress = curTime;
          }
          lastInfo.lastPlayTime = moment().format("YYYY-MM-DD HH:mm:ss");
          lastInfo.isSync = 0;
        } else {
          let _now = moment().format("YYYY-MM-DD HH:mm:ss");
          lastInfo = {
            lessonId: _this.id,
            videoId: _this.vid,
            stayDuration: curTime,
            videoMaxProgress: curTime,
            videoPlayGuid: _this.guid,
            videoPlayProgress: curTime,
            // 开始时间
            beginTime: _now,
            // 上次播放时间
            lastPlayTime: _now,
            // 上次同步时间
            lastSyncTime: _now,
            isSync: 1
          };
        }
        setItemObj(_this.storagePre + _this.vid, lastInfo);
      };

      setTimeout(this.timeoutFunc, 1000 * 60 * 2);
    },
    timeoutFunc() {
      if (this.isLoaded) {
        this.upStudyInfo(this.vid, false);
      }
      setTimeout(this.timeoutFunc, 1000 * 60 * 2);
    },
    // 初始化视频播放
    initCurVideo() {
      if (this.vid > 0) {
        post(lesson.video, { lessonId: this.id, videoId: this.vid })
          .then(value => {
            this.video = value;
            var _this = this;
            // 为了解决IOS里首次点击不播放的问题，延迟50ms load
            setTimeout(function() {
              _this.lessonVideo.load();
              window.alert("load video");
            }, 50);
          })
          .catch(des => {
            window.alert(des);
          });
      }
    },
    // 播放下一个视频
    playNext() {
      let isFind = false;
      if (this.videoList && this.videoList.length > 0) {
        for (var i = 0; i < this.videoList.length - 1; i++) {
          // 找到当前视频，并且不是最后一个视频时，找出下一个视频
          if (this.videoList[i].video.videoId == this.vid) {
            let thisvideo = this.videoList[i + 1].video;

            if (!this.isBuy && thisvideo.isTry !== 1) {
              return;
            }

            this.playVideoItem(thisvideo);
            isFind = true;
            break;
          }
        }
      }
      if (!isFind) {
        //  进行一次数据的上传
        this.upStudyInfo(this.vid, true);
      }
    },
    //切换视频
    changeVideo(video) {
      if (!this.isBuy && video.isTry !== 1) {
        alert.show("兑换后即可学习哦~~", () => {});
        return;
      }
      // 如果点击当前视频
      if (this.vid == video.videoId) {
        // 如果是第一次，就开始播放
        if (!this.video.video.videoUrl) {
          this.playVideo();
        }
        return;
      }
      if (!this.limitHandle()) {
        return;
      }

      this.playVideoItem(video);
    },
    playVideoItem(video) {
      // 先暂停当前视频
      this.lessonVideo.pause();
      this.isLoaded = false;
      //  进行一次数据的上传
      this.upStudyInfo(this.vid, true);

      this.vid = video.videoId;

      this.playVideo();
    },
    // 播放视频
    playVideo() {
      window.alert("play");

      if (!this.isLoaded) {
        this.initCurVideo();
      } else {
        this.lessonVideo.play();
      }
    },
    upStudyInfo(vid, isDel) {
      var _vid = vid;
      var info = getItemObj(this.storagePre + _vid);

      // 如果不存在本地存储或者如果上次同步之后，没有进度，直接返回
      if (!info || info.isSync) {
        return;
      }

      post(lesson.upstudyinfo, info)
        .then(value => {
          //上传成功
          if (isDel) {
            removeItem(this.storagePre + _vid);
          } else {
            //修改最近上传时间
            info = getItemObj(this.storagePre + _vid);
            info.lastSyncTime = moment().format("YYYY-MM-DD HH:mm:ss");
            info.isSync = 1;
            setItemObj(this.storagePre + _vid, info);
          }
        })
        .catch(des => {
          window.alert(des);
        });
    },
    // 初始化是否收藏
    isfavorite() {
      post(learn.isfavorite, { lessonId: this.id })
        .then(value => {
          this.isFav = value === 1;
        })
        .catch(des => {
          window.alert(des);
        });
    },
    // 收藏操作
    favorite(isfav) {
      if (!this.limitHandle()) {
        return;
      }
      this.isFav = isfav === 1;
      post(learn.favorite, { lessonId: this.id, isFavorite: isfav })
        .then(value => {})
        .catch(des => {
          // todo
          window.alert("操作失败，请稍后重试");
          this.showAlert();
          this.isFav = !this.isFav;
        });
    },
    // 视频列表
    initVideoList() {
      post(lesson.videolist, { lessonId: this.id })
        .then(value => {
          this.videoList = value;

          this.initOrgVideo();
        })
        .catch(des => {
          window.alert(des);
        });
    },
    // 初始化视频详情
    initVideoDetail() {
      post(learn.video, { lessonId: this.id, videoId: this.vid })
        .then(value => {
          this.video = value;
        })
        .catch(des => {
          window.alert(des);
        });
    },
    // 初始化点赞列表
    initThumupList(ids) {
      post(comment.thumuplist, { lessonId: this.id, commentIds: ids })
        .then(value => {
          this.thumupList = this.thumupList.concat(value);
        })
        .catch(des => {
          window.alert(des);
        });
    },
    changeStyleDisplay(className, disValue) {
      if (document.getElementsByClassName(className).length > 0) {
        document.getElementsByClassName(className)[0].style.display = disValue;
      }
    },
    // 初始化评论上拉加载
    loadCommentPageSize() {
      let _this = this;
      dropload(this.$refs.commentArea, {
        scrollArea: window, //滚动区域
        isLockDown: true,
        autoLoad: true,
        loadDownFn: function(me) {
          //传入上拉需要执行函数
          _this.pageIndex++;

          if (
            _this.commentList.total <= _this.commentList.comments.length &&
            _this.pageIndex > 1
          ) {
            me.lock();
            me.noData();
            _this.changeStyleDisplay("dropload-down", "none");
            _this.changeStyleDisplay("dtl-card", "block");

            // $(".dtl-card").show();
            // $(".dropload-down").hide();
            return;
          } else {
            _this.initCommentList(
              0,
              _this.pageIndex,
              commentConf.commentPageSize,
              len => {
                if (len > 0) {
                  setTimeout(function() {
                    me.resetload(); // 保留
                  }, 1000);
                } else {
                  me.lock(); // 保留
                  me.noData(); // 保留
                  _this.changeStyleDisplay("dropload-down", "none");
                  _this.changeStyleDisplay("dtl-card", "block");
                }
              }
            );
          }
        }
      }).catch(err => {
        window.alert(err);
      });
    },
    // 初始化评论
    initCommentList(isHot, pageIndex, pageSize, func) {
      post(comment.list, {
        lessonId: this.id,
        isHot: isHot,
        pageIndex: pageIndex,
        pageSize: pageSize
      })
        .then(value => {
          if (!value || !value.total) {
            if (func) {
              func(0);
            }
            return;
          }
          if (isHot) {
            this.hotCommentList = value;
          } else {
            if (
              this.commentList &&
              this.commentList.comments &&
              this.commentList.comments.length > 0
            ) {
              this.commentList.comments = this.commentList.comments.concat(
                value.comments
              );
              this.commentList.pageIndex = value.pageIndex;
              this.commentList.pageSize = value.pageSize;
              this.commentList.total = value.total;
            } else {
              this.commentList = value;
            }

            if (func) {
              func(value.comments.length);
            }
          }
          // 获取是否点赞列表
          if (value.comments && value.comments.length > 0) {
            let curIds = [];
            for (let pindex = 0; pindex < value.comments.length; pindex++) {
              let p = value.comments[pindex];
              if (this.allCommentId.indexOf(p.comment.commentId) < 0) {
                curIds.push(p.comment.commentId);
                this.allCommentId.push(p.comment.commentId);
              }
            }
            if (curIds.length > 0) {
              this.initThumupList(curIds);
            }
          }
        })
        .catch(des => {
          window.alert(des);
        });
    },
    // 评论操作
    addComment() {
      // 初步验证
      if (
        this.comment_content.trim() == "" ||
        this.comment_content.length > 500
      ) {
        // todo 错误提示
        window.alert("null " + this.comment_content);
        return;
      }
      if (!this.limitHandle()) {
        return;
      }

      post(comment.add, { lessonId: this.id, comment: this.comment_content })
        .then(value => {
          let curComment = {};
          curComment.userInfo = this.userInfo;
          // curComment.userInfo = {
          //   dealerId: 53224678,
          //   dealerName: "易车互联",
          //   userId: 156405,
          //   userLogo:
          //     "https://epbf.bitautoimg.com/16/20171212/8f09c11d-8c6a-4e49-b5f7-5e14f12bf90b.jpeg",
          //   userName: "明日之星",
          //   userTitle: "销售顾问"
          // };

          curComment.comment = {
            commentId: value,
            content: this.comment_content,
            createTime: new Date().getTime(),
            lessonId: this.id,
            thumNum: 0
          };

          if (
            this.commentList &&
            this.commentList.comments &&
            this.commentList.comments.length > 0
          ) {
            this.commentList.comments.unshift(curComment);
            this.commentList.total += 1;
          } else {
            this.commentList.comments = [];
            this.commentList.comments.unshift(curComment);
            this.commentList.pageIndex = 1;
            this.commentList.pageSize = commentConf.commentPageSize;
            this.commentList.total = 1;
          }

          this.comment_content = "";
          window.release();
        })
        .catch(des => {
          // 提示失败
          this.showAlert();
          window.alert(des);
        });
    },
    // 点赞操作
    thumbsup(id) {
      // 添加频率限制 todo
      if (!this.limitHandle()) {
        return;
      }
      // 如果小于0，就是点赞的操作
      let isUp = this.thumupList.indexOf(id) < 0;
      !isUp ? this.thumupList.remove(id) : this.thumupList.push(id);

      post(comment.thumbsup, {
        lessonId: this.id,
        commentId: id,
        isThumup: isUp ? 1 : 2
      })
        .then(value => {
          // 成功
          if (isUp) {
            this.addCommentThumup(this.hotCommentList.comments, id, 1);
            this.addCommentThumup(this.commentList.comments, id, 1);
          } else {
            this.addCommentThumup(this.hotCommentList.comments, id, -1);
            this.addCommentThumup(this.commentList.comments, id, -1);
          }
        })
        .catch(des => {
          window.alert(des);
          // todo 失败提示
          //this.showAlert();
          //   数据再补回来
          isUp ? this.thumupList.remove(id) : this.thumupList.push(id);
        });
    },
    addCommentThumup(listComment, commentId, step) {
      for (var i = 0; i < listComment.length; i++) {
        if (listComment[i].comment.commentId == commentId) {
          listComment[i].comment.thumNum += step;
          break;
        }
      }
    },
    showAlert() {
      alert.show("异常，请稍后重试~~", () => {});
    }
  }
};
</script>

<style scoped>
@import "~@/assets/css/modules/course.min.css";
</style>