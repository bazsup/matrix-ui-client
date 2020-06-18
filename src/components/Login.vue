<template>
  <div>
    <form @submit.prevent="login">
      please login
      <div>
        <input type="text" v-model="user" required>
      </div>
      <div>
        <input type="text" v-model="password" required>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      password: ''
    }
  },
  methods: {
    login() {
      const account = {
        user: this.user,
        password: this.password
      }
      console.log('login method')
      this.$emit('submit', account)
    }
  }
}
</script>
