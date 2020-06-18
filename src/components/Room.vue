<template>
  <div>
    <h1>Room list</h1>
    <ul>
      <li v-for="room in rooms" :key="room.roomId">
        name: {{room.name}} ->
        {{ isDirectMessage(room) ? 'direct room' : 'group room' }}
      </li>
    </ul>
  </div>
</template>

<script>


export default {
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
    }
  }
}
</script>