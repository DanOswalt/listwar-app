<template lang="html">
  <div class="signin">
    <form class="">
      <div class="field">
        <div class="control">
          <input class="input is-info" type="email" name="email" v-model="email" placeholder="email">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input class="input is-info" type="password" name="password" v-model="password" placeholder="password">
        </div>
      </div>
      <button class="button" @click.prevent="authenticate" type="submit" name="button">Sign In</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
// import db from '@/firebase/firestore.js'

export default {
  name: 'SignIn',
  data () {
    return {
      email: null,
      password: null,
      msg: null
    }
  },
  methods: {
    authenticate () {
      if (this.email && this.password) {
        this.setMsg()
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            this.$store.commit('setUser')
            this.$router.push({ name: 'Home' })
          })
          .catch(err => {
            this.setMsg(err.message, 'error')
          })
      } else {
        this.setMsg('Please enter all fields', 'error')
      }
    },
    setMsg (value, type) {
      if (!value) {
        value = ''
        type = 'hide'
      }
      this.$store.commit('setMsg', { value, type })
    }
  },
  created () {
    this.setMsg()
  }
}
</script>

<style lang="css">
  form {
    font-size: 2em;
    max-width: 400px;
    margin: 50px auto;
  }
</style>
