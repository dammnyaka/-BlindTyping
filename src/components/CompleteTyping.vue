<template>
  <div>
    <div>Ваша скорость печати {{ resultTypingSpeed }} зн./мин</div>
    <div>Ваша точность: {{ accuracy.toFixed(2) }}%</div>
    <button @click="handleClick">Заново</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CompleteTyping",
  computed: {
    ...mapState("timerModule", ["resultTypingSpeed"]),
    ...mapState("textModule", ["accuracy"]),
  },
  methods: {
    ...mapMutations("timerModule", ["resetTimer"]),
    ...mapMutations("textModule", [
      "setLoading",
      "setActiveKey",
      "setAccuracy",
    ]),

    handleClick() {
      this.setAccuracy(0);
      this.setActiveKey(true);
      this.setLoading(false);
      this.resetTimer();
    },
  },
};
</script>
