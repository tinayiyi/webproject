<template>
  <div>
    <el-dialog
      :destroy-on-close="true"
      :show-close="false"
      :close-on-click-modal="false"
      :title="UseroperateType === 'add' ? '新增' : '编辑'"
      :visible.sync="UserisShow"
      width="55%"
    >
      <el-form inline ref="from" :model="Userform" label-width="100px">
        <el-form-item label-width="180" label="用户名">
          <el-input style="width:260px" v-model="Userform.name"></el-input>
        </el-form-item>
        <el-form-item label-width="180" label="密码">
          <el-input style="width:260px" type="password" v-model="Userform.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userquxiao">取 消</el-button>
        <el-button type="primary" @click="userconfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="分配权限"
      :close-on-click-modal="false"
      :visible.sync="jurisdiction"
      width="40%"
      :before-close="handleClose"
    >
      <div class="qxbox">
        <div class="tpunbox">
          <el-tag>路演</el-tag>
          <div>
            <el-checkbox-group v-model="checkboxGrouply" size="mini">
              <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
        <div class="tpunbox zxbox">
          <el-tag type="success">资讯</el-tag>
          <div>
            <el-checkbox-group v-model="checkboxGroupzx" size="mini">
              <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
        <div class="tpunbox zxbox">
          <el-tag type="success">招商</el-tag>
          <div>
            <el-checkbox-group v-model="checkboxGroupzs" size="mini">
              <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
        <div class="tpunbox zxbox">
          <el-tag type="warning">网址</el-tag>
          <div>
            <el-checkbox-group v-model="checkboxGroupwz" size="mini">
              <el-checkbox-button v-for="city in citieswz" :label="city" :key="city">{{ city }}</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
        <div class="tpunbox zxbox">
          <el-tag type="warning">路由</el-tag>
          <div>
            <el-checkbox-group v-model="checkboxGroupluyou" size="mini">
              <el-checkbox-button v-for="city in citiesluyou" :label="city" :key="city">{{ city }}</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="xiugaiquanxian()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="请验证管理员身份"
      :close-on-click-modal="false"
      :visible.sync="verification"
      width="30%"
      :before-close="verificationClose"
    >
      <el-input type="password" v-model="verificationPassword" placeholder="请输入密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="verificationClose">取 消</el-button>
        <el-button type="primary" @click="verificationSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="tabs">
      <div class="topbox">
        <el-button type="success" @click="addUser">添加管理员</el-button>
        <div class="searchbox">
          <el-input placeholder="请输入内容"></el-input>
          <el-button type="primary" class="searchbtn">搜索</el-button>
        </div>
      </div>
      <el-card>
        <el-table :data="userlist" stripe border style="width: 100%" v-loading="loading">
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="用户名" prop="name"></el-table-column>
          <el-table-column label="角色" prop="role">
            <template slot-scope="scope">
              <span v-if="scope.row.role == 0">超级管理员</span>
              <span v-else-if="scope.row.role == 1">管理员</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="260px">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="distribution(scope.row)">分配权限</el-button>
              <el-button size="mini" @click="editUser(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteUser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
const cityOptions = ['编辑', '删除', '上线/下线']
const wzOptions = ['上传', '修改状态', '删除']
const lyOptions = ['安装包上传页', '统计页']
import { Login, getUserList, AddUser, EditUsers, DeleteUser, Distribution } from '../../api/user'
export default {
  data() {
    return {
      userlist: [],
      Userform: { name: '', password: '' },
      editUserID: '',
      loading: true,
      jurisdiction: false,
      checkboxGrouply: [],
      checkboxGroupzx: [],
      checkboxGroupzs: [],
      checkboxGroupwz: [],
      checkboxGroupluyou: [],
      cities: cityOptions,
      citieswz: wzOptions,
      citiesluyou: lyOptions,
      userid: Number,
      limits: 0,
      verification: false,
      verificationPassword: '',
      qxlist: ['编辑', '删除', '上线/下线']
    }
  },
  created() {
    this.getUserList()
  },
  computed: {
    UserisShow() {
      return this.$store.state.tab.UserisShow
    },
    UseroperateType() {
      return this.$store.state.tab.UseroperateType
    }
  },
  methods: {
    async getUserList() {
      const { data: res } = await getUserList()
      this.userlist = res.data
      if (res) {
        this.loading = false
      }
    },
    editUser(row) {
      if (row.id === 1) {
        this.verification = true
      } else {
        this.editUserID = row.id
        this.$store.commit('editUser')
        this.Userform.name = row.name
      }
    },
    deleteUser(row) {
      if (row.role === 0) return this.$message.error('超级管理员不允许被删除')
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await DeleteUser(row.id)
          if (res.code !== 0) return this.$message.error(res.msg)
          this.$message.success(res.msg)
          this.getUserList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async putedit() {
      let edits = {
        id: this.editUserID,
        name: this.Userform.name,
        password: this.$md5(this.Userform.password)
      }
      const { data: res } = await EditUsers(edits)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getUserList()
      this.userquxiao()
    },
    userquxiao() {
      this.Userform = { name: '', password: '' }
      this.$store.commit('userquxiao')
    },
    addUser() {
      this.$store.commit('addUser')
    },
    userconfirm() {
      if (this.UseroperateType === 'edit') {
        this.putedit()
      } else if (this.UseroperateType === 'add') {
        this.addusers()
      }
    },
    async addusers() {
      let adduserform = {
        name: this.Userform.name,
        password: this.$md5(this.Userform.password)
      }
      const { data: res } = await AddUser(adduserform)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getUserList()
      this.userquxiao()
    },
    // 修改权限
    distribution(row) {
      // if (row.role === 0) return this.$message.warning('无法修改超级管理员权限')
      this.jurisdiction = true
      this.userid = row.id
      //const lmap = JSON.parse(window.sessionStorage.getItem('lmap'))
      //const limits = window.sessionStorage.getItem('limits')
      let limits = row.limits
      //console.log(limits)
      if (limits.m_edit) {
        this.checkboxGrouply.push('编辑')
      }
      if (limits.m_dele) {
        this.checkboxGrouply.push('删除')
      }
      if (limits.m_hide) {
        this.checkboxGrouply.push('上线/下线')
      }
      if (limits.z_edit) {
        this.checkboxGroupzx.push('编辑')
      }
      if (limits.z_dele) {
        this.checkboxGroupzx.push('删除')
      }
      if (limits.z_hide) {
        this.checkboxGroupzx.push('上线/下线')
      }
      if (limits.zs_edit) {
        this.checkboxGroupzs.push('编辑')
      }
      if (limits.zs_dele) {
        this.checkboxGroupzs.push('删除')
      }
      if (limits.zs_hide) {
        this.checkboxGroupzs.push('上线/下线')
      }
      if (limits.w_used) {
        this.checkboxGroupwz.push('修改状态')
      }
      if (limits.w_up) {
        this.checkboxGroupwz.push('上传')
      }
      if (limits.w_dele) {
        this.checkboxGroupwz.push('删除')
      }
      if (limits.m_app) {
        this.checkboxGroupluyou.push('安装包上传页')
      }
      if (limits.m_count) {
        this.checkboxGroupluyou.push('统计页')
      }
    },
    handleClose() {
      this.jurisdiction = false
      this.checkboxGroupzx = []
      this.checkboxGroupzs = []
      this.checkboxGrouply = []
      this.checkboxGroupwz = []
      this.checkboxGroupluyou = []
    },
    async xiugaiquanxian() {
      //let lmap = JSON.parse(window.sessionStorage.getItem('lmap'))
      let limits = new Object()
      limits.m_edit = 0
      limits.m_dele = 0
      limits.m_hide = 0
      limits.z_edit = 0
      limits.z_dele = 0
      limits.z_hide = 0
      limits.zs_edit = 0
      limits.zs_dele = 0
      limits.zs_hide = 0
      limits.w_up = 0
      limits.w_dele = 0
      limits.w_used = 0
      limits.m_app = 0
      limits.m_count = 0
      this.checkboxGrouply.map(arr => {
        if (arr == '编辑') {
          limits.m_edit = 1
        } else if (arr == '删除') {
          limits.m_dele = 1
        } else if (arr == '上线/下线') {
          limits.m_hide = 1
        }
      })
      this.checkboxGroupzx.map(arr => {
        if (arr == '编辑') {
          limits.z_edit = 1
        } else if (arr == '删除') {
          limits.z_dele = 1
        } else if (arr == '上线/下线') {
          limits.z_hide = 1
        }
      })
      this.checkboxGroupzs.map(arr => {
        if (arr == '编辑') {
          limits.zs_edit = 1
        } else if (arr == '删除') {
          limits.zs_dele = 1
        } else if (arr == '上线/下线') {
          limits.zs_hide = 1
        }
      })
      this.checkboxGroupwz.map(arr => {
        if (arr == '上传') {
          limits.w_up = 1
        } else if (arr == '删除') {
          limits.w_dele = 1
        } else if (arr == '修改状态') {
          limits.w_used = 1
        }
      })
      this.checkboxGroupluyou.map(arr => {
        if (arr == '安装包上传页') {
          limits.m_app = 1
        } else if (arr == '统计页') {
          limits.m_count = 1
        }
      })
      //console.log(limits)
      let data = {
        limits: limits,
        id: this.userid
      }
      const { data: res } = await Distribution(data)
      if (res.code != 0) return this.$message.error(res.msg)
      window.sessionStorage.setItem('limits', JSON.stringify(limits))
      this.jurisdiction = false
      this.getUserList()
      this.$message.success(res.msg)
      this.checkboxGroupzx = []
      this.checkboxGroupzs = []
      this.checkboxGrouply = []
      this.checkboxGroupwz = []
      this.checkboxGroupluyou = []
    },
    verificationClose() {
      this.verification = false
      this.verificationPassword = ''
    },
    //修改超级管理员密码
    async verificationSubmit() {
      let log = {
        name: window.sessionStorage.getItem('username'),
        password: this.$md5(this.verificationPassword)
      }
      const { data: res } = await Login(log)
      if (res.code === 0) {
        this.verification = false
        this.editUserID = res.data.item.id
        this.Userform.name = res.data.item.name
        this.verificationClose()
        this.$store.commit('editUser')
        this.$message.success('验证成功！')
      } else {
        this.$message.error('验证失败')
        this.verification = false
        this.verificationClose()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  padding: 10px;
  .topbox {
    display: flex;
    justify-content: space-between;
  }
  .searchbox {
    display: flex;
    .searchbtn {
      margin: 0 0 0 10px;
    }
  }
  .el-card {
    margin-top: 10px;
  }
}
.qxbox {
  display: flex;
  flex-direction: column;
  .tpunbox {
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .el-checkbox-group {
      margin-left: 20px;
    }
  }
  .zxbox {
    border-top: 1px solid gray;
  }
}
.view-permissions {
  display: flex;
  flex-direction: column;
  height: 100px;
  div {
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-size: 14px;
  }
}
</style>
