<template>
  <button v-on:click="login">Login</button>
</template>

<script>
import router from "@/router";
export default {
  name: "Login",
  props: {
    msg: String
  },
  methods: {
    login: () => {
      const clientId = process.env.VUE_APP_CLIENT_ID;
      const redirectUri = encodeURIComponent(process.env.VUE_APP_REDIRECT_URI);

      console.log(process.env.VUE_APP_REDIRECT_URI, redirectUri);

      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-private%20user-read-email&state=34fFs29kd09`;
    }
  }
};
</script>


<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
