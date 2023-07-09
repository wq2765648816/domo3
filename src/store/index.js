import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bgColor: "#4d7efc",
    userId: ""
  },
  getters: {},
  mutations: {
    UpbgColor(state, val) {
      state.bgColor = val
    },
    inUser(state, val) {
      state.userId = val
    }
  },
  actions: {},
  modules: {}
})
