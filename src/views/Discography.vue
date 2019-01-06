<template>
  <div class="discography">
    <div v-for="item in albums" :key="item.id">
      <div v-if="item.album_group == 'album'">
        <img class="art-window" :src="item.images[0].url" v-on:click="goAlbum(item.id)">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      discography: []
    };
  },
  computed: {
    ...mapState(["accessToken", "artist", "albums"])
  },
  methods: {
    ...mapActions(["GET_ALBUMS"]),
    getDiscography: function() {
      this.GET_ALBUMS({
        artistId: this.artist.id,
        params: { include_groups: "album" }
      });
    },
    goAlbum: function(albumId) {
      this.$router.push(`/artist/${this.artist.id}/album/${albumId}`);
    }
  },
  created: function() {
    this.getDiscography();
  }
};
</script>

<style scoped>
.discography {
  padding: 1em;
}
</style>
