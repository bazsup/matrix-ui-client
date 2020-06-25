<template>
  <div>
    <h1 class="title">
      Messages
    </h1>
    <div
      v-for="message in messages"
      :key="message.event_id"
      class="pr-3"
      :class="{ 'has-text-right': isMe(message.sender) }"
    >
      <div
        class="box is-inline-block my-1"
        :class="{
          'has-background-info': isMe(message.sender),
          'has-text-white': isMe(message.sender)
        }"
      >
        {{ message.content.body }}
      </div>
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
