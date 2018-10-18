import Vue from 'vue'
import Router from 'vue-router'
import RectTestPage from '@/components/pages/RectTestPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/rectpage',
      name: 'RectTestPage',
      component: RectTestPage
    }
  ]
})
