import axios from "axios";

const textModule = {
  namespaced: true,

  state: () => ({
    text: [],
    key: 0,
    loading: false,
    activeKey: true,
    lang: false,
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
    resetState(state) {
      state.text = [];
      state.key = 0;
      state.activeKey = true;
    },
  },

  actions: {
    getApiText({ commit }) {
      axios
        .get("https://baconipsum.com/api/?type=meat-and-filler")
        .then(({ data }) => {
          commit("setTextApi", data);
        })
        .catch((e) => console.log(e));
    },
  },

  getters: {},
};

export default textModule;
