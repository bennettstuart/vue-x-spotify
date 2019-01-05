<template>
  <div class="home">
    <LoginButton v-if="!accessToken"/>
    <div v-else>
      <h1>Welcome!</h1>
    </div>
  </div>
</template>

<script>
import LoginButton from "@/components/LoginButton.vue";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    LoginButton
  },
  computed: {
    ...mapState(["accessToken"])
  }
};
</script>
