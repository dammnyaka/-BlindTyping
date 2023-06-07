<template>
  <div>
    <transition name="fade">
      <div v-if="!loading">
        <StartTyping />
      </div>
      <div v-else-if="!complete">
        <BlindTyping />
      </div>
      <div v-else>
        <CompleteTyping />
      </div>
    </transition>
    <div v-show="lang">
      <LangError />
    </div>
  </div>
</template>

<script>
import BlindTyping from "./components/BlindTyping.vue";
import CompleteTyping from "./components/CompleteTyping.vue";
import LangError from "./components/LangError.vue";
import StartTyping from "./components/StartTyping.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    BlindTyping,
    StartTyping,
    CompleteTyping,
    LangError,
  },
  computed: {
    ...mapState("textModule", ["loading", "lang"]),
    ...mapState("timerModule", ["complete"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
