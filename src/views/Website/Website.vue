<template>
  <div>
    <el-card class="box-card">
      <el-button type="success" @click="dialogVisible = true" v-show="upLimit">上传网址</el-button>
      <el-table :data="tableData" border stripe style="width: 100%;margin-top:20px;">
        <el-table-column prop="webtitle" label="标题"> </el-table-column>
        <el-table-column prop="weburl" label="网址">
          <template slot-scope="scope">
            <a class="weburl" @click="tonewweb(scope)">{{ scope.row.weburl }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="webcount" label="数量" width="80"> </el-table-column>
        <el-table-column prop="upname" label="上传者" width="120"> </el-table-column>
        <el-table-column prop="uptime" label="上传时间" width="120"> </el-table-column>
        <el-table-column prop="usedname" label="领取者" width="120"> </el-table-column>
        <el-table-column prop="usedtime" label="领取时间" width="120"> </el-table-column>
        <el-table-column prop="isused" label="是否被使用" width="200">
          <template slot-scope="scope">
            <el-switch
              style="display: block"
              v-model="scope.row.isused"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-text="已使用"
              inactive-text="未使用"
              :disabled="!scope.row.unUsedFlag"
              @change="changeUsedFlag(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              ref="scbtns"
              :disabled="!scope.row.deleFlag"
              type="danger"
              size="mini"
              @click="deletewz(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="el-pagination-box">
        <el-pagination
          background
          class="pager"
          layout="prev,pager,next,jumper"
          :current-page.sync="queryinfo.page"
          :total="totals"
          :page-size.sync="queryinfo.limit"
          @current-change="getWebsiteList"
        >
        </el-pagination>
      </div>
    </el-card>
    <el-dialog title="上传网址" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
      <el-form ref="form" :model="websiteform" label-width="80px">
        <el-form-item label="标题" label-width="130px">
          <el-input v-model="websiteform.title"></el-input>
        </el-form-item>
        <el-form-item label="网址" label-width="130px">
          <el-input v-model="websiteform.address"></el-input>
        </el-form-item>
        <el-form-item label="数量" label-width="130px">
          <el-input v-model="websiteform.addressnum"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btnbox">
            <el-button type="primary" @click="onSubmit">上传</el-button>
            <el-button @click="quxiao">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="数据疑似重复，请对比核对"
      :destroy-on-close="true"
      :show-close="true"
      :before-close="cancelClick"
      :close-on-click-modal="false"
      :visible.sync="Isforce"
      v-alterELDialogMarginTop="{ marginTop: '4vh' }"
      width="90%"
    >
      <div class="chongfubox">
        <div class="titlebox">本次提交数据</div>
        <el-table :data="ThisTimeSubData" border stripe style="width: 100%;margin-top:20px;">
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column prop="url" label="网址">
            <template slot-scope="scope">
              <a class="weburl" @click="towebsnow(scope.row)">{{ scope.row.address }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="addressnum" label="数量" width="80"> </el-table-column>
        </el-table>
        <div class="chongfubox">
          <div class="titlebox">已存在疑似重复数据</div>
          <el-table :data="forceData" border stripe style="width: 100%;margin-top:20px;">
            <el-table-column prop="webtitle" label="标题"> </el-table-column>
            <el-table-column prop="weburl" label="网址">
              <template slot-scope="scope">
                <a class="weburl" @click="towebs(scope.row)">{{ scope.row.weburl }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="webcount" label="数量" width="80"> </el-table-column>
            <el-table-column prop="upname" label="上传者" width="120"> </el-table-column>
            <el-table-column prop="uptime" label="上传时间" width="120"> </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelClick">取消提交</el-button>
        <el-button type="warning" @click="ContinueSub" :disabled="ContinueSubDis">继续提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getWebsite, postWebsite, usedFlag, deleteWebsite } from '../../api/website'
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [
        {
          webtitle: '标题标题标题标题',
          upname: '王小虎',
          uptime: '2020/1/1',
          usedname: 'makai',
          usedtime: '2021/1/1',
          weburl: 'www.hcc.com',
          webcount: '2',
          isused: true
        }
      ],
      websiteform: {
        title: '',
        address: '',
        addressnum: '1',
        upname: window.sessionStorage.usedname
      },
      queryinfo: {
        limit: 10,
        page: 1
      },
      totals: 0,
      upLimit: false,
      Isforce: false,
      ThisTimeSubData: [],
      forceData: [],
      forceSubmit: false,
      ContinueSubDis: false
    }
  },
  methods: {
    async deletewz(row) {
      const { data: res } = await deleteWebsite(row.id)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getWebsiteList()
    },
    async ContinueSub() {
      this.forceSubmit = true
      this.ContinueSubDis = true
      const { data: res } = await postWebsite(this.ThisTimeSubData[0], this.forceSubmit)
      if (res.code !== 0) {
        this.$message.error(res.msg)
        this.ContinueSubDis = false
        return
      }
      this.$message.success(res.msg)
      this.cancelClick()
      this.ContinueSubDis = false
    },
    cancelClick() {
      this.Isforce = false
      this.ThisTimeSubData = []
      this.forceData = []
      this.forceSubmit = false
    },
    handleClose() {
      this.dialogVisible = false
    },
    async onSubmit() {
      const { data: res } = await postWebsite(this.websiteform, this.forceSubmit)
      if (res.code !== 0 && res.code === 4) {
        this.ThisTimeSubData = [this.websiteform]
        this.forceData = res.data
        this.forceData.map(item => {
          item.uptime = this.timestampToTime(item.uptime)
        })
        this.Isforce = true
        this.quxiao()
      } else if (res.code === 0) {
        this.quxiao()
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
        this.quxiao()
        this.getWebsiteList()
      }
    },
    async getWebsiteList() {
      const { data: res } = await getWebsite(this.queryinfo)
      if (res.code !== 0) return this.$message.error(res.msg)
      let tables = {}
      tables = res.data.items
      this.queryinfo.page = res.data.curPage
      this.totals = res.data.totalCount
      this.upLimit = res.data.upLimit

      if (res.data.deleLimit === true) {
        tables.map(item => {
          item.deleFlag = true
        })
      }
      if (res.data.usedLimit === true) {
        tables.map(item => {
          item.unUsedFlag = true
        })
      }
      tables.map(item => {
        if (item.isused === 1) {
          item.isused = true
        } else {
          item.isused = false
        }
        let uptim = this.timestampToTime(item.uptime)
        let usedtim = this.timestampToTime(item.usedtime)
        item.uptime = uptim
        item.usedtime = usedtim
      })
      this.tableData = tables
    },
    quxiao() {
      this.websiteform = {
        title: '',
        address: '',
        addressnum: '1',
        upname: window.sessionStorage.username
      }
      this.dialogVisible = false
    },
    async changeUsedFlag(row) {
      let form = {
        id: row.id,
        isused: row.isused,
        username: window.sessionStorage.username
      }
      const { data: res } = await usedFlag(form)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      // this.getWebsiteList()
    },
    tonewweb(scope) {
      let row = scope.row
      if (row.isused === true) return this.$message.warning('该网站已被使用，请选择其他网站')
      this.tableData[scope.$index].isused = true
      window.open(row.weburl, '_blank')
      let rows = {
        ...row
      }
      rows.isused = !row.isuseds
      this.changeUsedFlag(rows)
    },
    towebs(row) {
      window.open(row.weburl, '_blank')
    },
    towebsnow(row) {
      window.open(row.address, '_blank')
    },
    timestampToTime(timestamp) {
      if (!timestamp) return ''
      let date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
      let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' -- '
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      return M + D + h + m
    }
  },
  created() {
    this.getWebsiteList()
    this.websiteform.upname = window.sessionStorage.username
  }
}
</script>

<style lang="scss" scoped>
.box-card {
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
.btnbox {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.el-pagination-box {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.weburl {
  color: blue;
  cursor: pointer;
}
.chongfubox {
  max-height: 60vh;
  width: 100%;
  overflow: scroll;
  .titlebox {
    height: 70px;
    display: flex;
    align-items: center;
    font-size: 20px;
  }
}
::-webkit-scrollbar {
  display: none; //隐藏滚动条
}
</style>
