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
    storeAccessToken(token) {
      this.STORE_ACCESS_TOKEN_GET_USER({ accessToken: token });
    }
  },
  created: function() {
    const hashValues = queryString.parse(this.$route.hash);
    // console.log(hashValues["access_token"]);

    this.storeAccessToken(hashValues["access_token"]);

    // const code = this.$route.query && this.$route.query.code || "";
    // this.$http.post("https://accounts.spotify.com/api/token", {
    //   grant_type: "authorization_code",
    //   code,
    //   redirect_uri: process.env.VUE_APP_REDIRECT_URI
    // }, {
    //   headers: {
    //     "Access-Control-Allow-Origin": "true"
    //   }
    // }).then(function(data) {
    //   console.log("response", data)
    // })
  }
};
</script>

<style scoped>
.inline {
  display: inline-block;
}
</style>
