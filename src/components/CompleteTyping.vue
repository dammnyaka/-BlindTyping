<template>
  <div>
    <div>Ваша скорость печати {{ resultTypingSpeed }} зн./мин</div>
    <button @click="handleClick">Заново</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CompleteTyping",
  computed: {
    ...mapState("timerModule", ["resultTypingSpeed"]),
  },
  methods: {
    ...mapMutations("timerModule", ["resetTimer"]),
    ...mapMutations("textModule", ["setLoading", "setActiveKey"]),

    handleClick() {
      this.setActiveKey(true);
      this.setLoading(false);
      this.resetTimer();
    },
  },
};
</script>
