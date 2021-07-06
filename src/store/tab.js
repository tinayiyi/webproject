import Cookie from 'js-cookie'
export default {
  state: {
    menu: [],
    currentMenu: null,
    tabsList: [
      {
        path: '/',
        name: 'home',
        lable: '首页',
        icon: 's-home'
      }
    ],
    isCollapse: false,
    isShow: false,
    UserisShow: false,
    operateType: 'add',
    UseroperateType: 'add',
    Routers: []
  },
  mutations: {
    setMenu(state) {
      let role = parseInt(window.sessionStorage.getItem('role'))
      //let lmap = JSON.parse(window.sessionStorage.lmap)
      let limit = JSON.parse(window.sessionStorage.getItem('limits'))

      let routers = [
        {
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/userup',
          name: 'userup',
          label: '用户上传审核',
          icon: 'view',
          url: 'UserUpload/UserUpload'
        },
        {
          path: '/video',
          name: 'video',
          label: '视频管理页',
          icon: 'video-camera',
          url: 'Video/Video'
        },
        {
          path: '/info',
          name: 'info',
          label: '资讯',
          icon: 'chat-dot-round',
          url: 'Info/Info'
        },
        {
          path: '/business',
          name: 'business',
          label: '招商',
          icon: 's-help',
          url: 'Business/Business'
        },
        {
          path: '/website',
          name: 'website',
          label: '网址管理',
          icon: 'attract',
          url: 'Website/Website'
        },
        {
          path: '/report',
          name: 'report',
          label: '举报反馈',
          icon: 'chat-line-round',
          url: 'Report/Report'
        }
      ]

      if (limit.m_count) {
        routers.push({
          path: '/quantityStatistics',
          name: 'quantityStatistics',
          label: '编辑数统计',
          icon: 's-order',
          url: 'QuantityStatistics/QuantityStatistics'
        })
      }

      if (limit.m_app) {
        routers.push({
          path: '/packageUpload',
          name: 'packageUpload',
          label: '安装包上传',
          icon: 'upload',
          url: 'PackageUpload/PackageUpload'
        })
      }

      if (role == 0) {
        routers.splice(1, 0, {
          path: '/user',
          name: 'user',
          label: '用户管理页',
          icon: 'user',
          url: 'UserManage/UserManage'
        })
      }

      state.Routers = routers
      Cookie.set('Router', JSON.stringify(routers))
    },
    clearMenu(state) {
      state.Routers = []
      Cookie.remove('Router')
    },
    addMenu(state, router) {
      if (Cookie.get('Router') == undefined) return
      let menu = JSON.parse(Cookie.get('Router'))
      state.Routers = menu
      let currentMenu = [
        {
          path: '/main',
          component: () => import(`@/views/Main`),
          children: []
        }
      ]
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`)
            return item
          })
          currentMenu[0].children.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          currentMenu[0].children.push(item)
        }
      })
      router.addRoutes(currentMenu)
    },
    selectMenu(state, val) {
      //console.log(val)
      if (val.name !== 'home') {
        state.currentMenu = val
        let res = state.tabsList.findIndex(item => item.name === val.name)
        res === -1 ? state.tabsList.push(val) : ''
      } else {
        state.currentMenu = null
      }
    },
    closeTab(state, val) {
      let res = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(res, 1)
    },
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    quxiao(state) {
      state.isShow = false
    },
    addData(state) {
      state.operateType = 'add'
      state.isShow = true
    },
    editData(state) {
      state.operateType = 'edit'
      state.isShow = true
    },
    userquxiao(state) {
      state.UserisShow = false
    },
    addUser(state) {
      state.UserisShow = true
      state.UseroperateType = 'add'
    },
    editUser(state) {
      state.UseroperateType = 'edit'
      state.UserisShow = true
    },
    changeRouter(state, routers) {
      state.AdminRouter = routers
    }
  },
  actions: {}
}
