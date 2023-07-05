import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"
import LoginView from "../views/login/loginView.vue"
import { getToken } from "../utils/auth"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue")
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "*",
    component: () => import("../views/404/indexView.vue")
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let token = getToken()
  if (token && to.path == "/login") {
    next("/")
  } else if (!token && to.path != "/login") {
    next("/login")
  } else {
    next()
  }
})

export default router
