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
    component: () => import(/* webpackChunkName: "a" */ "../views/A/a.vue"),
  },
  {
    path: "/b",
    name: "b",
    component: () => import(/* webpackChunkName: "b" */ "../views/B/b.vue"),
  },
  {
    path: "/todo",
    name: "todo",
    component: () =>
      import(/* webpackChunkName: "todo" */ "../views/TodoList/index.vue"),
  },
  {
    path: "/design/stateMode",
    name: "stateMode",
    component: () =>
      import(/* webpackChunkName: "design" */ "../views/design/stateMode.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
