<template>
  <div class="home">
    <LoginButton v-if="!accessToken"/>
    <div v-else>
      <button class="logout" v-on:click="logout">Sign Out</button>
      <h1>Welcome!</h1>
      <div class="searchContainer">
        <span>
          <input
            v-model="searchTerm"
            v-on:keyup.enter="search"
            class="search"
            placeholder="Search for you favourite artists..."
            type="text"
          >
          <button class="searchButton" v-on:click="search">Search</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import LoginButton from "@/components/LoginButton.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "home",
  data() {
    return {
      searchTerm: ""
    };
  },
  components: {
    LoginButton
  },
  computed: {
    ...mapState(["accessToken"])
  },
  methods: {
    ...mapMutations(["LOGOUT_USER"]),
    logout() {
      this.LOGOUT_USER();
    },
    search(e) {
      e.target.blur();
      let value = this.searchTerm;
      if (value.length === 0) return;
      console.log(value, e);
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
  display: inline-block;
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
.search {
  text-align: left;
  font-size: 20px;
  line-height: 1rem;
  padding: 0.25rem 1rem 0.25rem 1rem;
  border-radius: 1rem;
  border: 0;
  width: 20em;
}
</style>
