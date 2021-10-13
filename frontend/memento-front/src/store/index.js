import { createStore } from "vuex";

export default createStore({
  state: {
    workspace: ["w1", "w2", "w3"],
  },
  getters: {
    getWorkspace: (state) => state.workspace,
  },
  mutations: {},
  actions: {},
  modules: {},
});
