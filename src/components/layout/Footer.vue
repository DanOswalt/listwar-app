<template lang="html">
  <div class="footernav">
    <div v-if="backButton" class="navbutton back">
      <router-link :to="{ name: 'Home', params: {} }">
        <span class="icon">
          <i class="fas fa-angle-left is-size-1"></i>
        </span>
      </router-link>
    </div>
    <div v-if="createButton" class="navbutton create">
      <router-link :to="{ name: 'Create', params: {} }">
        <span class="icon">
          <i class="fas fa-plus is-size-3"></i>
        </span>
      </router-link>
    </div>
    <div v-if="submitListButton" class="navbutton submit right">
      <button class="button" type="button" name="button">War</button>>
    </div>
    <div v-if="beginWarButton" class="navbutton begin right">
      <button class="button" type="button" name="button">Begin</button>>
    </div>
    <div v-if="shareButton" class="navbutton share middle">
      <button class="button" type="button" name="button">Share</button>>
    </div>
    <div v-if="doneButton" class="navbutton done right">
      <router-link v-if="doneButton" :to="{ name: 'Home', params: {} }">
        <span class="icon">
          <i class="far fa-check-circle"></i>
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
      submitListButton: false,
      beginWarButton: false,
      doneButton: false,
      shareButton: false
    }
  },
  computed: {
    backButton () {
      return this.$route.name !== 'Home'
    },
    createButton () {
      return this.$route.name === 'Home'
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
  left: 15px;
  bottom: 0px;
}
.create {
  position: fixed;
  right: 20px;
  bottom: 10px;
}
.submit {
  position: fixed;
  right: 20px;
  bottom: 10px;
}
</style>
