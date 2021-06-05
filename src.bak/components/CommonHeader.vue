<template>
  <header>
    <div class="l-content">
      <el-button type="success" size="mini" icon="el-icon-menu" @click="collapseMenus" />
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link"> 您好！ {{ adminname }} </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },
  data() {
    return {
      adminname: window.sessionStorage.getItem('username')
    }
  },
  methods: {
    collapseMenus() {
      this.$store.commit('collapseMenu')
    },
    handleCommand(command) {
      if (command === 'logout') {
        window.sessionStorage.removeItem('role')
        window.sessionStorage.removeItem('X-token')
        window.sessionStorage.removeItem('username')
        window.sessionStorage.removeItem('lmap')
        window.sessionStorage.removeItem('password')
        window.sessionStorage.removeItem('limits')
        Cookie.remove('Router')
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-dropdown-link {
  color: #ffffff;
  font-size: 20px;
}
.el-dropdown-link:hover {
  cursor: pointer;
}
.l-content {
  display: flex;
  align-items: center;
}
.el-breadcrumb {
  margin-left: 30px;
}
</style>

<style lang="scss" scoped>
/deep/.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #bdc3c7;
    font-weight: normal;
  }
  &:last-child {
    .el-breadcrumb__inner {
      color: #ffffff;
    }
  }
}
</style>
