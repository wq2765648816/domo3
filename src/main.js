import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
// 全局注册 elementUI
// import ElementUI from "element-ui"
// import "element-ui/lib/theme-chalk/index.css"
// Vue.use(ElementUI)

// 按需引入 elementUI
import { Button, Select, Message } from "element-ui"
Vue.use(Button)
Vue.use(Select)
Vue.use(Message)
// Vue.component(Button.name, Button)
// Vue.component(Select.name, Select)

Vue.config.productionTip = false

import httpRequest from "./utils/http"
Vue.prototype.$http = httpRequest
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
