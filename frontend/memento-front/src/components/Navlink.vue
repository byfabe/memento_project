<template>
  <div class="container-main-nav">
    <div class="menu m1">
      <i
        @click="addPost(); limitPost()"
        class="far fa-plus-square icon-menu i1 plus"
      ></i>
      <a href=""><i class="far fa-address-card icon-menu i1"></i></a>
      <a href=""
        ><i class="fas fa-sign-out-alt icon-menu i1 profile"></i
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    addPost() {
      let classColor = ["red", "blue", "green"];
      let color = classColor[Math.floor(Math.random() * classColor.length)];
      let randomLeft = Math.floor(Math.random() * 60 ) + 20
      let randomTop = Math.floor(Math.random() * 60 ) + 20
      //  //20 correspond au nombre min
      //  //60 correspond au nombre de possibilités
      let valueForm = {
        text: "",
        x: randomLeft,
        y: randomTop,
        color: color
      };
      this.$store
        .dispatch("fetchPost", {
          endpoint: "post/",
          valueForm: valueForm,
          method: "POST",
        })
        .then((response) => response.json())
        .then((data) => {
          this.$emit("newPost", data);
        });
    },
    limitPost() {
      let allBox = document.querySelectorAll('.box');
      let btnAddPost = document.querySelector('.plus')
      if (allBox.length > 5) {
        btnAddPost.classList.add('stopPost')
      }
    }
  },
};
</script>

<style scoped lang="scss">
.stopPost {
  color: red !important;
}
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
  margin-left: 1%;
  width: clamp(150px, 15vw, 200px);
  height: clamp(350px, 50%, 500px);
  border-radius: 98% 2% 95% 5% / 3% 97% 3% 97%;
  & .plus {
    cursor: pointer;
  }
}
.m1 {
  box-shadow: 13px 11px 15px -15px #f76e6e;
  border: 3px solid #f76e6e;
}
.m2 {
  box-shadow: 13px 11px 15px -15px rgba(0, 98, 128, 0.836);
  border: 3px solid rgba(0, 98, 128, 0.836);
}
.m3 {
  box-shadow: 13px 11px 15px -15px #33c77c;
  border: 3px solid #33c77c;
}
.icon-menu {
  &:hover {
    transition: ease-in 0.2s;
    transform: scale(1.1);
  }
}
.i1 {
  font-size: clamp(15px, 3.5vw, 80px);
  font-weight: 200;
  color: #f76e6e;
  transition: ease-in 0.2s;
}
.i2 {
  font-size: clamp(15px, 3.5vw, 80px);
  font-weight: 200;
  color: rgba(0, 98, 128, 0.836);
  transition: ease-in 0.2s;
}
.i3 {
  font-size: clamp(15px, 3.5vw, 80px);
  font-weight: 200;
  color: #33c77c;
  transition: ease-in 0.2s;
}
</style>