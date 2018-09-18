<template lang="html">
  <div class="war">
    <div v-if="status === 'intro'" class="war-phase">
      <ul>
        <li v-for="(item, index) in list.items" :key="index">{{ index + 1 }}. {{ item }}</li>
      </ul>
      <h6>{{ listLength }} items will last {{ roundCount }} rounds. Ok?</h6>
      <button @click="startWar" class="button is-info">Begin</button>
    </div>

    <div v-else-if="status === 'playing'" class="war-phase">

    </div>

    <div v-else-if="status === 'finished'" class="war-phase">

    </div>

    <div v-else class="">
      <h6>No List?</h6>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/firestore.js'

export default {
  name: 'War',
  data () {
    return {
      status: 'checkingList'
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    list () {
      return this.$store.getters.getList
    },
    listId () {
      return this.$route.params.listid
    },
    listLength () { return this.list ? this.list.items.length : 0 },
    roundCount () {
      let count = 0
      for (let i = 0; i < this.listLength; i++) {
        count += i
      }
      return count
    }
  },
  methods: {
    startWar () {
      this.status = 'playing'
    },
    fetchList () {
      return db.collection('lists').doc(this.listId).get()
    }
  },
  mounted () {
    // if user freshly created the list, we should be ready to go
    if (this.list) {
      this.status = 'intro'

    // if there's no list, check for cached recent list (make sure it maches the id from url)
    } else {
      let recentList = JSON.parse(localStorage.getItem('recentList'))
      if (recentList && recentList.id === this.listId) {
        console.log('loaded from recent')
        this.$store.commit('setList', recentList)
        this.status = 'intro'

      // if no cached recent list, then check firebase (lists only saved after completion)
      } else {
        this.fetchList()
          .then(doc => {
            console.log('loaded from db')
            this.$store.commit('setList', doc.data)
            this.status = 'intro'
          })
          .catch(err => {
            this.$store.commit('setMsg', { value: err.message, type: 'error' })
          })
      }
    }
  }
}
</script>

<style lang="css">
</style>
