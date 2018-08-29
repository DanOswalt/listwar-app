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

        console.log(this.slug)
      }
    }
  }
}
</script>

<style lang="css">
</style>
