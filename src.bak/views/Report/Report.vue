<template>
  <div>
    <el-card class="box-card">
      <template>
        <el-table border stripe :data="tableData" style="width: 100%">
          <el-table-column label="编号" width="80">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ (queryinfo.page - 1) * 10 + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="problem" label="问题描述">
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                title="问题描述"
                width="200"
                trigger="hover"
                :content="scope.row.problem"
              >
                <span slot="reference">{{ scope.row.problem }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="举报对象" width="120"> </el-table-column>
          <el-table-column prop="enclosure" label="截图url">
            <template slot-scope="scope">
              <a
                style="color:blue;cursor: pointer;"
                v-for="(item, index) in scope.row.enclosure"
                @click="openpci(scope.row)"
                :key="index"
                >{{ scope.row.enclosure[index] }}</a
              >
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="170">
            <template slot-scope="scope">
              <el-popover placement="top-start" title="邮箱" width="200" trigger="hover" :content="scope.row.email">
                <span slot="reference">{{ scope.row.email }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"> </el-table-column>
          <el-table-column label="状态" prop="status" width="120">
            <template slot-scope="scope">
              <el-button
                style="margin-left:10px;"
                v-show="scope.row.status == 'waiting'"
                size="mini"
                type="warning"
                @click="approval(scope.row)"
                >未审批</el-button
              >
              <el-button
                v-show="scope.row.status == 'completed'"
                size="mini"
                type="success"
                @click="approval(scope.row)"
                >已审批</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
import { getReportList, toApproval } from '../../api/report'
export default {
  data() {
    return {
      tableData: [],
      queryinfo: {
        limit: 10,
        page: 1
      },
      totals: 0
    }
  },
  methods: {
    async getReportData() {
      const { data: res } = await getReportList()
      this.tableData = res.data.items
    },
    openpci(row) {
      window.open(row.enclosure, '_blank')
    },
    async approval(row) {
      let form = {
        id: row.id,
        status: 'completed',
        username: window.sessionStorage.username
      }
      const { data: res } = await toApproval(form)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.getReportData()
      this.$message.success(res.msg)
    }
  },
  created() {
    this.getReportData()
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  margin-top: 10px;
}
/deep/.cell {
  //   /**
  // 1.设置inline-block属相
  // 2.强制不换行
  // 3.固定高度
  // 4.隐藏超出部分
  // 5.显示“……”
  // */
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
