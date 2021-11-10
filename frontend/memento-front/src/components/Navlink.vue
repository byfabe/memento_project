<template>
  <div class="container-main-nav">
    <div class="menu m1">
      <i
        @click="addPost"
        class="far fa-sticky-note icon-menu i1 plus"
      ></i>
      <a href=""
        ><i class="far fa-address-card icon-menu i1 profile"></i
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
      // let post = document.createElement("div");
      // post.innerHTML =
      // `<textarea
      //     class="input-box"
      //     v-model="alltext"
      //     name="text-box"
      //     id="text-box"
      //     rows="10"
      //     maxlength="65"
      //   ></textarea>`;
      // let parent = document.querySelector(".workspace");
      // function setAttributes(el, options) {
      //   Object.keys(options).forEach(function (attr) {
      //     el.setAttribute(attr, options[attr]);
      //   });
      // }
      // let classColor = ["red", "blue", "yellow", "green"];
      // let color = classColor[Math.floor(Math.random() * classColor.length)];
      // let randomLeft = Math.floor(Math.random() * 60 ) + 20
      // let randomTop = Math.floor(Math.random() * 60 ) + 20
      //  //20 correspond au nombre min
      //  //60 correspond au nombre de possibilités
      // setAttributes(post, {
      //   class: `box ${color}`,
      //   style: `left: ${randomLeft}%; top: ${randomTop}%`,
      // });
      // parent.appendChild(post);
      let valueForm = {
        text: "",
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
          console.log("dataOK", data);
        });
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
  margin-left: 1%;
  width: clamp(150px, 15vw, 200px);
  height: clamp(200px, 40%, 500px);
  border-radius: 98% 2% 95% 5% / 3% 97% 3% 97%;
  & .plus {
    cursor: pointer;
  }
}
.m1 {
  box-shadow: 13px 11px 15px -15px #f79675;
  border: 3px solid #f79675;
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
  color: #f78d79;
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
.plus {
  &:hover {
    animation: color-icon 1.5s;
  }
}
@keyframes color-icon {
  20% {
    color: #83d0cbb7;
  }
  40% {
    color: #82c26eb0;
  }
  60% {
    color: #83d0cbb7;
  }
  80% {
    color: #82c26eb0;
  }
}
</style>