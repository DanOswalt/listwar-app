<template>
  <div class="create">
    <h2 class="title has-text-centered is-size-4">Create a new list</h2>
    <form class="list-form">
      <div v-if="titleEdit" ref="titleInput" @keydown.enter.prevent="titleEdit=false" class="field">
        <div class="control">
          <input id="title"
                 ref="titleInput"
                 class="input is-info has-text-centered"
                 @blur="becomePlainText"
                 type="text"
                 v-model="list.title"
                 autofocus
                 placeholder="Title your list">
        </div>
      </div>
      <div v-else class="current-title is-bold has-text-centered" @click="titleEdit=true">
        <h3>{{ list.title }}
          <i class="far fa-edit"></i>
        </h3>
      </div>
      <ul class="items-list" v-for="(item, index) in list.items" :key="index">
        <li class="item-field item">{{ index + 1 }}. {{ item }}
          <span @click="removeItem(index)" class="icon remove-item is-pulled-right">
            <i class="far fa-times-circle"></i>
          </span>
        </li>
      </ul>
      <div class="field">
        <div class="control">
          <input id="newItem"
                 ref="newItem"
                 class="input is-info"
                 @keydown.enter.prevent="addItem(newItem)"
                 @keydown.tab.prevent="addItem(newItem)"
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
      titleEntered: false,
      showEditIcon: true
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
  },
  mounted () {
    this.$store.commit('setMsg', {value: '', type: 'info'})
    this.$refs.titleInput.focus()
  }
}
</script>

<style lang="css">
.list-form {
  max-width: 400px;
  margin: 0 auto;
}

.current-title {
  font-size: 24px;
  color: white;
  background-color: #3273dc;
  padding: 3px;
  margin-bottom: 0;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom: white solid 1px;
}

.item {
  font-size: 16px;
  color: white;
  background-color: #3273dc;
  opacity: 0.6;
  padding: 5px;
  padding-left: 12px;
  border: white 1px solid;
  margin: 0;
}

.remove-item {
  cursor: pointer;
}

</style>
