<template>
  <div
    class="container h-screen flex justify-center items-center my-3 flex-col"
  >
    <div class="flex flex-row gap-1">
      <button
        v-for="(question, index) in questions"
        :key="index"
        class="rounded-3xl shadow-md border border-black w-14 px-3 py-2 bg-[#FFFAF5]"
        :class="{ 'bg-black': currentQuestionIndex === index }"
        @click="setCurrentQuestionIndex(index)"
      ></button>
    </div>
    <div
      class="w-[360px] flex h-[478px] py-3 px-6 justify-center bg-white rounded-3xl shadow-md border border-black my-6"
    >
      <div
        v-if="
          currentQuestionIndex !== null &&
          currentQuestionIndex < questions.length
        "
        class="flex flex-col justify-around"
      >
        <h2 class="Q">Q{{ currentQuestionIndex + 1 }}</h2>
        <p class="font-black text-base">
          {{ questions[currentQuestionIndex].text }}
        </p>
        <div class="flex flex-col gap-4 mt-8">
          <label
            v-for="(choice, index) in questions[currentQuestionIndex].choices"
            :key="index"
            :class="{
              'bg-[#F57C4A]': selectedChoices[currentQuestionIndex] === index,
            }"
            class="text-black font-extrabold rounded-3xl shadow-md border border-black px-12 py-6 text-sm hover:bg-orange-400 focus:outline-none"
          >
            <input
              type="radio"
              :value="index"
              v-model="selectedChoices[currentQuestionIndex]"
              class="hidden"
            />
            <input
              v-if="currentQuestionIndex === 6 && index === 2"
              type="text"
              v-model="additionalAnswer"
              class="border-b border-black"
              placeholder="กรอกคำตอบ"
            />
            {{ choice }}
          </label>
        </div>
      </div>
    </div>
    <div class="flex justify-between gap-9 items-center">
      <div v-if="currentQuestionIndex === 0">
        <router-link
          to="/"
          class="rounded-3xl shadow-md border border-black px-3 py-2 bg-[#FFFAF5] hover:bg-orange-400 focus:outline-none"
          >ย้อนกลับ</router-link
        >
      </div>
      <div v-else>
        <button
          @click="goBack"
          class="rounded-3xl shadow-md border border-black px-3 py-2 bg-[#FFFAF5] hover:bg-orange-400 focus:outline-none"
        >
          ย้อนกลับ
        </button>
      </div>
      <div v-if="currentQuestionIndex === 6">
        <router-link
          class="rounded-3xl shadow-md border border-black px-20 py-2 bg-[#F7C116] hover:bg-yellow-600 focus:outline-none"
          v-if="
            currentQuestionIndex === questions.length - 1 &&
            selectedChoices[currentQuestionIndex] !== null
          "
          :to="{
            path: '/result',
            query: {
              currentScore: currentScore,
              additionalAnswer: additionalAnswer,
              choicesQuestion7: selectedChoices[6],
            },
          }"
        >
          View Result
        </router-link>
      </div>
      <div v-else>
        <button
          class="rounded-3xl shadow-md border border-black px-24 py-2 bg-[#F7C116] hover:bg-yellow-600 focus:outline-none"
          @click="nextQuestion"
        >
          ถัดไป
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Quiz",
  data() {
    return {
      currentQuestionIndex: 0,
      questions: [
        {
          text: "ถ้าวันนี้เป็นวันหยุด คุณจะ..",
          choices: [
            "นอนเล่น พักผ่อน",
            "ดูหนัง ดูซีรี่ส์ เล่นเกม",
            "เรียนรู้อะไรใหม่ ๆ",
          ],
          answers: [10, 20, 30],
        },
        {
          text: "คุณต้องการพัฒนาภาษาอังกฤษเพื่ออะไร?",
          choices: ["การทำงาน", "การทำงาน", "ใช้ในชีวิตประจำวัน"],
          answers: [30, 10, 20],
        },
        {
          text: "สไตล์การเรียนภาษาอังกฤษของคุณเป็นแบบไหน?",
          choices: [
            "เรียนคอร์สออนไลน์ / โรงเรียนสอนภาษา",
            "เรียนด้วยตนเอง เช่น อ่านหนังสือ ดูหนัง ฟังเพลง",
            "คุยกับเพื่อนต่างชาติ / ไปเที่ยวต่างประเทศ",
          ],
          answers: [30, 20, 10],
        },
        {
          text: "คุณใช้ภาษาอังกฤษบ่อยแค่ไหน?",
          choices: [
            "เป็นประจำทุกวัน",
            "เป็นบางครั้ง",
            "นาน ๆ ที / ไม่ได้ใช้เลย",
          ],
          answers: [30, 10, 20],
        },
        {
          text: "คุณอยากพัฒนาสกิลภาษาอังกฤษสกิลไหนมากที่สุด?",
          choices: ["การฟัง", "การพูด", "การเขียน"],
          answers: [20, 10, 30],
        },
        {
          text: "อยากเรียนภาษาอังกฤษ แต่...",
          choices: ["ไม่มีเวลา", "เนื้อหาไม่น่าสนใจ / สอนไม่สนุก", "ไม่มั่นใจ"],
          answers: [20, 10, 30],
        },
        {
          text: "คุณรู้จัก Globish ผ่านช่องทางใด(เลือกได้มากกว่า 1 ข้อ)",
          choices: ["Instagram", "Facebook", "อื่นๆ (โปรดระบุ)"],
          answers: [0, 0, 0],
        },
      ],
      selectedChoices: new Array<number | null>(7).fill(null),
      additionalAnswer: "",
    };
  },
  computed: {
    currentScore(): number | null {
      if (this.currentQuestionIndex !== null) {
        let score = 0;
        for (let i = 0; i <= this.currentQuestionIndex; i++) {
          const choiceIndex = this.selectedChoices[i];
          if (choiceIndex !== null) {
            const answerScore = this.questions[i].answers[choiceIndex];
            score += answerScore;
          }
        }
        return score;
      }
      return null;
    },
  },
  methods: {
    setCurrentQuestionIndex(index: number) {
      this.currentQuestionIndex = index;
    },
    goBack() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
    nextQuestion() {
      if (
        this.currentQuestionIndex < this.questions.length - 1 &&
        this.selectedChoices[this.currentQuestionIndex] !== null
      ) {
        this.currentQuestionIndex++;
      }
    },
    submitAnswer() {
      // เช็คว่ามีการเลือกคำตอบในคำถามที่ 7 หรือไม่
      if (
        this.selectedChoices[6] !== null ||
        this.additionalAnswer.trim() !== ""
      ) {
        // ส่งข้อมูลไปยัง Result.vue
        this.$router.push({
          path: "/result",
          query: {
            currentScore: this.currentScore,
            additionalAnswer: this.additionalAnswer,
            // เพิ่ม Choices ในคำถามที่ 7 เข้าไปใน query
            choicesQuestion7: this.selectedChoices[6],
          },
        });
      } else {
        // แสดงแจ้งเตือนถ้ายังไม่ได้เลือกคำตอบหรือกรอกข้อความ
        alert("โปรดเลือกคำตอบหรือกรอกข้อความในคำถามที่ 7");
      }
    },
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=IBM+Plex+Sans+Thai:wght@700&display=swap");

.Q {
  font-family: "Gloria Hallelujah", cursive;
  font-size: 32px;
  color: #c8c8c8;
}
</style>
