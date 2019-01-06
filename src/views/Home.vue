<template>
  <div class="home">
    <LoginButton v-if="!accessToken"/>
    <div v-else>
      <button class="logout" v-on:click="logout">Sign Out</button>
      <h1>Welcome!</h1>
      <div class="searchContainer">
        <div class="searchBar">
          <input
            v-model="searchTerm"
            v-on:keyup.enter="search"
            class="searchInput"
            placeholder="Search for you favourite artists..."
            type="text"
          >
          <button class="searchButton" v-on:click="search">Search</button>
        </div>
      </div>
      <div class="listContainer">
        <div v-for="artist in artists" :key="artist.id" class="artistItem">
          <ArtistPane v-bind:artist="artist"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginButton from "@/components/LoginButton.vue";
import ArtistPane from "@/components/ArtistPane.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {
      searchTerm: "Everything Everything"
    };
  },
  components: {
    LoginButton,
    ArtistPane
  },
  computed: {
    ...mapState(["accessToken", "artists"])
  },
  methods: {
    ...mapMutations(["LOGOUT_USER"]),
    logout() {
      this.LOGOUT_USER();
    },
    ...mapActions(["SEARCH_ARTISTS"]),
    search(e) {
      e.target.blur();
      let value = this.searchTerm;
      if (value.length === 0) return;
      this.SEARCH_ARTISTS({ searchTerm: value });
    }
  }
};
</script>

<style scoped>
.logout {
  position: absolute;
  top: 0;
  right: 0;
  margin: 1em;
}
.searchContainer {
  position: relative;
  display: flex;
  justify-content: center;
  margin: 1em auto;
}
.searchButton {
  margin: 2px;
  position: absolute;
  right: 2px;
  top: 2px;
  bottom: 2px;

  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 0.75rem;
  border-radius: 1rem;
  border: 0;
  color: white;
  background: #43a2fd;
}
.searchButton:active {
  opacity: 0.5;
}
.searchBar {
  font-size: 20px;
  position: relative;
  width: 20em;
  max-width: 100%;
  padding: 0 1rem;
  border-radius: 1rem;
  background: white;
}
.searchInput {
  background: rgba(0, 0, 0, 0);
  text-align: left;
  font-size: 20px;
  border: 0;
  width: 100%;
  height: 100%;
}
.listContainer {
  max-width: 100%;
  width: 40em;
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
