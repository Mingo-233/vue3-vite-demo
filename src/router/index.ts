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
  {
    path: "/design/messageBox",
    name: "messageBox",
    component: () =>
      import(/* webpackChunkName: "design" */ "../views/design/messageBox.vue"),
  },
  {
    path: "/yanhua",
    name: "yanhua",
    component: () =>
      import(/* webpackChunkName: "yanhua" */ "../views/yanhua/index.vue"),
  },
  {
    path: "/vmodel",
    name: "vmodel",
    component: () =>
      import(/* webpackChunkName: "vmodel" */ "../views/v-model/index.vue"),
  },
  {
    path: "/searchBar",
    name: "searchBar",
    component: () =>
      import(/* webpackChunkName: "vmodel" */ "../views/searchBar/index.vue"),
  },
  {
    path: "/hooksDemo",
    name: "hooksDemo",
    component: () =>
      import(/* webpackChunkName: "vmodel" */ "../views/hooksDemo/index.vue"),
  },
  {
    path: "/stash",
    name: "stash",
    component: () =>
      import(/* webpackChunkName: "stash" */ "../views/stash/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
