<template>
  <div>
    <el-dialog title="申请" :visible="dialogVisibleOver" width="40%" :before-close="handleClose">
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px">
        <el-form-item label="申请类型" prop="processName">
          <el-select v-model="ruleForm.processName" placeholder="离职">
            <el-option label="加班" value="加班"></el-option>
            <el-option label="离职" value="离职"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="ruleForm.processName == '加班'">
          <el-form-item label="加班开始时间" prop="start_time">
            <el-date-picker
              v-model="ruleForm.start_time"
              type="datetime"
              placeholder="选择开始时间"
              default-time="12:00:00"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="加班结束时间" prop="end_time">
            <el-date-picker
              v-model="ruleForm.end_time"
              type="datetime"
              placeholder="选择结束时间"
              default-time="12:00:00"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="补偿方式"> 调休 </el-form-item>
          <el-form-item label="加班原因" prop="reason">
            <el-input type="textarea" v-model="ruleForm.reason"></el-input
          ></el-form-item>
        </template>
        <template v-else>
          <el-form-item label="期望离职时间" prop="exceptTime">
            <el-date-picker
              v-model="ruleForm.exceptTime"
              type="datetime"
              placeholder="选择离职时间"
              default-time="12:00:00"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离职原因" prop="reason">
            <el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.reason"></el-input
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
import * as TS from "@/utils/constData"
export default {
  props: ["dialogVisibleOver"],
  data() {
    return {
      ruleForm: {
        processName: "",
        reason: "",
        start_time: "",
        end_time: "",
        exceptTime: ""
      },
      processKey: "process_dimission"
    }
  },
  methods: {
    handleClose() {
      this.$emit("update:dialogVisibleOver", false)
    },
    onSubmit() {
      // 时间格式化

      this.ruleForm.exceptTime = moment(this.ruleForm.exceptTime).format("YYYY-MM-DD HH:mm:ss")
      this.ruleForm.start_time = moment(this.ruleForm.start_time).format("YYYY-MM-DD HH:mm:ss")
      this.ruleForm.end_time = moment(this.ruleForm.end_time).format("YYYY-MM-DD HH:mm:ss")
      let { processName, reason, start_time, end_time, exceptTime } = this.ruleForm
      // let { procApplyTime,procEndTime, processName,processKey}
      if (this.ruleForm.processName == "加班") {
        getStartProcess({
          processName,
          reason,
          start_time,
          end_time,
          userId: this.$store.state.userId,
          processKey: this.processKey
        }).then((res) => {
          let { code, message } = res
          if (code == TS.STATUS.SUCCESS) {
            this.$message.success(message)
          } else {
            this.$message.error(message)
          }
        })
      } else {
        getStartProcess({
          processName,
          reason,
          exceptTime,
          userId: this.userId,
          processKey: this.processKey
        }).then((res) => {
          console.log(res)
        })
      }
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
