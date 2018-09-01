<template>
  <div class="create">
    <form class="list-form">
      <div class="field">
        <div class="control">
          <input class="input is-info" type="text" name="title" v-model="title" placeholder="Title your list">
        </div>
      </div>
      <ul class="itemsList" v-for="(item, index) in items" :key="index">
        <li>{{ index + 1 }}. {{ item }}</li>
      </ul>
      <div class="field">
        <div class="control">
          <input class="input is-info" type="text" name="item" v-model="newItem" placeholder="Next item">
        </div>
      </div>
      <button class="button" @click.prevent="authenticate" type="submit" name="button">War</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Create',
  data () {
    return {
      title: '',
      items: ['cars', 'trucks'],
      newItem: ''
    }
  }
}
</script>

<style lang="css">
</style>
