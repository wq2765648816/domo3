<template>
  <div>
    <el-dialog title="API权限列表" :visible="dialogTableVisible" :before-close="onOff">
      <div class="btnBox">
        <el-button type="primary" size="medium" icon="el-icon-edit" v-color="$store.state.bgColor" @click="ApiAdd"
          >添加api权限</el-button
        >
      </div>
      <el-table :data="listData" max-height="250">
        <el-table-column property="name" label="菜单名称" width="150"></el-table-column>
        <el-table-column property="code" label="权限标识" width="200"></el-table-column>
        <el-table-column property="description" label="描述" width="200"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text" size="small" v-txtColor="$store.state.bgColor" @click="lookApi(scope.row)"
              >查看</el-button
            >
            <el-button type="text" size="small" v-txtColor="$store.state.bgColor">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <Addpermission
      :dialogFormVisible.sync="dialogFormVisible"
      @updataTow="updataTow"
      :permissData="permissData"
      :lookId="lookId"
    ></Addpermission>
  </div>
</template>

<script>
import { getPermission } from "@/api/api"
import Addpermission from "./Addpermission.vue"
export default {
  props: ["dialogTableVisible", "lookApiPid"],
  data() {
    return {
      listData: [],
      pid: "",
      dialogFormVisible: false,
      permissData: {
        pid: "",
        type: 3
      },
      lookId: ""
    }
  },
  methods: {
    onOff() {
      this.$emit("update:dialogTableVisible", false)
    },
    getList() {
      getPermission({ type: 3, pid: this.pid }).then((res) => {
        this.listData = res.data
      })
    },
    ApiAdd() {
      this.dialogFormVisible = true
    },
    // 关闭模态框
    updataTow() {
      this.dialogFormVisible = false
      this.getList()
    },
    // 查看api权限
    lookApi(val) {
      console.log(val)
      this.permissData.pid = val.id
      this.dialogFormVisible = true
      this.lookId = val.id
    }
  },
  created() {},
  mounted() {},
  components: {
    Addpermission
  },
  computed: {},
  watch: {
    lookApiPid: {
      handler(newVle) {
        console.log(newVle)
        this.permissData.pid = newVle
        this.pid = newVle
        this.getList()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.btnBox {
  display: flex;
  justify-content: end;
}
::v-deep .el-dialog__header {
  background-color: #66b1ff;
  .el-dialog__title,
  .el-dialog__close {
    color: #fff;
  }
}
</style>
