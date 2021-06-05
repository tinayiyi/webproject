<template>
  <div>
    <div class="imguploadbox">
      <el-upload
        action="https://up.qbox.me"
        :data="imgpostdata"
        :before-upload="beforeupload"
        :on-change="onChangeToolFile"
        list-type="picture-card"
        :auto-upload="true"
        :on-success="postSuccess"
        :on-error="postError"
        :on-progress="progress"
        :class="{ hide: hideUpload }"
        ref="upload"
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{ file }" v-loading="loading">
          <img class="el-upload-list__item-thumbnail" src="../assets/image/chenggong.png" />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { getImgToken } from '../api/main'
export default {
  data() {
    return {
      loading: false,
      imgpostdata: {
        file: {
          uri: '',
          type: 'image/jpeg'
        },
        token: ''
      },
      hideUpload: false,
      dialogVisible: false,
      limitCount: 1,
      PacSize: ''
    }
  },
  methods: {
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
    onChangeToolFile(file, fileList) {
      this.imgpostdata.file.uri = '../assets/image/chenggong.png'
      this.hideUpload = fileList.length >= this.limitCount
    },
    async beforeupload(file) {
      this.PacSize = file.size
      const { data: res } = await getImgToken()
      if (res.code !== 0) return this.$message.error(res)
      this.imgpostdata.token = res.token
    },
    postSuccess(response) {
      this.loading = false
      this.$message.success('上传成功！')
      let PackgeUrl = `http://qiniu.wkkwx.cn/${response.key}`
      this.$emit('PackgeUrl', PackgeUrl, this.PacSize)
    },
    postError() {
      this.loading = false
      this.$message.error('上传失败！')
    },
    progress() {
      this.loading = true
    }
  }
}
</script>

<style>
.hide .el-upload--picture-card {
  display: none;
}
.imgdialog {
  height: 455px;
  width: 720px;
}
</style>
