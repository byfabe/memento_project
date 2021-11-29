<template>
  <div class="container-main-nav">
    <div class="menu" :class="getMenuColor">
      <i @click="addPost()" class="far fa-plus-square icon-menu plus" :class="getIconColor"></i>
      <a href="#/profile"><i class="far fa-history icon-menu" :class="getIconColor"></i></a>
      <a href="#/"
        ><i
          class="fas fa-sign-out-alt icon-menu profile"
          :class="getIconColor"
          @click="disconnect"
        ></i
      ></a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    //Ajoute un post vers "/board" avec une limite de 15 post max.
    addPost() {
      let allBox = document.querySelectorAll(".box");
      let btnAddPost = document.querySelector(".plus");
      let classColor = ["red", "blue", "green"];
      let color = classColor[Math.floor(Math.random() * classColor.length)];
      let randomLeft = Math.floor(Math.random() * 60) + 20;
      let randomTop = Math.floor(Math.random() * 60) + 20;
      //  //20 correspond au nombre min
      //  //60 correspond au nombre de possibilités
      if (allBox.length > 14) {
        btnAddPost.classList.add("invalid");
        setTimeout(() => {
          btnAddPost.classList.remove("invalid");
        }, 1000);
      } else {
        let valueForm = {
          text: "",
          x: randomLeft,
          y: randomTop,
          color: color,
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
      }
    },
    //Boutton deconnexion vide le store et le sessionStorage
    disconnect() {
      this.$store.commit("DISCONNECT");
      sessionStorage.clear();
      localStorage.clear();
    },
  },
  computed: {
    ...mapGetters(["getMenuColor", "getIconColor"]),
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
  height: clamp(250px, 50%, 500px);
  border-radius: 98% 2% 95% 5% / 3% 97% 3% 97%;
  & .plus {
    cursor: pointer;
  }
}
.m1 {
  box-shadow: 13px 11px 15px -15px #552134;
  border: 3px solid #5a233769;
}
.m2 {
  box-shadow: 13px 11px 15px -15px rgb(13, 38, 54);
  border: 3px solid rgba(14, 41, 58, 0.473);
}
.m3 {
  box-shadow: 13px 11px 15px -15px rgb(16, 61, 35);
  border: 3px solid rgba(14, 54, 31, 0.349);
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
  color: #be537c;
  transition: ease-in 0.2s;
}
.i2 {
  font-size: clamp(15px, 3.5vw, 80px);
  font-weight: 200;
  color: rgba(67, 156, 184, 0.836);
  transition: ease-in 0.2s;
}
.i3 {
  font-size: clamp(15px, 3.5vw, 80px);
  font-weight: 200;
  color: #319e52;
  transition: ease-in 0.2s;
}
.invalid {
  animation: shake 0.3s;
  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px);
  }
  10% {
    transform: translate(-1px, -2px);
  }
  20% {
    transform: translate(-1px, 0px);
  }
  30% {
    transform: translate(2px, 1px);
  }
  40% {
    transform: translate(1px, -1px);
  }
  50% {
    transform: translate(-1px, 1px);
  }
  60% {
    transform: translate(-1px, 1px);
  }
  70% {
    transform: translate(2px, 1px);
  }
  80% {
    transform: translate(-1px, -1px);
  }
  90% {
    transform: translate(1px, 2px);
  }
  100% {
    transform: translate(1px, -1px);
  }
}
</style>