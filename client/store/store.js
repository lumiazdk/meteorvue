import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    user: "zdk",
    pageShow: false
  },
  mutations: {
    changePage(state, p) {
      state.pageShow = p
    }
  },
  actions: {

  }
});
export default store;
