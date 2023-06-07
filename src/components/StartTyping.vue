<template>
  <div>
    <div>Приготовься печатать. Поехали!</div>
    <button @click="handleClick">Начать</button>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "StartTyping",
  methods: {
    ...mapMutations("textModule", ["setLoading"]),

    handleClick() {
      this.setLoading(true);
    },
  },
  computed: {
    ...mapState("textModule", ["loading"]),
  },
};
</script>

<style></style>
