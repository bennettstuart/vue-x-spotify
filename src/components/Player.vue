<template>
  <div class="player">
    <audio v-if="currentTrack" ref="player" controls>
      <source v-bind:src="currentTrack.preview_url">
    </audio>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentTrack"])
  },
  updated: function() {
    const player = this.$refs.player;
    player.load();
    player.play();
  }
};
</script>

<style>
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5em 1em;
}
</style>
