<template>
  <div class="container-main">
    <div @mousewheel="scrollColor" class="workspace w3"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
        workspaces: []
    };
  },
  methods: {
    scrollColor(e) {
        if (e.deltaY > 0) {
            document.location.href = "/#/loisir"
        } else if (e.deltaY < 0) {
            document.location.href = "/#/travail"
        }
    },
  },
  computed: {
    ...mapGetters(["getWorkspace"]),
  },
  created: function() {
      this.workspaces = this.getWorkspace
      console.log(this.getWorkspace);
  }
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
  & .w2 {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      hsla(171, 87%, 67%, 1) 0%,
      hsla(236, 100%, 72%, 1) 100%
    );
  }
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
.display {
  display: none;
}
</style>