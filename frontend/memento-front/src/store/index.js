import { createStore } from "vuex";

export default createStore({
  state: {
    fetchUrl: "http://localhost:3000/api/",
  },
  getters: {},
  mutations: {},
  actions: {
    fetchAuth(context, { endpoint, method, valueForm}) {
      return fetch(this.state.fetchUrl + endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valueForm),
      });
    }
  },
  modules: {},
});
