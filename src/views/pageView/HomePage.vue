<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card shadow="always">
          <div class="touImage">
            <img :src="require('/src/assets/common/head.jpg')" alt="" />
            <div>
              <p>早安，管理员，祝你开心每一天！</p>
              <p>管理员|传智播客-总裁办</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="content" :gutter="24">
      <el-col :span="13">
        <el-card shadow="always">
          <div class="dateTitlle">工作日历</div>
          <el-calendar v-model="date"> </el-calendar>
        </el-card>
        <el-card class="noticeBox" shadow="always">
          <div class="notice">公告</div>
          <div class="noticeList">
            <div>
              <img :src="require('/src/assets/common/img.jpeg')" alt="" />
              <p><span>朱继柳</span>发布了第一期"传智大讲堂"互动讨论获奖名单公布</p>
              <p>2018-07-21 15:21:38</p>
            </div>
            <div>
              <img :src="require('/src/assets/common/img.jpeg')" alt="" />
              <p><span>朱继柳</span>发布了第一期"传智大讲堂"互动讨论获奖名单公布</p>
              <p>2018-07-21 15:21:38</p>
            </div>
            <div>
              <img :src="require('/src/assets/common/img.jpeg')" alt="" />
              <p><span>朱继柳</span>发布了第一期"传智大讲堂"互动讨论获奖名单公布</p>
              <p>2018-07-21 15:21:38</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="11">
        <el-card class="oneBox" shadow="always">
          <div class="resTitle">流程申请</div>
          <div class="resBtn">
            <el-button>加班离职</el-button>
            <el-button>请假调休</el-button>
            <el-button>审批列表</el-button>
            <el-button>我的信息</el-button>
          </div>
        </el-card>
        <el-card class="oneBox" shadow="always">
          <div class="resTitle">快速开始/便捷导航</div>
          <div class="resBtn">
            <el-button>人事月报</el-button>
            <el-button>考勤查询</el-button>
            <el-button>考勤统计</el-button>
            <el-button>员工审核</el-button>
            <el-button>组织架构</el-button>
          </div>
        </el-card>
        <el-card class="oneBox" shadow="always">
          <div class="resTitle">帮助链接</div>
          <img :src="require('/src/assets/common/icon.png')" alt="" />
          <ul class="helpTitle">
            <li>入门指南</li>
            <li>在线帮助手册</li>
            <li>联系技术支持</li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date()
    }
  },
  methods: {},
  created() {},
  mounted() {},
  components: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
// 头部盒子
.touImage {
  display: flex;
  align-items: center;
  line-height: 40px;
  font-size: 26px;
  div {
    padding-left: 10px;
  }
}
// 页面内容
.content {
  margin-top: 20px;
  .dateTitlle {
    padding: 0 0 10px 20px;
    font-size: 30px;
    border-bottom: 1px solid #ebeef5;
  }
  .resTitle {
    display: inline;
    padding-bottom: 10px;
    font-size: 30px;
    border-bottom: 3px solid #8a97f8;
  }
  .resBtn {
    margin-top: 30px;
    .el-button {
      width: 135px;
      height: 50px;
      margin: 10px 10px 0 0;
    }
  }
  .oneBox {
    padding: 0 40px 30px;
    margin-bottom: 20px;
    img {
      display: block;
      margin: auto;
      margin-top: 30px;
      width: 90%;
    }
    .helpTitle {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
  }
  // 公告盒子
  .noticeBox {
    margin-top: 20px;
    padding: 10px 0 100px;
    .notice {
      font-weight: 700;
      padding: 0 0 20px 30px;
      border-bottom: 1px solid #ebeef5;
    }
    .noticeList {
      padding: 0 20px;
      div {
        height: 100px;
        padding-top: 12px;
        border-bottom: 1px solid #ebeef5;
        img {
          float: left;
          width: 80px;
          height: 80px;
        }
        p {
          line-height: 28px;
          span {
            color: #8a97f8;
            padding-right: 8px;
          }
        }
      }
    }
  }
}
// 日期表格
::v-deep .el-calendar-table {
  th {
    font-weight: 700;
    &:nth-child(n + 6) {
      color: #ff4500;
    }
  }

  .el-calendar-day {
    height: 45px;
    text-align: center;
    line-height: 45px;
  }
  .is-selected {
    background-color: #fff;
    span {
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 100%;
      background-color: #409eff;
      color: #fff;
    }
  }
  td,
  tr td:first-child,
  tr:first-child td {
    border: none;
  }
  td:nth-child(n + 6) {
    position: relative;
    &::before {
      position: absolute;
      content: "休";
      font-size: 12px;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 100%;
      background-color: #fa7c4d;
      color: #fff;
      z-index: 99;
      right: 15px;
      top: 12px;
    }
  }
}
::v-deep .el-calendar__header {
  border: none;
}
</style>
