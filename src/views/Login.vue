<template>
  <div class="shop_login">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="@/assets/image/logos.png" alt="个人头像" />
      </div>
      <!-- 登陆表单区 -->
      <el-form :model="loginForm" label-width="0px" class="login_form" ref="loginFormRef">
        <!-- 用户名 -->
        <el-form-item prop="name">
          <el-input placeholder="请输入用户名" v-model="loginForm.name" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Login } from '../api/user'
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      // 这是登陆表单的数据绑定对象
      loginForm: {
        name: '',
        password: ''
      },
      loginobj: {
        role: ''
      }
    }
  },
  methods: {
    async login() {
      let log = {
        name: this.loginForm.name,
        password: this.$md5(this.loginForm.password)
      }
      const { data: res } = await Login(log)
      console.log(res)
      if (res.code !== 0) return this.$message.error(res.msg)
      window.sessionStorage.setItem('password', log.password)
      this.loginobj = res.data.item
      window.sessionStorage.setItem('username', this.loginForm.name)
      window.sessionStorage.setItem('X-token', res.token)
      window.sessionStorage.setItem('role', this.loginobj.role)
      window.sessionStorage.setItem('limits', res.data.item.limits)
      window.sessionStorage.setItem('lmap', JSON.stringify(res.data.lmap))
      // this.$store.commit('clearMenu')
      this.$store.commit('setMenu')
      this.$store.commit('addMenu', this.$router)
      this.$router.push('/home')
      this.$message.success(res.msg)
    }
  },
  created() {
    Cookie.remove('Router')
    window.sessionStorage.removeItem('Router')
  }
}
</script>

<style lang="scss" scoped>
.shop_login {
  background: #218c74;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #176352;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #ddd;
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background: #eee;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
