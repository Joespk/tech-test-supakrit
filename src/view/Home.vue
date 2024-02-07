<template>
  <Welcome />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Welcome from "../components/Welcome.vue";

export default defineComponent({
  name: "Home",
  components: { Welcome },
});
</script>
