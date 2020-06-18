<template>
  <div>
    <h1>
      Messages
    </h1>
    <div v-for="message in messages" :key="message.event_id">
      <strong>{{ message.sender }} {{ isMe(message.sender) }}:</strong>
      {{ message.content.body }}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    messages: Array,
    me: Object
  },
  methods: {
    isMe(sender) {
      return sender === this.me.user_id ? '(me)' : ''
    }
  }
}
</script>
