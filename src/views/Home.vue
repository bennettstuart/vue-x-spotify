<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <LoginButton />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginButton from "@/components/LoginButton.vue";
console.log(process.env)
export default {
  name: "home",
  components: {
    LoginButton
  }
};
</script>
