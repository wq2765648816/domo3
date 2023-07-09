<template>
  <div>
    <el-dialog title="000" :visible="dialogFormVisible" :before-close="onOff">
      <el-form :model="form" label-width="120px">
        <el-form-item label="权限名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="企业可见">
          <span :class="form.enVisible == 0 ? 'bgColor' : ''">不可见</span>
          <el-switch active-value="1" inactive-value="0" v-model="form.enVisible"></el-switch
          ><span :class="form.enVisible == 1 ? 'bgColor' : ''">可见</span>
        </el-form-item>
        <template v-if="permissData.type == 2">
          <el-form-item label="按钮样式">
            <el-input v-model="form.pointClass"></el-input>
          </el-form-item>
          <el-form-item label="按钮icon">
            <el-input v-model="form.pointIcon"></el-input>
          </el-form-item>
          <el-form-item label="按钮状态">
            <el-input v-model="form.pointStatus"></el-input>
          </el-form-item>
        </template>
        <template v-if="permissData.type == 3">
          <el-form-item label="api请求地址">
            <el-input v-model="form.apiUrl"></el-input>
          </el-form-item>
          <el-form-item label="api请求方式">
            <el-input v-model="form.apiMethod"></el-input>
          </el-form-item>
          <el-form-item label="api类型">
            <el-input v-model="form.apiLevel"></el-input>
          </el-form-item>
        </template>
        <template v-if="permissData.type == 1">
          <el-form-item label="菜单顺序">
            <el-input v-model="form.menuOrder"></el-input>
          </el-form-item>
          <el-form-item label="菜单icon">
            <el-input v-model="form.mentIcon"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onOff">取 消</el-button>
        <el-button type="primary" @click="onAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as TS from "@/utils/constData"
import { addPermission, LookPermission } from "@/api/api"
export default {
  props: ["dialogFormVisible", "permissData", "lookId"],
  data() {
    return {
      form: {
        enVisible: "",
        code: "",
        description: "",
        name: "",
        pointClass: "",
        pointIcon: "",
        pointStatus: "",
        apiUrl: "",
        apiMethod: "",
        apiLevel: "",
        menuOrder: "",
        mentIcon: ""
      },
      LookCode: ""
    }
  },
  methods: {
    // 关闭模态框
    onOff() {
      this.$emit("update:dialogFormVisible", false)
    },
    // 添加权限
    onAdd() {
      let {
        enVisible,
        code,
        description,
        name,
        pointClass,
        pointIcon,
        pointStatus,
        apiUrl,
        apiMethod,
        apiLevel,
        menuOrder,
        mentIcon
      } = this.form
      if (this.permissData.type == 2) {
        addPermission({
          enVisible,
          code,
          description,
          name,
          pointClass,
          pointIcon,
          pointStatus,
          ...this.permissData
        }).then((res) => {
          let { code, message } = res
          if (code == TS.STATUS.SUCCESS) {
            this.$message.success(message)
            this.$emit("updata")
          }
        })
      } else if (this.permissData.type == 3) {
        addPermission({
          enVisible,
          code,
          description,
          name,
          apiUrl,
          apiMethod,
          apiLevel,
          ...this.permissData
        }).then((res) => {
          let { code, message } = res
          if (code == TS.STATUS.SUCCESS) {
            this.$message.success(message)
            this.$emit("updataTow")
          }
        })
      } else if (this.permissData.type == 1) {
        addPermission({
          enVisible,
          code,
          description,
          name,
          menuOrder,
          mentIcon,
          ...this.permissData
        }).then((res) => {
          let { code, message } = res
          if (code == TS.STATUS.SUCCESS) {
            this.$message.success(message)
            this.$emit("updata")
          }
        })
      }
    },
    getLookData() {
      LookPermission({ id: this.LookCode }).then((res) => {
        console.log(res)
        this.form = res.data
      })
    }
  },
  created() {},
  mounted() {},
  components: {},
  computed: {},
  watch: {
    lookId: {
      handler(newValue) {
        console.log(newValue)
        this.LookCode = newValue
        this.getLookData()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.bgColor {
  color: #409eff;
}
::v-deep .el-dialog__header {
  background-color: #66b1ff;
  .el-dialog__title,
  .el-dialog__close {
    color: #fff;
  }
}
</style>
