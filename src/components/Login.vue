<template>
  <div>
    login
    <div v-for="room in rooms" :key="room.roomId">
      name: {{room.name}} ->
      {{ isDirectMessage(room) }}
    </div>
  </div>
</template>

<script>
import Matrix from '@/matrix'

export default {
  data() {
    return {
      rooms: [],
      directRooms: []
    }
  },
  methods: {
    isDirectMessage(room) {
      return this.directRooms.includes(room.roomId)
    }
  },
  async mounted() {
    const matrix = new Matrix(this)
    const matrixClientOptions = {
      baseUrl: "http://localhost:8008"
    }

    matrix.initClient(matrixClientOptions)
    await matrix.login({
      user: 'bas',
      password: 'bas'
    })
    matrix.getAccessToken()
    matrix.startClient()
  }  
}
</script>