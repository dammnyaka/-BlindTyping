<template>
  <div class="hello">
    <span
      v-for="(letter, index) in text[0]"
      :key="index"
      class="text"
      :style="style(index)"
      >{{ letter }}</span
    >
    <div>{{ getTypingSpeed }} зн./мин</div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "BlindTyping",
  computed: {
    ...mapState("textModule", ["text", "key", "activeKey"]),
    ...mapGetters("timerModule", ["getTypingSpeed"]),
  },

  mounted() {
    document.addEventListener("keypress", (e) => {
      this.hand(e.key);
    });
    this.getApiText();
  },

  unmounted() {
    this.resetState();
  },

  methods: {
    ...mapMutations("textModule", [
      "setKey",
      "setActiveKey",
      "resetState",
      "setLang",
    ]),
    ...mapActions("textModule", ["getApiText"]),

    ...mapMutations("timerModule", [
      "setComplete",
      "setResultTypingSpeed",
      "setTimer",
    ]),

    hand(keypress) {
      const match = this.text[0][this.key] === keypress;
      if (/^[а-яА-ЯёЁ]+$/u.test(keypress)) {
        this.setLang(true);
      } else {
        this.setLang(false);
      }
      if (this.key === 0) {
        const typingStartTime = Date.now();
        this.setTimer(typingStartTime);
      }
      if (match) {
        this.setKey(this.key + 1);
        this.setActiveKey(true);

        if (this.text[0].length === this.key) {
          this.setComplete(true);
          this.setResultTypingSpeed(this.getTypingSpeed);
        }
      } else {
        this.setActiveKey(false);
      }
    },

    style(index) {
      return {
        color:
          index === this.key ? "white" : index < this.key ? "green" : "black",
        backgroundColor:
          index === this.key && this.activeKey
            ? "green"
            : index === this.key && !this.activeKey
            ? "red"
            : "transparent",
      };
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
.text {
  font-size: 28px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
