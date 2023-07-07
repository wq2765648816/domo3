<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card class="topBox" shadow="always">
          <el-button type="primary" size="small" v-color="$store.state.bgColor">导入</el-button>
          <el-button type="primary" icon="el-icon-plus" size="small" v-color="$store.state.bgColor">新增员工</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card shadow="always">
          <el-table :data="listData" border style="width: 100%">
            <el-table-column prop="date" label="序号" type="index" width="150"> </el-table-column>
            <el-table-column prop="username" label="姓名" sortable width="120"> </el-table-column>
            <el-table-column prop="mobile" label="手机号" sortable width="120"> </el-table-column>
            <el-table-column prop="workNumber" label="工号" sortable width="120"> </el-table-column>
            <el-table-column prop="formOfEmployment" label="聘用形式" sortable width="120"> </el-table-column>
            <el-table-column prop="departmentName" label="部门" sortable width="120"> </el-table-column>
            <el-table-column prop="timeOfEntry" label="入职时间" sortable width="120">
              <template v-slot="scope">
                <div>
                  {{ scope.row.timeOfEntry | getTime }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="是否在职" sortable width="120">
              <template v-slot="scope">
                <div>
                  {{ scope.row.inServiceStatus == 1 ? "在职" : "离职" }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="enableState" label="状态" sortable width="120">
              <template v-slot="scope">
                <div>
                  {{ scope.row.enableState == 1 ? "可用" : "不可用" }}
                </div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="230">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small" v-txtColor="$store.state.bgColor"
                  >查看</el-button
                >
                <el-button type="text" size="small" v-txtColor="$store.state.bgColor">转正</el-button>
                <el-button type="text" size="small" v-txtColor="$store.state.bgColor">调岗</el-button>
                <el-button type="text" size="small" v-txtColor="$store.state.bgColor">离职</el-button>
                <el-button type="text" size="small" v-txtColor="$store.state.bgColor">角色</el-button>
                <el-button type="text" size="small" v-txtColor="$store.state.bgColor">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageData.page"
              :page-sizes="[2, 4, 6, 8]"
              :page-size="6"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUser } from "@/api/api"
import * as TS from "@/utils/constData"
import moment from "moment"
export default {
  data() {
    return {
      pageData: {
        size: 6,
        page: 1
      },
      total: null,
      listData: []
    }
  },
  methods: {
    /**请求数据 */
    getUserList() {
      getUser(this.pageData).then((res) => {
        let { code, data, message } = res
        if (code == TS.STATUS.SUCCESS) {
          console.log(data)
          this.listData = data.rows
          this.total = data.total
          this.$message.success(message)
        } else {
          this.$message.error(message)
        }
      })
    },
    handleClick(row) {
      console.log(row)
    },
    handleSizeChange(val) {
      console.log(val, "2")
      this.pageData.size = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.pageData.page = val
      this.getUserList()
      console.log(val)
    }
  },
  created() {},
  mounted() {
    this.getUserList()
  },
  components: {},
  computed: {},
  watch: {},
  filters: {
    getTime(val) {
      return moment(val).format("YYYY-MM-DD")
    }
  }
}
</script>

<style lang="scss" scoped>
.topBox {
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
}
.block {
  display: flex;
  justify-content: end;
}
</style>
