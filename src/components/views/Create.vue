<template>
  <div class="create">
    <form class="list-form">
      <div v-if="titleEdit" class="field">
        <div class="control">
          <input id="title"
                 class="input is-info has-text-centered"
                 @blur="becomePlainText"
                 type="text"
                 v-model="list.title"
                 placeholder="Title your list">
        </div>
      </div>
      <div v-else class="current-title is-bold has-text-centered" @click="titleEdit = true">
        <h3 @hover="showEditIcon=true">{{ list.title }}<span v-show="showEditIcon" class="fa fa-edit edit-title-icon"></span></h3>
      </div>
      <ul class="items-list" v-for="(item, index) in list.items" :key="index">
        <li class="item-field" @click="removeItem(index)">{{ index + 1 }}. {{ item }}</li>
      </ul>
      <div class="field">
        <div class="control">
          <input id="newItem"
                 ref="newItem"
                 class="input is-info"
                 @keydown.enter.prevent="addItem(newItem)"
                 type="text"
                 v-model="newItem"
                 placeholder="Next item">
        </div>
      </div>
      <button class="button" @click="createList" type="button" name="button">War</button>
    </form>
  </div>
</template>

<script>
import slugify from 'slugify'
import shortid from 'shortid'
import db from '@/firebase/firestore.js'

export default {
  name: 'Create',
  data () {
    return {
      list: {
        title: '',
        items: []
      },
      newItem: '',
      titleEdit: true,
      showEditIcon: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    addItem (item) {
      this.list.items.push(item)
      this.newItem = ''
    },
    removeItem (index) {
      this.list.items.splice(index, 1)
    },
    becomePlainText () {
      this.titleEdit = !this.list.title
    },
    createList () {
      this.list.timestamp = Date.now()
      this.list.creator = this.user ? this.user.alias : 'anon'
      this.list.titleSlug = slugify(this.list.title, {
        replacement: '-',
        remove: /[$*_+~.()'"!\-:@]/g,
        lower: true
      })
      this.list.id = shortid.generate()
      this.list.endpoint = `${this.list.id}/${this.list.creator}/${this.list.titleSlug}`

      this.$store.commit('setList', this.list)

      if (this.user) {
        this.saveList()
          .then(doc => {
            this.goToWarView()
          })
          .catch(err => {
            console.log(err)
          })
      }

      this.goToWarView()
    },
    goToWarView () {
      this.$router.push({
        name: 'War',
        params: {
          creator: this.list.creator,
          listid: this.list.id,
          title: this.list.titleSlug
        }
      })
    },
    saveList () {
      return db.collection('lists').doc(this.list.id).set(this.list)
    }
  }
}
</script>

<style lang="css">
.item-field:hover {
  text-decoration: line-through;
  cursor: pointer;
  color: red;
}

.current-title:hover {
  cursor: text;
  color: red;
  border-bottom: solid 1px black;
}

</style>
