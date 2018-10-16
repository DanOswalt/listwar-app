<template>
  <div id="app">
    <navbar/>
    <Dialogue/>
    <router-view/>
    <FooterNav/>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue'
import Dialogue from '@/components/layout/Dialogue.vue'
import FooterNav from '@/components/layout/Footer.vue'
// import db from './firebase/firestore'

export default {
  name: 'App',
  components: {
    Navbar,
    Dialogue,
    FooterNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
