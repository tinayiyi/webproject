import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局配置
import '@/assets/scss/reset.scss'
import 'element-ui/lib/theme-chalk/index.css'

import md5 from 'js-md5'
Vue.prototype.$md5 = md5

// 第三方包
import ElementUI from 'element-ui'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.directive('alterELDialogMarginTop' /*修改elementUI中el-dialog顶部的距离,传入值eg:{marginTop:'5vh'} */, {
  inserted(el, binding) {
    el.firstElementChild.style.marginTop = binding.value.marginTop
  }
})

//自定义格式化时间的全局过滤器
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.filter('date', originVal => {
  const dt = new Date(originVal * 1000)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  return `${y}/${m}/${d} ${hh}:${mm}`
})

Vue.filter('zstype', typeval => {
  if (typeval == 'zhaoshang') return '招商'
  if (typeval == 'jiameng') return '加盟'
  if (typeval == 'hezuo') return '合作'
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
