import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"
import { getToken } from "../utils/auth"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/home", // 重定向:重新指向其它path,会改变网址
    component: HomeView,
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../views/pageView/HomePage.vue")
      },
      {
        path: "component",
        name: "component",
        component: () => import("../views/pageView/ComponentView.vue")
      },
      {
        path: "staff",
        name: "staff",
        component: () => import("../views/pageView/StaffView.vue")
      },
      {
        path: "company",
        name: "company",
        component: () => import("../views/pageView/CompanySetup.vue")
      },
      {
        path: "Permission",
        name: "Permission",
        component: () => import("../views/pageView/PermissionView.vue")
      },
      {
        path: "socia",
        name: "socia",
        component: () => import("../views/pageView/SocialSecurity.vue")
      },
      {
        path: "checking",
        name: "checking",
        component: () => import("../views/pageView/CheckingView.vue")
      },
      {
        path: "salary",
        name: "salary",
        component: () => import("../views/pageView/SalaryView.vue")
      },
      {
        path: "examine",
        name: "examine",
        component: () => import("../views/pageView/ExamineView.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/LoginView.vue")
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
