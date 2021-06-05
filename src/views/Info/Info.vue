<template>
  <div class="bigbox">
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
        <el-table :data="ThisTimeSubData" stripe border style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <div style="display:flex;">
                  <el-form-item label="浏览量:">
                    <span>{{ props.row.views }}</span>
                  </el-form-item>
                  <el-form-item label="类型:">
                    <span v-for="(item, index) of typeList" :key="index" v-show="item.id == props.row.type">{{
                      item.label
                    }}</span>
                  </el-form-item>
                  <el-form-item label="行业:">
                    <span v-for="(item, index) of industryList" :key="index" v-show="item.id == props.row.industry">{{
                      item.label
                    }}</span>
                  </el-form-item>
                </div>
                <br />
                <el-form-item label="榜单:">
                  <span v-if="props.row.isList == true">是</span>
                  <span v-if="props.row.isList == false">否</span>
                </el-form-item>
                <el-form-item label="发布时间:">
                  <span>{{ props.row.releasetime }}</span>
                </el-form-item>
                <el-form-item label="原始链接:">
                  <span>{{ props.row.originallink }}</span>
                </el-form-item>
                <el-form-item label="标题:">
                  <span>{{ props.row.tittle }}</span>
                </el-form-item>
                <el-form-item label="信息来源:">
                  <span>{{ props.row.sponsor }}</span>
                </el-form-item>
                <el-form-item label="分享标题:">
                  <span>{{ props.row.sharelist.title }}</span>
                </el-form-item>
                <el-form-item label="分享内容:">
                  <span>{{ props.row.sharelist.text }}</span>
                </el-form-item>
                <el-form-item label="信息内容:">
                  <div v-for="(item, index) of props.row.msgcontent" :key="index">
                    <span class="xxnrlabel">内容{{ index + 1 }} : </span><span>{{ item }}</span>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="编号" prop="mid" width="200">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ (queryinfo.page - 1) * 10 + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="浏览量" prop="views"> </el-table-column>
          <el-table-column label="标题" prop="tittle"> </el-table-column>
          <el-table-column label="原始链接" prop="originallink"> </el-table-column>
          <el-table-column label="信息来源" prop="sponsor"> </el-table-column>
        </el-table>
        <div class="chongfubox">
          <div class="titlebox">已存在疑似重复数据</div>
          <el-table :data="forceData" stripe border style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <div style="display:flex;">
                    <el-form-item label="MID:">
                      <span>{{ props.row.mid }}</span>
                    </el-form-item>
                    <el-form-item label="浏览量:">
                      <span>{{ props.row.views }}</span>
                    </el-form-item>
                    <el-form-item label="类型:">
                      <span v-for="(item, index) of typeList" :key="index" v-show="item.id == props.row.type">{{
                        item.label
                      }}</span>
                    </el-form-item>
                    <el-form-item label="行业:">
                      <span v-for="(item, index) of industryList" :key="index" v-show="item.id == props.row.industry">{{
                        item.label
                      }}</span>
                    </el-form-item>
                  </div>
                  <el-form-item label="操作人:"
                    ><span v-for="(item, index) in props.row.users" :key="index">{{ item }}</span></el-form-item
                  >
                  <br />
                  <el-form-item label="添加时间:">
                    <span>{{ props.row.addtime }}</span>
                  </el-form-item>
                  <el-form-item label="榜单:">
                    <span v-if="props.row.isList == true">是</span>
                    <span v-if="props.row.isList == false">否</span>
                  </el-form-item>
                  <el-form-item label="发布时间:">
                    <span>{{ props.row.releasetime }}</span>
                  </el-form-item>
                  <el-form-item label="原始链接:">
                    <span>{{ props.row.originallink }}</span>
                  </el-form-item>
                  <el-form-item label="标题:">
                    <span>{{ props.row.tittle }}</span>
                  </el-form-item>
                  <el-form-item label="信息来源:">
                    <span>{{ props.row.sponsor }}</span>
                  </el-form-item>
                  <el-form-item label="分享标题:">
                    <span>{{ props.row.sharelist.title }}</span>
                  </el-form-item>
                  <el-form-item label="分享内容:">
                    <span>{{ props.row.sharelist.text }}</span>
                  </el-form-item>
                  <el-form-item label="信息内容:">
                    <div v-for="(item, index) of props.row.msgcontent" :key="index">
                      <span class="xxnrlabel">内容{{ index + 1 }} : </span><span>{{ item }}</span>
                    </div>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="编号" prop="mid" width="60">
              <template slot-scope="scope">
                <span style="margin-left:10px">{{ (queryinfo.page - 1) * 10 + scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="MID" prop="mid" width="80"> </el-table-column>
            <el-table-column label="浏览量" prop="views" width="90"> </el-table-column>
            <el-table-column label="标题" prop="tittle"> </el-table-column>
            <el-table-column label="信息来源" prop="sponsor" width="200"> </el-table-column>
            <el-table-column label="原始链接" prop="originallink"> </el-table-column>
            <el-table-column label="添加时间" prop="addtime" width="110px"></el-table-column>
            <el-table-column label="操作人" width="140px">
              <template slot-scope="scope">
                <span
                  v-show="index == scope.row.users.length - 1"
                  v-for="(item, index) in scope.row.users"
                  :key="index"
                  >{{ item }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="是否上线" width="90px">
              <template slot-scope="scope">
                <el-button
                  class="shangxianxiaxianbtn"
                  type="success"
                  @click="exithidetype(scope.row)"
                  v-if="scope.row.hide == 0"
                  plain
                  :disabled="isHideOnline"
                  size="mini"
                  >已上线</el-button
                >
                <el-button
                  class="shangxianxiaxianbtn"
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
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelClick">取消提交</el-button>
        <el-button type="warning" @click="ContinueSub" :disabled="ContinueSubDis">继续提交</el-button>
      </span>
    </el-dialog>

    <!-- ********************************************************************* -->

    <el-dialog
      :title="ConsultingType === 'add' ? '新增' : '编辑'"
      :destroy-on-close="true"
      :show-close="true"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      v-alterELDialogMarginTop="{ marginTop: '5vh' }"
      width="80%"
    >
      <div class="dialogbox">
        <el-form inline :model="infoForm" label-position="right" label-width="150px">
          <div class="biaoti-title">
            <el-form-item label="标题">
              <el-input
                type="textarea"
                @blur="getTitle($event)"
                style="width:680px"
                autosize
                v-model="infoForm.tittle"
                placeholder="请输入标题"
              >
              </el-input>
            </el-form-item>
            <div>①</div>
          </div>
          <el-form-item label="信息来源">
            <el-input
              type="textarea"
              style="width:680px"
              autosize
              v-model="infoForm.sponsor"
              placeholder="请输入信息来源"
            ></el-input>
          </el-form-item>
          <br />
          <div class="fabu-time">
            <el-form-item label="浏览量">
              <el-input v-model="infoForm.views" style="width:260px" placeholder="请输入浏览量"></el-input>
            </el-form-item>
            <el-form-item label="发布时间">
              <template>
                <el-date-picker
                  v-model="infoForm.releasetime"
                  type="datetime"
                  style="width:260px"
                  placeholder="选择日期时间"
                  @change="getTiem($event)"
                >
                </el-date-picker>
              </template>
            </el-form-item>
            <div>②</div>
            <el-button type="primary" size="mini" @click="chachong">查重</el-button>
          </div>
          <br />
          <el-form-item label="新类" label-width="75px" class="newtype">
            <el-select style="width:170px" @change="getIsList" v-model="infoForm.newtype" placeholder="请选择新类">
              <el-option v-for="item in newtypeList" :key="item.value" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行业" label-width="75px">
            <el-select style="width:170px" @change="getIsList" v-model="infoForm.industry" placeholder="请选择行业">
              <el-option
                v-for="item in industryList"
                :key="item.value"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-checkbox v-model="infoForm.isList" border @change="ListChange">榜单</el-checkbox>
          <br />
          <el-form-item label="分享标题">
            <el-input
              v-model="infoForm.sharelist.title"
              autosize
              style="width:680px"
              type="textarea"
              :rows="2"
              placeholder="请输入分享标题"
            />
          </el-form-item>
          <el-form-item label="分享内容">
            <el-input
              v-model="infoForm.sharelist.text"
              autosize
              style="width:680px"
              type="textarea"
              :rows="2"
              placeholder="请输入分享内容"
            />
          </el-form-item>
          <el-form-item label="原始链接">
            <el-input
              v-model="infoForm.originallink"
              autosize
              style="width:680px"
              type="textarea"
              :rows="2"
              placeholder="请输入原始链接 "
            />
          </el-form-item>
          <el-checkbox v-model="infoForm.isWebpage" @change="isWebpageChange" border>网页</el-checkbox>
          <br />
          <div v-for="(item, index) of infoForm.msgcontent" :key="index" v-show="isMsgcontentShow">
            <el-form-item :label="`信息内容${index + 1}`">
              <div class="msgbox">
                <el-input
                  v-model="infoForm.msgcontent[index]"
                  autosize
                  style="width:680px"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容 "
                />
                <div class="xxnrbtndel" @click="delmsg(index)" v-if="index != 0">-</div>
                <div class="xxnrbtnadd" @click="addmsg" v-if="index == infoForm.msgcontent.length - 1">+</div>
                <CheckboxTh ref="checkson" :index="index" style="margin-left:10px" @ischecked="ischecked" />
              </div>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="quxiaoclick">取 消</el-button>
          <el-button type="primary" @click="submitform" :disabled="subDis">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <div class="topbox">
      <div class="headers">
        <el-button type="success" @click="addConsulting">添加资讯</el-button>
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
        <el-switch
          style="display: block"
          v-model="isOwn"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="显示自己"
          inactive-text="显示所有人"
          @change="seachown"
        >
        </el-switch>
      </div>
      <div class="searchbox">
        <el-input
          clearable
          @change="vagueSelect"
          @clear="cleardata"
          placeholder="请输入内容"
          v-model="mhcxData"
        ></el-input>
        <el-button type="primary" class="searchbtn" @click="vagueSelect">搜索</el-button>
      </div>
    </div>

    <el-card>
      <template>
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%"
          @expand-change="expandChange"
          :expand-row-keys="expands"
          :row-key="getRowKeys"
          v-loading="loading"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <div style="display:flex;">
                  <el-form-item label="MID:">
                    <span>{{ props.row.mid }}</span>
                  </el-form-item>
                  <el-form-item label="浏览量:">
                    <span>{{ props.row.views }}</span>
                  </el-form-item>
                  <el-form-item label="类型:">
                    <span v-for="(item, index) of typeList" :key="index" v-show="item.id == props.row.type">{{
                      item.label
                    }}</span>
                  </el-form-item>
                  <el-form-item label="行业:">
                    <span v-for="(item, index) of industryList" :key="index" v-show="item.id == props.row.industry">{{
                      item.label
                    }}</span>
                  </el-form-item>
                </div>
                <el-form-item label="操作人:"
                  ><span v-for="(item, index) in props.row.users" :key="index">{{ item }}</span></el-form-item
                >
                <br />
                <el-form-item label="添加时间:">
                  <span>{{ props.row.addtime }}</span>
                </el-form-item>
                <el-form-item label="榜单:">
                  <span v-if="props.row.isList == true">是</span>
                  <span v-if="props.row.isList == false">否</span>
                </el-form-item>
                <el-form-item label="发布时间:">
                  <span>{{ props.row.releasetime }}</span>
                </el-form-item>
                <el-form-item label="原始链接:">
                  <span>{{ props.row.originallink }}</span>
                </el-form-item>
                <el-form-item label="标题:">
                  <span>{{ props.row.tittle }}</span>
                </el-form-item>
                <el-form-item label="信息来源:">
                  <span>{{ props.row.sponsor }}</span>
                </el-form-item>
                <el-form-item label="分享标题:">
                  <span>{{ props.row.sharelist.title }}</span>
                </el-form-item>
                <el-form-item label="分享内容:">
                  <span>{{ props.row.sharelist.text }}</span>
                </el-form-item>
                <el-form-item label="信息内容:">
                  <div v-for="(item, index) of props.row.msgcontent" :key="index">
                    <span class="xxnrlabel">内容{{ index + 1 }} : </span><span>{{ item }}</span>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="编号" prop="mid" width="60">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ (queryinfo.page - 1) * 10 + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="MID" prop="mid" width="80"> </el-table-column>
          <el-table-column label="浏览量" prop="views" width="90"> </el-table-column>
          <el-table-column label="标题" prop="tittle"> </el-table-column>
          <el-table-column label="信息来源" prop="sponsor" width="200"> </el-table-column>
          <el-table-column label="添加时间" prop="addtime" width="110px"></el-table-column>
          <el-table-column label="操作人" width="140px">
            <template slot-scope="scope">
              <span
                v-show="index == scope.row.users.length - 1"
                v-for="(item, index) in scope.row.users"
                :key="index"
                >{{ item }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="是否上线" width="90px">
            <template slot-scope="scope">
              <el-button
                class="shangxianxiaxianbtn"
                type="success"
                @click="exithidetype(scope.row)"
                v-if="scope.row.hide == 0"
                plain
                :disabled="isHideOnline"
                size="mini"
                >已上线</el-button
              >
              <el-button
                class="shangxianxiaxianbtn"
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
              <el-button size="mini" :disabled="isEditOnline" @click="editData(scope.row)">编辑</el-button>
              <el-button size="mini" :disabled="isDeleOnline" type="danger" @click="deleteDatas(scope.row)"
                >删除</el-button
              >
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
          @current-change="getinfodata"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import CheckboxTh from '../../components/CheckboxTh'
import { getTypeList } from '../../api/video'
import { getTitleSimilarity } from '../../api/main'
import { getInfoList, addInfoList, editInfoList, deleteInfoList, changeHideType } from '../../api/info'
export default {
  data() {
    return {
      loading: false,
      queryinfo: {
        limit: 10,
        page: 1,
        hidetype: 'all',
        keyword: ''
      },
      totals: 0,
      ConsultingType: 'add',
      dialogVisible: false,
      tableData: [
        {
          tittle: '',
          sponsor: '',
          views: '',
          mid: '',
          releasetime: ''
        }
      ],
      infoForm: {
        tittle: '',
        sponsor: '',
        views: '',
        type: '',
        newtype: '',
        industry: '',
        isList: false,
        isWebpage: false,
        releasetime: '',
        originallink: '',
        sharelist: {
          title: '',
          text: ''
        },
        msgcontent: [''],
        users: [],
        addtime: ''
      },
      typeList: [],
      newtypeList: [],
      industryList: [],
      //设置row-key只展示一行
      expands: [], //只展开一行放入当前行id
      getRowKeys(row) {
        return row.mid
      },
      hidetypelist: [],
      unhidetypelist: [],
      isShelf: true,
      isHideOnline: true,
      isDeleOnline: true,
      isEditOnline: false,
      mhcxData: '',
      isMsgcontentShow: true,
      msgcontentBackup: [''],
      isOwn: false,
      Isforce: false,
      ThisTimeSubData: [],
      forceData: [],
      forceSubmit: false,
      ContinueSubDis: false,
      subDis: false,
      biaoti: '',
      fabutime: ''
    }
  },
  methods: {
    async getinfodata() {
      //获取所有列表
      this.loading = true
      const { data: res } = await getInfoList(this.queryinfo)
      if (res) {
        this.loading = false
      }
      if (res.success !== true) return this.$message.error(res.msg)
      this.totals = res.data.totalCount
      this.tableData = res.data.items
    },
    async gettype() {
      const { data: res } = await getTypeList()
      this.typeList = res.data[2].data
      this.industryList = res.data[1].data
      this.newtypeList = res.data[3].data
    },
    addConsulting() {
      this.ConsultingType = 'add'
      this.dialogVisible = true
    },
    editData(scope) {
      this.dialogVisible = true
      this.ConsultingType = 'edit'
      this.infoForm = scope
      this.msgcontentBackup = scope.msgcontent
      if (scope.isWebpage !== true) {
        this.isMsgcontentShow = true
        scope.msgcontent.map((item, index) => {
          if (item.indexOf('__weca_img__ ') != -1) {
            setTimeout(() => {
              this.$refs.checkson[index].checked = true
            }, 0)
          }
        })
      } else {
        this.infoForm.msgcontent = ['']
        this.isMsgcontentShow = false
      }
    },
    deleteDatas(scope) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let mid = scope.mid
          this.delInfo(mid)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    quxiaoclick() {
      this.quxiao()
    },
    handleClose() {
      this.quxiaoclick()
    },
    submitform() {
      if (this.ConsultingType == 'add') {
        this.addData()
      } else {
        this.editDatas()
      }
    },
    async addData() {
      let date = new Date()
      let yy = date.getFullYear()
      let mm = date.getMonth() + 1
      let dd = date.getDate()
      let hh = date.getHours()
      this.infoForm.addtime = `${yy}/${mm}/${dd}/${hh}`
      this.infoForm.users.push(`${window.sessionStorage.getItem('username')}(新增)`)
      if (this.infoForm.isWebpage == true) {
        this.infoForm.msgcontent = ''
      }
      this.forceSubmit = false
      const { data: res } = await addInfoList(this.infoForm, this.forceSubmit)
      if (res.code !== 0 && res.code === 4) {
        this.forceSubmit = true
        this.Isforce = true
        this.ThisTimeSubData = [this.infoForm]
        this.forceData = res.data
        this.quxiao()
      } else if (res.code === 0) {
        this.quxiao()
        this.getinfodata()
        this.$message.success(res.msg)
        this.msgcontentBackup = ['']
      } else {
        this.$message.error(res.msg)
        return
      }
      this.subDis = false
    },
    async ContinueSub() {
      this.ContinueSubDis = true
      this.forceSubmit = true
      const { data: res } = await addInfoList(this.ThisTimeSubData[0], this.forceSubmit)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.cancelClick()
      this.ContinueSubDis = false
    },
    cancelClick() {
      this.Isforce = false
      this.forceSubmit = false
      this.ThisTimeSubData = []
      this.forceData = []
    },
    async editDatas() {
      //提交修改
      this.infoForm.users.push(`--${window.sessionStorage.getItem('username')}(修改)`)
      const { data: res } = await editInfoList(this.infoForm)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.getinfodata()
      this.quxiao()
      this.$message.success(res.msg)
      this.msgcontentBackup = ['']
      this.subDis = false
      setTimeout(() => {
        this.subDis = true
      }, 3000)
    },
    async delInfo(mid) {
      const { data: res } = await deleteInfoList(mid)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.getinfodata()
      this.$message.success(res.msg)
      this.msgcontentBackup = ['']
    },
    quxiao() {
      this.dialogVisible = false
      this.infoForm = {
        tittle: '',
        sponsor: '',
        views: '',
        type: '',
        newtype: '',
        industry: '',
        isList: false,
        isWebpage: false,
        releasetime: '',
        originallink: '',
        sharelist: {
          title: '',
          text: ''
        },
        msgcontent: [''],
        users: [],
        addtime: ''
      }
      this.isMsgcontentShow = true
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
    addmsg() {
      this.infoForm.msgcontent.push('')
    },
    delmsg(i) {
      this.infoForm.msgcontent.splice(i, 1)
    },

    ListChange() {
      if (this.infoForm.isList == true) {
        this.typeList.map(arr => {
          if (arr.label == '综合') return (this.infoForm.type = arr.id)
        })
        this.industryList.map(arr => {
          if (arr.label == '综合') return (this.infoForm.industry = arr.id)
        })
        this.newtypeList.map(arr => {
          if (arr.label == '综合') return (this.infoForm.newtype = arr.id)
        })
      } else {
        this.infoForm.type = ''
        this.infoForm.industry = ''
        this.infoForm.newtype = ''
      }
    },
    isWebpageChange() {
      if (this.infoForm.isWebpage == true) {
        this.isMsgcontentShow = false
      } else {
        this.infoForm.msgcontent = this.msgcontentBackup
        this.isMsgcontentShow = true
      }
    },
    getIsList() {
      if (this.infoForm.type == 599 && this.infoForm.industry == 498) {
        this.infoForm.isList = true
      } else {
        this.infoForm.isList = false
      }
    },
    async exithidetype(row) {
      if (row.hide == 0) {
        this.hidetypelist.push(row.mid)
      } else if (row.hide == 1) {
        this.unhidetypelist.push(row.mid)
      }
      const { data: res } = await changeHideType(this.hidetypelist, this.unhidetypelist)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.hidetypelist = []
      this.unhidetypelist = []
      this.getinfodata()
    },
    qhsxxx() {
      if (this.isShelf == false) {
        if (this.isOwn == false) {
          this.queryinfo = {
            hidetype: 'hide',
            limit: 10,
            page: 1,
            keyword: this.mhcxData,
            username: ''
          }
        } else {
          this.queryinfo = {
            hidetype: 'hide',
            limit: 10,
            page: 1,
            keyword: this.mhcxData,
            username: window.sessionStorage.getItem('username')
          }
        }
        this.getinfodata()
      } else {
        if (this.isOwn == false) {
          this.queryinfo = {
            hidetype: 'all',
            limit: 10,
            page: 1,
            keyword: this.mhcxData,
            username: ''
          }
        } else {
          this.queryinfo = {
            hidetype: 'all',
            limit: 10,
            page: 1,
            keyword: this.mhcxData,
            username: window.sessionStorage.getItem('username')
          }
        }
        this.getinfodata()
      }
    },
    seachown() {
      if (this.isOwn == true) {
        if (this.isShelf == true) {
          this.queryinfo = {
            hidetype: 'all',
            limit: 10,
            page: 1,
            keyword: this.mhcxData,
            username: window.sessionStorage.getItem('username')
          }
        } else {
          this.queryinfo = {
            hidetype: 'hide',
            limit: 10,
            page: 1,
            keyword: this.mhcxData,
            username: window.sessionStorage.getItem('username')
          }
        }
        this.getinfodata()
      } else {
        if (this.isShelf == true) {
          this.queryinfo = {
            hidetype: 'all',
            limit: 10,
            page: 1,
            keyword: this.mhcxData,
            username: ''
          }
        } else {
          this.queryinfo = {
            hidetype: 'hide',
            limit: 10,
            page: 1,
            keyword: this.mhcxData,
            username: window.sessionStorage.getItem('username')
          }
        }
        this.getinfodata()
      }
    },
    cleardata() {
      this.queryinfo.keyword = ''
      this.getinfodata()
    },
    vagueSelect() {
      this.queryinfo.keyword = this.mhcxData
      this.getinfodata()
    },
    getTitle(e) {
      this.biaoti = e.target.value
    },
    getTiem(e) {
      let T = new Date(e).getTime()
      this.fabutime = T
    },
    async chachong() {
      let data = {
        time: this.fabutime,
        title: this.biaoti
      }
      if (this.fabutime == '' || this.biaoti == '') {
        this.$message.error('请输入发布时间和标题！')
        return
      }
      let type = 'info'
      const { data: res } = await getTitleSimilarity(data, type)
      console.log(res)
      if (res.code !== 0) {
        this.$message.error(res.msg)
        this.forceData = res.data
        this.Isforce = true
        return
      }
      this.$message.success('数据可用')
    },
    ischecked(ch, index) {
      if (ch == true && this.infoForm.msgcontent[index] != '') {
        this.infoForm.msgcontent[index] = `__weca_img__ ` + this.infoForm.msgcontent[index]
      } else {
        this.infoForm.msgcontent[index] = this.infoForm.msgcontent[index].replace('__weca_img__ ', '')
      }
    }
  },
  created() {
    const limit = window.sessionStorage.getItem('limits')
    const lmap = JSON.parse(window.sessionStorage.getItem('lmap'))
    if ((limit & lmap.z_edit) == lmap.z_edit) {
      this.isEditOnline = false
    } else {
      this.isEditOnline = true
    }
    if ((limit & lmap.z_dele) == lmap.z_dele) {
      this.isDeleOnline = false
    } else {
      this.isDeleOnline = true
    }
    if ((limit & lmap.z_hide) == lmap.z_hide) {
      this.isHideOnline = false
    } else {
      this.isHideOnline = true
    }
    this.gettype()
    this.getinfodata()
  },
  components: {
    CheckboxTh
  }
}
</script>

<style lang="scss" scoped>
.bigbox {
  margin: 0;
  padding: 0;
  .headers {
    margin-top: 10px;
    display: flex;
    align-items: center;
    .el-switch {
      margin-left: 20px;
    }
  }
  .el-card {
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
  .demo-table-expand {
    font-size: 0;
    a {
      text-decoration: underline;
      color: rgb(18, 37, 214);
    }
    .el-form-item {
      font-weight: bold;
      span {
        font-weight: initial;
      }
    }
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
  .el-pagination-box {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .msgbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .xxnrbtndel:hover {
      cursor: pointer;
      background: #f56c6ca6;
    }
    .xxnrbtnadd:hover {
      cursor: pointer;
      background: #40a0ffb6;
    }
    .xxnrbtnadd {
      width: 45px;
      height: 33px;
      color: #ffffff;
      background: #409eff;
      font-size: 20px;
      border-radius: 5px;
      text-align: center;
      line-height: 33px;
      margin-left: 10px;
    }
    .xxnrbtndel {
      width: 45px;
      height: 33px;
      color: #ffffff;
      background: #f56c6c;
      font-size: 20px;
      border-radius: 5px;
      text-align: center;
      line-height: 33px;
      margin-left: 10px;
    }
  }
  .xxnrlabel {
    display: block;
    color: red;
  }
}
.topbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.searchbox {
  display: flex;
  align-items: center;
  .searchbtn {
    margin: 0 0 0 10px;
  }
}
.el-form {
  //添加滚动条
  height: 68vh;
  overflow-y: scroll;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding-right: 6vw;
  margin-top: 30px;
}
.newtype {
  margin-left: 75px;
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
.fabu-time {
  display: flex;
  flex-direction: row;
  div {
    height: 40px;
    display: flex;
    align-items: center;
  }
  .el-button {
    margin-left: 10px;
    height: 30px;
    margin-top: 5px;
  }
}
.biaoti-title {
  display: flex;
  flex-direction: row;
  div {
    height: 40px;
    display: flex;
    align-items: center;
  }
}
</style>
