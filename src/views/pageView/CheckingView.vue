<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card shadow="always">
          <div class="topBtn">
            <div class="leftBox">
              <i class="el-icon-info"></i>
              有0条考勤审批尚未处理
            </div>
            <div class="rightBox">
              <el-button type="primary" size="small" v-color="$store.state.bgColor">导入</el-button>
              <el-badge is-dot>
                <el-button type="primary" size="small" v-color="$store.state.bgColor">提醒</el-button>
              </el-badge>
              <el-button type="primary" size="small" v-color="$store.state.bgColor">设置</el-button>
              <el-button type="primary" size="small" v-color="$store.state.bgColor">历史归档</el-button>
              <el-button type="primary" size="small" v-color="$store.state.bgColor">3月份报表</el-button>
            </div>
          </div>
          <el-descriptions :column="1">
            <el-descriptions-item label="部门">
              <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="item in checkList" :key="item.id" :label="item.name"></el-checkbox>
              </el-checkbox-group>
            </el-descriptions-item>

            <el-descriptions-item label="考勤状态">
              <el-radio-group v-model="radio">
                <el-radio :label="0">正常</el-radio>
                <el-radio :label="1">旷工</el-radio>
                <el-radio :label="2">事假</el-radio>
                <el-radio :label="3">调休</el-radio>
                <el-radio :label="4">迟到</el-radio>
                <el-radio :label="5">早退</el-radio>
              </el-radio-group>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card class="bottomBox">
          <el-table :data="arrendancesList" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50"> </el-table-column>
            <el-table-column prop="username" label="姓名"> </el-table-column>
            <el-table-column prop="workNumber" label="工号"> </el-table-column>
            <el-table-column prop="departmentName" label="部门"> </el-table-column>
            <el-table-column prop="mobile" label="手机" width="120"> </el-table-column>
            <el-table-column
              v-for="(item, index) in arrendancesList[0]?.attendanceRecord"
              :key="index"
              :prop="item.id"
              :label="`3/${index + 1}`"
            >
              <template slot-scope="scope">
                {{ scope.row.attendanceRecord[0].jobStatu == 0 ? "旷工" : "" }}
              </template>
            </el-table-column>
          </el-table>
          <div class="pageBox">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="pageData.page"
              :page-size="10"
              layout="total, prev, pager, next"
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
import { getDepartmentList, getAttendancesList } from "@/api/api"
import * as TS from "@/utils/constData"
export default {
  data() {
    return {
      checkList: [],
      radio: "",
      pageData: {
        page: 1,
        pagesize: 10
      },
      arrendancesList: [],
      total: 0
    }
  },
  methods: {
    // 获取考勤部门列表
    getListment() {
      getDepartmentList().then((res) => {
        this.checkList = res.data.depts
      })
    },
    // 获取考勤列表
    getAttendList() {
      getAttendancesList(this.pageData).then((res) => {
        let { data, message, code } = res
        if (code == TS.STATUS.SUCCESS) {
          this.arrendancesList = data.data.rows
          this.total = data.data.total
          this.$message.success(message)
        } else {
          this.$message.error(message)
        }
      })
    },
    // 分页
    handleCurrentChange(val) {
      this.pageData.page = val
      this.getAttendList()
    }
  },
  created() {},
  mounted() {
    this.getListment()
    this.getAttendList()
  },
  components: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.topBtn {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  .leftBox {
    padding: 4px 8px;
    border: 1px solid #a5ddff;
    border-radius: 4px;
    background-color: #e6f7ff;
    i {
      color: #409eff;
    }
  }
  .el-badge {
    margin: 0 10px;
  }
}
::v-deep .el-descriptions-item__label {
  width: 80px;
}
.bottomBox {
  margin-top: 20px;
}
.pageBox {
  display: flex;
  justify-content: end;
}
</style>
