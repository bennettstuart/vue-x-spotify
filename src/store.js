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
    accessToken: null,
    user: null
  },
  mutations: {
    STORE_ACCESS_TOKEN: (state, link) => {
      console.log("STORE_ACCESS_TOKEN", link);
      state.accessToken = link.accessToken;
      setTimeout(() => {
        router.push("/");
      }, 3000);
    },
    STORE_USER: (state, link) => {
      console.log("STORE_USER", link);
      state.user = link.user;
    },
    LOGOUT_USER: state => {
      state.accessToken = null;
      state.user = null;
    }
  },
  actions: {
    REQUEST_USER: ({ commit, state }, payload) => {
      console.log("REQUEST_USER");
      let accessToken = state.accessToken;
      if (accessToken) {
        accessToken = payload.accessToken;
      }
      if (accessToken) {
        Vue.http
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: accessToken
            }
          })
          .then(response => {
            console.log(response);
            commit("STORE_USER", response);
          });
      }
    },
    STORE_ACCESS_TOKEN_GET_USER: ({ commit, dispatch }, payload) => {
      console.log("STORE_ACCESS_TOKEN_GET_USER");
      commit("STORE_ACCESS_TOKEN", payload);
      dispatch("REQUEST_USER", payload);
    }
  }
});
