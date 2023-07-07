<template>
  <div id="box">
    <el-container>
      <el-aside :width="isCollapse == true ? '65px' : '200px'" v-color="$store.state.bgColor">
        <div class="loginImg">
          <img
            :style="isCollapse == true ? 'width:60px' : 'width:140px'"
            :src="require('/src/assets/common/logo.png')"
            alt=""
          />
        </div>
        <el-menu
          :collapse="isCollapse"
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#ffffff00"
          text-color="#ffffff"
          active-text-color="#008dd4"
          router
        >
          <el-menu-item
            v-for="(item, index) in asideList"
            :key="index"
            :class="$route.path == item.path ? 'bgys' : ''"
            :index="item.path"
          >
            <i :class="`iconfont ${item.icon}`"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header v-color="$store.state.bgColor">
          <div class="leftHeader">
            <i
              :class="isCollapse == true ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
              @click="isCollapse = !isCollapse"
            ></i>
            江苏传智播客教育科技股份有限公司
            <span>体验版</span>
          </div>
          <div class="rightHeader">
            <el-tooltip class="item" effect="dark" content="站内搜索" placement="bottom" style="cursor: pointer">
              <i class="el-icon-search"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="全屏" placement="bottom" style="cursor: pointer">
              <i class="iconfont icon-allaround4sizhou" @click="handleScreen"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="多语言" placement="bottom" style="cursor: pointer">
              <i class="iconfont icon-translate"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="换肤" placement="bottom" style="cursor: pointer">
              <div class="block">
                <el-color-picker @change="changeBgColor" :value="$store.state.bgColor"></el-color-picker>
              </div>
            </el-tooltip>

            <el-avatar size="small" :src="require('/src/assets/common/bigUserHeader.png')"></el-avatar>
            <el-dropdown>
              <span class="el-dropdown-link"> 管理员<i class="el-icon-arrow-down el-icon--right"></i> </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>首页</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getProfile } from "../api/api"
import screenfull from "screenfull"
export default {
  data() {
    return {
      asideList: [
        {
          path: "/home",
          icon: "icon-dashboard-fill",
          title: "首页"
        },
        {
          path: "/component",
          icon: "icon-jiegou",
          title: "组件架构"
        },
        {
          path: "/staff",
          icon: "icon-people",
          title: "员工"
        },
        {
          path: "/company",
          icon: "icon-setting",
          title: "公司设置"
        },
        {
          path: "/Permission",
          icon: "icon-setting",
          title: "权限设置"
        },

        {
          path: "/socia",
          icon: "icon-component",
          title: "社保"
        },
        {
          path: "/checking",
          icon: "icon-excel",
          title: "考勤"
        },
        {
          path: "/salary",
          icon: "icon-calculator",
          title: "工资"
        },
        {
          path: "/examine",
          icon: "icon-quanxianshenpi",
          title: "审批"
        }
      ],
      bgColor: "#409EFF",
      isCollapse: false
    }
  },
  methods: {
    // 获取数据
    getList() {
      getProfile().then((res) => {
        console.log(res)
      })
    },
    // 放大缩小
    handleScreen() {
      screenfull.toggle()
    },
    changeBgColor(e) {
      this.$store.commit("UpbgColor", e)
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
#box {
  height: 100%;
  width: 100%;
  .el-container {
    height: 100%;
    width: 100%;
  }
  /**侧边栏样式 */
  ::v-deep .el-aside {
    transition: 0.5s !important;
    box-shadow: 0px 0px 11px #000;
    z-index: 99;
    cursor: pointer;
    background: url("/src/assets/common/leftnavBg.png") no-repeat bottom / contain;
    .loginImg {
      text-align: center;
      padding: 8px;
    }
    .el-menu {
      border: none;
      background: rgba($color: #fff, $alpha: 0);
      i {
        font-size: 24px;
        margin: 0 18px 0 8px;
        color: #fff;
      }
    }
    .el-menu-item {
      height: 60px;
      line-height: 60px;
    }
    li:hover {
      background-color: #fff !important;
      span,
      i {
        color: #2b62f7;
      }
    }
    .bgys {
      background-color: #fff !important;
      i {
        color: #2b62f7;
      }
    }
  }
  /**头部样式 */
  .el-header {
    height: 50px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background: linear-gradient(to right, #3561db, #5a8bfe);
    color: #fff;
    .leftHeader {
      i {
        font-size: 24px;
        margin-right: 12px;
        vertical-align: middle;
      }
      span {
        padding: 8px;
        margin-left: 10px;
        border-radius: 12px;
        background-color: #84a9fe;
        font-size: 14px;
      }
    }
    .rightHeader {
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        margin-right: 20px;
      }
      .el-dropdown {
        margin-left: 5px;
        color: #000;
      }
      .block {
        margin-right: 10px;
      }
    }
  }
}
</style>
