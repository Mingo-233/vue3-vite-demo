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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/index.vue"),
  },
  {
    path: "/a",
    name: "a",
    component: () => import(/* webpackChunkName: "about" */ "../views/A/a.vue"),
  },
  {
    path: "/b",
    name: "b",
    component: () => import(/* webpackChunkName: "about" */ "../views/B/b.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
