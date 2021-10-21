import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    email: "",
    token: "",
    fetchUrl: "http://localhost:3000/api/",
  },
  getters: {},
  mutations: {
    ADD_PROFILE(state, data) {
      state.token = data.token;
      state.email = data.email;
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
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
