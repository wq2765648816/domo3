import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
// 全局注册 elementUI
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "@/icons"
import httpRequest from "./utils/http"
Vue.prototype.$http = httpRequest
Vue.use(ElementUI)

Vue.directive("color", {
  bind(el, binding) {
    el.style.backgroundColor = binding.value
    el.style.borderColor = binding.value
  },
  update(el, binding) {
    el.style.backgroundColor = binding.value
    el.style.borderColor = binding.value
  }
})

Vue.directive("txtColor", {
  bind(el, binding) {
    el.style.color = binding.value
  },
  update(el, binding) {
    el.style.color = binding.value
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
