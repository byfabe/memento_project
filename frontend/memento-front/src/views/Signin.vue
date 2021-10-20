<template>
  <div class="container-main-login">
    <SigninForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SigninForm from '@/components/SigninForm.vue'

export default {
  name: 'Signin',
  components: {
    SigninForm
  }
}
</script>