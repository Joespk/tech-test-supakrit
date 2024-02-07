import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./view/Home.vue";
import QuizVue from "./view/Quiz.vue";
import Result from "./view/Result.vue";

const routes: Array<RouteRecordRaw> = [
  // existing routes
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: QuizVue,
  },
  {
    path: "/result",
    name: "Result",
    component: Result,
    props: (route) => ({ currentScore: route.query.currentScore }),
  },
  // เพิ่มการ redirect ไปที่หน้า Home เมื่อเปิด app ขึ้นมา
  {
    path: "/",
    redirect: "/home",
  },
  // เพิ่มการ redirect ไปที่หน้า Quiz เมื่อพิมพ์ที่อย่างอื่นนอกเหนือจากที่กําหนด
  {
    path: "/:catchAll(.*)",
    redirect: "/quiz",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
