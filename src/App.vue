<template>
  <div id="app">
    <router-view/>
    <Player/>
  </div>
</template>

<script>
import Player from "@/components/Player.vue";

export default {
  components: {
    Player
  }
};
</script>

<style>
html {
  margin: 0;
  background-color: #141a20;
  background-image: linear-gradient(#16171a, #141a20);
  background-repeat: no-repeat;
  background-attachment: fixed;
  user-select: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

:focus {
  outline: 3px;
}

.absolute-center {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
