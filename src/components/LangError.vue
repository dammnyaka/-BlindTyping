<template>
  <div>
    <div class="lang">Поменяйте раскладку на английскую!</div>
    <button @click="click">ОК</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "LangError",
  methods: {
    ...mapMutations("textModule", ["setLang"]),

    click() {
      this.setLang(false);
    },
  },
};
</script>

<style>
.lang {
  color: red;
}
</style>
