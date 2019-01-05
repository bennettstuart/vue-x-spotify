<template>
  <div class="home">
    <LoginButton v-if="!accessToken"/>
    <div v-else>
      <h1>Welcome!</h1>
      <button v-on:click="logout">Sign Out</button>
    </div>
  </div>
</template>

<script>
import LoginButton from "@/components/LoginButton.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "home",
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
    }
  }
};
</script>
