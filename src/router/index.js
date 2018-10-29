import Vue from 'vue'
import Router from 'vue-router'
import TestPage from '@/components/pages/TestPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TestPage',
      component: TestPage
    }
  ]
})
