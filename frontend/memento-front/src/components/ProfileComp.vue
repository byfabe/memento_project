<template>
  <div class="container-main-profilecomp">
    <a href="#/board"> <i class="far fa-chevron-left back-icon"></i></a>
    <div class="container-profile background-color">
      <div class="box-profile">
        <div class="top-profile">
          <h1>Post-it supprimés</h1>
        </div>
        <div
          class="historic-posts"
          v-for="post in posts"
          :key="post"
          :class="post.color"
        >
          <p class="historic-date">{{ moment(post.dates) }}</p>
          <p class="historic-text">{{ post.text }}</p>
          <div class="historic-action">
            <i
              class="far fa-trash-alt trash-icon"
              v-if="posts"
              @click="deleteOldPost(post)"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    deleteOldPost(post) {
      this.$store
        .dispatch("fetchPost", {
          endpoint: "oldpost/" + post._id,
          method: "DELETE",
        })
        .then((response) => response.json())
        .then(() => {
          this.posts = this.posts.filter((item) => item != post);
        });
    },
    moment(date) {
      const moment = require("moment");
      const time = moment(date);
      return time.format("DD/MM/YY HH:mm");
    },
  },
  mounted: function () {
    //Fetch tous les oldposts au chargement de la page
    this.$store
      .dispatch("fetchPost", {
        endpoint: "oldpost/",
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
.container-main-profilecomp {
  //position: relative;
  width: 100vw;
  height: 100vh;
}
.container-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.background-color {
  background: linear-gradient(
    -90deg,
    hsla(40, 63%, 85%, 1) 0%,
    hsla(22, 94%, 79%, 1) 100%
  );
}
.box-profile {
  position: relative;
  width: 50%;
  height: 70%;
  border: 3px solid #fcbe99;
  border-radius: 98% 2% 95% 2% / 3% 97% 3% 97%;
  box-shadow: rgba(6, 24, 44, 0.226) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.404) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  background: #f0d9b4;
  overflow: auto;
}
.back-icon {
  position: absolute;
  top: 40%;
  left: 8%;
  font-size: clamp(12px, 9vw, 550px);
  color: #f1e0c0;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    transform: scale(1.1);
    transition: 0.2s ease;
  }
}
.top-profile {
  position: sticky;
  top: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  background: #f0d9b4;
  border-bottom: 3px solid #dda686;
  border-radius: 98% 2% 95% 0% / 3% 97% 3% 97%;
  & h1 {
    font-size: clamp(12px, 2.2vw, 150px);
    color: #dda686;
    font-family: "Gloria Hallelujah", sans-serif;
    font-weight: 400;
    text-shadow: -1px 0 rgba(0, 0, 0, 0.212), 0 1px rgba(0, 0, 0, 0.24),
      1px 0 rgba(0, 0, 0, 0.26), 0 -1px rgba(0, 0, 0, 0.301);
  }
}
.historic-posts {
  display: flex;
  align-items: center;
  height: 15%;
  border-bottom: 2px solid #dda686;
  margin-bottom: 2px;
  border-radius: 98% 0% 95% 0% / 10% 97% 10% 97%;
  & .historic-date {
    width: 15%;
    padding-left: 10px;
    font-size: clamp(12px, 1.1vw, 150px);
    color: #181818e3;
    font-weight: 600;
    font-family: "Indie Flower", cursive;
  }
  & .historic-text {
    width: 70%;
    height: 70%;
    font-size: clamp(12px, 1.1vw, 150px);
    color: #181818e3;
    font-weight: 600;
    font-family: "Indie Flower", cursive;
    overflow-wrap: break-word;
  }
  & .historic-action {
    display: flex;
    justify-content: center;
    width: 15%;
    padding-left: 10px;
  }
}
.trash-icon {
  font-size: clamp(12px, 1.3vw, 50px);
  color: #29292977;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    transform: scale(1.1);
    transition: 0.2s ease;
    color: #292929;
  }
}
.red {
  background: #f2758ab2;
}
.blue {
  background: #83d0cbb7;
}
.green {
  background: #82c26eb0;
}
</style>