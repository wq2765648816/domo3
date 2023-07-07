import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bgColor: "#4d7efc"
  },
  getters: {},
  mutations: {
    UpbgColor(state, val) {
      state.bgColor = val
    }
  },
  actions: {},
  modules: {}
})
