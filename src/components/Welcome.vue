<template>
  <div class="flex justify-center h-screen">
    <img src="../assets/start.png" class="object-cover" />
    <router-link to="/quiz">
      <button
        class="absolute top-[90%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 px-16 py-2 bg-[#f7c116] text-black font-extrabold rounded-3xl shadow-md border border-black max-[720px]:px-15 max-[720px]:py-2 max-[360px]:px-8 max-[360px]:py-1 max-[360px]:text-xs max-[208px]:px-6 hover:bg-yellow-600 focus:outline-none"
      >
        เริ่มเลย
      </button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "welcome",
});
</script>
