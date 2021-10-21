<template>
  <div class="container-main-nav">
    <div class="menu">
      <i @click="addPost" class="fas fa-plus icon-menu icon-menu-all plus"></i>
      <a href=""><i class="fas fa-user icon-menu icon-menu-all"></i></a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    addPost() {
      let post = document.createElement("div");
      let parent = document.querySelector(".workspace");
      function setAttributes(el, options) {
        Object.keys(options).forEach(function (attr) {
          el.setAttribute(attr, options[attr]);
        });
      }
      let classColor = ["red", "blue", "yellow", "green"];
      let color = classColor[Math.floor(Math.random() * classColor.length)];
      let randomLeft = Math.floor(Math.random() * 60 ) + 20
      let randomTop = Math.floor(Math.random() * 60 ) + 20
      setAttributes(post, {
        class: `box ${color}`,
        style: `left: ${randomLeft}%; top: ${randomTop}%`,
      });
      parent.appendChild(post);
      this.$emit("newPost");
    },
  },
};
</script>

<style scoped lang="scss">
.container-main-nav {
  display: flex;
  align-items: center;
}
.menu {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 20%;
  width: clamp(150px, 15vw, 200px);
  height: 40%;
  box-shadow: 13px 11px 32px -8px rgba(0, 0, 0, 0.507);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  & .plus {
    cursor: pointer;
  }
}
.icon-menu {
  font-size: clamp(15px, 4vw, 50px);
  color: #f78d79;
  transition: ease-in 0.3s;
}
.icon-menu2 {
  font-size: clamp(15px, 4vw, 50px);
  color: rgba(0, 98, 128, 0.836);
  transition: ease-in 0.2s;
}
.icon-menu3 {
  font-size: clamp(15px, 4vw, 50px);
  color: #33c77c;
  transition: ease-in 0.3s;
}
</style>