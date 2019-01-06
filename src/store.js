import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

Vue.use(Vuex);

const keys = {
  accessToken: "accessToken",
  expiresAt: "expiresAt"
};
const checkTokenCache = function() {
  const accessToken = window.localStorage.getItem(keys.accessToken);
  const expiresAt = new Date(window.localStorage.getItem(keys.expiresAt));
  let now = new Date();
  now.setSeconds(now.getSeconds() + 5 * 60);

  //token valid for at least 5 minutes
  return now < expiresAt ? accessToken : null;
};
const storeTokenCache = function(accessToken, expiresAt) {
  window.localStorage.setItem(keys.accessToken, accessToken);
  window.localStorage.setItem(keys.expiresAt, expiresAt);
};
const clearTokenCache = function() {
  keys.map(key => {
    window.localStorage.setItem(key, undefined);
  });
};

export default new Vuex.Store({
  state: {
    artists: [],
    artist: null,
    albums: [],
    album: null,
    playTrack: null,
    refreshToken: null,
    accessToken: checkTokenCache(),
    user: null
  },
  mutations: {
    STORE_ACCESS_TOKEN: (state, link) => {
      const { accessToken, expiresAt } = link;
      storeTokenCache(accessToken, expiresAt);
      state.accessToken = link.accessToken;
      setTimeout(() => {
        router.push("/");
      }, 3000);
    },
    STORE_USER: (state, link) => {
      state.user = link.user;
    },
    LOGOUT_USER: state => {
      clearTokenCache();
      state.accessToken = null;
      state.user = null;
    },
    SET_ARTISTS: (state, link) => {
      state.artists = link.artists;
    },
    SET_ALBUMS: (state, link) => {
      state.albums = link.albums;
    },
    SET_ARTIST: (state, link) => {
      state.artist = link.artist;
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
    },
    GET_ARTIST: ({ commit, state }, payload) => {
      //remove previous artist
      commit("SET_ARTIST", { artist: null });

      //check for artist loaded in search.artists
      let foundArtist = state.artists.find(function(artist) {
        return artist.id === payload.artistId;
      });
      if (foundArtist) {
        commit("SET_ARTIST", { artist: foundArtist });
      } else {
        const { accessToken } = state;
        Vue.http
          .get(`https://api.spotify.com/v1/artists/${payload.artistId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(response => {
            commit("SET_ARTIST", { artist: response.body });
          });
      }
    }
  }
});
