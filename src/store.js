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
      state.accessToken = link.accessToken;
      setTimeout(() => {
        router.push("/");
      }, 3000);
    },
    STORE_USER: (state, link) => {
      state.user = link.user;
    },
    LOGOUT_USER: state => {
      state.accessToken = null;
      state.user = null;
    },
    SET_ARTISTS: (state, link) => {
      state.artists = link.artists;
    },
    SET_ALBUMS: (state, link) => {
      state.albums = link.albums;
    }
  },
  actions: {
    REQUEST_USER: ({ commit, state }, payload) => {
      let accessToken = state.accessToken;
      if (accessToken) {
        accessToken = payload.accessToken;
      }
      if (accessToken) {
        Vue.http
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(response => {
            commit("STORE_USER", response);
          });
      }
    },
    STORE_ACCESS_TOKEN_GET_USER: ({ commit, dispatch }, payload) => {
      commit("STORE_ACCESS_TOKEN", payload);
      dispatch("REQUEST_USER", payload);
    },
    SEARCH_ARTISTS: ({ commit, state }, payload) => {
      const { accessToken } = state;
      Vue.http
        .get("https://api.spotify.com/v1/search", {
          params: { q: payload.searchTerm, type: "artist" },
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          commit("SET_ARTISTS", { artists: response.body.artists.items });
        });
    },
    SEARCH_ALBUMS: ({ commit }, payload) => {
      commit("SET_ALBUMS", payload);
    }
  }
});
