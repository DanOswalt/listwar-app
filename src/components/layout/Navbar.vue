<template lang="html">
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <router-link :to="{ name: 'Home', params: {} }">
          <h1 class="is-size-2">ListWar</h1>
        </router-link>
      </div>
      <a class="navbar-burger" @click="openMenu = !openMenu" :class="{ 'is-active': openMenu } " role="button" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div @click="openMenu = false" class="navbar-menu" :class="{ 'is-active': openMenu }">
      <div class="navbar-end">
        <div class="navbar-item" v-show="!user">
          <router-link :to="{ name: 'SignIn' }">Sign In</router-link>
        </div>
        <div class="navbar-item" v-show="!user">
          <router-link :to="{ name: 'SignUp' }">Sign Up</router-link>
        </div>
        <div class="navbar-item" v-show="user">
          <a href="#" @click="signOut">Sign Out</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Navbar',
  data () {
    return {
      openMenu: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    signOut () {
      firebase.auth().signOut()
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
    }
  },
  mounted () {
    this.$store.commit('setUser')
  }
}
</script>

<style lang="css">
.navbar {
  border-bottom: 1px solid gray;
}
</style>
