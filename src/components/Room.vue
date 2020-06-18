<template>
  <div>
    <h1>Room list</h1>
    <ul>
      <li :style="`color: ${activeRoom === room.roomId ? 'blue' : 'black'}`" v-for="room in rooms" :key="room.roomId" @click="selectRoom(room)">
        name: {{room.name}} ->
        {{ isDirectMessage(room) ? 'direct room' : 'group room' }}
      </li>
    </ul>
  </div>
</template>

<script>


export default {
  data() {
    return {
      activeRoom: -1
    }
  },
  props: {
    rooms: {
      type: Array
    },
    directRooms: {
      type: Array
    }
  },
  methods: {
    isDirectMessage(room) {
      return this.directRooms.includes(room.roomId)
    },
    selectRoom(room) {
      this.activeRoom = room.roomId
      this.$emit('openRoom', room.roomId)
    }
  }
}
</script>