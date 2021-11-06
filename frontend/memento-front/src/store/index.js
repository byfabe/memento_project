import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    enter: false,
    email: "",
    token: "",
    fetchUrl: "http://localhost:3000/api/",
  },
  getters: {
    getEnter: (state) => state.enter,
  },
  mutations: {
    ADD_PROFILE(state, data) {
      state.token = data.token;
      state.email = data.email;
    },
    ADD_ENTER(state, logic) {
      state.enter = logic
    }
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
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
