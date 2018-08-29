<template lang="html">
  <div class="signup">
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
      <div class="field">
        <div class="control">
          <input class="input is-info" type="text" name="alias" v-model="alias" placeholder="alias">
        </div>
      </div>
      <button class="button is-info" @click.prevent="register" type="submit" name="button">Sign Up</button>
      <h6 class="msg-output" v-if="this.msg">{{ this.msg }}</h6>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/firestore.js'
import slugify from 'slugify'

export default {
  name: 'SignUp',
  data () {
    return {
      email: null,
      password: null,
      alias: null,
      slug: null,
      msg: null
    }
  },
  methods: {
    register () {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })

        let ref = db.collection('users').doc(this.slug)
        ref.get()
          .then(doc => {
            if (doc.exists) {
              this.msg = 'Sorry, pick another name. This one is taken.'
            } else {
              firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  alias: this.alias,
                  userId: cred.user.uid
                })
                this.$store.commit('setUser')
                console.log('current user:', this.$store.getters.getUser)
              })
              .then(() => {
                this.$router.push({ name: 'Home' })
              })
              .catch(err => {
                console.log(err)
                this.msg = err.message
              })
            }
          })
      } else {
        this.msg = 'Please enter all fields'
      }
    }
  }
}
</script>

<style scoped lang="css">
  .msg-output {
    color: red;
  }
</style>
