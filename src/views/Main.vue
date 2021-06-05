<template>
  <el-container style="height:100%">
    <el-aside width="auto"><CommonAside /></el-aside>
    <el-container>
      <el-header><CommonHeader /></el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '../components/CommonAside'
import CommonHeader from '../components/CommonHeader'
export default {
  components: {
    CommonAside,
    CommonHeader
  }
}
</script>

<style>
.el-header {
  background: #40407a;
}
.el-main {
  padding-top: 0;
}
</style>
<style lang="scss" scoped>
/deep/.el-table_1_column_5 > div,
/deep/.el-table_1_column_6 > div {
  /**
1.设置inline-block属相
2.强制不换行
3.固定高度
4.隐藏超出部分
5.显示“……”
*/
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
