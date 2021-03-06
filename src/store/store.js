import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from '@/firebase/firestore.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    msg: {
      value: '',
      type: 'hide'
    },
    list: null
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getMsg: state => {
      return state.msg
    },
    getList: state => {
      return state.list
    }
  },
  mutations: {
    setUser: state => {
      let authUser = firebase.auth().currentUser

      if (authUser) {
        db.collection('users').where('userId', '==', authUser.uid).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              console.log(doc.data())
              state.user = doc.data()
            })
          })
          .catch(err => {
            console.log(err.message)
          })
      } else {
        state.user = null
      }
    },
    setMsg: (state, payload) => {
      state.msg = payload
    },
    setList: (state, payload) => {
      state.list = payload
      localStorage.setItem('recentList', JSON.stringify(state.list))
    }
  },
  actions: {
    setUser: context => {
      context.commit('setUser')
    }
  }
})
