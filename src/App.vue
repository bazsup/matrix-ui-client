<template>
  <div id="app">
    <Login @submit="login" v-if="!loggedIn" />
    <div v-else>
      <div style="background: lightblue;">
        Login with {{ me.user_id }}
        <button @click="logout">logout</button>
      </div>
      <Room :rooms="rooms" :directRooms="directRooms" @openRoom="openRoom" />
      <Messages :messages="messages" :me="me" />
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Room from '@/components/Room.vue'
import Messages from '@/components/Messages.vue'

import Matrix from '@/matrix'

export default {
  name: 'App',
  components: {
    Login,
    Room,
    Messages
  },
  data() {
    return {
      loggedIn: false,
      rooms: [],
      directRooms: [],
      matrix: new Matrix(this),
      me: null,
      messages: []
    }
  },
  methods: {
    async login(account) {
      console.log(account)
      await this.matrix.login(account)
      this.matrix.getAccessToken()
      this.matrix.startClient()
      this.loggedIn = true
    },
    logout() {
      this.matrix.logout()
      this.loggedIn = false
      window.location.reload()
    },
    openRoom(roomId) {
      const timeline = this.matrix.getRoomTimeline(roomId)
      this.messages = timeline.filter(
        eventTimeline => eventTimeline.event.type === 'm.room.message'
      ).map(eventTimeline => eventTimeline.event)
      console.log(this.messages)
    }
  },
  async mounted() {
    const matrixClientOptions = {
      baseUrl: 'http://localhost:8008'
    }
    this.matrix.initClient(matrixClientOptions)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
