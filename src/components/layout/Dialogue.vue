<template>
  <div class="dialogue">
    <div v-if="user" class="title-row has-text-centered is-size-4">
      <h2>Hi {{ user.alias }}</h2>
    </div>
    <div v-else class="title-row has-text-centered is-size-4">
      <h2>Hello Stranger</h2>
    </div>
    <div class="user-msg has-text-centered">
      <h2 :class="msg.type">{{ msg.value }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialogue',
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    msg () {
      return this.$store.getters.getMsg
    }
  }
}
</script>

<style>
  .info {
    color: black;
  }

  .warn {
    color: orange;
  }

  .error {
    color: red;
  }

  .hide {
    visibility: hidden;
  }
</style>
