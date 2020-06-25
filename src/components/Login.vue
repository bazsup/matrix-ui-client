<template>
  <div class="columns is-centered pt-6">
    <div class="column is-one-quarter">
      <form @submit.prevent="login">
        <h1 class="title">Login form</h1>
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="Username" v-model="user" required>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" type="password" placeholder="Password" v-model="password" required>
          </div>
        </div>
        <button type="submit" class="button is-primary is-fullwidth">Login</button>

      </form>
    </div>
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
      this.$emit('submit', account)
    }
  }
}
</script>
