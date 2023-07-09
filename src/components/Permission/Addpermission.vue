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
        <el-form-item label="按钮样式">
          <el-input v-model="form.pointClass"></el-input>
        </el-form-item>
        <el-form-item label="按钮icon">
          <el-input v-model="form.pointIcon"></el-input>
        </el-form-item>
        <el-form-item label="按钮状态">
          <el-input v-model="form.pointStatus"></el-input>
        </el-form-item>
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
import { addPermission } from "@/api/api"
export default {
  props: ["dialogFormVisible", "permissData"],
  data() {
    return {
      form: {
        enVisible: "",
        code: "",
        description: "",
        type: 2,
        name: "",
        pointClass: "",
        pointIcon: "",
        pointStatus: ""
      }
    }
  },
  methods: {
    // 关闭模态框
    onOff() {
      this.$emit("update:dialogFormVisible", false)
    },
    // 添加权限
    onAdd() {
      console.log(this.permissData)
      addPermission({ ...this.form, ...this.permissData }).then((res) => {
        let { code, message } = res
        if (code == TS.STATUS.SUCCESS) {
          this.$message.success(message)
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
.bgColor {
  color: #409eff;
}
</style>
