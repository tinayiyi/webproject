<template>
  <el-checkbox border v-model="checked" @change="getpiliangmid">是否为图片</el-checkbox>
</template>

<script>
export default {
  props: {
    index: Number
  },
  data() {
    return { checked: false }
  },
  methods: {
    getpiliangmid() {
      this.$emit('ischecked', this.checked, this.index)
    }
  }
}
</script>
