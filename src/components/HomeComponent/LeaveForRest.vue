<template>
  <div>
    <el-dialog title="请假" :visible="dialogVisibleLeave" width="40%" :before-close="handleClose">
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px">
        <el-form-item label="假期类型" prop="processName">
          <el-select v-model="ruleForm.processName" placeholder="请选择">
            <el-option label="调休" value="调休"></el-option>
            <el-option label="请假" value="请假"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请单位"> 按天 </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="ruleForm.startTime"
            type="datetime"
            placeholder="选择开始时间"
            default-time="12:00:00"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker v-model="ruleForm.endTime" type="datetime" placeholder="选择结束时间" default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <template v-if="this.ruleForm.processName == '调休'">
          <el-form-item label="请假时长" prop="duration">
            <el-input v-model="ruleForm.duration"></el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="申请天数" prop="duration">
            <el-input v-model="ruleForm.duration"></el-input>
          </el-form-item>
        </template>
        <el-form-item label="申请理由" prop="reason">
          <el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.reason"></el-input
        ></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment"
import { getStartProcess } from "@/api/api"
import * as TS from "@/utils/constData"
export default {
  props: ["dialogVisibleLeave"],
  data() {
    return {
      ruleForm: {
        applyUnit: "按天",
        duration: 0,
        endTime: "",
        startTime: "",
        reason: "",
        processName: "",
        processKey: "process_leave",
        userId: this.$store.state.userId || ""
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit("update:dialogVisibleLeave", false)
    },
    onSubmit() {
      this.ruleForm.startTime = moment(this.ruleForm.startTime).format("YYYY-MM-DD HH:mm:ss")
      this.ruleForm.endTime = moment(this.ruleForm.endTime).format("YYYY-MM-DD HH:mm:ss")
      this.ruleForm.userId = this.$store.state.userId
      getStartProcess(this.ruleForm).then((res) => {
        let { code, message } = res
        if (code == TS.STATUS.SUCCESS) {
          this.$message.success(message)
        } else {
          this.$message.error(message)
        }
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
