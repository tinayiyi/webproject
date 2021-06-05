<template>
  <div class="bigbox">
    <el-card>
      <!-- 表格 -->
      <el-button type="success" @click="OpenDialog">上传安装包</el-button>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="VersionNumber" label="版本号" width="180"> </el-table-column>
        <el-table-column prop="PagSize" label="安装包大小" width="180"> </el-table-column>
        <el-table-column prop="ChannelNumber" label="渠道号" width="180"> </el-table-column>
        <el-table-column prop="IsMust" label="是否必须更新" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.IsMust === true ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Explain" label="更新说明"> </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="editData(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteDatas(scope.row)">删除</el-button>
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
          @current-change="getPacList"
        >
        </el-pagination>
      </div>
    </el-card>

    <!-- 添加表单 -->
    <el-dialog
      :title="type === 'add' ? '新增' : '编辑'"
      v-alterELDialogMarginTop="{ marginTop: '5vh' }"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label-width="130px" label="点击上传">
          <PacUpload @PackgeUrl="getPacUrl" class="PacUpload" :key="PacUploads" />
        </el-form-item>
        <el-form-item label="安装包路径" label-width="130px">
          <el-input v-model="form.PagUrl" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="安装包大小" label-width="130px">
          <el-input v-model="form.PagSize" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="版本号" label-width="130px">
          <el-input v-model="form.VersionNumber"></el-input>
        </el-form-item>
        <el-form-item label="渠道号" label-width="130px">
          <el-input v-model="form.ChannelNumber"></el-input>
        </el-form-item>
        <el-form-item label="是否必须更新" label-width="130px">
          <el-checkbox v-model="form.IsMust" border label="是否必须更新"></el-checkbox>
        </el-form-item>
        <el-form-item label="更新说明" label-width="130px">
          <el-input type="textarea" v-model="form.Explain"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btnbox">
            <el-button type="primary" @click="onSubmit">上传</el-button>
            <el-button @click="quxiao">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import PacUpload from '../../components/pacUpload'
import { addPac, editPac, deletePac, getPac } from '../../api/packageupload'

export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          PagUrl: 'xxxxxx', //url
          PagSize: '123123', //安装包大小
          VersionNumber: '1.0.5', //版本号
          ChannelNumber: '321', //渠道号
          IsMust: true, //是否是必须
          Explain: '111' //更新说明
        }
      ],
      dialogVisible: false,
      form: {
        id: '',
        PagUrl: '',
        PagSize: '',
        VersionNumber: '',
        ChannelNumber: '',
        IsMust: false,
        Explain: ''
      },
      PacUploads: '',
      type: 'add',
      queryinfo: {
        limit: 10,
        page: 1
      },
      totals: 0
    }
  },
  methods: {
    async getPacList() {
      const { data: res } = await getPac(this.queryinfo)
      if (res.code !== 0) return this.$message.error(res.msg)
      console.log(res.data.items)
      this.tableData = res.data.items
      this.queryinfo.page = res.data.curPage
      this.totals = res.data.totalCount
    },
    handleClose() {
      this.quxiao()
    },
    OpenDialog() {
      this.dialogVisible = true
    },
    // 表单 提交
    async onSubmit() {
      if (!this.form.PagUrl) {
        return this.$message.warning('安装包正在上传！，请等待安装包上传完成后再做提交')
      }
      if (this.type == 'add') {
        const { data: res } = await addPac(this.form)
        if (res.code !== 0) return this.$message.error(res.msg)
        this.getPacList()
        this.$message.success(res.msg)
      } else {
        const { data: res } = await editPac(this.form)
        if (res.code !== 0) return this.$message.error(res.msg)
        this.getPacList()
        this.$message.success(res.msg)
      }
      this.quxiao()
    },

    //获取安装包地址和安装包大小
    getPacUrl(url, size) {
      this.form.PagUrl = url
      this.form.PagSize = size
    },

    quxiao() {
      this.dialogVisible = false
      this.form = {
        id: '',
        PagUrl: '',
        PagSize: '',
        VersionNumber: '',
        ChannelNumber: '',
        IsMust: false,
        Explain: ''
      }
      this.type = 'add'
      this.PacUploads = new Date().getTime()
    },

    // 编辑按钮点击事件
    editData(row) {
      this.type = 'edit'
      this.dialogVisible = true
      this.form = row
      console.log(row)
    },

    // 删除按钮点击事件
    async deleteDatas(row) {
      const { data: res } = await deletePac(row.id)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.getPacList()
      this.$message.success(res.msg)
    }
  },
  created() {
    this.getPacList()
  },
  components: {
    PacUpload
  }
}
</script>
<style scoped lang="scss">
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
.bigbox {
  padding: 20px 0;
}
.el-table {
  margin-top: 20px;
}
.btnbox {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
/deep/.el-dialog {
  height: 85vh;
  overflow: scroll;
}

/deep/.el-dialog::-webkit-scrollbar {
  display: none; //隐藏滚动条
}
.el-pagination-box {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
