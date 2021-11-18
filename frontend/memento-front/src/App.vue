<template>
  <div id="nav">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>

  </div>
</template>

<script>
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity  1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0.9;
}
.display {
  display: none;
}
::-webkit-scrollbar {
    display: none;
}
</style>
