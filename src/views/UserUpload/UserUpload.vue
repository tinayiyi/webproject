<template>
  <div>
    <div class="user-up-title-box">
      <div class="searchbox">
        <el-input clearable @clear="vagueSelectss" v-model="mhcxData" placeholder="请输入内容"></el-input>
        <el-button type="primary" class="searchbtn" @click="vagueSelectss">搜索</el-button>
      </div>
    </div>
    <el-dialog
      :destroy-on-close="false"
      :show-close="true"
      :close-on-click-modal="false"
      :title="operateType === 'add' ? '新增' : '审核'"
      :visible.sync="isShow"
      v-alterELDialogMarginTop="{ marginTop: '5vh' }"
      width="85vw"
      :before-close="quxiao"
    >
      <CommonForm
        @poscitynymber="poscitynymber"
        :detobjs="detobjs"
        :form="operateForm"
        ref="ruleForm"
        :formLabel="operateFormLable"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao()">取 消</el-button>
        <el-button :disabled="submitbtn" type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>
    <el-card>
      <el-table
        :data="tableData[0]"
        border
        style="width: 100%"
        stripe
        v-loading="loading"
        @expand-change="expandChange"
        :expand-row-keys="expands"
        :row-key="getRowKeys"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="cardtbbox">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="操作人:">
                  <span v-for="(item, index) in props.row.details.else.name" :key="index">{{ item }} -- </span>
                </el-form-item>
                <el-form-item label="添加时间:">
                  <span>{{ props.row.details.else.addTime }}</span>
                </el-form-item>
                <el-form-item label="mid:">
                  <span>{{ props.row.maininfo.mid }}</span>
                </el-form-item>
                <el-form-item label="浏览量:">
                  <span>{{ props.row.details.view_vol }}</span>
                </el-form-item>
                <el-form-item label="收藏量:">
                  <span>{{ props.row.details.follow_vol }}</span>
                </el-form-item>
                <el-form-item label="hotMeet:">
                  <span>{{ props.row.maininfo.hotMeet }}</span>
                </el-form-item>
                <el-form-item label="标题:">
                  <span>{{ props.row.maininfo.title }}</span>
                </el-form-item>
                <el-form-item label="主办方:">
                  <span>{{ props.row.maininfo.orgName }}</span>
                </el-form-item>
                <el-form-item label="状态:">
                  <span v-if="props.row.maininfo.p_status == 1">进行中</span>
                  <span v-else-if="props.row.maininfo.p_status == 2">预约中</span>
                  <span v-else-if="props.row.maininfo.p_status == 3">回看中</span>
                </el-form-item>
                <el-form-item label="主讲人:">
                  <span>{{ props.row.maininfo.speaker }}</span>
                </el-form-item>
                <el-form-item label="标签:">
                  <span v-show="props.row.maininfo.type == item.id" v-for="(item, index) in typeList" :key="index">{{
                    item.label
                  }}</span>
                </el-form-item>
                <el-form-item label="行业:">
                  <span
                    v-for="(item, index) in industryList"
                    :key="index"
                    v-show="props.row.maininfo.industry == item.id"
                    >{{ item.label }}</span
                  >
                </el-form-item>
                <el-form-item label="模式:">
                  <span v-if="props.row.maininfo.isOnline == 'online'">线上</span>
                  <span v-else>线下</span>
                </el-form-item>
                <el-form-item label="优先等级:">
                  <span v-if="props.row.maininfo.meetPriority == 1">一级</span>
                  <span v-else-if="props.row.maininfo.meetPriority == 2">二级</span>
                  <span v-else-if="props.row.maininfo.meetPriority == 3">三级</span>
                  <span v-else-if="props.row.maininfo.meetPriority == 4">四级</span>
                  <span v-else-if="props.row.maininfo.meetPriority == 5">五级</span>
                </el-form-item>
                <el-form-item label="开始时间:">
                  <span>{{ props.row.maininfo.startTime | dateFormat }}</span>
                </el-form-item>
                <el-form-item label="结束时间:">
                  <span>{{ props.row.maininfo.endTime | dateFormat }}</span>
                </el-form-item>
                <el-form-item label="封面:">
                  <img :src="props.row.maininfo.coverUrl" class="imgcover" />
                </el-form-item>
                <el-form-item label="官方网站:">
                  <span>{{ props.row.details.websiteUrl }}</span>
                </el-form-item>
                <el-form-item label="价格:">
                  <span>{{ props.row.details.price }}</span>
                </el-form-item>
                <el-form-item label="地址:">
                  <span>
                    {{ CodeToText[props.row.details.position.address[0]] }},
                    {{ CodeToText[props.row.details.position.address[1]] }},
                    {{ CodeToText[props.row.details.position.address[2]] }}
                  </span>
                  <br />
                  详细地址：<span>{{ props.row.details.position.xxaddress }}</span>
                </el-form-item>
                <el-form-item label="是否为国外:">
                  <span>{{ props.row.details.position.isAbroad }}</span>
                </el-form-item>
                <el-form-item label="分享类型:">
                  <span v-if="props.row.details.sharelist.sharetype == 'news'">信息分享</span>
                  <span v-else>图片分享</span>
                </el-form-item>
                <el-form-item label="分享标题:">
                  <span>{{ props.row.details.sharelist.title }}</span>
                </el-form-item>
                <el-form-item label="分享内容:">
                  <span>{{ props.row.details.sharelist.text }}</span>
                </el-form-item>
                <el-form-item label="消息内容:" v-for="(item, i) of props.row.details.describe" :key="i">
                  <span class="xxnr">{{ item.title }}:</span>
                  <div v-for="(its, index) of item.text" :key="index">{{ its }}</div>
                  <br />
                </el-form-item>
              </el-form>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="编号" width="60">
          <template slot-scope="scope">
            <span style="margin-left:10px">{{ (queryinfo.page - 1) * 10 + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="MID" prop="maininfo.mid" width="80"> </el-table-column>
        <el-table-column label="主办方" prop="maininfo.orgName" width="180"> </el-table-column>
        <el-table-column label="状态" prop="maininfo.p_status" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.maininfo.p_status == 1" type="success" size="mini">进行中</el-tag>
            <el-tag v-else-if="scope.row.maininfo.p_status == 2" type="danger" size="mini">预约中</el-tag>
            <el-tag v-else-if="scope.row.maininfo.p_status == 3" size="mini">回看中</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="主讲人" prop="maininfo.speaker" width="90"> </el-table-column>
        <el-table-column class="biaoti" label="标题" prop="maininfo.title"> </el-table-column>
        <el-table-column class="biaoti" label="添加时间" prop="details.else.addTime" width="130"> </el-table-column>
        <el-table-column class="biaoti" label="操作人" prop="details.else.name" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.details.else.name[scope.row.details.else.name.length - 1] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否上线" width="110px">
          <template slot-scope="scope">
            <Checkboxs v-show="isshowcheckbox" :key="checkboxcj" :scopes="scope.row" @getpiliangmid="getpiliangmid" />
            <el-button
              class="shangxianxiaxianbtn"
              type="success"
              @click="exithidetype(scope.row)"
              v-if="scope.row.hide == true"
              plain
              :disabled="isHideOnline"
              size="mini"
              >已上线</el-button
            >
            <el-button
              class="shangxianxiaxianbtn"
              type="warning"
              @click="exithidetype(scope.row)"
              v-if="scope.row.hide == false"
              plain
              :disabled="isHideOnline"
              size="mini"
              >已下线</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" :disabled="isEditOnline" @click="editData(scope.row)">审核</el-button>
            <el-button size="mini" :disabled="isDeleOnline" type="danger" @click="deleteDatas(scope.row)"
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
          @current-change="getList"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import Checkboxs from '../../components/Checkboxs'
import CommonForm from '../../components/CommonForm'
import {
  addData,
  getMeetList,
  editData,
  deleteData,
  getSelectList,
  getHideData,
  changeHideType
} from '../../api/userupload'
import { CodeToText } from 'element-china-area-data'
export default {
  data() {
    return {
      queryinfo: {
        limit: 10,
        page: 1
      },
      totals: 0,
      tableData: [],
      operateForm: {
        coverUrl: '',
        endTime: '',
        hotMeet: true,
        logo: '',
        meetPriority: '',
        mid: '',
        oid: '',
        orgName: '',
        p_status: '',
        roadshowType: '',
        speaker: '',
        startTime: '',
        tags: '',
        title: '',
        type: '',
        isOnline: '',
        details: {
          price: '',
          position: { address: [], xxaddress: '', isAbroad: false },
          describe: [{ title: '', text: [''] }]
        },
        industry: ''
      },
      detobjs: {
        websiteUrl: '',
        view_vol: '',
        follow_vol: '',
        price: '',
        position: { address: [], xxaddress: '', isAbroad: false },
        sharelist: { title: '', text: '', sharetype: '', url: '', thumb: '' },
        describe: [{ title: '', text: [''] }]
      },
      operateFormLable: [
        {
          model: 'meetPriority',
          label: '优先等级',
          type: 'select',
          opts: [
            {
              label: '一级',
              value: 1
            },
            {
              label: '二级',
              value: 2
            },
            {
              label: '三级',
              value: 3
            },
            {
              label: '四级',
              value: 4
            },
            {
              label: '五级',
              value: 5
            }
          ]
        },
        {
          model: 'hotMeet',
          label: 'hotMeet',
          type: 'radio'
        },
        {
          model: 'orgName',
          label: '主办方'
        },
        {
          model: 'speaker',
          label: '主讲人',
          styles: 'border_red'
        },
        {
          model: 'startTime',
          label: '开始时间',
          type: 'date',
          styles: 'border_red'
        },
        {
          model: 'endTime',
          label: '结束时间',
          type: 'date',
          styles: 'border_red'
        },
        {
          model: 'title',
          label: '标题',
          type: 'textarea',
          rows: 2
        },
        {
          model: 'type',
          label: '类型',
          type: 'selects',
          opts: [],
          styles: 'border_red'
        },
        {
          model: 'isOnline',
          label: '模式',
          type: 'select',
          opts: [
            {
              label: '线上',
              value: 'online'
            },
            {
              label: '线下',
              value: 'offline'
            }
          ],
          styles: 'border_red'
        },
        {
          model: 'industry',
          label: '行业分类',
          type: 'selects',
          opts: [],
          styles: 'border_red'
        }
      ],
      //设置row-key只展示一行
      expands: [], //只展开一行放入当前行id
      getRowKeys(row) {
        return row.maininfo.mid
      },
      loading: true,
      cityNum: '',
      CodeToText,
      typeList: [],
      industryList: [],
      names: [],
      addTime: '',
      caozuozhe: '',
      mohuchaxunData: '',
      isshowcheckbox: false,
      plsxxxlist: [],
      plsxxxlistun: [],
      checkboxcj: '',
      hidetype: '',
      shangxianbtn: true,
      xiaxianbtn: false,
      submitbtn: false,
      isHideOnline: true,
      isDeleOnline: true,
      isEditOnline: false,
      mhcxData: ''
    }
  },
  methods: {
    jtcxData(data) {
      this.mohuchaxunData = data
    },
    async getList() {
      let params = {
        page: this.queryinfo.page,
        limit: this.queryinfo.limit,
        keyword: this.mohuchaxunData,
        hidetype: this.hidetype
      }
      const { data: res } = await getMeetList(params)
      if (res.success !== true) return this.$message.error(res.error)
      let datas = res.data.items
      datas.forEach(arr => {
        if (!Array.isArray(arr.details.else.name)) {
          arr.details.else.name = [`${arr.details.else.name}(新增)`]
        }
        if (arr.hide == 0) {
          arr.hide = true
        } else if (arr.hide == 1) {
          arr.hide = false
        }
      })
      this.tableData = [datas]
      this.totals = res.data.totalCount
      if (res) {
        this.loading = false
      }
    },
    async vagueSelectss() {
      let params = {
        page: this.queryinfo.page,
        limit: this.queryinfo.limit,
        keyword: this.mhcxData
      }
      const { data: res } = await getMeetList(params)
      if (res.success !== true) return this.$message.error(res.error)
      let datas = res.data.items
      datas.forEach(arr => {
        if (!Array.isArray(arr.details.else.name)) {
          arr.details.else.name = [`${arr.details.else.name}(新增)`]
        }
        if (arr.hide == 0) {
          arr.hide = true
        } else if (arr.hide == 1) {
          arr.hide = false
        }
      })
      this.tableData = [datas]
      this.totals = res.data.totalCount
      if (res) {
        this.loading = false
      }
    },
    async getSelect() {
      const { data: res } = await getSelectList()
      if (res.code !== 0) return this.$message.error(res.error)
      this.operateFormLable[9].opts = res.data[1].data
      this.operateFormLable[7].opts = res.data[2].data
      this.typeList = res.data[2].data
      this.industryList = res.data[1].data
    },
    deleteDatas(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delData(row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    editData(row) {
      this.operateForm = row.maininfo
      this.detobjs = row.details
      this.names = row.details.else.name
      this.addTime = row.details.else.addTime
      setTimeout(() => {
        this.$refs.ruleForm.pushItems()
        this.$refs.ruleForm.checkboxfun(row.details.describe)
      }, 0)
      this.$store.commit('editData', row)
      let user = window.sessionStorage.getItem('username')
      this.names.push(`${user}(修改)`)
    },
    async delData(row) {
      const { data: res } = await deleteData(row.maininfo.mid)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.getList()
      this.$message.success(res.msg)
    },
    quxiao() {
      this.$store.commit('quxiao')
      this.$refs.ruleForm.quxiaoss()
      this.operateForm = {
        coverUrl: '',
        endTime: '',
        hotMeet: true,
        logo: '',
        meetPriority: '',
        mid: '',
        oid: '',
        orgName: '',
        p_status: '',
        roadshowType: '',
        speaker: '',
        startTime: '',
        tags: '',
        title: '',
        type: '',
        isOnline: '',
        details: {
          price: '',
          position: { address: ['', '', ''], xxaddress: '', isAbroad: false },
          describe: [{ title: '', text: [''] }]
        },
        industry: ''
      }
      this.detobjs = {
        websiteUrl: '',
        view_vol: '',
        follow_vol: '',
        price: '',
        position: { address: ['', '', ''], xxaddress: '', isAbroad: false },
        sharelist: { title: '', text: '', sharetype: '', url: '', thumb: '' },
        describe: [{ title: '', text: [''] }]
      }
      this.names = []
      this.addTime = ''
      this.getList()
    },
    confirm() {
      this.submitbtn = true
      if (this.operateType === 'edit') {
        this.edits()
      } else if (this.operateType === 'add') {
        this.adds()
      }
      setTimeout(() => {
        this.submitbtn = false
      }, 3000)
    },
    async adds() {
      let date = new Date()
      let yy = date.getFullYear()
      let mm = date.getMonth() + 1
      let dd = date.getDate()
      let hh = date.getHours()
      this.addTime = `${yy}/${mm}/${dd}/${hh}时`
      let maininfo = {
        coverUrl: this.$refs.ruleForm.coverUrl,
        endTime: this.operateForm.endTime,
        hotMeet: this.operateForm.hotMeet,
        logo: this.$refs.ruleForm.logo,
        meetPriority: this.operateForm.meetPriority,
        mid: this.operateForm.mid,
        oid: this.operateForm.oid,
        orgName: this.operateForm.orgName,
        p_status: this.operateForm.p_status,
        roadshowType: this.operateForm.roadshowType,
        speaker: this.operateForm.speaker,
        startTime: this.operateForm.startTime,
        tags: this.operateForm.tags,
        title: this.operateForm.title,
        type: this.operateForm.type,
        isOnline: this.operateForm.isOnline,
        industry: this.operateForm.industry
      }
      let details = {
        websiteUrl: this.detobjs.websiteUrl,
        view_vol: this.detobjs.view_vol,
        follow_vol: this.detobjs.follow_vol,
        price: this.detobjs.price,
        position: this.detobjs.position,
        sharelist: {
          title: this.detobjs.sharelist.title,
          text: this.detobjs.sharelist.text,
          sharetype: this.detobjs.sharelist.sharetype,
          url: `https://zb-api.cuomj.cn/web/share`,
          thumb: maininfo.coverUrl
        },
        describe: this.$refs.ruleForm.items,
        else: {
          name: [`${window.sessionStorage.getItem('username')}(新增)`],
          addTime: this.addTime
        }
      }
      const { data: res } = await addData(maininfo, details)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.quxiao()
      this.getList()
    },
    async edits() {
      let maininfo = {
        coverUrl: this.$refs.ruleForm.coverUrl,
        endTime: this.operateForm.endTime,
        hotMeet: this.operateForm.hotMeet,
        logo: this.$refs.ruleForm.logo,
        meetPriority: this.operateForm.meetPriority,
        mid: this.operateForm.mid,
        oid: this.operateForm.oid,
        orgName: this.operateForm.orgName,
        p_status: this.operateForm.p_status,
        roadshowType: this.operateForm.roadshowType,
        speaker: this.operateForm.speaker,
        startTime: this.operateForm.startTime,
        tags: this.operateForm.tags,
        title: this.operateForm.title,
        type: this.operateForm.type,
        isOnline: this.operateForm.isOnline,
        industry: this.operateForm.industry
      }
      let details = {
        websiteUrl: this.detobjs.websiteUrl,
        view_vol: this.detobjs.view_vol,
        follow_vol: this.detobjs.follow_vol,
        price: this.detobjs.price,
        position: this.detobjs.position,
        sharelist: this.detobjs.sharelist,
        describe: this.$refs.ruleForm.items,
        else: {
          name: this.names,
          addTime: this.addTime
        }
      }
      const { data: res } = await editData(maininfo, details)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.quxiao()
      this.getList()
    },
    //表格当前行被展开或收起
    expandChange(row, expandedRows) {
      let that = this
      //只展开一行
      if (expandedRows.length) {
        //说明展开了
        that.expands = []
        if (row) {
          that.expands.push(row.maininfo.mid) //只展开当前行id
        }
      } else {
        //说明收起了
        that.expands = []
      }
    },
    poscitynymber(num) {
      this.cityNum = num
    },
    plczsxxx() {
      this.isshowcheckbox = true
    },
    qhsxzt(zt) {
      if (zt == false) {
        this.hidetype = 'hide'
        this.queryinfo = {
          limit: 10,
          page: 1
        }
        this.getHideList()
      } else {
        this.hidetype = 'all'
        this.queryinfo = {
          limit: 10,
          page: 1
        }
        this.getList()
      }
    },
    quxiaopltj() {
      this.plsxxxlist = []
      this.plsxxxlistun = []
      this.isshowcheckbox = false
      this.$refs.watchkeyword.qxclose()
      this.checkboxcj = new Date().getTime()
      this.getList()
    },
    async getHideList() {
      let params = {
        page: this.queryinfo.page,
        limit: this.queryinfo.limit,
        keyword: this.mohuchaxunData,
        hidetype: this.hidetype
      }
      const { data: res } = await getHideData(params)
      if (res.success !== true) return this.$message.error(res.error)
      let datas = res.data.items
      datas.forEach(arr => {
        if (!Array.isArray(arr.details.else.name)) {
          arr.details.else.name = [`${arr.details.else.name}(新增)`]
        }
        if (arr.hide == 0) {
          arr.hide = true
        } else if (arr.hide == 1) {
          arr.hide = false
        }
      })
      this.tableData = [datas]
      this.totals = res.data.totalCount
      if (res) {
        this.loading = false
      }
    },
    //批量上线/下线
    getpiliangmid(scope) {
      let hide = !scope.hide
      if (hide == true) {
        this.plsxxxlistun.push(scope.maininfo.mid)
      } else if (hide == false) {
        this.plsxxxlist.push(scope.maininfo.mid)
      }
    },
    //批量提交
    async pltjhide() {
      const { data: res } = await changeHideType(this.plsxxxlist, this.plsxxxlistun)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.quxiaopltj()
    },
    //单独修改在线状态
    async exithidetype(scope) {
      let hide = scope.hide
      if (hide == true) {
        this.plsxxxlist.push(scope.maininfo.mid)
      } else if (hide == false) {
        this.plsxxxlistun.push(scope.maininfo.mid)
      }
      const { data: res } = await changeHideType(this.plsxxxlist, this.plsxxxlistun)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getList()
      this.quxiaopltj()
    },
    morenzhi() {
      this.detobjs.view_vol = Math.floor(Math.random() * (260 - 180 + 1) + 180)
      this.detobjs.follow_vol = Math.floor(Math.random() * (90 - 30 + 1) + 30)
      this.operateForm.meetPriority = 1
      this.detobjs.price = '免费'
      this.detobjs.sharelist.sharetype = 'news'
    }
  },
  created() {
    //const limit = window.sessionStorage.getItem('limits')
    //const lmap = JSON.parse(window.sessionStorage.getItem('lmap'))
    const limit = JSON.parse(window.sessionStorage.getItem('limits'))
    /*
    if ((limit & lmap.m_edit) == lmap.m_edit) {
      this.isEditOnline = false
    } else {
      this.isEditOnline = true
    }
    if ((limit & lmap.m_dele) == lmap.m_dele) {
      this.isDeleOnline = false
    } else {
      this.isDeleOnline = true
    }
    if ((limit & lmap.m_hide) == lmap.m_hide) {
      this.isHideOnline = false
    } else {
      this.isHideOnline = true
    }
    */
    if (limit.m_edit) {
      this.isEditOnline = false
    } else {
      this.isEditOnline = true
    }
    if (limit.m_dele) {
      this.isDeleOnline = false
    } else {
      this.isDeleOnline = true
    }
    if (limit.m_hide) {
      this.isHideOnline = false
    } else {
      this.isHideOnline = true
    }
    this.getList()
    this.getSelect()
  },
  computed: {
    isShow() {
      return this.$store.state.tab.isShow
    },
    operateType() {
      return this.$store.state.tab.operateType
    }
  },
  components: {
    CommonForm,
    Checkboxs
  }
}
</script>

<style lang="scss" scoped>
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
}
.demo-table-expand label {
  width: 70px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.imglogo {
  height: 100px;
  width: 100px;
}
.imgcover {
  height: 130px;
  width: 230px;
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
  margin-top: 10px;
}
::-webkit-scrollbar {
  display: none; //隐藏滚动条
}
.cardtbbox {
  height: 310px;
  overflow-y: scroll;
}
.xxnr {
  font-weight: bold;
}
/deep/.el-dialog__body {
  height: 63vh;
}
/deep/.shangxianxiaxianbtn {
  margin-left: 10px;
}

.user-up-title-box {
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  .searchbox {
    display: flex;
    .searchbtn {
      margin: 0 0 0 10px;
    }
  }
}
@import '~@/assets/scss/home';
</style>
