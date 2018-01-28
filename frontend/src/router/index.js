import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Page2 from '@/components/Page2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/page2',
      name: 'Page2',
      component: Page2
    }
  ]
})
