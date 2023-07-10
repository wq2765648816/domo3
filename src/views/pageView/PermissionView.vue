<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card shadow="always">
          <div class="topBox">
            <el-button type="primary" icon="el-icon-edit" size="medium" v-color="$store.state.bgColor" @click="addMent"
              >添加菜单</el-button
            >
          </div>

          <el-table
            :data="listData"
            style="width: 100%; margin-bottom: 20px"
            row-key="id"
            lazy
            :load="load"
            :loading="true"
            :expand-on-click-node="true"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column label="菜单名称" width="240">
              <template v-slot="scope">
                <span> <i class="el-icon-view" v-if="scope.row.hasChildren != true"></i> {{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="code" label="权限标识" width="240"> </el-table-column>
            <el-table-column prop="description" label="描述" width="240"> </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  type="text"
                  size="small"
                  v-txtColor="$store.state.bgColor"
                  v-if="scope.row.hasChildren == true"
                  @click="add(scope.row)"
                  >添加权限点</el-button
                >
                <el-button type="text" size="small" v-txtColor="$store.state.bgColor" @click="lookApi(scope.row)"
                  >查看api权限</el-button
                >
                <el-button type="text" size="small" v-txtColor="$store.state.bgColor" @click="lookRes(scope.row.id)"
                  >查看</el-button
                >
                <el-button type="text" size="small" v-txtColor="$store.state.bgColor">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <div class="footTitle">
      <p><svg-icon icon-class="github"></svg-icon></p>
      <p>copyright<svg-icon icon-class="copyright"></svg-icon> 2018 iHRM 系统 版本所有</p>
    </div>
    <addPermission
      @updata="updata"
      :dialogFormVisible.sync="dialogFormVisible"
      :permissData="permissData"
      :lookId="lookId"
    ></addPermission>
    <LookApiViewVue :dialogTableVisible.sync="dialogTableVisible" :lookApiPid="lookApiPid"></LookApiViewVue>
  </div>
</template>

<script>
import { getPermission } from "@/api/api"
import * as TS from "@/utils/constData"
import addPermission from "@/components/Permission/Addpermission.vue"
import LookApiViewVue from "@/components/Permission/LookApiView.vue"
export default {
  data() {
    return {
      pageData: {
        type: 1,
        pid: 0
      },
      listData: [],
      dialogFormVisible: false,
      dialogTableVisible: false,
      permissData: {
        pid: "",
        type: 2
      },
      lookApiPid: "",
      lookId: ""
    }
  },
  methods: {
    // 请求数据
    getList() {
      getPermission(this.pageData).then((res) => {
        let { code, data, message } = res
        console.log(data)
        if (code == TS.STATUS.SUCCESS) {
          this.listData = data
          this.listData.forEach((item) => {
            item.hasChildren = true
          })
          this.$message.success(message)
        } else {
          this.$message.success(message)
        }
      })
    },
    // 展开数据
    load(tree, treeNode, resolve) {
      this.pageData.type = 2
      this.pageData.pid = tree.id
      getPermission(this.pageData).then((res) => {
        console.log(res)
        let { data } = res
        if (data.length) {
          resolve(res.data)
        } else {
          treeNode.loading = false
          this.$message.error("无子权限")
        }
      })
    },
    // 打开子组件添加权限
    add(val) {
      this.permissData.pid = val.id
      console.log(this.permissData)
      this.dialogFormVisible = true
    },
    // 查看api权限
    lookApi(val) {
      this.permissData.pid = val.id
      this.dialogTableVisible = true
      this.lookApiPid = val.id
    },
    // 查看详情
    lookRes(val) {
      this.permissData.type = 1
      this.lookId = val
      this.dialogFormVisible = true
    },
    // 关闭模态框
    updata() {
      this.dialogFormVisible = false
      this.getList()
    },
    // 主菜单添加
    addMent() {
      this.permissData = {
        pid: "0",
        type: 1
      }
      this.dialogFormVisible = true
    }
  },
  created() {},
  mounted() {
    this.getList()
  },
  components: {
    addPermission,
    LookApiViewVue
  },
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.topBox {
  display: flex;
  justify-content: end;
}
.footTitle {
  margin-top: 20px;
  font-size: 14px;
  color: #838486;
  text-align: center;
}
::v-deep .el-icon-arrow-right::before {
  content: "\eabe";
  font-family: "iconfont";
  font-size: 16px;
  color: #000;
}
::v-deep .el-table__expand-icon--expanded {
  transform: rotate(0deg);
}
</style>
