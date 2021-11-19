<template>
  <div class="container-main">
    <Navlink v-on:newPost="addPost" />
    <div class="workspace" :class="getBackground">
      <div class="title">
        <p class="title-color" :class="getTitleColor">{{ getTitle }}</p>
        <div class="container-fullscreen">
          <i class="fas fa-expand fullscreen-icon" @click="fullScreen"></i>
        </div>
        <div class="container-input-title">
          <i
            class="fas fa-pencil-alt pencil-icon"
            @click="removeHidden(), animContainerCustom()"
          ></i>
          <input
            type="text"
            class="input-title hidden"
            v-model="title"
            maxlength="7"
            @keyup="fetchTitle()"
            :placeholder="[[getTitle]]"
          />
          <div
            class="background-color bg1 hidden"
            @click="backgroundColorSalmon"
          ></div>
          <div
            class="background-color bg2 hidden"
            @click="backgroundColorBlue"
          ></div>
          <div
            class="background-color bg3 hidden"
            @click="backgroundColorGreen"
          ></div>
        </div>
      </div>
      <transition-group v-on:enter="makeDraggable">
        <div
          class="box"
          :class="post.color"
          :style="{ left: post.x + '%', top: post.y + '%' }"
          v-for="(post, index) in posts"
          :key="post"
          :data-index="index"
        >
          <i
            class="fas fa-sort-down down-icon"
            @mouseover="animSelectColor"
          ></i>
          <lord-icon
            @click="deletePost(post), animDeletePost($event)"
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="hover"
            colors="primary:#242424,secondary:#242424"
            stroke="120"
            class="trash-icon"
          >
          </lord-icon>
          <textarea
            class="input-box"
            v-model="post.text"
            placeholder="Ceci est une note !"
            name="text-box"
            id="text-box"
            maxlength="60"
            spellcheck="false"
            @keyup="fetchValue(post)"
          ></textarea>
          <div class="select-color" :class="post.color">
            <div
              class="btn-color-post red"
              @click="changePostColorRed(post)"
            ></div>
            <div
              class="btn-color-post blue"
              @click="changePostColorBlue(post)"
            ></div>
            <div
              class="btn-color-post green"
              @click="changePostColorGreen(post)"
            ></div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Navlink from "./Navlink.vue";
gsap.registerPlugin(Draggable);

export default {
  components: { Navlink },
  setup() {},
  data() {
    return {
      backgroundColor: "",
      title: "",
      classColor: "",
      posts: [],
    };
  },
  methods: {
    //Fetch modification du texte des posts
    fetchValue(post) {
      let valueForm = {
        text: post.text,
      };
      this.$store
        .dispatch("fetchPost", {
          endpoint: "post/" + post._id,
          valueForm: valueForm,
          method: "PUT",
        })
    },
    //Nouveau post, ajoute clée et value dans le tableau "posts"
    addPost(data) {
      this.posts.push({
        text: "",
        x: data.x,
        y: data.y,
        _id: data._id,
        color: data.color,
      });
    },
    //Nouveau post devient draggable
    makeDraggable(element) {
      Draggable.create(element, {
        type: "top,left",
        edgeResistance: 0.65,
        bounds: ".container-main",
        inertia: true,
        dragClickables: false,
        //allowEventDefault: false,
        allowContextMenu: true,
        onDragEnd: () => {
          this.movePost(element);
          this.positionPost(element.dataset.index, element);
        },
      });
      // Animation à la création du post
      const tl = gsap.timeline();
      tl.from(element, {
        opacity: 0,
        scale: 0,
        ease: "bounce",
        duration: 1,
      });
    },
    //Calcul de la position du post + fetch position du post
    positionPost(index, event) {
      let post = this.posts[index];
      let box = event;
      let x = box.getBoundingClientRect().x;
      let y = box.getBoundingClientRect().y;
      let containerMain = document.querySelector(".container-main");
      let w = containerMain.getBoundingClientRect().width;
      let h = containerMain.getBoundingClientRect().height;
      let Xpercent = ((x / w) * 100).toFixed(2);
      let Ypercent = ((y / h) * 100).toFixed(2);
      console.log("index", post);
      console.log("x", Xpercent + "%", "y", Ypercent + "%");
      post.x = Xpercent;
      post.y = Ypercent;
      //Fetch
      let valueForm = {
        x: post.x,
        y: post.y,
      };
      this.$store
        .dispatch("fetchPost", {
          endpoint: "post/" + post._id,
          valueForm: valueForm,
          method: "PUT",
        })
        .then((response) => response.json())
        .then((data) => {
          console.log("dataOK", data);
        });
    },
    // Animation des post en relachant le click de la souris avec "onDragEnd" (dans la fonction "makeDraggable")
    movePost(box) {
      const tl = gsap.timeline();
      tl.fromTo(
        box,
        {
          transformOrigin: "top left",
          scale: 0.9,
        },
        {
          scale: 1,
          ease: "bounce",
          duration: 0.7,
        }
      );
    },
    //Fetch pour supprimer un post-it et rediriger post-it vers oldPost
    deletePost(post) {
      setTimeout(() => {
        this.$store
          .dispatch("fetchPost", {
            endpoint: "post/" + post._id,
            //valueForm: valueForm,
            method: "DELETE",
          })
          .then((response) => response.json())
          .then(() => {
            this.posts = this.posts.filter((item) => item != post);
          });

        let valueForm = {
          text: post.text,
          color: post.color,
        };
        this.$store.dispatch("fetchPost", {
          endpoint: "oldpost/",
          valueForm: valueForm,
          method: "POST",
        });
      }, 1000);
    },
    //Affiche l'input et le choix des background-color sous le bouton "crayon"
    removeHidden() {
      let input = document.querySelector(".input-title");
      let backgroundColor = document.querySelectorAll(".background-color");
      for (let i = 0; i < backgroundColor.length; i++) {
        if (input.classList.contains("hidden")) {
          backgroundColor[i].classList.remove("hidden");
        } else {
          backgroundColor[i].classList.add("hidden");
        }
      }
      if (input.classList.contains("hidden")) {
        input.classList.remove("hidden");
      } else {
        input.classList.add("hidden");
      }
    },
    //Applique ou supprime le plein écran avec le bouton "fullscreen"
    fullScreen() {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    },
    //Changement couleur pour le bouton "saumon"
    backgroundColorSalmon() {
      let valueForm = {
        backgroundColor: "w1",
        menuColor: "m1",
        titleColor: "t1",
        iconColor: "i1",
      };
      this.$store
        .dispatch("fetchPost", {
          endpoint: "auth/modify",
          valueForm: valueForm,
          method: "PUT",
        })
        .then((response) => response.json())
        .then((data) => {
          this.$store.commit("ADD_BACKGROUNDCOLOR", data);
        });
    },
    //Changement couleur pour le bouton "bleu"
    backgroundColorBlue() {
      let valueForm = {
        backgroundColor: "w2",
        menuColor: "m2",
        titleColor: "t2",
        iconColor: "i2",
      };
      this.$store
        .dispatch("fetchPost", {
          endpoint: "auth/modify",
          valueForm: valueForm,
          method: "PUT",
        })
        .then((response) => response.json())
        .then((data) => {
          this.$store.commit("ADD_BACKGROUNDCOLOR", data);
        });
    },
    //Changement couleur pour le bouton "vert"
    backgroundColorGreen() {
      let valueForm = {
        backgroundColor: "w3",
        menuColor: "m3",
        titleColor: "t3",
        iconColor: "i3"
      };
      this.$store
        .dispatch("fetchPost", {
          endpoint: "auth/modify",
          valueForm: valueForm,
          method: "PUT",
        })
        .then((response) => response.json())
        .then((data) => {
          this.$store.commit("ADD_BACKGROUNDCOLOR", data);
          console.log(data.backgroundColor);
        });
    },
    //Changement couleur du post "red"
    changePostColorRed(e) {
      e.color = "red";
      let valueForm = {
        color: e.color,
      };
      this.$store
        .dispatch("fetchPost", {
          endpoint: "post/" + e._id,
          valueForm: valueForm,
          method: "PUT",
        })
        .then((response) => response.json())
        .then(() => {});
    },
    //Changement couleur du post "blue"
    changePostColorBlue(e) {
      e.color = "blue";
      let valueForm = {
        color: e.color,
      };
      this.$store
        .dispatch("fetchPost", {
          endpoint: "post/" + e._id,
          valueForm: valueForm,
          method: "PUT",
        })
        .then((response) => response.json())
        .then(() => {});
    },
    //Changement couleur du post "green"
    changePostColorGreen(e) {
      e.color = "green";
      let valueForm = {
        color: e.color,
      };
      this.$store
        .dispatch("fetchPost", {
          endpoint: "post/" + e._id,
          valueForm: valueForm,
          method: "PUT",
        })
        .then((response) => response.json())
        .then(() => {});
    },
    //Fetch le nouveau titre
    fetchTitle() {
      let valueForm = {
        title: this.title,
      };
      this.$store
        .dispatch("fetchPost", {
          endpoint: "auth/modify",
          valueForm: valueForm,
          method: "PUT",
        })
        .then((response) => response.json())
        .then((data) => {
          this.$store.commit("ADD_TITLE", data);
        });
    },
    //Animation de la petite box du choix des couleurs
    animSelectColor() {
      const tl = gsap.timeline();
      tl.fromTo(
        ".select-color",
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          ease: "elastic",
          duration: 1,
        }
      );
    },
    //Animation à la suppression d'un post
    animDeletePost(e) {
      let target = e.target;
      let parent = target.parentElement; //parent of "target"
      console.log(parent);
      const tl = gsap.timeline();
      tl.fromTo(
        parent,
        {
          transformOrigin: "center",
          opacity: 1,
          scale: 1,
        },
        {
          opacity: 0,
          scale: 0,
          duration: 0.4,
        }
      );
    },
    //Animation menu custom
    animContainerCustom() {
      const tl = gsap.timeline();
      let title = document.querySelector(".input-title");
      if (!title.classList.contains("hidden")) {
        tl.timeScale(1.5)
          .fromTo(
            ".input-title",
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              ease: "elastic",
              duration: 2,
              //delay: 0.1
            }
          )
          .fromTo(
            ".bg1",
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              ease: "elastic",
              duration: 2,
              //delay: 0.1
            },
            ">-1.7"
          )
          .fromTo(
            ".bg2",
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              ease: "elastic",
              duration: 2,
              //delay: 0.1
            },
            ">-1.7"
          )
          .fromTo(
            ".bg3",
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              ease: "elastic",
              duration: 2,
              //delay: 0.1
            },
            ">-1.7"
          );
        // } else {
        //   tl.fromTo(
        //     ".input-title",
        //     {
        //       scale: 1,
        //       opacity: 1,
        //     },
        //     {
        //       scale: 0,
        //       opacity: 0,
        //       //ease: "elastic",
        //       duration: 0.4,
        //     }
        //   );
        //   tl.fromTo(
        //     ".bg1",
        //     {
        //       scale: 1,
        //       opacity: 1,
        //     },
        //     {
        //       scale: 0,
        //       opacity: 0,
        //       //ease: "elastic",
        //       duration: 0.3,
        //     }
        //   );
        //   tl.fromTo(
        //     ".bg2",
        //     {
        //       scale: 1,
        //       opacity: 1,
        //     },
        //     {
        //       scale: 0,
        //       opacity: 0,
        //       //ease: "belastic",
        //       duration: 0.2,
        //     }
        //   );
        //   tl.fromTo(
        //     ".bg3",
        //     {
        //       scale: 1,
        //       opacity: 1,
        //     },
        //     {
        //       scale: 0,
        //       opacity: 0,
        //       //ease: "elastic",
        //       duration: 0.4,
        //     }
        //   );
      }
    },
  },
  computed: {
    ...mapGetters(["getTitle", "getBackground", "getTitleColor"]),
  },
  //Fetch les posts au chargement de la page
  mounted: function () {
    // Suppression de la classe "display" pour faire apparaitre le menu
    document.querySelector(".container-main-nav").classList.remove("display");
    //Fetch tous les posts au chargement de la page
    this.$store
      .dispatch("fetchPost", {
        endpoint: "post/",
        method: "GET",
      })
      .then((response) => response.json())
      .then((data) => {
        this.posts = data;
      });
  },
};
</script>

<style lang="scss" scoped>
.container-main {
  position: relative;
  width: 100vw;
  height: 100vh;
  & .w1 {
    //transition: 0.5s ease-in;
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
//background: linear-gradient(to left, #76b852, #8dc26f); vert pas mal
.title {
  margin-left: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  user-select: none;
  //-moz-user-select: none;
  text-shadow: -1px 0 rgba(0, 0, 0, 0.116), 0 1px rgba(0, 0, 0, 0.123),
      1px 0 rgba(0, 0, 0, 0.123), 0 -1px rgba(0, 0, 0, 0.123);
  & p {
    position: relative;
    font-size: 12vw;
    font-family: "Gloria Hallelujah", cursive;
    filter: blur(.5px);
    opacity: 0.5;
  }
}
.t1 {
  color: #f8ae6dea;
}
.t2 {
  color: #6d7bf859;
}
.t3 {
  color: #6cec6cc9;
}
.container-input-title {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  width: 10%;
  margin-top: 30px;
  & .input-title {
    top: 0;
    right: 0;
    width: 70%;
    padding: 10px 0 10px 0;
    margin-top: 15px;
    border: none;
    outline: none;
    border-radius: 5px;
    color: #292929;
    font-size: clamp(12px, 1.2vw, 30px);
    font-family: "Raleway", sans-serif;
    text-align: center;
  }
  & .pencil-icon {
    font-size: clamp(12px, 1.5vw, 30px);
    color: #f1f1f1bb;
    border: 3px solid #f1f1f1bb;
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      color: #f1f1f1;
      border: 3px solid #f1f1f1;
    }
  }
  & .background-color {
    width: 50px;
    height: 50px;
    margin-top: 30px;
    border: 3px solid #f1f1f1;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      transform: scale(1.1) !important;
    }
  }
  & .bg1 {
    background: linear-gradient(
      90deg,
      hsla(29, 92%, 70%, 1) 0%,
      hsla(0, 87%, 73%, 1) 100%
    );
  }
  & .bg2 {
    background: linear-gradient(
      90deg,
      hsla(171, 87%, 67%, 1) 0%,
      hsla(236, 100%, 72%, 1) 100%
    );
  }
  & .bg3 {
    background: linear-gradient(
      90deg,
      hsla(145, 84%, 73%, 1) 0%,
      hsla(150, 61%, 48%, 1) 100%
    );
  }
}
.container-fullscreen {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  margin-top: 30px;
  margin-right: 8%;
  & .fullscreen-icon {
    font-size: clamp(12px, 1.5vw, 30px);
    color: #f1f1f1bb;
    border: 3px solid #f1f1f1bb;
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      color: #f1f1f1;
      border: 3px solid #f1f1f1;
    }
  }
}
/deep/ .box {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 250px;
  height: 250px;
  border: 2px solid rgba(0, 0, 0, 0.23);
  border-radius: 98% 2% 95% 5% / 3% 97% 3% 97%;
  box-shadow: 5px 5px 15px -7px rgba(0, 0, 0, 0.23);
}
/deep/ .red {
  background: #f2758ab2;
}
/deep/ .blue {
  background: #83d0cbb7;
}
/deep/ .green {
  background: #82c26eb0;
}
/deep/ .input-box {
  width: 100%;
  height: 70%;
  padding: 25px;
  background: none;
  outline: none;
  resize: none;
  border: none;
  border-top: rgba(0, 0, 0, 0.349) 4px solid;
  font-size: 20px;
  color: #181818e3;
  font-weight: 600;
  font-family: "Indie Flower", cursive;
  //overflow: hidden;
}
.trash-icon {
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px 10px 10px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  opacity: 0.2;
  transition: 0.2s ease-out;
  &:hover {
    opacity: 0.7;
    transition: 0.2s ease-out;
  }
}
.down-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 20px 10px 10px 20px;
  font-size: 1.7vw;
  // width: 50px;
  // height: 50px;
  cursor: pointer;
  opacity: 0.2;
  transition: 0.2s ease-out;
  &:hover {
    opacity: 0.8;
    transition: 0.2s ease-out;
  }
  &:hover ~ .select-color {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.select-color {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  border-radius: 98% 2% 97% 1% / 1% 97% 2% 97%;
  border: 2px solid rgba(0, 0, 0, 0.23);
  height: 40px;
  width: 230px;
  left: 18px;
  bottom: -38px;
  display: none;
  cursor: auto;
  transform: rotate(-2deg);
  &:hover {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  & .btn-color-post {
    width: 27px;
    height: 27px;
    border: 2px solid rgb(228, 228, 228);
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
}
.hidden {
  visibility: hidden;
}
</style>

//@mouseup.self="positionPost(post, $event)"