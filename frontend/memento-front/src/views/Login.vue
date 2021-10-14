<template>
  <div class="container-main-login">
    <Signup />
  </div>
</template>

<script>
// @ is an alias to /src
import Signup from '@/components/Signup.vue'

export default {
  name: 'Login',
  components: {
    Signup
  }
}
</script>