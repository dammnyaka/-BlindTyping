import { createStore } from "vuex";
import textModule from "./module/textModule";
import timerModule from "./module/timerModule";

const store = createStore({
  modules: {
    textModule: textModule,
    timerModule: timerModule,
  },
});

export default store;
