<template lang="html">
  <div class="footernav">
    <div class="navbutton back">
      <router-link v-if="backButton" :to="{ name: 'Home', params: {} }">
        <span class="icon">
          <i class="fas fa-angle-left is-size-1"></i>
        </span>
      </router-link>
    </div>
    <div class="navbutton create">
      <router-link v-if="this.$route.name === 'Home'" :to="{ name: 'Create', params: {} }">
        <span class="icon">
          <i class="fas fa-plus is-size-2"></i>
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterNav',
  data () {
    return {
      backButton: true
    }
  }
}
</script>

<style scoped lang="css">
.footernav {
  border-top: 1px solid grey;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
}
.navbutton {
  display: inline-block;
}
.back {
  position: fixed;
  left: 8px;
  bottom: 3px;
}
.create {
  position: fixed;
  right: 8px;
  bottom: 3px;
}
</style>
