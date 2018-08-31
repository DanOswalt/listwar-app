<template>
  <div class="dialogue">
    <div v-if="user" class="title-row has-text-centered">
      <h2>Hi {{ user.alias }}</h2>
    </div>
    <div v-else class="title-row has-text-centered">
      <h2>Hello Stranger</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialogue',
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style>
</style>
