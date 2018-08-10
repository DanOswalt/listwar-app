import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/SignIn'
import SignOut from '@/components/SignOut'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/',
      name: 'SignOut',
      component: SignOut
    }
  ]
})
