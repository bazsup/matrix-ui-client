<template>
  <div id="app">
    <Login @submit="login" v-if="!loggedIn" />
    <div v-else>
      <Navbar :user="me" @logout="logout" />
      <Room :rooms="rooms" :directRooms="directRooms" @openRoom="openRoom" />
      <Messages :messages="messages" :me="me" />
      <div v-if="activeRoom !== -1">
        <textarea
          name=""
          id=""
          cols="30"
          rows="2"
          placeholder="พิมพ์ข้อความไปในห้องแชท"
          v-model="text"
        ></textarea>
        <button @click="sendMessage">ส่งข้อความ</button>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Room from '@/components/Room.vue'
import Messages from '@/components/Messages.vue'
import Navbar from '@/components/Navbar.vue'

import Matrix from '@/matrix'

export default {
  name: 'App',
  components: {
    Login,
    Room,
    Messages,
    Navbar
  },
  data() {
    return {
      loggedIn: false,
      rooms: [],
      directRooms: [],
      matrix: new Matrix(this),
      me: null,
      messages: [],
      activeRoom: -1,
      text: ''
    }
  },
  methods: {
    async login(account) {
      console.log(account)
      await this.matrix.login(account)
      this.matrix.getAccessToken()
      this.matrix.startClient()
      this.loggedIn = true
      this.onTimeline()
    },
    logout() {
      this.matrix.logout()
      this.loggedIn = false
      window.location.reload()
    },
    openRoom(roomId) {
      const timeline = this.matrix.getRoomTimeline(roomId)
      this.messages = timeline
        .filter(eventTimeline => eventTimeline.event.type === 'm.room.message')
        .map(eventTimeline => eventTimeline.event)
      this.activeRoom = roomId
    },
    onTimeline() {
      this.matrix.listenTimeline(({ event }) => {
        const isEventOnActiveRoom = event.room_id === this.activeRoom
        const isEventMessage = event.type === 'm.room.message'
        if (isEventOnActiveRoom && isEventMessage) {
          this.messages.push(event)
        }
      })
    },
    sendMessage() {
      this.matrix.sendMessage({
        roomId: this.activeRoom,
        body: this.text
      })
      this.text = ''
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
