<template>
  <div class="absolute-center">
    <h1>Logging you in...</h1>
    <fingerprint-spinner class="inline" :animation-duration="1500" :size="64" color="#43A2FD"/>
  </div>
</template>

<script>
import queryString from "query-string";
import { mapActions } from "vuex";
import { FingerprintSpinner } from "epic-spinners";

export default {
  name: "Login",
  components: {
    FingerprintSpinner
  },
  methods: {
    ...mapActions(["STORE_ACCESS_TOKEN_GET_USER"]),
    storeAccessToken(payload) {
      this.STORE_ACCESS_TOKEN_GET_USER(payload);
    }
  },
  created: function() {
    const hashValues = queryString.parse(this.$route.hash);

    let expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + hashValues.expires_in);

    this.storeAccessToken({
      accessToken: hashValues["access_token"],
      expiresAt
    });
  }
};
</script>

<style scoped>
.inline {
  display: inline-block;
}
</style>
