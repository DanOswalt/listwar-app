  <template lang="html">
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <h1 class="is-size-2">ListWar</h1>
      </div>
      <a class="navbar-burger" @click="openMenu = !openMenu" :class="{ 'is-active': openMenu } " role="button" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div @click="openMenu = false" class="navbar-menu" :class="{ 'is-active': openMenu }">
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link v-show="!user" :to="{ name: 'SignIn' }">Sign In</router-link>
        </div>
        <div class="navbar-item">
          <router-link v-show="!user" :to="{ name: 'SignUp' }">Sign Up</router-link>
        </div>
        <div class="navbar-item">
          <router-link v-show="user" :to="{ name: 'Home' }">Log Out</router-link>
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
    user () {
      return this.$store.getters.getUser
    }
  },
  mounted() {
    this.$store.commit('setUser')
    console.log('current user in navbar:', this.user)
  }
}
</script>

<style lang="css">
</style>
