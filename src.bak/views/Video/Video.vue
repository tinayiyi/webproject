<template>
  <div>
    <el-dialog
      :destroy-on-close="true"
      :show-close="true"
      :close-on-click-modal="false"
      :title="VideoOperateType === 'add' ? '新增' : '编辑'"
      :visible.sync="VideoisShow"
      width="60%"
      v-alterELDialogMarginTop="{ marginTop: '4vh' }"
    >
      <el-form inline ref="from" :model="Videoform" label-width="100px">
        <div class="btnrbox">
          <el-form-item label-width="180" label="标题">
            <el-input
              type="textarea"
              style="width:710px"
              autosize
              v-model="Videoform.title"
              placeholder="请输入视频标题"
            ></el-input>
          </el-form-item>
          <el-form-item label-width="180" label="描述">
            <el-input
              type="textarea"
              style="width:710px"
              autosize
              v-model="Videoform.description"
              placeholder="请输入视频描述"
            />
          </el-form-item>
          <el-form-item label-width="180" label="链接">
            <el-input
              type="textarea"
              style="width:710px"
              autosize
              v-model="Videoform.videoUrl"
              placeholder="请输入视频链接"
            />
          </el-form-item>
        </div>
        <el-form-item label="浏览量">
          <el-input style="width:260px" v-model="Videoform.view_vol" placeholder="请输入浏览量"></el-input>
        </el-form-item>
        <el-form-item label="收藏量" class="nrinput">
          <el-input style="width:260px" v-model="Videoform.follow_vol" placeholder="请输入收藏量"></el-input>
        </el-form-item>
        <br />
        <div class="selectbox">
          <el-form-item label="类型">
            <el-select style="width:260px" v-model="Videoform.type" placeholder="请选择类型">
              <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行业" class="hangyesel">
            <el-select style="width:260px" v-model="Videoform.industry" placeholder="请选择行业">
              <el-option
                v-for="item in industryList"
                :key="item.value"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="视频时长">
          <el-cascader
            style="width:260px"
            v-model="values"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <br />
        <el-form-item label="视频封面">
          <ImgUpload @imgUrls="coverImg" />
        </el-form-item>
        <br />
        <div class="videoCoverbox">
          <el-form-item label="封面url" class="imgurl">
            <el-input
              type="textarea"
              style="width:710px"
              :rows="1"
              placeholder="请输入内容"
              v-model="Videoform.videoCover"
            />
          </el-form-item>
        </div>
        <br />
        <el-form-item label="作者头像">
          <ImgUpload @imgUrls="authorImg" />
        </el-form-item>
        <br />
        <el-form-item label="作者头像url" class="imgurl">
          <el-input
            type="textarea"
            style="width:710px"
            :rows="1"
            placeholder="请输入内容"
            v-model="Videoform.author.portrait"
          />
        </el-form-item>
        <el-form-item label="作者名称">
          <el-input style="width:710px" :rows="1" placeholder="请输入作者名称" v-model="Videoform.author.name" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="videoquxiao">取 消</el-button>
        <el-button :disabled="submitbtn" type="primary" @click="videoconfirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="tabs">
      <div class="topbox">
        <div class="SwitchingBox">
          <el-button type="success" @click="addVideo">添加视频</el-button>
          <el-switch
            style="display: block"
            v-model="isShelf"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="显示全部"
            inactive-text="显示未上线"
            @change="qhsxxx"
          >
          </el-switch>
        </div>
        <div class="searchbox">
          <!-- <el-input placeholder="请输入内容"></el-input>
          <el-button type="primary" class="searchbtn">搜索</el-button> -->
        </div>
      </div>
    </div>
    <el-card>
      <template>
        <el-table
          :data="VideoDataList"
          stripe
          border
          style="width: 100%"
          v-loading="loading"
          @expand-change="expandChange"
          :expand-row-keys="expands"
          :row-key="getRowKeys"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <div class="cardtbbox">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="操作日志:">
                    <span v-for="(item, index) in props.row.name" :key="index">{{ item }} -- </span>
                  </el-form-item>
                  <el-form-item label="视频标题:">
                    <span>{{ props.row.title }}</span>
                  </el-form-item>
                  <el-form-item label="浏览量:">
                    <span>{{ props.row.view_vol }}</span>
                  </el-form-item>
                  <el-form-item label="收藏量:">
                    <span>{{ props.row.follow_vol }}</span>
                  </el-form-item>
                  <el-form-item label="视频描述:">
                    <span>{{ props.row.description }}</span>
                  </el-form-item>
                  <el-form-item label="视频链接:">
                    <span>{{ props.row.videoUrl }}</span>
                  </el-form-item>
                  <el-form-item label="视频封面:">
                    <img :src="props.row.videoCover" class="imgcover" />
                  </el-form-item>
                  <el-form-item label="视频时长:">
                    <span>{{ props.row.videotimelong }}秒</span>
                  </el-form-item>
                  <el-form-item label="视频类型:">
                    <span v-show="item.id == props.row.type" v-for="(item, index) in typeList" :key="index">{{
                      item.label
                    }}</span>
                  </el-form-item>
                  <el-form-item label="行业分类:">
                    <span v-show="item.id == props.row.industry" v-for="(item, index) in industryList" :key="index">{{
                      item.label
                    }}</span>
                  </el-form-item>
                  <el-form-item label="作者头像:">
                    <img :src="props.row.author.portrait" class="imgcover" />
                  </el-form-item>
                  <el-form-item label="作者名称：">
                    <span>{{ props.row.author.name }}</span>
                  </el-form-item>
                </el-form>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="编号" width="100">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ (queryinfo.page - 1) * 10 + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="MID" prop="mid" width="80"> </el-table-column>
          <el-table-column label="标题" prop="title"> </el-table-column>
          <el-table-column label="类型" prop="type" width="100px">
            <template slot-scope="scope">
              <span v-show="item.id == scope.row.type" v-for="(item, index) in typeList" :key="index">{{
                item.label
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="行业" prop="industry" width="130px">
            <template slot-scope="scope">
              <span v-show="item.id == scope.row.industry" v-for="(item, index) in industryList" :key="index"
                >{{ item.label }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作人" width="160px" prop="name">
            <template slot-scope="scope">
              <span>{{ scope.row.name[scope.row.name.length - 1] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否上线" width="90px">
            <template slot-scope="scope">
              <el-button
                type="success"
                @click="exithidetype(scope.row)"
                v-if="scope.row.hide == 0"
                plain
                :disabled="isHideOnline"
                size="mini"
                >已上线</el-button
              >
              <el-button
                type="warning"
                @click="exithidetype(scope.row)"
                v-if="scope.row.hide == 1"
                plain
                :disabled="isHideOnline"
                size="mini"
                >已下线</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button size="mini" @click="editData(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteDatas(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="el-pagination-box">
        <el-pagination
          background
          class="pager"
          layout="prev,pager,next,jumper"
          :current-page.sync="queryinfo.page"
          :total="totals"
          :page-size.sync="queryinfo.limit"
          @current-change="getvideo"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getTypeList,
  getvideoList,
  addvideoList,
  updatevideoList,
  deletevideoList,
  changeHideType
} from '../../api/video'
import { getImgToken } from '../../api/main'
import ImgUpload from '../../components/ImgUpload'
export default {
  data() {
    return {
      VideoOperateType: 'add',
      Videoform: {
        title: '',
        description: '',
        videoUrl: '',
        videoCover: '',
        type: '',
        industry: '',
        author: {
          portrait: '',
          name: ''
        },
        videotimelong: '',
        view_vol: '',
        follow_vol: '',
        name: window.sessionStorage.getItem('username')
      },
      VideoisShow: false,
      VideoDataList: [
        {
          title: '',
          description: '',
          videoUrl: '',
          videoCover: '',
          type: '',
          industry: '',
          author: {
            portrait: '',
            name: ''
          },
          videotimelong: '',
          view_vol: '',
          follow_vol: '',
          name: window.sessionStorage.getItem('username')
        }
      ],
      imgpostdata: {
        file: {
          uri: '',
          type: 'image/jpeg'
        },
        token: ''
      },
      imgloading: true,
      loading: true,
      hideUpload: false,
      dialogVisible: false,
      limitCount: 1,
      typeList: [],
      industryList: [],
      //设置row-key只展示一行
      expands: [], //只展开一行放入当前行id
      getRowKeys(row) {
        return row.mid
      },
      queryinfo: {
        limit: 10,
        page: 1
      },
      totals: 0,
      values: [],
      options: [],
      pagenum: 0,
      names: [],
      isShelf: true,
      hidetype: 'all',
      isHideOnline: false,
      hideList: [],
      unhideList: [],
      submitbtn: false
    }
  },
  methods: {
    async getvideo() {
      let params = {
        page: this.queryinfo.page,
        limit: this.queryinfo.limit,
        hidetype: this.hidetype
      }
      const { data: res } = await getvideoList(params)
      let datas = res.data.items
      datas.forEach(arr => {
        if (!Array.isArray(arr.name)) {
          arr.name = [`${arr.name}(新增)`]
        }
      })
      this.VideoDataList = datas
      this.totals = res.data.totalCount
      if (res) {
        this.loading = false
      }
    },
    async getType() {
      const { data: res } = await getTypeList()
      this.typeList = res.data[2].data
      this.industryList = res.data[1].data
    },
    addVideo() {
      this.VideoOperateType = 'add'
      this.VideoisShow = true
      this.times()
    },
    videoquxiao() {
      this.VideoisShow = false
      this.Videoform = {
        title: '',
        description: '',
        videoUrl: '',
        videoCover: '',
        type: '',
        industry: '',
        author: {
          portrait: '',
          name: ''
        },
        videotimelong: '',
        view_vol: '',
        follow_vol: '',
        name: []
      }
      this.names = []
      this.hideUpload = false
    },
    videoconfirm() {
      this.submitbtn = true
      if (this.VideoOperateType === 'add') {
        this.addvideos()
      } else {
        this.updvideos()
      }
      setTimeout(() => {
        this.submitbtn = false
      }, 3000)
    },
    async addvideos() {
      this.Videoform.name = [`${window.sessionStorage.getItem('username')}(新增)`]
      const { data: res } = await addvideoList(this.Videoform)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getvideo()
      this.videoquxiao()
    },
    async updvideos() {
      this.Videoform.name = this.names
      const { data: res } = await updatevideoList(this.Videoform)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getvideo()
      this.videoquxiao()
    },
    async delvideos(mid) {
      const { data: res } = await deletevideoList(mid)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getvideo()
    },
    editData(row) {
      this.names = row.name
      this.VideoOperateType = 'edit'
      this.VideoisShow = true
      this.Videoform = row
      this.Videoform.name = window.sessionStorage.getItem('username')
      this.times()
      this.values[0] = Math.floor(row.videotimelong / 3600)
      this.values[1] = Math.floor((row.videotimelong - this.values[0] * 3600) / 60)
      this.values[2] = (row.videotimelong - this.values[0] * 3600) % 60
      let user = window.sessionStorage.getItem('username')
      this.names.push(`${user}(修改)`)
    },
    deleteDatas(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let mid = row.mid
          this.delvideos(mid)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async beforeupload() {
      const { data: res } = await getImgToken()
      if (res.code !== 0) return this.$message.error(res)
      this.imgpostdata.token = res.token
    },
    onChangeToolFile(file, fileList) {
      this.imgpostdata.file.uri = file.url
      this.hideUpload = fileList.length >= this.limitCount
    },
    postSuccess(response) {
      this.imgloading = false
      this.$message.success('上传成功！')
      this.Videoform.videoCover = `http://qiniu.wkkwx.cn/${response.key}`
    },
    postError() {
      this.imgloading = false
      this.$message.error('上传失败！')
    },
    progress() {
      this.imgloading = true
    },
    handlePictureCardPreview() {
      this.dialogVisible = true
    },
    handleRemove(file) {
      let fileList = this.$refs.upload.uploadFiles
      let index = fileList.findIndex(fileItem => {
        return fileItem.uid === file.uid
      })
      fileList.splice(index, 1)
      this.hideUpload = fileList.length >= this.limitCount
    },
    expandChange(row, expandedRows) {
      let that = this
      //只展开一行
      if (expandedRows.length) {
        //说明展开了
        that.expands = []
        if (row) {
          that.expands.push(row.mid) //只展开当前行id
        }
      } else {
        //说明收起了
        that.expands = []
      }
    },
    coverImg(url) {
      this.Videoform.videoCover = url
    },
    authorImg(url) {
      this.Videoform.author.portrait = url
    },
    handleChange(time) {
      let videotime = time[0] * 3600 + time[1] * 60 + time[2]
      this.Videoform.videotimelong = videotime
    },
    times() {
      let videohs = []
      for (let i = 0; i <= 3; i++) {
        videohs.push({
          value: i,
          label: `${i}时`,
          children: []
        })
        for (let y = 0; y < 60; y++) {
          videohs[i].children.push({
            value: y,
            label: `${y}分`,
            children: Array.from(new Array(60), (v, i) => (v = { value: i, label: `${i}秒` }))
          })
        }
      }
      this.options = videohs
    },
    qhsxxx() {
      if (this.isShelf == false) {
        this.hidetype = 'hide'
        this.queryinfo = {
          limit: 10,
          page: 1
        }
        this.getvideo()
      } else {
        this.hidetype = 'all'
        this.queryinfo = {
          limit: 10,
          page: 1
        }
        this.getvideo()
      }
    },
    async exithidetype(scope) {
      if (scope.hide == 0) {
        this.hideList.push(scope.mid)
      } else if (scope.hide == 1) {
        this.unhideList.push(scope.mid)
      }
      const { data: res } = await changeHideType(this.hideList, this.unhideList)
      if (res.code != 0) {
        this.$message.error(res.msg)
        this.getvideo()
        this.hideList = []
        this.unhideList = []
        return
      } else {
        this.$message.success(res.msg)
        this.getvideo()
        this.hideList = []
        this.unhideList = []
      }
    }
  },
  created() {
    if (window.sessionStorage.getItem('role') != 0) {
      this.isHideOnline = true
    } else if (window.sessionStorage.getItem('role') == 0) {
      this.isHideOnline = false
    }
    this.getType()
    this.getvideo()
  },
  components: {
    ImgUpload
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  padding: 10px 0 10px 0;
  .topbox {
    display: flex;
    justify-content: space-between;
  }
  .searchbox {
    display: flex;
    .searchbtn {
      margin: 0 0 0 10px;
    }
  }
  .el-card {
    margin-top: 10px;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.videoCoverbox {
  width: 70vw;
}
.btnrbox {
  padding-left: 60px;
  width: 56vw;
  .el-button {
    height: 40px;
    width: 40px;
  }
}
.hangyesel {
  margin-left: 80px;
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
.el-pagination-box {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.el-table {
  max-height: 67vh;
  overflow-y: scroll;
}
.el-card {
  height: 100%;
}
::-webkit-scrollbar {
  display: none; //隐藏滚动条
}
/deep/.el-dialog__body {
  height: 63vh;
}
.cardtbbox {
  height: 320px;
  overflow-y: scroll;
}
.el-form {
  height: 68vh;
  overflow-y: scroll;
}
.el-dialog__wrapper {
  height: 100vh;
}
.imgcover {
  height: 130px;
  width: 230px;
}
.selectbox {
  width: 100%;
}
.nrinput {
  margin-left: 80px;
}
.SwitchingBox {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.SwitchingBox .el-switch {
  margin-left: 10px;
}
</style>
<style>
.hide .el-upload--picture-card {
  display: none;
}
.imgdialog {
  height: 455px;
  width: 720px;
}
</style>
