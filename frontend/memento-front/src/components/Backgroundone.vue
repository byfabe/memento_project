<template>
  <div class="container-main">
    <div @mousewheel="scrollColor" class="workspace w1">
      <div @mousemove="dragPost" class="box"></div>
    </div>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export default {
  data() {
    return {};
  },
  methods: {
    scrollColor(e) {
      if (e.deltaY > 0) {
        document.location.href = "/#/travail";
      } else if (e.deltaY < 0) {
        document.location.href = "/#/divers";
      }
    },
    dragPost() {
      Draggable.create(".box", {
        type: "x,y",
        edgeResistance: 0.65,
        bounds: ".container-main",
        inertia: true,
      });
      console.log(document.querySelector('.box'));
    },
  },
  computed: {},
  mounted: function () {
    let iconMenu = document.querySelectorAll(".icon-menu-all");
    for (let i = 0; i < iconMenu.length; i++) {
      iconMenu[i].classList.remove("icon-menu2", "icon-menu3");
      iconMenu[i].classList.add("icon-menu");
    }
  },
};
</script>

<style lang="scss" scoped>
.container-main {
  width: 100vw;
  height: 100vh;
  & .w1 {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      hsla(29, 92%, 70%, 1) 0%,
      hsla(0, 87%, 73%, 1) 100%
    );
  }
}
.box {
  width: 100px;
  height: 100px;
  background-color: orchid;
  border-radius: 10px;
}
</style>


