import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('../Pages/MainPage.vue'),
    meta: {
      title: "Home",
    }
  },
  {
    path: "/Post/:postId",
    name: "Post",
    component: () => import('../Pages/PostPage.vue'),
    meta: {
      title: "Post",
    }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

