<template>
  <div class="container-main">
    <Navlink v-on:newPost="newPost" />
    <div @mousewheel="scrollColor" class="workspace w1"></div>
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
    newPost(element) {
      Draggable.create(element, {
        type: "x,y",
        edgeResistance: 0.65,
        bounds: ".container-main",
        inertia: true,
        dragClickables: false,
        onDragEnd: () => this.movePost(element), //la fonction du kiff
      });
      element.addEventListener("mousemove", (e) => {
        this.dragPost(e.target);
      });
      const tl = gsap.timeline();
      tl.from(element, {
        opacity: 0,
        scale: 0,
        ease: "bounce",
        duration: 1,
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
      let x = box.getBoundingClientRect().x;
      let y = box.getBoundingClientRect().y;
      let containerMain = document.querySelector(".container-main");
      let w = containerMain.getBoundingClientRect().width;
      let h = containerMain.getBoundingClientRect().height;
      this.Xpercent = Math.round((x / w) * 100);
      this.Ypercent = Math.round((y / h) * 100);
      console.log("x", this.Xpercent + "%", "y", this.Ypercent + "%");
    },
    movePost(box) {
      const tl = gsap.timeline({ yoyo: true });
      tl.from(box, {
        scale: 0.9,
        ease: "bounce",
        duration: 0.6,
      });
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
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 250px;
  height: 250px;
  background-color: orchid;
  border-radius: 98% 2% 95% 5% / 3% 97% 3% 97%;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  right: 50%;
  box-shadow: 5px 5px 15px -7px rgba(0, 0, 0, 0.23);
}
/deep/ .red {
  background: #f27589;
}
/deep/ .blue {
  background: #83d0cb;
}
/deep/ .yellow {
  background: #f7c759;
}
/deep/ .green {
  background: #82c26e;
}
/deep/ .input-box {
  width: 100%;
  height: 70%;
  padding: 25px;
  background: none;
  outline: none;
  resize: none;
  border: none;
  border-top: rgba(0, 0, 0, 0.219) 4px solid;
  font-size: clamp(12px, 1vw, 150px);
  color: #181818;
  font-weight: 500;
  font-family: "Raleway", sans-serif;
}
.trash {
  position: absolute;
  bottom: 0;
  width: 250px;
  height: 250px;
}
</style>
