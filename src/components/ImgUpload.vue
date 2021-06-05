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
          <img class="el-upload-list__item-thumbnail" :src="imgpostdata.file.uri" />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" :modal="false">
        <img class="imgdialog" :src="imgpostdata.file.uri" />
      </el-dialog>
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
      limitCount: 1
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
      this.imgpostdata.file.uri = file.url
      this.hideUpload = fileList.length >= this.limitCount
    },
    async beforeupload(file) {
      console.log(file)
      const isLt1024kb = file.size
      if (isLt1024kb / 1024 > 1024) {
        return this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      const { data: res } = await getImgToken()
      if (res.code !== 0) return this.$message.error(res)
      this.imgpostdata.token = res.token
    },
    postSuccess(response) {
      this.loading = false
      this.$message.success('上传成功！')
      let ImgUrl = `http://qiniu.wkkwx.cn/${response.key}`
      this.$emit('imgUrls', ImgUrl)
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
