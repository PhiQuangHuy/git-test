import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/layout/FormLayout.vue"),
      children: [
        { path: "", component: () => import("@/pages/QuestionsPage.vue") },
        { path: "success", component: () => import("@/pages/SuccessPage.vue") },
      ],
    },
  ],
});

export default router;
