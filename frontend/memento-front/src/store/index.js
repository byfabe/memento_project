import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    enter: false,
    email: "",
    token: "",
    backgroundColor: "w1",
    title: "memento",
    fetchUrl: "http://localhost:3000/api/",
    //"https://rocky-inlet-14615.herokuapp.com/api/"
  },
  getters: {
    getEnter: (state) => state.enter,
    getTitle: (state) => state.title,
    getBackground: (state) => state.backgroundColor
  },
  mutations: {
    ADD_PROFILE(state, data) {
      state.token = data.token;
      state.email = data.email;
      state.backgroundColor = data.backgroundColor;
      state.title = data.title;
    },
    ADD_BACKGROUNDCOLOR(state, data) {
      state.backgroundColor = data.backgroundColor
    },
    ADD_TITLE(state, data) {
      state.title = data.title
    },
    ADD_ENTER(state, logic) {
      state.enter = logic
    },
    DISCONNECT(state) {
      state.email = "";
      state.token = "";
      state.enter = "";
      state.backgroundColor = "";
      state.title = "";
    },
  },
  actions: {
    fetchAuth(context, { endpoint, method, valueForm }) {
      return fetch(this.state.fetchUrl + endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valueForm),
      });
    },
    fetchPost(context, { endpoint, method, valueForm }) {
      return fetch(this.state.fetchUrl + endpoint, {
        method: method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.token,
        },
        body: JSON.stringify(valueForm),
      });
    },
  },
  modules: {},
  plugins: [createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});

//sessionStorage.clear() déconnexion 
