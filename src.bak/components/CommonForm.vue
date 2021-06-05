<template>
  <div class="bigbox">
    <el-form v-show="isshow" inline :model="(form, detobjs)" label-width="100px">
      <div class="btnrbox">
        <el-form-item label="收藏">
          <el-input style="width:260px" v-model="detobjs.follow_vol" placeholder="请输入收藏量"></el-input>
        </el-form-item>
        <el-form-item label="浏览" class="nrinput">
          <el-input style="width:260px" v-model="detobjs.view_vol" placeholder="请输入浏览量"></el-input>
        </el-form-item>
        <br />
      </div>
      <el-form-item
        :label-width="formLabelWidth"
        :prop="item.model"
        v-for="item in formLabel"
        :key="item.model"
        :label="item.label"
      >
        <el-input
          style="width:260px"
          v-model="form[item.model]"
          :placeholder="'请输入' + item.label"
          :disabled="item.disabled"
          :class="item.styles"
          v-if="!item.type"
        ></el-input>
        <el-input
          style="width:260px"
          v-model="form[item.model]"
          :placeholder="'请输入' + item.label"
          :disabled="item.disabled"
          type="textarea"
          :rows="item.rows"
          v-if="item.type === 'textarea'"
        ></el-input>
        <el-input
          style="width:260px"
          v-model="form[item.model]"
          :placeholder="'请输入' + item.label"
          :disabled="item.disabled"
          type="textarea"
          :rows="item.rows"
          v-if="item.type === 'getrepeat'"
          @blur="getRepeatTitel($event)"
        ></el-input>
        <el-select
          :class="item.styles"
          style="width:260px"
          v-model="form[item.model]"
          placeholder="请选择"
          v-if="item.type === 'select'"
        >
          <el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select
          :class="item.styles"
          style="width:260px"
          v-model="form[item.model]"
          placeholder="请选择"
          v-if="item.type === 'selects'"
          class="border_red"
        >
          <el-option v-for="item in item.opts" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
        <el-switch v-model="form[item.model]" v-if="item.type === 'switch'"> </el-switch>
        <el-date-picker
          style="width:260px"
          value-format="timestamp"
          v-model="form[item.model]"
          type="datetime"
          placeholder="选择日期"
          v-if="item.type === 'date_start'"
          class="border_red"
          @change="getTimeMsg($event)"
        >
        </el-date-picker>
        <el-button
          type="primary"
          v-show="isChachongShow"
          size="mini"
          v-if="item.type === 'ccbtrn'"
          @click="getRepeatMsg"
          >查重</el-button
        >
        <el-date-picker
          style="width:260px"
          value-format="timestamp"
          v-model="form[item.model]"
          type="datetime"
          placeholder="选择日期"
          v-if="item.type === 'date_end'"
          class="border_red"
        >
        </el-date-picker>
        <el-radio-group style="width:260px" v-if="item.type === 'radio'" v-model="form[item.model]" :label="item.label">
          <el-radio border :key="item.value" :label="true" :value="item.value"></el-radio>
          <el-radio border :key="item.value" :label="false" :value="item.value"></el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="btnrbox">
        <!-- 封面图片上传****************************************************** -->
        <div class="imguploadbox">
          <el-form-item label="视频封面">
            <ImgUpload @imgUrls="coverImg" :key="covercz" />
          </el-form-item>
          <el-form-item label="封面url" class="imgurl">
            <el-input
              class="border_red"
              type="textarea"
              style="width:710px"
              :rows="2"
              placeholder="请输入内容"
              v-model="coverUrl"
            />
          </el-form-item>
        </div>
        <br />
        <el-form-item label="地址">
          <el-cascader
            style="width:260px"
            size="large"
            :options="regionData"
            v-model="detobjs.position.address"
            @change="handleChange"
            :key="dizhiss"
            class="border_red"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="价格" class="nrinput">
          <el-input style="width:260px" v-model="detobjs.price" placeholder="请输入价格" /> </el-form-item
        ><br />
        <el-form-item label="是否为国外">
          <el-checkbox
            v-model="detobjs.position.isAbroad"
            :checked="false"
            label="国外"
            border
            @change="isCityboxShow($event)"
          ></el-checkbox> </el-form-item
        ><el-form-item label="城市" v-show="isCityShow">
          <el-input
            style="width:515px"
            type="textarea"
            v-model="detobjs.position.AbroadCity"
            placeholder="请输入城市"
          />
        </el-form-item>
        <br />
        <el-form-item label="官方网站">
          <el-input
            style="width:710px"
            type="textarea"
            rows="2"
            v-model="detobjs.websiteUrl"
            placeholder="请输入官网地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            style="width:710px"
            class="border_red"
            v-model="detobjs.position.xxaddress"
            placeholder="请输入详细地址"
          />
        </el-form-item>
        <el-form-item label="分享类型">
          <el-select style="width:260px" v-model="detobjs.sharelist.sharetype" placeholder="请选择">
            <el-option
              v-for="item in sharetypeopt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分享标题">
          <el-input
            type="textarea"
            style="width:710px"
            autosize
            v-model="detobjs.sharelist.title"
            placeholder="请输入分享标题"
          />
        </el-form-item>
        <el-form-item label="分享内容">
          <el-input
            type="textarea"
            style="width:710px"
            autosize
            v-model="detobjs.sharelist.text"
            placeholder="请输入分享内容"
          />
        </el-form-item>
      </div>
      <template>
        <div v-for="(item, i) of items" :key="i" ref="xbtnr" class="btnrbox bbbtnbox">
          <div class="titledelbtnbox">
            <el-form-item :label="`标题${i + 1}`">
              <el-input
                autosize
                style="width:710px"
                type="textarea"
                :rows="2"
                v-model="items[i].title"
                placeholder="请输入标题 "
              />
            </el-form-item>
            <div class="xxnrtitledel" @click="onDel(i)" v-if="i != 0">-</div>
          </div>
          <div v-for="(item, index) in items[i].text" :key="index">
            <el-form-item :label="`内容${i + 1}-${index + 1}`">
              <div class="msgbox">
                <el-input
                  autosize
                  style="width:710px"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容 "
                  v-model="items[i].text[index]"
                />
                <div class="xxnrbtndel" @click="delcontent(i, index)" v-if="index != 0">-</div>
                <div class="xxnrbtnadd" @click="addcontent(i)" v-if="index == items[i].text.length - 1">+</div>
                <div
                  class="xxnrtitleadd"
                  @click="onAdd"
                  v-if="i == items.length - 1 && index == items[i].text.length - 1"
                >
                  +
                </div>
                <CheckboxsTow
                  class="checksssbox"
                  :key="chexkboxkey"
                  :i="i"
                  :index="index"
                  ref="checkson"
                  @ischeckbox="ischeckbox"
                ></CheckboxsTow>
              </div>
            </el-form-item>
          </div>
        </div>
      </template>
      <el-form-item>
        <slot></slot>
      </el-form-item>
    </el-form>
    <div v-show="!isshow" class="chongfubox">
      <div class="titlebox">
        <span>本次提交数据</span><el-button type="info" size="mini" @click="fanhui">返回</el-button>
      </div>
      <div class="titlebox">
        <span class="titlesss">标题：{{ setRepeatstartTitle }}</span>
      </div>
      <div class="titlebox">
        <span>已存在疑似重复数据</span>
      </div>
      <el-table :data="forceData" border style="width: 100%" stripe>
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="cardtbbox">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="操作人:">
                  <span v-for="(item, index) in props.row.details.else.name" :key="index">{{ item }} -- </span>
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
        <el-table-column label="MID" prop="maininfo.mid" width="80"> </el-table-column>
        <el-table-column label="主办方" prop="maininfo.orgName" width="180"> </el-table-column>
        <el-table-column class="biaoti" label="标题" prop="maininfo.title"> </el-table-column>
        <el-table-column class="biaoti" label="官方网站" prop="details.websiteUrl"> </el-table-column>
        <el-table-column class="biaoti" label="添加时间" prop="details.else.addTime" width="130"> </el-table-column>
        <el-table-column class="biaoti" label="操作人" prop="details.else.name" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.details.else.name[scope.row.details.else.name.length - 1] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { CodeToText } from 'element-china-area-data'
import ImgUpload from '../components/ImgUpload'
import CheckboxsTow from '../components/CheckboxsTow'
import { getTitleSimilarity, getSelectList } from '../api/main'

export default {
  props: {
    inline: Boolean,
    form: Object,
    detobjs: Object,
    formLabel: Array
  },
  data() {
    return {
      regionData,
      formLabelWidth: '180px',
      items: [
        {
          title: '',
          text: ['']
        }
      ],
      checkeds: false,
      coverUrl: '',
      logo: '',
      sharetypeopt: [
        {
          value: 'news',
          label: '信息'
        },
        {
          value: 'imageUrl',
          label: '图片'
        }
      ],
      covercz: '',
      logocz: '',
      dizhiss: '',
      chexkboxkey: '',
      numchk: 0,
      setRepeatstartTime: '',
      setRepeatstartTitle: '',
      isshow: true,
      forceData: [],
      typeList: [],
      industryList: [],
      CodeToText,
      isChachongShow: true,
      isCityShow: false
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('poscitynymber', value)
    },
    onAdd() {
      this.items.push({
        title: '',
        text: ['']
      })
    },
    quxiaoss() {
      this.items = [
        {
          title: '',
          text: ['']
        }
      ]
      this.numchk = 0
      this.coverUrl = ''
      this.logo = ''
      this.chexkboxkey = new Date().getTime()
      this.dizhiss = new Date().getTime()
      this.covercz = new Date().getTime()
      this.logocz = new Date().getTime()
      this.setRepeatstartTime = ''
      this.setRepeatstartTitle = ''
    },
    onDel(index) {
      this.items.splice(index, 1)
    },
    pushItems() {
      this.items = this.$props.detobjs.describe
      this.items.map(arr => {
        if (!Array.isArray(arr.text)) {
          arr.text = [arr.text]
        }
      })
      this.coverUrl = this.$props.form.coverUrl
      this.logo = this.$props.form.logo
    },
    logoImg(url) {
      this.logo = url
    },
    coverImg(url) {
      this.coverUrl = url
    },
    addcontent(i) {
      this.items[i].text.push('')
    },
    delcontent(i, index) {
      this.items[i].text.splice(index, 1)
    },
    ischeckbox(i, index, checked) {
      if (checked == true && this.items[i].text[index] != '') {
        this.items[i].text[index] = '__weca_img__ ' + this.items[i].text[index]
      } else {
        this.items[i].text[index] = this.items[i].text[index].replace('__weca_img__ ', '')
      }
    },
    checkboxfun(row) {
      row.map(item => {
        item.text.map(te => {
          this.numchk++
          let num = this.numchk - 1
          if (te.indexOf('__weca_img__ ') != -1) {
            setTimeout(() => {
              this.$refs.checkson[num].checked = true
            }, 0)
          }
        })
      })
    },
    async getSelect() {
      const { data: res } = await getSelectList()
      if (res.code !== 0) return this.$message.error(res.error)
      this.typeList = res.data[2].data
      this.industryList = res.data[1].data
    },
    getRepeatTitel(e) {
      this.setRepeatstartTitle = e.target.value
    },
    getTimeMsg(e) {
      this.setRepeatstartTime = e
    },
    async getRepeatMsg() {
      let data = {
        startTime: this.setRepeatstartTime,
        title: this.setRepeatstartTitle
      }
      if (this.setRepeatstartTime == '' || this.setRepeatstartTitle == '') {
        this.$message.error('请输入开始时间和标题！')
        return
      }
      let type = 'roadshow'
      console.log(data)
      const { data: res } = await getTitleSimilarity(data, type)
      console.log(res)
      if (res.code !== 0) {
        this.$message.error(res.msg)
        this.isshow = !this.isshow
        this.$emit('isForm', false)
        this.forceData = res.data
        return
      }
      this.$message.success('数据可用')
    },
    closes() {
      this.isshow = true
      this.$emit('isForm', true)
      this.isChachongShow = true
    },
    disablefhbtn() {
      this.isChachongShow = false
    },
    fanhui() {
      this.isshow = !this.isshow
      this.$emit('isForm', true)
    },
    isCityboxShow(e) {
      if (e == true) {
        this.isCityShow = true
      } else {
        this.isCityShow = false
      }
    },
    isCityShowF(res) {
      this.isCityShow = res
    }
  },
  components: {
    ImgUpload,
    CheckboxsTow
  },
  created() {
    this.getSelect()
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  height: 68vh;
  overflow-y: scroll;
}
.btnrbox {
  padding-left: 80px;
  width: 75vw;
  .el-button {
    height: 40px;
    width: 40px;
  }
}
.bbbtnbox {
  padding-top: 10px;
  border-bottom: 1px dotted gray;
}
.nrinput {
  margin-left: 80px;
}
.imguploadbox {
  width: 100vw;
}
.imgurl {
  margin-left: 40px;
}
.checksssbox {
  margin-left: 20px;
}
.titledelbtnbox {
  height: 48px;
  display: flex;
}
.xxnrtitledel {
  width: 45px;
  height: 33px;
  color: #ffffff;
  background: #f56c6c;
  font-size: 20px;
  border-radius: 5px;
  text-align: center;
  line-height: 33px;
  margin-top: 6px;
}
.xxnrtitledel:hover {
  cursor: pointer;
  background: rgba(245, 108, 108, 0.767);
}
.msgbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .xxnrbtndel:hover {
    cursor: pointer;
    background: #e6a23cc4;
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
    background: #e6a23c;
    font-size: 20px;
    border-radius: 5px;
    text-align: center;
    line-height: 33px;
    margin-left: 10px;
  }
  .xxnrtitleadd {
    width: 45px;
    height: 33px;
    color: #ffffff;
    background: #67c23a;
    font-size: 20px;
    border-radius: 5px;
    text-align: center;
    line-height: 33px;
    margin-left: 10px;
  }
  .xxnrtitleadd:hover {
    cursor: pointer;
    background: rgba(103, 194, 58, 0.733);
  }
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
::-webkit-scrollbar {
  display: none; //隐藏滚动条
}
.chongfubox {
  height: 100%;
  width: 100%;
  overflow: scroll;
  .titlebox {
    height: 70px;
    display: flex;
    align-items: center;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
.bigbox {
  overflow: scroll;
  max-height: 65vh;
}
.titlesss {
  font-size: 18px;
  color: #409eff;
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
.border_red {
  border: 1px solid #67c23a;
  border-radius: 5px;
}
</style>
