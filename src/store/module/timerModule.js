const timerModule = {
  namespaced: true,

  state: () => ({
    startTime: 0,
    resultTypingSpeed: 0,
    complete: false,
  }),

  mutations: {
    setTimer(state, payload) {
      state.startTime = payload;
    },
    setComplete(state, payload) {
      state.complete = payload;
    },
    setResultTypingSpeed(state, payload) {
      state.resultTypingSpeed = payload;
    },
    resetTimer(state) {
      state.startTime = 0;
      state.resultTypingSpeed = 0;
      state.complete = false;
    },
  },

  actions: {},

  getters: {
    getTypingSpeed(state, getters, rootState) {
      if (rootState.textModule.key === 0 || state.startTime === 0) {
        return 0;
      }

      const timeElapsed = (Date.now() - state.startTime) / 1000;
      const charactersTyped = rootState.textModule.key;
      const typingSpeed = (charactersTyped / timeElapsed) * 60;
      return typingSpeed.toFixed(0);
    },
  },
};

export default timerModule;
