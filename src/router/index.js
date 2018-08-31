import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/views/Home'
import SignIn from '@/components/views/SignIn'
import SignUp from '@/components/views/SignUp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
