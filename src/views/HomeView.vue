<template>
  <div>
    <div>12312132</div>
    <span>1231</span>
    <el-button icon="el-icon-search" circle></el-button>
    <el-button type="primary" icon="el-icon-edit" circle></el-button>
    <el-button type="success" icon="el-icon-check" circle></el-button>
    <el-button type="info" icon="el-icon-message" circle></el-button>
    <el-button type="warning" icon="el-icon-star-off" circle></el-button>

    <!-- <div>
      <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
      <el-link type="primary">主要链接</el-link>
      <el-link type="success">成功链接</el-link>
      <el-link type="warning">警告链接</el-link>
      <el-link type="danger">危险链接</el-link>
      <el-link type="info">信息链接</el-link>
    </div> -->
  </div>
</template>

<script>
import { getLogin } from "@/api/api"
export default {
  data() {
    return {
      form: {
        mobile: "13800000002",
        password: "888itcast.CN764%..."
      }
    }
  },
  methods: {},
  created() {},
  mounted() {
    getLogin(this.form).then((res) => {
      console.log(res)
    })
  },
  components: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
