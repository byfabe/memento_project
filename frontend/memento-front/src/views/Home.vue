<template>
  <div class="home">
    <Background />
  </div>
</template>

<script>
// @ is an alias to /src
import Background from '@/components/Background.vue'

export default {
  name: 'Home',
  components: {
    Background
  }
}
</script>
