<template lang="html">
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <h1 class="is-size-3">ListWar</h1>
      <a @click="openMenu = !openMenu" :class="{ 'is-active': openMenu } " class="navbar-burger" role="button" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': openMenu }">
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link v-show="!user" :to="{ name: 'SignIn' }">Sign In</router-link>
        </div>
        <div class="navbar-item">
          <router-link v-show="!user" :to="{ name: 'SignOut' }">Sign Out</router-link>
        </div>
        <div class="navbar-item">
          <router-link v-show="user" :to="{ name: '/' }">Log Out</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      openMenu: false
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style lang="css">
</style>
