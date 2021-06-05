import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store/tab'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/401',
      component: () => import('@/views/401.vue')
    }
  ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行   next('/login')  强制跳转

  if (to.path === '/') return next()
  //获取token
  let role = parseInt(window.sessionStorage.getItem('role'))
  // let token = sessionStorage.getItem('X-token')
  // if ((to.path === '/home' && !token) || (to.path === '/video' && !token)) {
  //   alert('登录信息失效，请重新登陆')
  //   return next('/')
  // }
  if (to.path === '/user' && role !== 0) return
  next()
})

export default router
