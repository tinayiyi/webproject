<template>
  <el-card class="box-card">
    <div class="bigbox">
      <div class="block">
        <span>选择日期</span>
        <el-date-picker
          v-model="times"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          class="demonstration"
          @change="gettiems"
          value-format="timestamp"
        >
        </el-date-picker>
      </div>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%" class="tables">
      <el-table-column prop="name" label="用户名"> </el-table-column>
      <el-table-column prop="activity" label="会议数量"> </el-table-column>
      <el-table-column prop="zixun" label="资讯数量"> </el-table-column>
      <el-table-column prop="website" label="网址数量"> </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getStatistics } from '../../api/statistics'
export default {
  data() {
    return {
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '当天',
            onClick(picker) {
              const end = new Date()
              end.setHours(0, 0, 0, 0)
              const start = new Date()
              start.setHours(0, 0, 0, 0)
              start.setTime(start.getTime())
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三天',
            onClick(picker) {
              const end = new Date()
              end.setHours(0, 0, 0, 0)
              const start = new Date()
              start.setHours(0, 0, 0, 0)
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近七天',
            onClick(picker) {
              const end = new Date()
              end.setHours(0, 0, 0, 0)
              const start = new Date()
              start.setHours(0, 0, 0, 0)
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近十五天',
            onClick(picker) {
              const end = new Date()
              end.setHours(0, 0, 0, 0)
              const start = new Date()
              start.setHours(0, 0, 0, 0)
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 14)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三十天',
            onClick(picker) {
              const end = new Date()
              end.setHours(0, 0, 0, 0)
              const start = new Date()
              start.setHours(0, 0, 0, 0)
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 29)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      times: []
    }
  },
  methods: {
    async getData() {
      let time = {
        startTime: this.times[0] === undefined ? '' : this.times[0],
        endTime: this.times[1] === undefined ? '' : this.times[1]
      }

      const { data: res } = await getStatistics(time.startTime, time.endTime)
      let data = res.data
      let tabdata = []
      for (let item in data) {
        tabdata.push(data[item])
      }
      this.tableData = tabdata

      if (res.code != 0) return this.$message.error(res.msg)
    },
    gettiems() {
      this.getData()
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 10px;
}

.tables {
  margin-top: 20px;
}
.selects {
  margin-left: 20px;
}
.bigbox {
  display: flex;
}
.demonstration {
  margin-left: 20px;
}
</style>
