import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/pages/auth/Login.vue";
import Signup from "@/components/pages/auth/Signup.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Signup,
    },
    {
      path: "/articles",
      name: "article",
      component: () => import("../components/pages/article/index.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
