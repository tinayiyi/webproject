<template>
  <div class="tabs">
    <div class="switchbox">
      <el-button type="success" @click="addData">+ 新增</el-button>
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
      <el-button v-show="pledithide" type="success" @click="plsxxxclick" class="plsxxxbtn" size="mini" plain
        >批量上线/下线</el-button
      >
      <el-button type="success" v-show="isTijiaoShow" round size="mini" @click="pltijiao">提交</el-button>
      <el-button type="info" size="mini" v-show="isTijiaoShow" @click="quxiaopl" round>取消</el-button>
    </div>
    <div class="searchbox">
      <el-input
        @change="jtmhcxdata"
        clearable
        @clear="cleardata"
        placeholder="请输入内容"
        v-model="mhcxData"
      ></el-input>
      <el-button type="primary" class="searchbtn" @click="vagueSelect">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mhcxData: '',
      isShelf: true,
      isTijiaoShow: false,
      pledithide: true
    }
  },
  created() {
    if (window.sessionStorage.getItem('role') == 0) {
      this.pledithide = true
    } else {
      this.pledithide = false
    }
  },
  methods: {
    addData() {
      this.$store.commit('addData')
      this.$emit('morenzhi')
    },
    vagueSelect() {
      this.$emit('vagueSelectss', this.mhcxData)
    },
    jtmhcxdata() {
      this.$emit('jtcxData', this.mhcxData)
    },
    cleardata() {
      this.$emit('vagueSelectss')
    },
    plsxxxclick() {
      this.$emit('plczsxxx')
      this.isTijiaoShow = true
    },
    quxiaopl() {
      this.$emit('quxiaopltj')
      this.isTijiaoShow = false
    },
    qxclose() {
      this.isTijiaoShow = false
    },
    qhsxxx() {
      this.$emit('qhsxzt', this.isShelf)
    },
    //批量提交
    pltijiao() {
      this.$emit('pltjhide')
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  padding: 10px 0 10px 0;
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  .searchbox {
    display: flex;
    .searchbtn {
      margin: 0 20px 0 10px;
    }
  }
}
/deep/.el-switch {
  margin-left: 30px;
}
.switchbox {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.plsxxxbtn {
  margin-left: 30px;
}
</style>
