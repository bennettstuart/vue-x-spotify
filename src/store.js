import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    artists: [],
    artist: null,
    albums: [],
    album: null,
    playTrack: null,
    refreshToken: null,
    accessToken: null
  },
  mutations: {
    STORE_ACCESS_TOKEN: (state, link) => {
      console.log("STORE_ACCESS_TOKEN");
      state.accessToken = link;
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  },
  actions: {}
});
