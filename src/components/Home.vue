<template>
  <div class="home">
    <div v-if="user" class="title-row has-text-centered">
      <h2>Hi {{ user.alias }}</h2>
    </div>
    <div v-else class="title-row has-text-centered">
      <h2>Hello Stranger</h2>
    </div>
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
    return {

    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
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
