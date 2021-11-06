<template>
  <div class="container-main">
    <Navlink v-on:newPost="addPost" />
    <div @mousewheel="scrollColor" class="workspace w1">
      <div class="title">
        <p>{{ this.title }}</p>
        <i class="fas fa-pencil-alt pencil-icon"></i>
        <input type="text" class="input-title">
      </div>
      <transition-group v-on:enter="makeDraggable">
        <div
          class="box"
          :class="postColor"
          :style="{ left: post.x + '%', top: post.y + '%' }"
          v-for="(post, index) in posts"
          :key="post"
          :data-index="index"
        >
        <i class="fas fa-sort-down flower-icon"></i>
          <!-- <lord-icon
            class="flower-icon"
            src="https://cdn.lordicon.com/oohidvvw.json"
            trigger="hover"
            colors="primary:#ee6d66,secondary:#e86830"
          >
          </lord-icon> -->
          <lord-icon
            @click="deletePost(post)"
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="hover"
            colors="primary:#242424,secondary:#242424"
            stroke="61"
            class="trash-icon"
          >
          </lord-icon>
          <textarea
            class="input-box"
            v-model="post.text"
            :placeholder="post._id"
            name="text-box"
            id="text-box"
            rows="10"
            maxlength="65"
            @keyup="fetchValue(post)"
          ></textarea>
        </div>
      </transition-group>
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
      title: "memento",
      classColor: ["red", "blue", "yellow", "green"],
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
        .then((response) => response.json())
        .then((data) => {
          console.log("dataOK", data);
        });
    },
    //Nouveau post, ajoute clée et value dans le tableau "posts"
    addPost(data) {
      this.posts.push({
        text: "",
        x: 20,
        y: 20,
        _id: data._id,
      });
      console.log(this.posts);
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
    // Changement de page au scroll
    scrollColor(e) {
      if (e.deltaY > 0) {
        document.location.href = "/#/travail";
      } else if (e.deltaY < 0) {
        document.location.href = "/#/divers";
      }
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
    deletePost(post) {
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
      console.log("ok");
    },
  },
  computed: {
    //Random color post-it
    postColor() {
      return this.classColor[
        Math.floor(Math.random() * this.classColor.length)
      ];
    },
  },
  mounted: function () {
    // Changement de la couleur du menu en fonction de la page
    let iconMenu = document.querySelectorAll(".icon-menu-all");
    for (let i = 0; i < iconMenu.length; i++) {
      iconMenu[i].classList.remove("icon-menu2", "icon-menu3");
      iconMenu[i].classList.add("icon-menu");
    }
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
        console.log("dataOKGET", data);
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
.title {
  
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    font-size: 15vw;
    color: #f8ae6d80;
    font-family: "Gloria Hallelujah", cursive;
    filter: blur(4px);
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
  box-shadow: 5px 5px 15px -7px rgba(0, 0, 0, 0.23);
}
/deep/ .red {
  background: #f2758ab2;
}
/deep/ .blue {
  background: #83d0cb;
}
/deep/ .yellow {
  background: #f7c759;
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
  border-top: rgba(0, 0, 0, 0.219) 4px solid;
  font-size: clamp(12px, 1vw, 150px);
  color: #181818;
  font-weight: 500;
  font-family: "Raleway", sans-serif;
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
    opacity: 1;
    transition: 0.2s ease-out;
  }
}
.flower-icon {
  position: absolute;
  bottom: 0;
  left: 0;
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
}
</style>


//:style="{ transform: translate(post.x + '%', post.y + '%') }"
//@mouseup.self="positionPost(post, $event)"