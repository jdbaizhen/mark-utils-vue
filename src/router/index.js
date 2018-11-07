import Vue from 'vue'
import Router from 'vue-router'
import TestPage from '@/components/pages/TestPage'
import MarkPage from '@/components/pages/markPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TestPage',
      component: TestPage
    },
    {
      path: '/markpage',
      name: 'MarkPage',
      component: MarkPage
    }
  ]
})
