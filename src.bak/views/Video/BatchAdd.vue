<template>
  <div>
    <span>pages:{{ pages }}</span>
    <br />
    <br />
    <el-button type="primary" @click="batchaddvideo">批量添加</el-button>
    <el-button @click="chongzhi(160, 260)">重置page</el-button>
  </div>
</template>

<script>
import { TextToCode } from 'element-china-area-data'
import { addvideoList, getTypeList } from '../../api/video'
import { SelectAllVideo, GetVideoUrl } from '../../api/addvid'
export default {
  data() {
    return {
      pages: 1,
      TextToCode
    }
  },
  methods: {
    batchaddvideo() {
      for (let i = 0; i < 10; i++) {
        this.piliangtianjia(i)
      }
      this.pages++
    },
    async piliangtianjia(pagenum) {
      const { data: res } = await SelectAllVideo(this.pages)
      let pid = res.rows[pagenum].pid
      const { data: vid } = await GetVideoUrl(pid)
      const { data: typearr } = await getTypeList()
      let industrylist = []
      let typelist = []
      typearr.data[1].data.forEach(item => {
        industrylist.push(item.id)
      })
      typearr.data[2].data.forEach(item => {
        typelist.push(item.id)
      })
      let types = typelist[Math.floor(Math.random() * typelist.length)]
      let industrylists = industrylist[Math.floor(Math.random() * industrylist.length)]
      let addvideoList = {
        title: res.rows[pagenum].roadshowTitle,
        videoCover: res.rows[pagenum].roadshowCoverOssUrl,
        videoUrl: vid.obj.videoReplayUrl,
        description: res.rows[pagenum].activityIntroduce,
        view_vol: Math.floor(Math.random() * (260 - 160 + 1) + 160),
        follow_vol: Math.floor(Math.random() * (100 - 50 + 1) + 50),
        type: types,
        industry: industrylists,
        videotimelong: '180',
        author: {
          portrait: res.rows[pagenum].logoOssUrl,
          name: res.rows[pagenum].companyFullname
        },
        name: window.sessionStorage.getItem('username')
      }
      for (let prop in addvideoList) {
        if (!addvideoList[prop]) return this.$message.error('kong')
      }
      this.pagenum++
      this.batchAdd(addvideoList)
    },
    async batchAdd(videolist) {
      const { data: res } = await addvideoList(videolist)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
    },
    chongzhi() {
      this.pages = 1
      this.$message.success('重置成功')
    }
  },
  created() {
    let aaa = '湖北省武汉市江夏区大学园路4号'
    let sheng = aaa.split('省')[0] + '省'
    let shi = aaa.split('省')[1].split('市')[0] + '市'
    let qu =
      aaa
        .split('省')[1]
        .split('市')[1]
        .split('区' || '市')[0] + '区'
    let code = TextToCode[sheng].code + ',' + TextToCode[sheng][shi].code + ',' + TextToCode[sheng][shi][qu].code
    console.log(sheng, shi, qu)
    console.log(code)
    console.log(TextToCode['湖北省']['宜昌市'])
  }
}
</script>

<style lang="scss" scoped>
div {
  margin: 20px;
}
</style>
