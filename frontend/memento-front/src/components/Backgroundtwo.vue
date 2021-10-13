<template>
  <div class="container-main">
    <div @mousewheel="scrollColor" class="workspace w2"></div>
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
        document.location.href = "/#/divers";
      } else if (e.deltaY < 0) {
        document.location.href = "/#/loisir";
      }
    },
  },
  computed: {},
  mounted: function () {
    let iconMenu = document.querySelectorAll(".icon-menu-all");
    for (let i = 0; i < iconMenu.length; i++) {
      iconMenu[i].classList.remove('icon-menu', 'icon-menu3');
      iconMenu[i].classList.add("icon-menu2");
    }
  },
};
</script>

<style lang="scss" scoped>
.container-main {
  width: 100vw;
  height: 100vh;
  & .w2 {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      hsla(171, 87%, 67%, 1) 0%,
      hsla(236, 100%, 72%, 1) 100%
    );
  }
}

</style>