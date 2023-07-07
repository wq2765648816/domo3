<template>
  <div>
    <el-dialog title="申请" :visible="dialogVisibleOver" width="40%" :before-close="handleClose">
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px">
        <el-form-item label="申请类型" prop="processName">
          <el-select v-model="ruleForm.processName" placeholder="加班">
            <el-option label="加班" value="加班"></el-option>
            <el-option label="离职" value="离职"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="ruleForm.processName == '加班'">
          <el-form-item label="加班开始时间" prop="procApplyTime">
            <el-date-picker
              v-model="ruleForm.procApplyTime"
              type="datetime"
              placeholder="选择开始时间"
              default-time="12:00:00"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="加班结束时间" prop="procEndTime">
            <el-date-picker
              v-model="ruleForm.procEndTime"
              type="datetime"
              placeholder="选择结束时间"
              default-time="12:00:00"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="补偿方式"> 调休 </el-form-item>
          <el-form-item label="加班原因" prop="processKey">
            <el-input type="textarea" v-model="ruleForm.processKey"></el-input
          ></el-form-item>
        </template>
        <template v-else>
          <el-form-item label="期望离职时间" prop="procApplyTime">
            <el-date-picker
              v-model="ruleForm.procApplyTime"
              type="datetime"
              placeholder="选择离职时间"
              default-time="12:00:00"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离职原因" prop="processKey">
            <el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.processKey"></el-input
          ></el-form-item>
        </template>
        <el-form-item>
          <el-button @click="onSubmit">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment"
import { getStartProcess } from "@/api/api"
export default {
  props: ["dialogVisibleOver"],
  data() {
    return {
      ruleForm: {
        procApplyTime: "",
        procEndTime: "",
        processName: "",
        processKey: ""
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit("update:dialogVisibleOver", false)
    },
    onSubmit() {
      this.ruleForm.procApplyTime = moment(this.ruleForm.procApplyTime).format("YYYY-MM-DD HH:mm:ss")
      this.ruleForm.procEndTime = moment(this.ruleForm.procEndTime).format("YYYY-MM-DD HH:mm:ss")
      console.log(this.ruleForm)
      getStartProcess(this.ruleForm).then((res) => {
        console.log(res)
      })
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields()
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
::v-deep .el-dialog__header {
  background-color: #66b1ff;
  .el-dialog__title,
  .el-dialog__close {
    color: #fff;
  }
}
</style>
