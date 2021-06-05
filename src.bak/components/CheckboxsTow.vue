<template>
  <el-checkbox border v-model="checked" @change="getpiliangmid">是否为图片</el-checkbox>
</template>

<script>
export default {
  props: {
    scopes: Object,
    i: Number,
    index: Number
  },
  data() {
    return { checked: false }
  },
  methods: {
    getpiliangmid() {
      this.$emit('ischeckbox', this.i, this.index, this.checked)
    }
  }
}
</script>

<style></style>
