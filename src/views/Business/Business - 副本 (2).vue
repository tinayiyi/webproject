<template>
  <div>
    <div class="topbox">
      <div class="headers">
        <el-button type="success" @click="showdialog = true">新增 +</el-button>
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
      <!--<div class="searchbox">
        <el-input clearable placeholder="请输入内容" v-model="searchData"></el-input>
        <el-button type="primary" class="searchbtn">搜索</el-button>
      </div>
      -->
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
    <el-card class="box-card"
      ><el-table
        border
        stripe
        :data="tableData"
        style="width: 100%"
        @expand-change="expandChange"
        :expand-row-keys="expands"
        :row-key="getRowKeys"
        v-loading="tableLoading"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="ID：">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="标题：">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="封面：">
                <span v-for="(item, index) in props.row.details.cover" :key="index">{{ item }}<br /></span>
              </el-form-item>
              <el-form-item label="提交时间：">
                <span>{{ props.row.uptime | date }}</span>
              </el-form-item>
              <el-form-item label="标签：">
                <span>{{ props.row.tags }} </span>
              </el-form-item>
              <el-form-item label="价格：">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="招商对象：">
                <span>{{ props.row.potentialTenants }}</span>
              </el-form-item>
              <!--<el-form-item label="招商类型：">
                <span>{{ props.row.zhaoshangType | zstype }}</span>
              </el-form-item>
              -->
              <el-form-item label="招商类型：">
                <span v-for="(item, index) in zstypeList" :key="index" v-show="props.row.zhaoshangType == item.id">{{
                  item.label
                }}</span>
              </el-form-item>
              <el-form-item label="收藏量：">
                <span>{{ props.row.details.follow_vol }}</span>
              </el-form-item>
              <el-form-item label="浏览量：">
                <span>{{ props.row.details.view_vol }}</span>
              </el-form-item>
              <el-form-item label="操作人：">
                <span v-for="(item, index) in props.row.details.something" :key="index">{{ item.adminName }} -- </span>
              </el-form-item>
              <!--
              <el-form-item label="行业类型：">
                <span v-for="(item, index) in hangyeTypeList" :key="index" v-show="props.row.hangyeType == item.id">{{
                  item.label
                }}</span>
              </el-form-item>
              -->
              <el-form-item label="行业类型：">
                <span v-for="(item, index) in zsHyTpeList" :key="item.id">
                  <span v-for="i in zsHyTpeList[index].data" :key="i.id" v-show="props.row.hangyeType == i.id"
                    >{{ item.label }} - {{ i.label }}</span
                  >
                </span>
              </el-form-item>
              <el-form-item label="备注描述：">
                <span>{{ props.row.details.describe }}</span>
              </el-form-item>
              <el-divider content-position="left">项目简介</el-divider>
              <div v-for="(item, index) in props.row.details.introduce" :key="index" class="introduce-box">
                <el-form-item :label="`${item.title}:`">
                  <span>{{ item.content }}</span>
                </el-form-item>
              </div>
              <el-divider content-position="left">商家简介</el-divider>
              <el-form-item label="公司名称：">
                <span>{{ props.row.details.business.companyName }}</span>
              </el-form-item>
              <el-form-item label="公司头像：">
                <span>{{ props.row.details.business.companyLogo }}</span>
              </el-form-item>
              <el-form-item label="类型：">
                <span>{{ props.row.details.business.type }}</span>
              </el-form-item>
              <el-form-item label="官网链接：">
                <span>{{ props.row.details.business.websiteUrl }}</span>
              </el-form-item>
              <el-form-item label="手机号">
                <span>{{ props.row.details.business.phone }}</span>
              </el-form-item>
              <el-form-item label="公众号">
                <span>{{ props.row.details.business.wechatnum }}</span>
              </el-form-item>
              <el-divider content-position="left">分 享</el-divider>
              <el-form-item label="分享标题：">
                <span>{{ props.row.details.share.title }}</span>
              </el-form-item>
              <el-form-item label="分享内容：">
                <span>{{ props.row.details.share.text }}</span>
              </el-form-item>
              <el-form-item label="分享类型：">
                <span>{{ props.row.details.share.type ? '招商' : '' }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="编号" prop="id" width="100">
          <template slot-scope="scope">
            <span style="margin-left:10px">{{ (queryinfo.page - 1) * 10 + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"> </el-table-column>
        <el-table-column label="更新时间" prop="uptime">
          <template slot-scope="props">
            <span>{{ props.row.uptime | date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" prop="price"> </el-table-column>
        <el-table-column label="商家" prop="details.business.companyName"> </el-table-column>
        <el-table-column label="招商对象" prop="potentialTenants"> </el-table-column>
        <el-table-column label="是否上线" width="110px">
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
        <el-table-column label="操作" width="160">
          <template slot-scope="props">
            <el-button size="mini" :disabled="isEditOnline" @click="editfn(props.row)">编辑</el-button>
            <el-button
              :loading="delbtnloading"
              size="mini"
              type="danger"
              :disabled="isDeleOnline"
              @click="deletefn(props.row)"
              >删除</el-button
            >
          </template></el-table-column
        >
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
    <!-- *******************dialog*********************************************************** -->
    <el-dialog
      v-alterELDialogMarginTop="{ marginTop: '5vh' }"
      :title="formtype == 'add' ? '新增' : '编辑'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="showdialog"
      width="1000px"
      :before-close="quxiao"
    >
      <div class="submitbox">
        <el-form ref="form" inline :model="submitForm" label-position="right" label-width="150px">
          <el-form-item label="标题">
            <el-input type="textarea" style="width:680px" autosize v-model="submitForm.title" placeholder="请输入标题">
            </el-input>
          </el-form-item>
          <el-form-item label="上传封面" class="fengmian">
            <ImgsUpload @imgUrls="coverImg" @deleteurl="deleteurl" :key="covercz" />
            <div v-for="(item, index) in submitForm.details.cover" :key="index">
              <el-input
                type="textarea"
                style="width:680px"
                autosize
                v-model="submitForm.details.cover[index]"
                placeholder="请输入封面地址"
              />
              <el-button
                v-show="showImgBtn"
                @click="deleteImgUrl(index)"
                type="danger"
                size="mini"
                style="margin-left:10px;"
                >-</el-button
              >
            </div> </el-form-item
          ><br />
          <el-form-item label="收藏量">
            <el-input style="width:260px" v-model="submitForm.details.follow_vol" placeholder="请输入收藏量" />
          </el-form-item>
          <el-form-item label="浏览量">
            <el-input style="width:260px" v-model="submitForm.details.view_vol" placeholder="请输入浏览量" />
          </el-form-item>
          <el-form-item label="价格">
            <el-input style="width:260px" v-model="submitForm.price" placeholder="请输入价格" />
          </el-form-item>
          <el-form-item label="招商类型">
            <el-select style="width:260px" v-model="submitForm.zhaoshangType" placeholder="请选择">
              <el-option v-for="item in zstypeList" :key="item.id" :label="item.label" :value="item.id"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="招商对象">
            <el-input style="width:680px" v-model="submitForm.potentialTenants" placeholder="请输入招商对象" />
          </el-form-item>
          <el-form-item label="标签">
            <el-input
              type="textarea"
              style="width:680px"
              autosize
              v-model="submitForm.tags"
              placeholder="请输入标签用 | 隔开"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="行业:">
            <el-select style="width:260px" v-model="hangyeTypes" placeholder="请选择" @change="childSelect">
              <el-option v-for="item in zsHyTpeList" :key="item.id + ''" :label="item.label" :value="item.id + ''">
              </el-option>
            </el-select>
            <el-select style="width:260px" v-model="submitForm.hangyeType" placeholder="请选择">
              <el-option v-for="item in childHyList" :key="item.id + ''" :label="item.label" :value="item.id + ''">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注描述">
            <el-input
              type="textarea"
              style="width:680px"
              autosize
              v-model="submitForm.details.describe"
              placeholder="请输入备注描述"
            >
            </el-input>
          </el-form-item>
          <el-divider content-position="center">项目简介</el-divider>
          <div v-for="(item, index) in submitForm.details.introduce" :key="index">
            <el-form-item :label="`项目标题`">
              <el-input
                type="textarea"
                style="width:680px"
                autosize
                v-model="submitForm.details.introduce[index].title"
                placeholder="请输入项目标题"
              >
              </el-input>
            </el-form-item>
            <el-form-item :label="`项目内容`">
              <el-input
                type="textarea"
                style="width:680px"
                autosize
                v-model="submitForm.details.introduce[index].content"
                placeholder="请输入项目内容"
              >
              </el-input>
            </el-form-item>
          </div>
          <el-divider content-position="center">商家简介</el-divider>
          <el-form-item label="公司名称">
            <el-input
              type="textarea"
              style="width:680px"
              autosize
              v-model="submitForm.details.business.companyName"
              placeholder="请输入公司名称"
            >
            </el-input>
          </el-form-item>
          <!-- 图片上传****************************************************** -->
          <div class="imguploadbox">
            <el-form-item label="公司头像">
              <ImgUpload @imgUrls="cpLogoImg" :key="cpLogourl" />
            </el-form-item>
            <el-form-item label="logourl" class="imgurl">
              <el-input
                class="border_red"
                type="textarea"
                style="width:400px"
                :rows="2"
                placeholder="请输入公司头像地址"
                v-model="submitForm.details.business.companyLogo"
              />
            </el-form-item>
          </div>
          <br />
          <el-form-item label="公司类型">
            <el-input
              type="textarea"
              style="width:680px"
              autosize
              v-model="submitForm.details.business.type"
              placeholder="请输入公司类型"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="官网链接">
            <el-input
              type="textarea"
              style="width:680px"
              autosize
              v-model="submitForm.details.business.websiteUrl"
              placeholder="请输入官网链接"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input
              type="textarea"
              style="width:680px"
              autosize
              v-model="submitForm.details.business.phone"
              placeholder="手机号"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="公众号">
            <el-input
              type="textarea"
              style="width:680px"
              autosize
              v-model="submitForm.details.business.wechatnum"
              placeholder="公众号"
            >
            </el-input>
          </el-form-item>
          <el-divider content-position="center">分享</el-divider>
          <el-form-item label="分享标题">
            <el-input
              type="textarea"
              style="width:680px"
              autosize
              v-model="submitForm.details.share.title"
              placeholder="请输入分享标题"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="分享内容">
            <el-input
              type="textarea"
              style="width:680px"
              autosize
              v-model="submitForm.details.share.text"
              placeholder="请输入分享内容"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button :loading="subBtnLoading" type="primary" @click="formSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ImgsUpload from '@/components/ImgsUpload'
import ImgUpload from '@/components/ImgUpload'
import {
  getDataList,
  insertData,
  editData,
  deleteData,
  getHideData,
  getSelectList,
  changeHideType
} from '../../api/business'
export default {
  data() {
    return {
      tableData: [],
      // tableData: [
      //   {
      //     uptime: '', //更新时间
      //     title: '', //标题
      //     tags: '', //标签
      //     price: '', //价格
      //     potentialTenants: '', //招商对象
      //     details: {
      //       cover: [], //封面
      //       view_vol: '', //浏览量
      //       follow_vol: '', //收藏量
      //       introduce: [
      //         //项目简介
      //         {
      //           title: '', //项目标题
      //           content: '' //项目内容
      //         }
      //       ],
      //       business: {
      //         //商家简介
      //         companyName: '', //公司名称
      //         companyName: '', //公司名称
      //         type: '', //类型
      //         websiteUrl: '' //官网链接
      //       },
      //       something: {
      //         adminName: null
      //       }
      //     }
      //   }
      // ],
      // *******submitForm**************************************************
      hangyeTypes: '',
      hangyeTypeList: [],
      zstypeList: [],
      hyTypeList: [],
      zsHyTpeList: [],
      childHyList: [],
      submitForm: {
        title: '', //标题
        tags: '', //标签
        price: '', //价格
        potentialTenants: '', //招商对象
        zhaoshangType: '',
        hangyeType: '', //行业分类
        hide: 1, // 上线下线
        details: {
          cover: [], //封面
          view_vol: '', //浏览量
          follow_vol: '', //收藏量
          introduce: [
            //项目简介
            {
              title: '', //项目标题
              content: '' //项目内容
            }
          ],
          describe: '',
          business: {
            //商家简介
            companyName: '', //公司名称
            companyLogo: '', //公司logo
            type: '', //类型
            websiteUrl: '', //官网链接
            phone: '', //手机号
            wechatnum: '' //公众号
          },
          share: {
            title: '',
            text: '',
            type: 'zhaoshang'
          },
          something: [
            {
              adminName: window.sessionStorage.username
            }
          ]
        }
      },
      // **************************************************************
      searchData: '',
      queryinfo: {
        limit: 10,
        page: 1,
        hidetype: 'all',
        keyword: ''
      },
      totals: 0,
      showdialog: false,
      isShelf: true, // 显示全部和未上线
      plsxxxlist: [],
      plsxxxlistun: [],
      checkboxcj: '',
      isHideOnline: true, // 权限
      isDeleOnline: true,
      isEditOnline: true,
      isshowcheckbox: false,
      mhcxData: '',
      formtype: 'add',
      covercz: '',
      cpLogourl: '',
      //设置row-key只展示一行
      expands: [], //只展开一行放入当前行id
      getRowKeys(row) {
        return row.id
      },
      showImgBtn: false,
      delbtnloading: false,
      subBtnLoading: false,
      tableLoading: false,
      options: [
        {
          value: 'zhaoshang',
          label: '招商'
        },
        {
          value: 'hezuo',
          label: '合作'
        },
        {
          value: 'jiameng',
          label: '加盟'
        }
      ]
    }
  },
  methods: {
    async getList() {
      this.tableLoading = true
      const { data: res } = await getDataList(this.queryinfo)
      if (res.code !== 0) {
        this.$message.error(res.msg)
        this.tableLoading = false
        return
      }
      this.totals = res.data.totalCount
      this.tableData = res.data.items
      this.tableLoading = false
      //console.log(res.data)
    },
    async getSelect() {
      const { data: res } = await getSelectList()
      if (res.code !== 0) return this.$message.error(res.error)
      //console.log('ttt' + JSON.stringify(res.data[4].data))
      this.hangyeTypeList = res.data[4].data
    },
    async getzsTySelect() {
      const { data: res } = await getSelectList()
      if (res.code !== 0) return this.$message.error(res.error)
      //console.log('ttt' + JSON.stringify(res.data[5].data))
      this.zstypeList = res.data[5].data
    },
    async getHySelect() {
      const { data: res } = await getSelectList()
      if (res.code !== 0) return this.$message.error(res.error)
      //console.log('ttt' + JSON.stringify(res.data[6].data))
      this.zsHyTpeList = res.data[6].data
      // var datares = this.zsHyTpeList
      // for (var i = 0; i < datares.length; i++) {
      //   for (var j in datares[i]) {
      //     console.log(j + ':' + datares[i][j])
      //   }
      // }
    },
    async getHideList() {
      this.tableLoading = true
      let params = {
        page: this.queryinfo.page,
        limit: this.queryinfo.limit,
        keyword: this.mohuchaxunData,
        hidetype: this.hidetype
      }
      const { data: res } = await getHideData(params)
      if (res.code !== 0) {
        this.$message.error(res.msg)
        this.tableLoading = false
        return
      }
      this.totals = res.data.totalCount
      this.tableData = res.data.items
      this.tableLoading = false
    },
    childSelect(val) {
      if (val) {
        var datares = this.zsHyTpeList
        //console.log(JSON.stringify(datares))
        for (var i = 0; i < datares.length; i++) {
          //console.log('d:' + datares[i].id)
          if (datares[i].id == val) {
            this.childHyList = datares[i].data
            this.submitForm.hangyeType = ''
          }
        }
        //console.log(this.childHyList)
      }
    },
    quxiao() {
      this.showdialog = false
      this.formtype = 'add'
      this.covercz = new Date().getTime()
      this.cpLogourl = new Date().getTime()
      this.submitForm = {
        title: '', //标题
        tags: '', //标签
        price: '', //价格
        potentialTenants: '', //招商对象
        zhaoshangType: '',
        hangyeType: '', //行业分类
        details: {
          cover: [], //封面
          view_vol: '', //浏览量
          follow_vol: '', //收藏量
          introduce: [
            //项目简介
            {
              title: '', //项目标题
              content: '' //项目内容
            }
          ],
          describe: '',
          business: {
            //商家简介
            companyName: '', //公司名称
            companyLogo: '', //公司logo
            type: '', //类型
            websiteUrl: '', //官网链接
            phone: '', //手机号
            wechatnum: '' //公众号
          },
          share: {
            title: '',
            text: '',
            type: 'zhaoshang'
          },
          something: [
            {
              adminName: window.sessionStorage.username
            }
          ]
        }
      }
      this.showImgBtn = false
    },
    qhsxxx() {
      if (this.isShelf == false) {
        this.queryinfo = {
          hidetype: 'hide',
          limit: 10,
          page: 1,
          keyword: this.mhcxData
        }
        this.getHideList()
      } else {
        this.queryinfo = {
          hidetype: 'all',
          limit: 10,
          page: 1,
          keyword: this.mhcxData
        }
        this.getList()
      }
    },
    cleardata() {
      // 点框内×清除搜索
      this.queryinfo.keyword = ''
      this.getList()
    },
    vagueSelect() {
      // 搜索
      this.queryinfo.keyword = this.mhcxData
      this.getList()
    },
    //批量上线/下线
    getpiliangmid(scope) {
      let hide = !scope.hide
      if (hide == 0) {
        this.plsxxxlistun.push(scope.id)
      } else if (hide == 1) {
        this.plsxxxlist.push(scope.id)
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
      if (hide == 0) {
        this.plsxxxlist.push(scope.id)
      } else if (hide == 1) {
        this.plsxxxlistun.push(scope.id)
      }
      const { data: res } = await changeHideType(this.plsxxxlist, this.plsxxxlistun)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getList()
      this.quxiaopltj()
    },
    quxiaopltj() {
      this.plsxxxlist = []
      this.plsxxxlistun = []
      this.isshowcheckbox = false
      // this.$refs.watchkeyword.qxclose()
      this.checkboxcj = new Date().getTime()
      this.getList()
    },
    editfn(row) {
      this.formtype = 'edit'
      this.showdialog = true
      this.submitForm = row
      this.showImgBtn = true
      if (!this.submitForm.details.something) {
        this.submitForm.details.something = [{ adminName: `${window.sessionStorage.username}(修改)` }]
      } else if (
        this.submitForm.details.something.adminName != null &&
        this.submitForm.details.something.adminName != ''
      ) {
        this.submitForm.details.something = [{ adminName: this.submitForm.details.something.adminName }]
      }
      this.hangyeTypes = ''
      //this.submitForm.details.something.push({ adminName: `${window.sessionStorage.username}(修改)` })
      var datares = this.zsHyTpeList
      var val = this.submitForm.hangyeType
      //console.log(val)
      for (var i = 0; i < datares.length; i++) {
        //console.log('d:' + datares[i].data)
        for (var j = 0; j < datares[i].data.length; j++) {
          if (datares[i].data[j].id == val) {
            this.hangyeTypes = datares[i].id
            this.childHyList = datares[i].data
            //console.log(this.hangyeTypes)
          }
        }
      }
    },
    async deletefn(row) {
      this.delbtnloading = true
      const { data: res } = await deleteData(row.id)
      if (res.code !== 0) {
        this.$message.error(res.msg)
        this.delbtnloading = false
        return
      }
      this.getList()
      this.$message.success(res.msg)
      this.delbtnloading = false
    },
    coverImg(url) {
      this.submitForm.details.cover.push(url)
    },
    cpLogoImg(url) {
      this.submitForm.details.business.companyLogo = url
    },
    addIntroduce() {
      this.submitForm.details.introduce.push({
        title: '',
        content: ''
      })
    },
    delIntroduce(i) {
      this.submitForm.details.introduce.splice(i, 1)
    },
    formSubmit() {
      if (this.submitForm.hangyeType > 0 || this.hangyeTypes == '' || this.submitForm.hangyeType == '') {
        this.$message.error('请选择行业')
      } else {
        if (this.formtype == 'add') {
          this.submitForm.details.something.push({ adminName: `${window.sessionStorage.username}(添加)` })
          this.insertForm()
        } else {
          this.submitForm.details.something.push({ adminName: `${window.sessionStorage.username}(修改)` })
          this.editForm()
        }
        setTimeout(() => {
          this.getList()
          this.quxiao()
        }, 100)
      }
    },
    async insertForm() {
      this.subBtnLoading = true
      const { data: res } = await insertData(this.submitForm)
      if (res.code !== 0) {
        this.$message.error(res.msg)
        this.subBtnLoading = false
        return
      }
      this.$message.success(res.msg)
      this.subBtnLoading = false
    },
    async editForm() {
      this.subBtnLoading = true
      const { data: res } = await editData(this.submitForm)
      if (res.code !== 0) {
        this.$message.error(res.msg)
        this.subBtnLoading = false
        return
      }
      this.$message.success(res.msg)
      this.subBtnLoading = false
    },
    deleteurl(url) {
      let index = this.submitForm.details.cover.indexOf(url)
      if (index > -1) {
        this.submitForm.details.cover.splice(index, 1)
      }
    },
    expandChange(row, expandedRows) {
      let that = this
      //只展开一行
      if (expandedRows.length) {
        //说明展开了
        that.expands = []
        if (row) {
          that.expands.push(row.id) //只展开当前行id
        }
      } else {
        //说明收起了
        that.expands = []
      }
    },
    deleteImgUrl(i) {
      this.submitForm.details.cover.splice(i, 1)
    }
  },
  created() {
    const limit = JSON.parse(window.sessionStorage.getItem('limits'))
    //console.log(limit)
    if (limit.zs_edit) {
      this.isEditOnline = false
    } else {
      this.isEditOnline = true
    }
    if (limit.zs_dele) {
      this.isDeleOnline = false
    } else {
      this.isDeleOnline = true
    }
    if (limit.zs_hide) {
      this.isHideOnline = false
    } else {
      this.isHideOnline = true
    }
    this.getList()
    this.getSelect()
    this.getzsTySelect()
    this.getHySelect()
  },
  components: {
    ImgsUpload,
    ImgUpload
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
  width: 50%;
}
.topbox {
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .searchbox {
    display: flex;
    align-items: center;
    .searchbtn {
      margin: 0 0 0 10px;
    }
  }
  .headers {
    margin-top: 10px;
    display: flex;
    align-items: center;
    .el-switch {
      margin-left: 20px;
    }
  }
}

.introduce-box {
  .el-form-item {
    width: 100%;
  }
  /deep/.el-form-item__label {
    font-weight: bold;
  }
}

.jmdt > .releaseContent {
  width: 100%;
}

.submitbox {
  height: 60vh;
  overflow: auto;
}

.fengmian {
  /deep/.el-form-item__content {
    width: 800px;
  }
}
/deep/.shangxianxiaxianbtn {
  margin-left: 10px;
}
.el-pagination-box {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.imgurl {
  margin-left: 0;
  margin-top: 40px;
}
.imguploadbox {
  width: 100%;
}
</style>
