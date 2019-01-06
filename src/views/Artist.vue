<template>
  <div v-if="!this.artist">
    <fingerprint-spinner
      class="absolute-center"
      :animation-duration="1500"
      :size="64"
      color="#43A2FD"
    />
  </div>
  <div v-else>
    <div class="artist-title">
      <img class="artist-art" :src="this.artist.images[0].url">
      {{this.artist.name}}
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { FingerprintSpinner } from "epic-spinners";

export default {
  data() {
    return {
      artistId: this.$route.params.id
    };
  },
  components: {
    FingerprintSpinner
  },
  computed: {
    ...mapState(["artist"])
  },
  methods: {
    ...mapActions(["GET_ARTIST"]),
    getArtist: function() {
      this.GET_ARTIST({ artistId: this.artistId });
    }
  },
  created: function() {
    this.getArtist();
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
.artist-title {
  padding: 2em 0 0 0;
  font-size: 24px;
  border-bottom: 1px solid #43a2fd;
}
</style>
