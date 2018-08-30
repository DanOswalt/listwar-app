import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from '@/firebase/firestore.js'


Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    getUser: state => {
      return state.user
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

    }
  },
  actions: {
    setUser: context => {
      context.commit('setUser')
    }
  }
})
