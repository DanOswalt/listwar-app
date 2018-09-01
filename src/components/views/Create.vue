<template>
  <div class="create">
    <form class="list-form">
      <div v-if="titleEdit" class="field">
        <div class="control">
          <input class="input is-info is-size-4 has-text-centered"
                 @blur="becomePlainText"
                 type="text"
                 name="title"
                 v-model="title"
                 placeholder="Title your list">
        </div>
      </div>
      <div v-else class="current-title is-size-4 has-text-centered" @click="titleEdit = true">
        <h3>{{ title }}<span class="fa fa-edit"</h3>
      </div>
      <ul class="items-list" v-for="(item, index) in items" :key="index">
        <li class="item-field" @click="removeItem">{{ index + 1 }}. {{ item }}</li>
      </ul>
      <div class="field">
        <div class="control">
          <input class="input is-info"
                 @keyup.tab.prevent="addItem(newItem)"
                 type="text"
                 name="newItem"
                 v-model="newItem"
                 placeholder="Next item">
        </div>
      </div>
      <button class="button" @submit.prevent="createList" type="submit" name="button">War</button>
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
      newItem: '',
      titleEdit: true
    }
  },
  methods: {
    addItem (item) {
      this.items.push(item)
    },
    removeItem (index) {
      this.items.splice(index, 1)
    },
    becomePlainText () {
      this.titleEdit = this.title ? false : true
    },
    createList () {
      console.log(this.items)
    }
  }

}
</script>

<style lang="css">
.item-field:hover {
  text-decoration: line-through;
  cursor: pointer;
}

.current-title:hover {
  cursor: text;
}
</style>
