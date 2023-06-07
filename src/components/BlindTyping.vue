<template>
  <div class="hello">
    <span
      v-for="(letter, index) in modifiedText"
      :key="index"
      class="text"
      :style="style(index)"
      >{{ letter }}</span
    >
    <div>Скорость {{ getTypingSpeed }} зн./мин</div>
    <div>Точность: {{ accuracy.toFixed(2) }}%</div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "BlindTyping",
  computed: {
    ...mapState("textModule", ["text", "key", "activeKey", "correctChars"]),
    ...mapGetters("textModule", ["accuracy"]),
    ...mapGetters("timerModule", ["getTypingSpeed"]),

    modifiedText() {
      return this.text[0] ? this.text[0].replace(/\s{2,}/g, " ") : "";
    },
  },

  mounted() {
    document.addEventListener("keypress", (e) => {
      this.inputKey(e.key);
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
      "setCorrectChars",
      "setAccuracy",
    ]),
    ...mapActions("textModule", ["getApiText"]),

    ...mapMutations("timerModule", [
      "setComplete",
      "setResultTypingSpeed",
      "setTimer",
    ]),

    inputKey(keypress) {
      const match = this.modifiedText[this.key] === keypress;
      this.setLang(/^[а-яА-ЯёЁ]+$/u.test(keypress));

      if (this.key === 0) {
        this.setTimer(Date.now());
      }

      if (match) {
        this.handleMatch();
      } else {
        this.handleMismatch();
      }

      if (!this.activeKey) {
        this.setCorrectChars(this.correctChars + 1);
      }
    },

    handleMatch() {
      this.setKey(this.key + 1);
      this.setActiveKey(true);

      if (this.modifiedText.length === this.key) {
        this.setAccuracy(this.accuracy);
        this.setComplete(true);
        this.setResultTypingSpeed(this.getTypingSpeed);
      }
    },

    handleMismatch() {
      this.setActiveKey(false);
    },

    style(index) {
      const isActiveKey = index === this.key;
      const isBeforeKey = index < this.key;

      return {
        color: isActiveKey ? "white" : isBeforeKey ? "green" : "black",
        backgroundColor: isActiveKey
          ? this.activeKey
            ? "green"
            : "red"
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
