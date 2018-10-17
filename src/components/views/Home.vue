<template>
  <div class="home">
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    welcome () {
      if (this.user) {
        return 'Hi ' + this.user.alias
      } else {
        return 'Howdy stranger.'
      }
    }
  },
  created () {
    this.$store.commit('setMsg', { value: this.welcome, type: 'info' })
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
