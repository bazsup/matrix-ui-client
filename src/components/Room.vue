<template>
  <div>
    <nav class="panel">
      <p class="panel-heading">
        Room list
      </p>
      <a class="panel-block" :class="{ 'is-active': activeRoom === room.roomId, 'has-text-info': activeRoom === room.roomId }" v-for="room in rooms" :key="room.roomId" @click="selectRoom(room)">
        <span class="panel-icon">
          <i class="fas fa-arrow-alt-circle-right" aria-hidden="true"></i>
        </span>
        {{ room.name }} ->
        {{ isDirectMessage(room) ? 'direct room' : 'group room' }}
      </a>
    </nav>
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
