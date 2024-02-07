<template>
  <div class="container h-screen flex justify-center items-center flex-col">
    <div
      class="w-[360px] flex flex-col h-[478px] py-3 px-6 justify-center items-center bg-white rounded-3xl shadow-md border border-black my-6"
    >
      <h1 class="text-3xl font-semibold mb-4">ผลลัพธ์ของคุณคือ</h1>
      <!-- เพิ่มการแสดงผลคะแนนปัจจุบัน -->
      <!-- ตามความต้องการสามารถเพิ่มเงื่อนไขแสดงข้อความหรือการทำงานเพิ่มเติมได้ -->
      <img
        v-if="currentScoreText === 'The Enthusiastic'"
        src="../assets/theenthusiastic.png"
        class="object-cover"
      />
      <img
        v-if="currentScoreText === 'The Gradual Learner'"
        src="../assets/thegraduallearner.png"
        class="object-cover"
      />
      <img
        v-if="currentScoreText === 'The Hobbyist'"
        src="../assets/thehobbyist.png"
        class="object-cover"
      />
      <p class="text-lg font-semibold my-1">คุณรู้จัก Globish ผ่าน</p>
      <p
        class="text-lg font-semibold my-1"
        v-if="choicesQuestion7 === 0 || choicesQuestion7 === null"
      >
        Instagram
      </p>
      <p class="text-lg font-semibold my-1" v-if="choicesQuestion7 === 1">
        Facebook
      </p>
      <p class="text-lg font-semibold my-1" v-if="choicesQuestion7 === 2">
        {{ additionalAnswer }}
      </p>
    </div>
    <router-link
      to="/"
      class="rounded-3xl shadow-md border border-black px-3 py-2 bg-[#F7C116] hover:bg-yellow-600 focus:outline-none"
      >HOME</router-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteLocationNormalizedLoaded } from "vue-router";

export default defineComponent({
  name: "Result",
  props: {
    $route: {
      type: Object as () => RouteLocationNormalizedLoaded,
      required: true,
    },
  },
  computed: {
    currentScore(): number {
      return Number(this.$route.query.currentScore) || 0; // เพิ่ม computed property สำหรับ currentScore
    },
    additionalAnswer(): string {
      // ตรวจสอบประเภทข้อมูลก่อนการแปลง
      const queryValue = this.$route.query.additionalAnswer;
      if (typeof queryValue === "string") {
        return queryValue || "";
      } else {
        // ถ้าไม่ใช่ string หรือไม่มีค่า ให้คืนค่าว่าง
        return "";
      }
    },
    choicesQuestion7(): number | null {
      // ตรวจสอบประเภทข้อมูลก่อนการแปลง
      const queryValue = this.$route.query.choicesQuestion7;
      if (typeof queryValue === "string") {
        return Number(queryValue) || null;
      } else {
        // ถ้าไม่ใช่ string หรือไม่มีค่า ให้คืนค่า null
        return null;
      }
    },
    currentScoreText(): string {
      if (this.currentScore >= 131 && this.currentScore <= 180) {
        return "The Gradual Learner";
      } else if (this.currentScore >= 91 && this.currentScore <= 130) {
        return "The Enthusiastic";
      } else if (this.currentScore >= 60 && this.currentScore <= 90) {
        return "The Hobbyist";
      } else {
        return "ไม่สามารถระบุได้"; // กรณีไม่อยู่ในช่วงที่กำหนดให้
      }
    },
  },
});
</script>

<style>
/* สไตล์ของ Result.vue */
</style>
