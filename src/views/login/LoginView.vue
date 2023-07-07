<template>
  <div class="content">
    <div class="contentSun">
      <el-image :src="require('/src/assets/common/login-logo.png')"></el-image>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="mobile">
          <el-input v-model="ruleForm.mobile" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input show-password v-model="ruleForm.password" prefix-icon="el-icon-lock">
            <!-- <i
              slot="suffix"
              :class="[this.flag ? 'el-icon-view' : 'el-icon-minus']"
              style="margin-top: 8px; font-size: 18px"
              @click="getFlag()"
            /> -->
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="flag" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="title">
        人生就像酷热的沙漠，挫折就如同炙热的太阳，但只有在经历酷热之后，才能看到真正的绿洲。坚持下去，你将发现属于你的美好人生。
        <svg-icon icon-class="setting" />
      </div>
    </div>
  </div>
</template>

<script>
import { getLogin } from "@/api/api"
import * as TS from "@/utils/constData"
import { setToken } from "@/utils/auth"
export default {
  data() {
    return {
      ruleForm: {
        mobile: "13800000002",
        password: "888itcast.CN764%..."
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度在11个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 12, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      },
      //密码小眼睛切换状态
      flag: false
      // flagType: "password"
    }
  },
  methods: {
    // 登录
    submitForm(formName) {
      this.flag = true
      let time = setTimeout(() => {
        this.flag = false
      }, 2000)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(formName)
          getLogin(this.ruleForm).then((res) => {
            let { code, data, message } = res
            if (TS.STATUS.SUCCESS == code) {
              setToken(data)
              this.$message.success(message)
              this.$router.push("/")
              console.log(time)
              clearTimeout(time)
            } else {
              this.$message.error(message)
            }
          })
        } else {
          this.$notify({
            title: "警告",
            message: "账号或密码错误",
            type: "warning"
          })
          return false
        }
      })
    }
  },
  created() {},
  mounted() {},
  components: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.content {
  background-image: url("/src/assets/common/login.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  position: relative;
  .contentSun {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    width: 520px;
    min-height: 400px;
    margin: -260px auto 0;
    .el-image {
      width: 100%;
      margin-bottom: 40px;
    }
    .title {
      color: #fff;
    }
    ::v-deep .el-input__inner {
      height: 60px;
      padding-left: 50px;
      background-color: #d4e5ff;
      color: #5f98ff;
    }
    ::v-deep .el-input__icon {
      font-size: 18px;
      color: #889aa4;
      margin: 0 8px;
      width: 30px;
    }
    ::v-deep .el-form-item {
      border: 0;
    }
    ::v-deep .el-form-item__error {
      color: #fff;
    }
    .el-button {
      width: 100%;
      height: 60px;
      background-color: #407ffe;
      font-size: 26px;
    }
  }
}
</style>
