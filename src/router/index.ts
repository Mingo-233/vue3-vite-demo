import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "app",
    component: () => import("../views/index.vue"),
  },
  {
    path: "/demo",
    name: "demo",
    component: () => import("../views/demo/index.vue"),
  },
  {
    path: "/knife",
    name: "knife",
    component: () => import("../views/knife/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
