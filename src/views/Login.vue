<template>
  <div>
    <h1>This is a Login page</h1>
  </div>
</template>

<script>
import queryString from 'query-string'
export default {
  beforeCreate: function() {
    const hashValues = queryString.parse(this.$route.hash)
    console.log(hashValues)
    const code = this.$route.query && this.$route.query.code || "";
    this.$http.post("https://accounts.spotify.com/api/token", {
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.VUE_APP_REDIRECT_URI
    }, {
      headers: {
        "Access-Control-Allow-Origin": "true"
      }
    }).then(function(data) {
      console.log("response", data)
    })
  }
}
</script>