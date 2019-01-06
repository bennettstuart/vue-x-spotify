<template>
  <div class="album" v-if="album">
    {{album.name}} - {{getWholeLength()}}
    <ul>
      <li v-for="track in album.tracks.items" :key="track.id">
        {{track.track_number}}. {{track.name}} - {{Math.floor(track.duration_ms/(1000*60))+":"+pad(Math.floor((track.duration_ms/(1000))%60), 2)}}
        <button
          v-on:click="playSample(track)"
          class="play"
        >▶</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      albumId: this.$route.params.albumId
    };
  },
  computed: {
    ...mapState(["album"])
  },
  methods: {
    ...mapActions(["GET_ALBUM"]),
    getAlbum: function() {
      this.GET_ALBUM({ albumId: this.albumId });
    },
    ...mapMutations(["SET_CURRENT_TRACK"]),
    playSample: function(track) {
      this.SET_CURRENT_TRACK(track);
    },
    getWholeLength: function() {
      const trackList = this.album.tracks.items;
      let wholeDuration = 0;
      for (let i = 0; i < trackList.length; i++) {
        let track = trackList[i];
        wholeDuration += track.duration_ms;
      }
      wholeDuration = new Date(wholeDuration);
      const readable = {
        hours: wholeDuration.getHours() ? wholeDuration.getHours() + ":" : "",
        minutes: wholeDuration.getMinutes()
          ? this.pad(wholeDuration.getMinutes(), 2) + ":"
          : "00:",
        seconds: this.pad(wholeDuration.getSeconds(), 2)
          ? wholeDuration.getSeconds()
          : "00"
      };

      return readable.hours + readable.minutes + readable.seconds;
    },
    pad: function(n, width, z) {
      z = z || "0";
      n = n + "";
      return n.length >= width
        ? n
        : new Array(width - n.length + 1).join(z) + n;
    }
  },
  created: function() {
    this.getAlbum();
  }
};
</script>

<style scoped>
.artist-art {
  display: inline-block;
  width: 6em;
  height: 6em;
  border: 1px solid #43a2fd;
}
.discography {
  padding: 1em;
}
.play {
  border: 0;
  border-radius: 3px;
  color: white;
  background: #43a2fd;
}
.play:active {
  opacity: 0.5;
}
</style>
