<template lang="html">
  <div class="war">
    <div class="war-box">
      <section v-if="status === 'intro'" class="war-phase">
        <h3 class="list-title has-text-centered"> {{ listTitle }}</h3>
        <ul>
          <li v-for="(item, index) in list.items"
              :key="index"
              class="item">{{ index + 1 }}. {{ item }}
          </li>
        </ul>
        <button @click="startWar" class="button is-info">Begin</button>
      </section>

      <section v-else-if="status === 'playing'" class="war-phase">
        <h3 class="list-title has-text-centered"> {{ listTitle }}</h3>
        <div class="">
           <button @click="pickWinner(heroIndex, villainIndex)" class="btn-large">{{ hero.value }}</button>
           <button @click="pickWinner(villainIndex, heroIndex)" class="btn-large">{{ villain.value }}</button>
         </div>
      </section>

      <section v-else-if="status === 'finished'" class="war-phase">
        <h3 class="list-title has-text-centered"> {{ listTitle }}</h3>
        <ul>
          <li v-for="(item, index) in result.items"
              :key="index"
              class="item">{{ item.rank }}. {{ item.value }}
              <span class="right">{{ item.points }} pts.</span>
          </li>
        </ul>
        <!-- <p class="white-text">{{ result }}</p> -->
        <input v-if="shareableUrl" read-only @click="copyText" :value="shareableUrl"/>
      </section>

      <section v-else class="">
        <h6>No List?</h6>
      </section>
    </div>
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
      villainIndex: null,
      shareableUrl: ''
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
    },
    introMsg () {
      return `${ this.listLength } items will last ${ this.roundCount } rounds. Begin?`
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

      this.$store.commit('setMsg', { value: `${ this.result.items[0].value } wins!`, type: 'info'})

      if (this.user) {
        this.shareableUrl = this.$route.path + '?sharedby=' + this.user.alias
        this.user.results.push(this.result)
        this.saveResult()
          .then(doc => {
            console.log('saved')
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    fetchList () {
      return db.collection('lists').doc(this.listId).get()
    },
    saveResult () {
      return db.collection('users').doc(this.user.alias).set(this.user)
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
        this.$store.commit('setMsg', { value: `${ this.schedule.length } battles left`, type: 'info'})

        this.battle = this.schedule.pop()
        this.heroIndex = this.battle[0]
        this.villainIndex = this.battle[1]
        this.hero = { value: this.list.items[this.heroIndex], index: this.heroIndex }
        this.villain = { value: this.list.items[this.villainIndex], index: this.villainIndex }
      } else {
        this.finish()
      }
    },
    copyText () {
      console.log('copy one day!')
    }
  },
  mounted () {
    // if user freshly created the list, we should be ready to go
    if (this.list) {
      this.status = 'intro'
      this.$store.commit('setMsg', { value: this.introMsg, type: 'info' })

    // if there's no list, check for cached recent list (make sure it maches the id from url)
    } else {
      let recentList = JSON.parse(localStorage.getItem('recentList'))

      if (recentList && recentList.id === this.listId) {
        console.log('loaded from recent')
        this.$store.commit('setList', recentList)
        this.status = 'intro'
        this.$store.commit('setMsg', { value: this.introMsg, type: 'info' })

      // if no cached recent list, then check firebase (lists only saved after completion)
      } else {
        this.fetchList()
          .then(doc => {
            console.log('loaded from db')
            this.$store.commit('setList', doc.data)
            this.status = 'intro'
            this.$store.commit('setMsg', { value: this.introMsg, type: 'info' })
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
.war-box {
  max-width: 400px;
  margin: 50px auto;
}

.list-title {
  font-size: 24px;
  color: white;
  background-color: #3273dc;
  padding: 3px;
  margin-bottom: 0;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.item {
  font-size: 16px;
  color: white;
  background-color: #3273dc;
  opacity: 0.6;
  padding: 5px;
  padding-left: 12px;
  border: #222 1px solid;
  margin: 0;
}
</style>
