<template>
  <div class="discography">
    <div v-for="item in this.discography" :key="item.id">
      <div v-if="item.album_group == 'album'">
        <img class="artist-art" :src="item.images[0].url">
        {{item.name}}
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
      discography: []
    };
  },
  computed: {
    ...mapState(["accessToken", "artist"])
  },
  methods: {
    getDiscography: function() {
      console.log(this.accessToken);
      this.$http
        .get(`https://api.spotify.com/v1/artists/${this.artist.id}/albums`, {
          headers: { Authorization: `Bearer ${this.accessToken}` }
        })
        .then(response => {
          this.discography = response.body.items;
        });
    }
  },
  created: function() {
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
.discography {
  padding: 1em;
}
</style>
