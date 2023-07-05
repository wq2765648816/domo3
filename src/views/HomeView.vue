<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <el-button round>圆角按钮</el-button>
    <el-button type="primary" round>主要按钮</el-button>
    <el-button type="success" round>成功按钮</el-button>
    <el-button type="info" round>信息按钮</el-button>
    <el-button type="warning" round>警告按钮</el-button>
    <el-button type="danger" round>危险按钮</el-button>
  </div>
</template>

<script>
import { getLogin } from "../api/api"
export default {
  name: "HomeView",
  data() {
    return {
      form: {
        mobile: "13800000002",
        password: "888itcast.CN764%..."
      }
    }
  },
  mounted() {
    getLogin(this.form).then((res) => {
      console.log(res)
    })
  }
}
</script>
