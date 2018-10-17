<template>
  <div class="dialogue">
    <div class="user-msg has-text-centered is-size-4">
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
  .dialogue {
    margin: 20px;
  }
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
