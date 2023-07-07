<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card shadow="always">
          <div class="topBox">
            <el-button type="primary" icon="el-icon-edit" size="medium">添加菜单</el-button>
          </div>
          <el-table :data="listData" style="width: 100%">
            <el-table-column prop="date" label="菜单名称" width="240">
              <template v-slot="scope"> <i class="el-icon-folder-opened"></i> {{ scope.row.name }} </template>
            </el-table-column>
            <el-table-column prop="code" label="权限标识" width="240"> </el-table-column>
            <el-table-column prop="description" label="描述" width="240"> </el-table-column>
            <el-table-column label="操作">
              <el-button type="text" size="small" v-txtColor="$store.state.bgColor">添加权限点</el-button>
              <el-button type="text" size="small" v-txtColor="$store.state.bgColor">查看api权限</el-button>
              <el-button type="text" size="small" v-txtColor="$store.state.bgColor">查看</el-button>
              <el-button type="text" size="small" v-txtColor="$store.state.bgColor">删除</el-button>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <div class="footTitle">
      <p><svg-icon icon-class="github"></svg-icon></p>
      <p>copyright<svg-icon icon-class="copyright"></svg-icon> 2018 iHRM 系统 版本所有</p>
    </div>
  </div>
</template>

<script>
import { getPermission } from "@/api/api"
import * as TS from "@/utils/constData"
export default {
  data() {
    return {
      pageData: {
        type: 1,
        pid: 0
      },
      listData: []
    }
  },
  methods: {
    getList() {
      getPermission(this.pageData).then((res) => {
        let { code, data, message } = res
        if (code == TS.STATUS.SUCCESS) {
          this.listData = data
          this.$message.success(message)
        } else {
          this.$message.success(message)
        }
      })
    }
  },
  created() {},
  mounted() {
    this.getList()
  },
  components: {},
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
</style>
