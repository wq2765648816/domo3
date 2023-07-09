<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card shadow="always">
          <el-tabs v-model="activeName"> <el-tab-pane label="组织架构" name="first"></el-tab-pane> </el-tabs>
          <div class="mentBox">
            <div class="topBox">
              <span>
                <svg-icon icon-class="bank-fill"> </svg-icon>
                <b> 江苏传智播客教育科技股份有限公司</b>
              </span>
              <div class="rightBox">
                <span class="spx">负责人</span>
                <el-dropdown @command="flag">
                  <span class="el-dropdown-link"> 操作<i class="el-icon-arrow-down el-icon--right"></i> </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <!-- 树状结构 -->
            <el-tree
              :data="listData"
              node-key="id"
              icon-class="iconfont icon-jiahaozhankai"
              default-expand-all
              :expand-on-click-node="true"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.name }}</span>
                <span>{{ data.name }}</span>
                <span class="rightText">
                  <span>{{ data.manager }}</span>
                  <el-dropdown @command="flag">
                    <span class="el-dropdown-link"> 操作<i class="el-icon-arrow-down el-icon--right"></i> </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="{ id: data.id, status: 'add' }">添加子部门</el-dropdown-item>
                      <el-dropdown-item :command="{ id: data.id, status: 'look' }">查看部门</el-dropdown-item>
                      <el-dropdown-item :command="{ id: data.id, status: 'del' }">删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
              </span>
            </el-tree>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <BranchView :dialogFormVisible.sync="dialogFormVisible" :statusData="statusData" @close="close"></BranchView>
  </div>
</template>

<script>
import { getDepartment, delDepartment } from "@/api/api"
import BranchView from "@/components/ComponentFiex/BranchView.vue"
import * as TS from "@/utils/constData"
export default {
  data() {
    return {
      activeName: "first",
      listData: [],
      lookData: {},
      dialogFormVisible: false,
      statusData: {
        id: "",
        status: ""
      }
    }
  },
  methods: {
    // 请求数据
    getList() {
      getDepartment().then((res) => {
        let { code, message, data } = res
        if (code == TS.STATUS.SUCCESS) {
          data.depts.forEach((item) => {
            let { id, name, pid, manager } = item
            if (pid == "") {
              this.listData.push({
                id,
                name,
                manager,
                children: []
              })
            } else {
              let index = this.listData.findIndex((it) => it.id == pid)
              if (index == -1) {
                for (let i = 0; i < this.listData.length; i++) {
                  // console.log(this.listData[i].children)
                  let obj = this.listData[i].children.find((v) => v.id == pid)
                  // obj.push(item)
                  // console.log(obj)
                  if (obj) {
                    obj.children.push(item)
                  }
                }
              } else {
                // console.log(...item)
                this.listData[index].children.push({
                  ...item,
                  children: []
                })
              }
            }
          })
          this.$message.success(message)
        } else {
          this.$message.error(message)
        }
      })
    },
    // 删除部门
    flag(val) {
      if (val.status != "del") {
        this.dialogFormVisible = true
        this.statusData.id = val.id
        this.statusData.status = val.status
      } else {
        delDepartment({ id: val.id }).then((res) => {
          console.log(res, "删除")
        })
      }
    },
    // 关闭模态框 重新刷新页面
    close() {
      this.dialogFormVisible = false
      this.listData = []
      this.getList()
    }
  },
  created() {},
  mounted() {
    this.getList()
  },
  components: {
    BranchView
  },
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.el-card {
  padding: 20px 40px;
  .mentBox {
    padding: 30px 100px;
    .topBox {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #cfcfcf;
      padding-bottom: 10px;
      margin-bottom: 20px;
      .spx {
        padding-right: 20px;
      }
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
}
::v-deep .el-tree-node {
  padding: 6px 0;
  .custom-tree-node {
    width: 100%;
    display: flex;
    .rightText {
      margin-left: auto;
      > span {
        padding-right: 20px;
      }
    }
  }
}
::v-deep .el-dropdown-menu__item {
  color: #409eff;
}
::v-deep .is-leaf::before {
  content: "\e633";
  font-size: 20px;
  font-family: "iconfont";
  color: #000;
}
::v-deep .expanded::before {
  content: "\e722";
  font-size: 20px;
  font-family: "iconfont";
  color: #000;
}
::v-deep .el-tree-node__expand-icon {
  content: "\e721";
  font-size: 20px;

  font-family: "iconfont";
  color: #000;
}
::v-deep .el-tree-node__expand-icon {
  transition: none;
}
</style>
