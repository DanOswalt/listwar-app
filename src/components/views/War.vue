<template lang="html">
  <div class="war">
    <section v-if="status === 'intro'" class="war-phase">
      <h6> {{ listTitle }}</h6>
      <ul>
        <li v-for="(item, index) in list.items" :key="index">{{ index + 1 }}. {{ item }}</li>
      </ul>
      <h6>{{ listLength }} items will last {{ roundCount }} rounds. Ok?</h6>
      <button @click="startWar" class="button is-info">Begin</button>
    </section>

    <section v-else-if="status === 'playing'" class="war-phase">
      <div class="">
         <button @click="pickWinner(heroIndex, villainIndex)" class="btn-large">{{ hero.value }}</button>
         <button @click="pickWinner(villainIndex, heroIndex)" class="btn-large">{{ villain.value }}</button>
       </div>
    </section>

    <section v-else-if="status === 'finished'" class="war-phase">
      <ul>
        <li v-for="(item, index) in result.items" :key="index" >{{ item.rank }}. {{ item.value }} <span class="right">{{ item.points }} pts.</span></li>
      </ul>
      <p class="white-text">{{ result }}</p>
    </section>

    <section v-else class="">
      <h6>No List?</h6>
    </section>
  </div>
</template>

<script>
import db from '@/firebase/firestore.js'

export default {
  name: 'War',
  data () {
    return {
      status: 'checkingList',
      completed: false,
      schedule: [],
      hero: { value: '' },
      heroIndex: null,
      villain: { value: '' },
      villainIndex: null
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
    listTitle () {
      return this.list ? this.list.title : ''
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
      this.createEmptyResult()
      this.createSchedule()
      this.nextBattle()
    },
    finish () {
      this.status = 'finished'
      this.result.completed = true
      this.result.completedBy = this.$route.params.creator
      this.result.timestamp = Date.now()
      this.result.items.sort((a, b) => {
        return b.points - a.points
      })
      this.result.items.forEach((item, index) => {
        item.rank = index + 1
      })
    },
    fetchList () {
      return db.collection('lists').doc(this.listId).get()
    },
    saveResult () {

    },
    createEmptyResult () { // a list must exist first
      this.result = {
        timestamp: null,
        listId: this.listId,
        items: this.list.items.map((value, index) => {
          return {
            value: value,
            points: 0,
            id: index,
            beats: [],
            rank: null
          }
        })
      }
    },
    pickWinner (winnerIndex, loserIndex) {
      this.result.items[winnerIndex].points += 1
      this.result.items[winnerIndex].beats.push(loserIndex)
      this.nextBattle()
    },
    createSchedule () {
      const n = this.listLength
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const matchIndices = [i, j]
          const shuffled = this.$chance.shuffle(matchIndices)
          this.schedule.push(shuffled)
        }
      }
      this.schedule = this.$chance.shuffle(this.schedule)
    },
    nextBattle () {
      if (this.schedule.length > 0) {
        this.battle = this.schedule.pop()
        this.heroIndex = this.battle[0]
        this.villainIndex = this.battle[1]
        this.hero = { value: this.list.items[this.heroIndex], index: this.heroIndex }
        this.villain = { value: this.list.items[this.villainIndex], index: this.villainIndex }
      } else {
        this.finish()
      }
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
