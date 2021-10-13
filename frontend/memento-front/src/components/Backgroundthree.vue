<template>
  <div class="container-main">
    <div @mousewheel="scrollColor" class="workspace w3"></div>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    scrollColor(e) {
      if (e.deltaY > 0) {
        document.location.href = "/#/loisir";
      } else if (e.deltaY < 0) {
        document.location.href = "/#/travail";
      }
    },
  },
  computed: {},
  mounted: function () {
    let iconMenu = document.querySelectorAll(".icon-menu-all");
    for (let i = 0; i < iconMenu.length; i++) {
      iconMenu[i].classList.remove("icon-menu", "icon-menu2");
      iconMenu[i].classList.add("icon-menu3");
    }
    document.querySelector('.container-main-nav').classList.remove('display')
  },
};
</script>

<style lang="scss" scoped>
.container-main {
  width: 100vw;
  height: 100vh;
  & .w3 {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      hsla(145, 84%, 73%, 1) 0%,
      hsla(150, 61%, 48%, 1) 100%
    );
  }
}
</style>