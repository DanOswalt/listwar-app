<template>
  <div id="app">
    <navbar/>
    <Dialogue/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue'
import Dialogue from '@/components/layout/Dialogue.vue'
// import db from './firebase/firestore'

export default {
  name: 'App',
  components: {
    Navbar,
    Dialogue
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
