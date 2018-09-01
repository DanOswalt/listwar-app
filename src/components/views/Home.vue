<template>
  <div class="home">
    <router-link :to="{ name: 'Create', params: {} }">
      <span class="icon">
        <i class="fas fa-plus"></i>
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {}
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    setMsg (value, type) {
      if (!value) {
        value = ''
        type = 'hide'
      }
      this.$store.commit('setMsg', { value, type })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
