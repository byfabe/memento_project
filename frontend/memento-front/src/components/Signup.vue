<template>
  <div class="container-main-signup"></div>
</template>

<script>
export default {
  mounted: function () {
    document.querySelector(".container-main-nav").classList.add("display");
  },
};
</script>

<style lang="scss">
.display {
  display: none;
}
</style>