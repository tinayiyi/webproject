<template>
  <el-checkbox @change="getpiliangmid"></el-checkbox>
</template>

<script>
export default {
  props: {
    scopes: Object
  },
  data() {
    return {}
  },
  methods: {
    getpiliangmid() {
      this.$emit('getpiliangmid', this.scopes)
      //   console.log(this.scopes)
    }
  }
}
</script>

<style></style>
