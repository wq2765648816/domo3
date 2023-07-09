<template>
  <div>
    <el-dialog
      :title="statusData.status == 'add' ? '编辑部门' : '查看部门'"
      :visible="dialogFormVisible"
      :before-close="change"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="部门名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="部门编码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人">
          <el-select v-model="form.manager" placeholder="请选择">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍">
          <el-input v-model="form.introduce"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="change">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as TS from "@/utils/constData"
import { getSimple, addDepartment, lookdepartment } from "@/api/api"
export default {
  props: ["dialogFormVisible", "statusData"],
  data() {
    return {
      userList: [],
      form: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
        pid: ""
      }
    }
  },
  methods: {
    change() {
      this.$emit("update:dialogFormVisible", false)
    },
    getUserList() {
      getSimple().then((res) => {
        let { code, data, message } = res
        if (code == TS.STATUS.SUCCESS) {
          this.userList = data
          this.$message.success(message)
        } else {
          this.$message.error(message)
        }
      })
    },
    // 添加
    add() {
      if (this.statusData.status == "add") {
        this.form.pid = this.statusData.id
        addDepartment(this.form).then((res) => {
          let { code, message } = res
          if (code == TS.STATUS.SUCCESS) {
            this.$message.success(message)
            this.$emit("close")
          } else {
            this.$message.error(message)
          }
        })
      } else {
        this.change()
      }
    },
    // 查看
    getLookData() {
      lookdepartment({ id: this.statusData.id }).then((res) => {
        let { code, message, data } = res
        if (code == TS.STATUS.SUCCESS) {
          this.form = data
          this.$message.success(message)
        } else {
          this.$message.error(message)
        }
      })
    }
  },
  created() {},
  mounted() {
    this.getUserList()
  },
  components: {},
  computed: {},
  watch: {
    statusData: {
      deep: true,
      handler(newValue) {
        if (newValue.status == "look") {
          this.getLookData()
        } else {
          this.form = {}
        }
      }
    }
  }
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
