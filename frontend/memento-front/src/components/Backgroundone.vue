<template>
  <div class="container-main">
    <Navlink v-on:newPost="newPost" />
    <div @mousewheel="scrollColor" class="workspace w1">
    </div>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Navlink from "./Navlink.vue";
gsap.registerPlugin(Draggable);

export default {
  components: { Navlink },
  setup() {},
  data() {
    return {
      Xpercent: 0,
      Ypercent: 0,
    };
  },
  methods: {
    newPost() {
      let boxes = document.querySelectorAll(".box");
      boxes.forEach((box) => {
        box.addEventListener("mousemove", (e) => {
          this.dragPost(e.target);
        });
      });
    },
    scrollColor(e) {
      if (e.deltaY > 0) {
        document.location.href = "/#/travail";
      } else if (e.deltaY < 0) {
        document.location.href = "/#/divers";
      }
    },
    dragPost(box) {
      Draggable.create(".box", {
        type: "x,y",
        edgeResistance: 0.65,
        bounds: ".container-main",
        inertia: true,
      });
      let x = box.getBoundingClientRect().x;
      let y = box.getBoundingClientRect().y;
      let containerMain = document.querySelector(".container-main");
      let w = containerMain.getBoundingClientRect().width;
      let h = containerMain.getBoundingClientRect().height;
      this.Xpercent = Math.round((x / w) * 100);
      this.Ypercent = Math.round((y / h) * 100);
      console.log("x", this.Xpercent + "%", "y", this.Ypercent + "%");
    },
  },
  computed: {},
  mounted: function () {
    let iconMenu = document.querySelectorAll(".icon-menu-all");
    for (let i = 0; i < iconMenu.length; i++) {
      iconMenu[i].classList.remove("icon-menu2", "icon-menu3");
      iconMenu[i].classList.add("icon-menu");
    }
    document.querySelector(".container-main-nav").classList.remove("display");
    this.newPost();
  },
};
</script>

<style lang="scss" scoped>
.container-main {
  position: relative;
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
/deep/ .box {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: orchid;
  border-radius: 10px;
  transform: translateX(-50%) translateY(-50%);
  z-index: 2000;
}
/deep/ .red{
  background: red
}
/deep/ .blue {
  background: blue;
}
/deep/ .yellow {
  background: yellow;
}
/deep/ .green {
  background: green;
}
</style>
