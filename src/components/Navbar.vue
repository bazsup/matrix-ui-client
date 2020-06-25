<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">

    <div id="navbarBasicExample" class="navbar-menu">

      <div class="navbar-end">
        <div class="navbar-item">
          <strong>Logged in with 
            <span class="has-text-primary">
              {{ user.user_id }}
            </span>
          </strong>
          <div class="buttons pl-3">
            <a class="button is-danger" @click="$emit('logout')">
              Log out
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    user: Object
  }

}
</script>
