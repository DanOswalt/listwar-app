// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Firebase from 'firebase'
import moment from 'moment'
import VueVisible from 'vue-visible'
import Chance from 'chance'
import './../node_modules/bulma/css/bulma.css'

/* uncomment to user the 'debugger' overlays */
// import '@/css/debug.css'

Vue.use(Vuex)
Vue.use(VueVisible)

Vue.prototype.$moment = moment
Vue.prototype.$chance = new Chance()

/* eslint-disable no-new */
Firebase.auth().onAuthStateChanged(() => {
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
})
