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
    <div class="discography">
      <div v-for="item in this.discography" :key="item.id">
        <div v-if="item.album_group == 'album'">
          <img class="artist-art" :src="item.images[0].url">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { FingerprintSpinner } from "epic-spinners";

export default {
  data() {
    return {
      artistId: this.$route.params.id,
      discography: null
    };
  },
  components: {
    FingerprintSpinner
  },
  computed: {
    ...mapState(["accessToken", "artist"])
  },
  methods: {
    ...mapActions(["GET_ARTIST"]),
    getArtist: function() {
      this.GET_ARTIST({ artistId: this.artistId });
    },
    getDiscography: function() {
      console.log(this.accessToken);
      this.$http
        .get(`https://api.spotify.com/v1/artists/${this.artistId}/albums`, {
          headers: { Authorization: `Bearer ${this.accessToken}` }
        })
        .then(response => {
          this.discography = response.body.items;
        });
    }
  },
  created: function() {
    this.getArtist();
    this.getDiscography();
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
.discography {
}
</style>
