import axios from "axios";

const textModule = {
  namespaced: true,

  state: () => ({
    text: [],
    key: 0,
    loading: false,
    activeKey: true,
    lang: false,
    correctChars: 0,
    totalChars: 0,
    accuracy: 0,
  }),

  mutations: {
    setTextApi(state, payload) {
      state.text = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setKey(state, payload) {
      state.key = payload;
    },
    setActiveKey(state, payload) {
      state.activeKey = payload;
    },
    setLang(state, payload) {
      state.lang = payload;
    },
    setCorrectChars(state, payload) {
      state.correctChars = payload;
    },
    setTotalChars(state, payload) {
      state.totalChars = payload;
    },
    setAccuracy(state, payload) {
      state.accuracy = payload;
    },
    resetState(state) {
      state.text = [];
      state.key = 0;
      state.activeKey = true;
      state.correctChars = 0;
      state.totalChars = 0;
    },
  },

  actions: {
    getApiText({ commit }) {
      axios
        .get("https://baconipsum.com/api/?type=meat-and-filler")
        .then(({ data }) => {
          commit("setTotalChars", data[0].length);
          commit("setTextApi", data);
        })
        .catch((e) => console.log(e));
    },
  },

  getters: {
    accuracy(state) {
      if (state.totalChars === 0) {
        return 0;
      }
      const errorChars = state.totalChars - state.correctChars;
      return (errorChars / state.totalChars) * 100;
    },
  },
};

export default textModule;
